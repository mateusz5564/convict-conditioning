const getDayAndMonth = (timestamp: Date | string) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth();

  return `${day < 10 ? "0" : ""}${day}-${month < 9 ? "0" : ""}${month + 1}`;
};

const isOlderThan30Days = (timestamp: Date | string) => {
  const now = Date.now();
  const date = new Date(timestamp);
  const difference = now - date.getTime();

  return difference > 30 * 24 * 60 * 60 * 1000;
};

export { getDayAndMonth, isOlderThan30Days };
