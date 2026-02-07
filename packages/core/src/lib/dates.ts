type OptionalDate = Date | undefined;

export const getEarliestDate = (dates: OptionalDate[]): Date | undefined => {
  const filtered: Date[] = dates.filter((date): date is Date => Boolean(date));
  if (filtered.length === 0) return undefined;

  return filtered.reduce((earliest: Date, date: Date) => {
    return date < earliest ? date : earliest;
  }, filtered[0]);
};
