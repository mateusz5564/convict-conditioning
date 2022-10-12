import { Route, Routes } from "react-router-dom";
import WorkoutPart from "../components/WorkoutPart/WorkoutPart";
import WorkoutPartNavigation from "../components/WorkoutPart/WorkoutPartNavigation";

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
