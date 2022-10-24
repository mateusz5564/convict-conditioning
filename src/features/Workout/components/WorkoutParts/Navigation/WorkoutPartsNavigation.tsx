import { Grid } from "@mui/material";

import workoutPartApi from "../../../../../api/workoutPart";
import WorkoutPartLink from "./WorkoutPartsLink";

export default function WorkoutPartNavigation() {
  const { data: workoutParts, isError } = workoutPartApi.useFetchWorkoutParts();

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {workoutParts?.map(workoutPart => (
        <Grid item xs={4} key={workoutPart.id}>
          <WorkoutPartLink to={`${workoutPart.category}/logs`}>
            {workoutPart.category}
          </WorkoutPartLink>
        </Grid>
      ))}
    </Grid>
  );
}
