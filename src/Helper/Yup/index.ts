import * as Yup from 'yup';
import PT from './locale';
import { isValidCNPJ, isValidCPF, isValidCPFOrCNPJ } from './extra/document';

Yup.setLocale(PT);

Yup.addMethod(Yup.string, 'cpf', function (message) {
  return this.test('cpf', message, function (value) {
    const { path, createError } = this;
    return (value && isValidCPF(value)) || createError({ path, message });
  });
});

Yup.addMethod(Yup.string, 'cnpj', function (message) {
  return this.test('cnpj', message, function (value) {
    const { path, createError } = this;
    return (value && isValidCNPJ(value)) || createError({ path, message });
  });
});

Yup.addMethod(Yup.string, 'CPFOrCNPJ', function (message) {
  return this.test('CPFOrCNPJ', message, function (value) {
    const { path, createError } = this;
    return (value && isValidCPFOrCNPJ(value)) || createError({ path, message });
  });
});

export default Yup;
