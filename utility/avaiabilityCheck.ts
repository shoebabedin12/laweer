export const getTodayAvailabilityStatus = (availability: string[] = []) => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  return {
    today,
    isAvailable: Array.isArray(availability) && availability.includes(today),
  };
};
