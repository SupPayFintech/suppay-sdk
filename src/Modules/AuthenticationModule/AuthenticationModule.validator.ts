import Yup from '../../Helper/Yup';

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .CPFOrCNPJ('O documento deve ser um CPF ou CNPJ válido')
    .required('Documento é obrigatório'),

  password: Yup.string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .max(16, 'A senha não pode ter mais de 16 caracteres')
    .required('Senha é obrigatória'),
});
