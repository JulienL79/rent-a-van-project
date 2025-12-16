export const formatLongDateFr = (rawDate: string): string => {
  const date = new Date(rawDate.replace(" ", "T"));
  const formatted = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const formatShortDateFr = (rawDate: Date | string): string => {
  let date: Date;

  if (rawDate instanceof Date) {
    date = rawDate;
  } else {
    date = new Date(rawDate.replace(" ", "T"));
  }

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
