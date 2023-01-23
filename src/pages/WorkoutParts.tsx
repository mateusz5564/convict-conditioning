import { Navigate, Outlet, useParams } from "react-router-dom";

import workoutPartApi from "api/workoutPart";
import LoadingSpinner from "components/CircularProgress/CircularProgress";
import { WorkoutPartsNavigation } from "features/Workout";

const WorkoutParts = () => {
  const { category } = useParams();
  const {
    data: workoutParts,
    isLoading,
    isError,
  } = workoutPartApi.useFetchWorkoutParts();

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>Error!</div>;

  if (!category) {
    return <Navigate to="pushups/logs" />;
  }

  const workoutPart =
    workoutParts?.find((workout) => workout.category === category) ||
    "category-not-found";

  if (workoutPart === "category-not-found") {
    return <div>Category "{category}" not found</div>;
  }

  return (
    <>
      {workoutParts && (
        <WorkoutPartsNavigation
          workoutParts={workoutParts}
          workoutPart={workoutPart}
        />
      )}
      <Outlet context={{ workoutPart }} />
    </>
  );
};

export default WorkoutParts;
