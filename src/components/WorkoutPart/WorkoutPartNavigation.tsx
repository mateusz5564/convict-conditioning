import { Grid } from "@mui/material";

import workoutPartApi from "../../api/workoutPart";
import LoadingSpinner from "../CircularProgress/CircularProgress";
import WorkoutPartLink from "./WorkoutPartLink";

export default function WorkoutPartNavigation() {
  const { data: workoutParts, isLoading, isError } = workoutPartApi.useFetchWorkoutParts();

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
