import { Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { formatExerciseDate } from "../../utils/date";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

interface Props {
  exerciseLog: { created_at: Date; name: string; step: number; reps: number[] };
}

export default function ExerciseLog({ exerciseLog }: Props) {
  return (
    <Paper sx={{ padding: 1, mb: 1 }}>
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography variant="h6">
          {exerciseLog.name} - {exerciseLog.step}
        </Typography>
        <Typography variant="caption">{formatExerciseDate(exerciseLog.created_at)}</Typography>
      </Stack>
      <Stack flexDirection="row" alignItems="center" sx={{ mt: 1 }}>
        <Typography sx={{ flexShrink: 0, alignSelf: "flex-start" }}>
          {exerciseLog.reps.length} reps
        </Typography>
        <ArrowRightAltIcon sx={{ mx: 1, alignSelf: "flex-start" }} />
        <Stack>
          <Typography>{exerciseLog.reps.join(" ")}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
