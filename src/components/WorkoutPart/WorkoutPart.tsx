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

import { useWorkoutParts } from "../../context/WorkoutPart/WorkoutPart";
import ExerciseInstructions from "../Exercise/ExerciseInstructions";
import ExerciseLogs from "../Exercise/ExerciseLogs";

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
  const context = useWorkoutParts();
  const navigate = useNavigate();

  const workoutPart = context?.workoutParts.find(workoutPart => workoutPart.category === category);

  useEffect(() => {
    setValue(getNavIndex());
  }, [location, getNavIndex]);

  if (!workoutPart) {
    return <div>Loading...</div>;
  }

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
              {workoutPart.exercises.map(exercise => (
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
