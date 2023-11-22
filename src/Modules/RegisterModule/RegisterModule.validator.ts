// Enum values for RegisterDocumentType
import Yup from '../../Helper/Yup';
import { RegisterDocumentType } from './RegisterModule.type';

const registerDocumentTypeValues = Object.values(RegisterDocumentType);

export const createRegisterDataSchema = Yup.object().shape({
  document: Yup.string()
    .CPFOrCNPJ('Documento deve ser um CPF ou CNPJ válido')
    .required('Documento é obrigatório'),

  phone: Yup.string()
    .required('Telefone é obrigatório')
    .matches(
      /^(\+\d{1,3})?\d{10,11}$/,
      'Telefone deve estar em um formato válido',
    ),

  password: Yup.string()
    .required('Senha é obrigatória')
    .min(8, 'A senha deve ter pelo menos 8 caracteres'),

  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas devem corresponder')
    .required('Confirmação de senha é obrigatória'),

  documents: Yup.object().shape({
    document_type: Yup.mixed()
      .oneOf(registerDocumentTypeValues, 'Tipo de documento inválido')
      .required('Tipo de documento é obrigatório'),

    document_front: Yup.string().required('Frente do documento é obrigatória'),

    document_back: Yup.string().required('Verso do documento é obrigatório'),

    selfie: Yup.string().required('Selfie é obrigatória'),
  }),
});

export const approveRegisterDataSchema = Yup.object().shape({
  user: Yup.object().shape({
    document: Yup.string()
      .CPFOrCNPJ('Documento do usuário deve ser um CPF ou CNPJ válido')
      .required('Documento do usuário é obrigatório'),
    name: Yup.string().required('Nome do usuário é obrigatório'),
  }),

  instance: Yup.object().shape({
    document: Yup.string()
      .CPFOrCNPJ('Documento da instância deve ser um CPF ou CNPJ válido')
      .required('Documento da instância é obrigatório'),
    name: Yup.string().required('Nome da instância é obrigatório'),
  }),

  submittedDocumentsAreReliable: Yup.boolean().required(
    'A confiabilidade dos documentos submetidos deve ser indicada',
  ),

  informationMatchesTheDocumentsSent: Yup.boolean().required(
    'A correspondência das informações com os documentos enviados deve ser indicada',
  ),
});
