import { subMonths, subWeeks, subYears } from "date-fns";

export function filterByPeriods(period?: string) {
  let initialDate: Date;

  switch (period) {
    case "1W":
      initialDate = subWeeks(new Date(), 1);
      break;
    case "1M":
      initialDate = subMonths(new Date(), 1);
      break;
    case "2M":
      initialDate = subMonths(new Date(), 2);
      break;
    case "3M":
      initialDate = subMonths(new Date(), 3);
      break;
    case "6M":
      initialDate = subMonths(new Date(), 6);
      break;
    case "1Y":
      initialDate = subYears(new Date(), 1);
      break;
    default:
      initialDate = new Date();
  }

  return {
    initialDate: initialDate,
    endDate: new Date(),
  };
}
