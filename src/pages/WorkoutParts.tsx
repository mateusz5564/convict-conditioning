import { Outlet } from "react-router-dom";

import { WorkoutPartNavigation } from "../features/Workout";

const WorkoutParts = () => {
  return (
    <>
      <WorkoutPartNavigation />
      <Outlet />
    </>
  );
};

export default WorkoutParts;
