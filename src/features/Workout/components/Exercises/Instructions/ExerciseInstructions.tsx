import { Box } from "@mui/material";
import { Exercise } from "types";

import useWorkoutPartContext from "../../../hooks/useWorkoutPartContext";
import ExerciseInstruction from "./ExerciseInstruction";

const ExerciseInstructions = () => {
  const { workoutPart } = useWorkoutPartContext();

  return (
    <Box sx={{ pb: "12px" }}>
      {workoutPart.exercises.map((exercise: Exercise) => (
        <ExerciseInstruction key={exercise.id} exercise={exercise} />
      ))}
    </Box>
  );
};

export default ExerciseInstructions;
