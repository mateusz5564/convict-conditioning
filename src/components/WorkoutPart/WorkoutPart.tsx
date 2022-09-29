import { useCallback, useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  Routes,
  Route,
  useMatch,
  Navigate,
  useLocation,
} from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import ExerciseInstructions from "../Exercise/ExerciseInstructions";
import ExerciseLogs from "../Exercise/ExerciseLogs";
import workoutPartApi from "../../api/workoutPart";
import { Exercise } from "../../types";
import LoadingSpinner from "../CircularProgress/CircularProgress";

export default function WorkoutPart() {
  const matchInstructions = useMatch("/workout-parts/:category/instructions");
  const getNavIndex = useCallback(() => {
    if (matchInstructions) {
      return 1;
    } else {
      return 0;
    }
  }, [matchInstructions]);

  const location = useLocation();
  const [value, setValue] = useState(getNavIndex());
  const { category } = useParams();
  const navigate = useNavigate();
  const { data: workoutParts, isLoading, isError } = workoutPartApi.useFetchWorkoutParts();

  useEffect(() => {
    setValue(getNavIndex());
  }, [location, getNavIndex]);

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>Error!</div>;

  const workoutPartCategory = workoutParts?.find(workoutPart => workoutPart.category === category);

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper", my: "12px" }}>
        <Tabs
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          centered
        >
          <Tab label="Logs" onClick={() => navigate("logs")} />
          <Tab label="Instructions" onClick={() => navigate("instructions")} />
        </Tabs>
      </Box>

      <Routes>
        <Route path="logs" element={<ExerciseLogs />} />
        <Route
          path="instructions"
          element={
            <Box sx={{ pb: "12px" }}>
              {workoutPartCategory.exercises.map((exercise: Exercise) => (
                <ExerciseInstructions key={exercise.id} exercise={exercise} />
              ))}
            </Box>
          }
        />
        <Route path="*" element={<Navigate to="logs" replace={true} />} />
      </Routes>
    </>
  );
}
