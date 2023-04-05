import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

export function getMonthsUntilNow(date: dayjs.ConfigType): string[] {

  let year = dayjs(date).year()
  let month = dayjs(date).month();

  const currentMonth = dayjs().month();
  const currentYear = dayjs().year()

  const months = [];

  while (year < currentYear || (year === currentYear && month <= currentMonth)) {

    const currentDate = dayjs(new Date(year, month));

    months.push(currentDate.locale('pt-br').format('MMMM [de] YYYY'));

    month++;

    if (month > 11) {
      year++;
      month = 0;
    }

  }
  return months;
}
