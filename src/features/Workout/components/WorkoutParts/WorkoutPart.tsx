import { Outlet } from "react-router-dom";

import useWorkoutPartContext from "../../hooks/useWorkoutPartContext";
import ExercisesNavigation from "../Exercises/ExercisesNavigation";

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
