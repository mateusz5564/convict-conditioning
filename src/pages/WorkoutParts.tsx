import { Outlet } from "react-router-dom";
import { WorkoutPartNavigation } from "../features/Workout";

export default function WorkoutParts() {
  return (
    <>
      <WorkoutPartNavigation />
      <Outlet />
    </>
  );
}
