import WorkoutPartNavigation from "../components/WorkoutPart/WorkoutPartNavigation";
import { Typography } from "@mui/material";
import WorkoutPart from "../components/WorkoutPart/WorkoutPart";
import { Route, Routes } from "react-router-dom";

export default function WorkoutParts() {
  return (
    <>
      <Typography variant="h5" component="h1" sx={{ mb: "16px" }}>
        Workout Parts
      </Typography>
      <WorkoutPartNavigation />
      <Routes>
        <Route path="/:category" element={<WorkoutPart />} />
      </Routes>
    </>
  );
}
