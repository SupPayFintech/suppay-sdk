import Yup from '../../Helper/Yup';

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .CPFOrCNPJ('O nome de usuário deve ser um CPF ou CNPJ válido')
    .required('Nome de usuário é obrigatório'),

  password: Yup.string()
    .required('Senha é obrigatória')
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'A senha deve conter pelo menos uma letra e um número',
    ),
});
