import { Grid } from "@mui/material";
import { WorkoutPart } from "../../types";
import WorkoutPartLink from "./WorkoutPartLink";

interface Props {
  workoutParts: WorkoutPart[];
}

export default function WorkoutPartNavigation({ workoutParts }: Props) {
  return (
    <Grid container spacing={2}>
      {workoutParts.map(workoutPart => (
        <Grid item xs={4} key={workoutPart.id}>
          <WorkoutPartLink>{workoutPart.category}</WorkoutPartLink>
        </Grid>
      ))}
    </Grid>
  );
}
