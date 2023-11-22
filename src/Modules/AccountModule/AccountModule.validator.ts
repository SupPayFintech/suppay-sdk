import Yup from '../../Helper/Yup';

export const resetPasswordSchema = Yup.object().shape({
  identifier: Yup.string().required('O campo de identificação é obrigatório'),
  password: Yup.string()
    .min(8, 'A senha deve conter pelo menos 8 caracteres')
    .required('O campo de senha é obrigatório'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas não correspondem')
    .required('A confirmação de senha é obrigatória'),
});

export const validateRecoverySchema = Yup.object().shape({
  code: Yup.string().required('Code is required'),
  document: Yup.string().required('Document is required'),
});

export const verifyRecoverySchema = Yup.object().shape({
  document: Yup.string().CPFOrCNPJ().required('Document is required'),
});
