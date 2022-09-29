import { useParams } from "react-router-dom";
import exerciseApi from "../../api/exercise";
import { ExerciseCategory } from "../../types";
import LoadingSpinner from "../CircularProgress/CircularProgress";
import AddExerciseLog from "./AddExerciseLog";
import ExerciseLog from "./ExerciseLog";

export default function ExerciseLogs() {
  const { category } = useParams();
  const {
    data: logs,
    error,
    isError,
    isLoading,
  } = exerciseApi.useFetchExericeLogs(category as ExerciseCategory);

  if (isLoading) return <LoadingSpinner />;

  if (isError && error instanceof Error) return <div>Error! {error.message}</div>;

  return (
    <div>
      <AddExerciseLog />
      {logs?.map(log => (
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
}
