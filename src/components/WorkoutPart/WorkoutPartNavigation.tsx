import { Grid } from "@mui/material";
import { useWorkoutParts } from "../../context/WorkoutPart/WorkoutPart";
import WorkoutPartLink from "./WorkoutPartLink";

export default function WorkoutPartNavigation() {
  const context = useWorkoutParts();

  return (
    <Grid container spacing={2} sx={{ mb: "12px" }}>
      {context?.workoutParts &&
        context.workoutParts.map(workoutPart => (
          <Grid item xs={4} key={workoutPart.id}>
            <WorkoutPartLink to={`${workoutPart.category}/logs`}>{workoutPart.category}</WorkoutPartLink>
          </Grid>
        ))}
    </Grid>
  );
}
