import WorkoutPartNavigation from "../components/WorkoutPart/WorkoutPartNavigation";
import { Typography } from "@mui/material";
import { WorkoutPart } from "../types";

interface Props {
  workoutParts: WorkoutPart[] | undefined;
}

export default function WorkoutParts({ workoutParts }: Props) {
  return (
    <>
      <Typography variant="h5" component="h1">
        Workout Parts
      </Typography>
      {workoutParts && <WorkoutPartNavigation workoutParts={workoutParts} />}
    </>
  );
}
