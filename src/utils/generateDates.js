import { numberOfDaysInEachWeek } from "../constants";

export const generateDates = (start, items) => {
  const localDates = [];
  for (let i = 0; i < numberOfDaysInEachWeek; i++) {
    const date = new Date(start);
    date.setDate(date?.getDate() + i);
    localDates.push({
      dateToDisplay: date?.toLocaleDateString("el-GR", {
        weekday: "short",
        month: "numeric",
        day: "numeric",
      }),
      accepts: Object.values(items || {}).map((itm) => itm.id?.toString()),
    });
  }
  return localDates;
};
