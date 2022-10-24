import { useLocation, useParams } from "react-router-dom";
import exerciseApi from "../../../../../api/exercise";
import LoadingSpinner from "../../../../../components/CircularProgress/CircularProgress";
import { DialogLink } from "../../../../Auth";
import AddExerciseLog from "./AddExerciseLog";
import ExerciseLog from "./ExerciseLog";
import { ExerciseCategory } from "../../../../../types";

export default function ExerciseLogs() {
  const location = useLocation();
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
      <DialogLink to="/register" backgroundLocation={location}>
        Register
      </DialogLink>
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
