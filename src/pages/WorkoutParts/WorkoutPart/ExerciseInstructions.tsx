import { Box } from "@mui/material";
import ExerciseInstruction from "features/Workout/components/Exercises/Instructions/ExerciseInstruction";
import useWorkoutPartContext from "features/Workout/hooks/useWorkoutPartContext";
import { Exercise } from "types";

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
