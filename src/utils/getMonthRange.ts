import dayjs from 'dayjs';

const monthNameToNumber = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
];

export function getMonthRange(selectedDate: string) {

  const [monthName, yearString] = selectedDate.split(' de ')

  const monthNumber = monthNameToNumber.findIndex(month => month === monthName);

  const yearNumber = parseInt(yearString)

  const firstDay = dayjs().year(yearNumber).month(monthNumber).startOf('month').format()
  const lastDay = dayjs().year(yearNumber).month(monthNumber).endOf('month').format()

  return { firstDay, lastDay }
}