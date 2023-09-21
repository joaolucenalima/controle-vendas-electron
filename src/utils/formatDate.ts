import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function formatDateToISO(date: Date) {
  return dayjs(date).format("YYYY-MM-DD")
}

export function formatDateToLocale(date: string) {
  return dayjs.utc(date).format("DD/MM/YYYY")
}