import Yup from '../../Helper/Yup';

export const supplierIndicateCreateSchema = Yup.object().shape({
  requester: Yup.object().shape({
    name: Yup.string().required('Nome do solicitante é obrigatório'),
    phone: Yup.string()
      .required('Telefone do solicitante é obrigatório')
      .matches(
        /^(\+\d{1,3})?\d{10,11}$/,
        'Telefone do solicitante deve estar em um formato válido',
      ),
    email: Yup.string()
      .required('Email do solicitante é obrigatório')
      .email('Email do solicitante deve ser um email válido'),
  }),

  indicated: Yup.object().shape({
    name: Yup.string().required('Nome do indicado é obrigatório'),
    document: Yup.string()
      .CPFOrCNPJ('Documento do indicado deve ser um CPF ou CNPJ válido')
      .required('Documento do indicado é obrigatório'),
  }),

  message: Yup.string().required('Mensagem é obrigatória'),
});
