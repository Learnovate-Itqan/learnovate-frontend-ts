export const DateToAMAndPM = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date);
  }
  const time = Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
  return time;
};
