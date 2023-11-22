import 'yup';

declare module 'yup' {
  interface StringSchema {
    cpf(message?: string): StringSchema;
    cnpj(message?: string): StringSchema;
    CPFOrCNPJ(message?: string): StringSchema;
  }
}
