import { LocaleObject, printValue, ValidationError } from 'yup';

interface YupValidationErrorParams {
  path: string;
  type: string;
  value: any;
  originalValue: any;
}

export const mixed = {
  default: '${path} não é válido',
  required: '${path} é um campo obrigatório',
  defined: '${path} deve ser definido',
  notNull: '${path} não pode ser nulo',
  oneOf: '${path} deve ser um dos seguintes valores: ${values}',
  notOneOf: '${path} não deve ser um dos seguintes valores: ${values}',
  notType: ({ path, type, value, originalValue }: YupValidationErrorParams) => {
    const castMsg =
      originalValue != null && originalValue !== value
        ? ` (convertido a partir do valor \`${printValue(
            originalValue,
            true,
          )}\`).`
        : '.';

    return type !== 'mixed'
      ? `${path} deve ser do tipo \`${type}\`, ` +
          `mas o valor final foi: \`${printValue(value, true)}\`` +
          castMsg
      : `${path} deve corresponder ao tipo configurado. ` +
          `O valor validado foi: \`${printValue(value, true)}\`` +
          castMsg;
  },
};

export const string = {
  length: '${path} deve ter exatamente ${length} caracteres',
  min: '${path} deve ter pelo menos ${min} caracteres',
  max: '${path} deve ter no máximo ${max} caracteres',
  matches: '${path} deve corresponder ao seguinte padrão: "${regex}"',
  email: '${path} deve ser um e-mail válido',
  url: '${path} deve ser uma URL válida',
  uuid: '${path} deve ser um UUID válido',
  trim: '${path} deve ser uma string sem espaços extras',
  lowercase: '${path} deve ser uma string em minúsculas',
  uppercase: '${path} deve ser uma string em maiúsculas',
};

export const number = {
  min: '${path} deve ser maior ou igual a ${min}',
  max: '${path} deve ser menor ou igual a ${max}',
  lessThan: '${path} deve ser menor que ${less}',
  moreThan: '${path} deve ser maior que ${more}',
  positive: '${path} deve ser um número positivo',
  negative: '${path} deve ser um número negativo',
  integer: '${path} deve ser um número inteiro',
};

export const date = {
  min: '${path} deve ser posterior a ${min}',
  max: '${path} deve ser anterior a ${max}',
};

export const boolean = {
  isValue: '${path} deve ser ${value}',
};

export const object = {
  noUnknown: '${path} possui chaves não especificadas: ${unknown}',
};

export const array = {
  min: '${path} deve ter pelo menos ${min} itens',
  max: '${path} deve ter no máximo ${max} itens',
  length: '${path} deve ter ${length} itens',
};

export const tuple = {
  notType: (params: { path: string; value: any; spec: { types: any[] } }) => {
    const { path, value, spec } = params;
    const typeLen = spec.types.length;
    if (Array.isArray(value)) {
      if (value.length < typeLen)
        return `${path} o valor da tupla tem poucos itens, esperado um comprimento de ${typeLen} mas obteve ${
          value.length
        } para o valor: \`${printValue(value, true)}\``;
      if (value.length > typeLen)
        return `${path} o valor da tupla tem muitos itens, esperado um comprimento de ${typeLen} mas obteve ${
          value.length
        } para o valor: \`${printValue(value, true)}\``;
    }

    return ValidationError.formatError(mixed.notType, params);
  },
};

export default Object.assign(Object.create(null), {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
  tuple,
}) as LocaleObject;
