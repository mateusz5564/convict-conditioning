import { Outlet } from "react-router-dom";

import ExercisesNavigation from "features/Workout/components/Exercises/ExercisesNavigation";
import useWorkoutPartContext from "features/Workout/hooks/useWorkoutPartContext";

const WorkoutPart = () => {
  const { workoutPart } = useWorkoutPartContext();

  return (
    <>
      <ExercisesNavigation />
      <Outlet key={workoutPart.category} context={{ workoutPart }} />
    </>
  );
};

export default WorkoutPart;
