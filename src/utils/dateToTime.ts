export const DateToAMAndPM = (date: number | string) => {
  const dateObj = new Date(date);
  const time = Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(dateObj);
  return time;
};
