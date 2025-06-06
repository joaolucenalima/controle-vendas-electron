export function maskCurrency(event: React.FormEvent<HTMLInputElement>) {
  const cleanedValue = event.currentTarget.value.replace(/\D/g, '');
  const integerValue = parseInt(cleanedValue, 10) / 100;

  if (isNaN(integerValue)) {
    event.currentTarget.value = "R$ 0,00";
    event.preventDefault();
    return;
  }

  event.currentTarget.value = integerValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  event.preventDefault();
}