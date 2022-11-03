const formatExerciseDate = (timestamp: Date) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth();

  return `${day < 10 ? "0" : ""}${day}-${month < 10 ? "0" : ""}${month}`;
};

// eslint-disable-next-line import/prefer-default-export
export { formatExerciseDate };
