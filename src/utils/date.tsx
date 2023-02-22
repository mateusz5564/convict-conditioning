const getDayAndMonth = (timestamp: Date | string) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
  });
  const date = new Date(timestamp);
  return formatter.format(date);
};

const isOlderThan30Days = (timestamp: Date | string) => {
  const now = Date.now();
  const date = new Date(timestamp);
  const difference = now - date.getTime();

  return difference > 30 * 24 * 60 * 60 * 1000;
};

const getDaysBefore = (numOfDays: number) => {
  const now = new Date();
  const from = new Date(now.getTime() - numOfDays * (24 * 60 * 60 * 1000));

  return from;
};

export { getDayAndMonth, getDaysBefore, isOlderThan30Days };
