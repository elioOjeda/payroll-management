export const formatDateToUTC = (date: Date) => {
  return date.toLocaleString("en-US", { timeZone: "UTC" });
};
