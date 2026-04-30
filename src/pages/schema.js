import * as yup from 'yup';

export const schema = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  senha: yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  confirmarSenha: yup.string().oneOf([yup.ref('senha'), null], 'Senhas não coincidem').required('Confirmação de senha é obrigatória'),
});