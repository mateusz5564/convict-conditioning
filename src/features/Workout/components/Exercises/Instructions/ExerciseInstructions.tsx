import { Box } from "@mui/material";
import { Exercise } from "../../../../../types";
import { useWorkoutPartCategory } from "../../WorkoutParts/WorkoutPart";
import ExerciseInstruction from "./ExerciseInstruction";

const ExerciseInstructions = () => {
  const { workoutPartCategory } = useWorkoutPartCategory();

  return (
    <Box sx={{ pb: "12px" }}>
      {workoutPartCategory.exercises.map((exercise: Exercise) => (
        <ExerciseInstruction key={exercise.id} exercise={exercise} />
      ))}
    </Box>
  );
};

export default ExerciseInstructions;
