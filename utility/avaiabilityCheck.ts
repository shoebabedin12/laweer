export const getTodayAvailabilityStatus = (availableDays: string[]) => {
  const weekday = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];
  const today = weekday[new Date().getDay()];
  const isAvailable = availableDays?.includes(today);
  return { today, isAvailable };
};
