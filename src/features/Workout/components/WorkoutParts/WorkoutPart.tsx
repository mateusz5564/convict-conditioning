import { Outlet, useOutletContext, useParams } from "react-router-dom";

import workoutPartApi from "../../../../api/workoutPart";
import LoadingSpinner from "../../../../components/CircularProgress/CircularProgress";
import { WorkoutPart as WorkoutPartType } from "../../../../types";
import ExercisesNavigation from "../Exercises/ExercisesNavigation";

type ContextType = { workoutPartCategory: WorkoutPartType };

const WorkoutPart = () => {
  const { category } = useParams();
  const {
    data: workoutParts,
    isLoading,
    isError,
  } = workoutPartApi.useFetchWorkoutParts();

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>Error!</div>;

  const workoutPartCategory = workoutParts?.find(
    (workoutPart) => workoutPart.category === category,
  );

  return (
    <>
      <ExercisesNavigation />
      <Outlet context={{ workoutPartCategory }} />
    </>
  );
};

export const useWorkoutPartCategory = () => useOutletContext<ContextType>();
export default WorkoutPart;
