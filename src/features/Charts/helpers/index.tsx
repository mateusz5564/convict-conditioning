import { ExerciseLog } from "types";
import { isOlderThan30Days } from "utils/date";

type GroupedLogs = { [key: string]: { date: string; totalReps: number } };

const groupByDay = (workoutPartLogs: Array<ExerciseLog>) => {
  const groupedLogs: GroupedLogs = {};

  workoutPartLogs.forEach((log) => {
    const logDate = log.created_at.substring(0, 10);
    const groupedLog = groupedLogs[logDate];

    if (groupedLog) {
      groupedLog.totalReps += log.reps.reduce((prev, curr) => prev + curr);
    } else {
      groupedLogs[logDate] = {
        date: logDate,
        totalReps: log.reps.reduce((prev, curr) => prev + curr),
      };
    }
  });

  return groupedLogs;
};

const getChartData = (workoutPartLogs: Array<ExerciseLog>) => {
  if (workoutPartLogs.length < 2) return [];

  const recentExerciseId = workoutPartLogs[0].exercise.id;
  const recentExerciseLogs = workoutPartLogs?.filter(
    (log) =>
      log.exercise.id === recentExerciseId &&
      !isOlderThan30Days(log.created_at),
  );

  const groupedByDay = groupByDay(recentExerciseLogs);

  const data = Object.entries(groupedByDay).map(([, value]) => ({
    x: value.date,
    y: value.totalReps,
  }));

  return [
    {
      id: "exercise",
      data,
    },
  ];
};

export { getChartData, groupByDay };
