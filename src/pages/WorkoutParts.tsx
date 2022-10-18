import { Route, Routes } from "react-router-dom";
import { WorkoutPartNavigation, WorkoutPart } from "../features/Workout";

export default function WorkoutParts() {
  return (
    <>
      <WorkoutPartNavigation />
      <Routes>
        <Route path="/:category/*" element={<WorkoutPart />} />
      </Routes>
    </>
  );
}
