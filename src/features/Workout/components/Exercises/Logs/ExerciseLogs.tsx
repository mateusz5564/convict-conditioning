import exerciseApi from "api/exercise";
import LoadingSpinner from "components/CircularProgress/CircularProgress";
import { ExerciseRepsLineChart } from "features/Charts";
import { ExerciseCategory } from "types";

import useWorkoutPartContext from "../../../hooks/useWorkoutPartContext";
import AddExerciseLog from "./AddExerciseLog";
import ExerciseLog from "./ExerciseLog";
import NoLogs from "./NoLogs";

const ExerciseLogs = () => {
  const { workoutPart } = useWorkoutPartContext();
  const {
    data: logs,
    error,
    isError,
    isLoading,
  } = exerciseApi.useFetchExericeLogs(workoutPart.category as ExerciseCategory);

  if (isLoading) return <LoadingSpinner />;

  if (isError && error instanceof Error) {
    return (
      <div>
        Error!
        {error.message}
      </div>
    );
  }

  return (
    <div>
      {logs && <ExerciseRepsLineChart workoutPartLogs={logs} />}
      <AddExerciseLog />
      {logs?.length === 0 && <NoLogs />}
      {logs?.map((log) => (
        <ExerciseLog
          key={log.id}
          exerciseLog={{
            created_at: log.created_at,
            name: log.exercise.name,
            step: log.exercise.step,
            reps: log.reps,
          }}
        />
      ))}
    </div>
  );
};

export default ExerciseLogs;
