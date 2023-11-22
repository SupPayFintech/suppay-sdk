import Yup from '../../Helper/Yup';
import { PaymentType } from './PaymentTypes.type';

const paymentTypeValues = Object.values(PaymentType);

export const createSchema = Yup.object().shape({
  type: Yup.mixed()
    .oneOf(paymentTypeValues, 'Tipo de pagamento inválido')
    .required('Tipo de pagamento é obrigatório'),

  identifier: Yup.string().required('Identificador é obrigatório'),

  installments: Yup.array()
    .of(
      Yup.object().shape({
        identifier: Yup.string().required(
          'Identificador da parcela é obrigatório',
        ),
        due_date: Yup.string().required('Data de vencimento é obrigatória'),
        value: Yup.number()
          .positive('Valor deve ser positivo')
          .required('Valor é obrigatório'),
      }),
    )
    .required('Parcelas são obrigatórias'),

  supplier_document: Yup.string()
    .CPFOrCNPJ('Documento do fornecedor deve ser um CPF ou CNPJ válido')
    .required('Documento do fornecedor é obrigatório'),

  commercial_establishment_document: Yup.string()
    .CPFOrCNPJ(
      'Documento do estabelecimento comercial deve ser um CPF ou CNPJ válido',
    )
    .required('Documento do estabelecimento comercial é obrigatório'),

  balance_period: Yup.number()
    .positive('Período de balanço deve ser positivo')
    .optional(),

  fee: Yup.number().positive('Taxa deve ser positiva').optional(),

  fee_split: Yup.number()
    .positive('Divisão da taxa deve ser positiva')
    .optional(),
});

export const participantSchema = Yup.object()
  .shape({
    supplier_document: Yup.string()
      .CPFOrCNPJ('Documento do fornecedor deve ser um CPF ou CNPJ válido')
      .nullable(),

    commercial_establishment_document: Yup.string()
      .CPFOrCNPJ(
        'Documento do estabelecimento comercial deve ser um CPF ou CNPJ válido',
      )
      .nullable(),
  })
  .test(
    'at-least-one-field',
    'Ao menos um dos documentos (fornecedor ou estabelecimento comercial) deve ser fornecido',
    function (object) {
      return !!(
        object.supplier_document || object.commercial_establishment_document
      );
    },
  );

export const authorizeSchema = Yup.object().shape({
  code: Yup.string().required('Código é obrigatório'),
});

export const changeValueSchema = Yup.object().shape({
  value: Yup.number()
    .required('Valor é obrigatório')
    .positive('Valor deve ser positivo'),
});

export const cancelSchema = Yup.object().shape({
  reason: Yup.string()
    .required('Motivo é obrigatório')
    .min(10, 'Motivo deve ter pelo menos 10 caracteres'),
});

const installmentSchema = Yup.object().shape({
  identifier: Yup.string().required('Identificador é obrigatório'),
  due_date: Yup.string()
    .required('Data de vencimento é obrigatória')
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      'Data de vencimento deve estar no formato AAAA-MM-DD',
    ),
  value: Yup.number()
    .positive('Valor deve ser positivo')
    .required('Valor é obrigatório'),
});

export const simulateSchema = Yup.object().shape({
  type: Yup.mixed()
    .oneOf(paymentTypeValues, 'Tipo de pagamento inválido')
    .required('Tipo de pagamento é obrigatório'),

  identifier: Yup.string().required('Identificador é obrigatório'),

  installments: Yup.array()
    .of(installmentSchema)
    .required('Parcelas são obrigatórias'),

  supplier_document: Yup.string()
    .CPFOrCNPJ('Documento do fornecedor deve ser um CPF ou CNPJ válido')
    .required('Documento do fornecedor é obrigatório'),

  commercial_establishment_document: Yup.string()
    .CPFOrCNPJ(
      'Documento do estabelecimento comercial deve ser um CPF ou CNPJ válido',
    )
    .required('Documento do estabelecimento comercial é obrigatório'),

  balance_period: Yup.number()
    .positive('Período de balanço deve ser positivo')
    .optional(),

  fee: Yup.number().positive('Taxa deve ser positiva').optional(),
});
