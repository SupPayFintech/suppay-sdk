export const isValidCPF = (cpf: string) => {
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;

  return true;
};

export const isValidCNPJ = (cnpj: string) => {
  cnpj = cnpj.replace(/\D/g, '');

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  const calcDigits = (x: number) => {
    let sum = 0;
    let y = x - 7;
    for (let i = x; i >= 1; i--) {
      sum += parseInt(cnpj.charAt(x - i)) * y--;
      if (y < 2) y = 9;
    }
    return ((sum * 10) % 11) % 10;
  };

  return (
    calcDigits(12) === parseInt(cnpj.charAt(12)) &&
    calcDigits(13) === parseInt(cnpj.charAt(13))
  );
};

export const isValidCPFOrCNPJ = (value: string) => {
  const cleanValue = value.replace(/\D/g, '');
  return isValidCPF(cleanValue) || isValidCNPJ(cleanValue);
};
