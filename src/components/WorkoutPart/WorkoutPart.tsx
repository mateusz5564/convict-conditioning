import { useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import { useWorkoutParts } from "../../context/WorkoutPart/WorkoutPart";

export default function WorkoutPart() {
  const { category } = useParams();
  const context = useWorkoutParts();

  const workoutPart = context?.workoutParts.find(workoutPart => workoutPart.category === category);

  return (
    <Typography variant="h6" component="h2">
      {workoutPart && workoutPart.category}
      {workoutPart && (
        <ul>
          {workoutPart.exercises.map(exercise => (
            <li>{exercise.name}</li>
          ))}
        </ul>
      )}
    </Typography>
  );
}
