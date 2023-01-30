import { LatestExerciseLogLastMonth } from "types";

const getChartData = (
  workoutPartLogs: Array<LatestExerciseLogLastMonth> | undefined,
) => {
  if (!workoutPartLogs || workoutPartLogs.length < 2) return [];

  const data = workoutPartLogs.map((log) => ({
    x: log.created_at.substring(0, 10),
    y: log.reps.reduce((prev, curr) => prev + curr),
  }));

  return [
    {
      id: "exercise",
      data,
    },
  ];
};

// eslint-disable-next-line import/prefer-default-export
export { getChartData };
