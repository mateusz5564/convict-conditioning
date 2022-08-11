import { Route, Routes } from "react-router-dom";
import { Divider, Typography } from "@mui/material";
import WorkoutPart from "../components/WorkoutPart/WorkoutPart";
import WorkoutPartNavigation from "../components/WorkoutPart/WorkoutPartNavigation";

export default function WorkoutParts() {

  return (
    <>
      <Typography variant="h5" component="h1" sx={{ mb: "16px" }} textAlign="center">
        Workout Parts
      </Typography>
      
      <WorkoutPartNavigation />

      <Divider />

      <Routes>
        <Route path="/:category/*" element={<WorkoutPart />} />
      </Routes>
    </>
  );
}
