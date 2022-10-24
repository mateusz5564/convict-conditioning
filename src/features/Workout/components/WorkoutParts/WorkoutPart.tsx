import { useOutletContext, useParams } from "react-router-dom";
import workoutPartApi from "../../../../api/workoutPart";
import LoadingSpinner from "../../../../components/CircularProgress/CircularProgress";
import { Outlet } from "react-router-dom";
import ExercisesNavigation from "../Exercises/ExercisesNavigation";
import { WorkoutPart as WorkoutPartType } from "../../../../types";

type ContextType = { workoutPartCategory: WorkoutPartType };

export default function WorkoutPart() {
  const { category } = useParams();
  const { data: workoutParts, isLoading, isError } = workoutPartApi.useFetchWorkoutParts();

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>Error!</div>;

  const workoutPartCategory = workoutParts?.find(workoutPart => workoutPart.category === category);

  return (
    <>
      <ExercisesNavigation />
      <Outlet context={{ workoutPartCategory }} />
    </>
  );
}

export const useWorkoutPartCategory = () => useOutletContext<ContextType>();
