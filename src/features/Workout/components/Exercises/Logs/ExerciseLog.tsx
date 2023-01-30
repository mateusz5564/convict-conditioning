import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import exerciseApi from "api/exercise";
import DeleteButtonWithModal from "components/Buttons/DeleteButtonWithModal";
import { getDayAndMonth } from "utils/date";

interface Props {
  exerciseLog: {
    id: number;
    created_at: string;
    name: string;
    step: number;
    reps: number[];
  };
}

const ExerciseLog = ({ exerciseLog }: Props) => {
  const { mutate } = exerciseApi.useDeleteExerciseLog();

  const handleDelete = () => {
    mutate(exerciseLog.id);
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: 2,
        mb: 1,
      }}
    >
      <Stack mr={2}>
        <Typography variant="h6" sx={{ wordBreak: "break-word" }}>
          {exerciseLog.name} - {exerciseLog.step}
        </Typography>
        <Stack direction="row" sx={{ mt: 1 }}>
          <Typography sx={{ flexShrink: 0 }}>
            {exerciseLog.reps.length} reps
          </Typography>
          <ArrowRightAltIcon sx={{ mx: 1 }} />
          <Typography>{exerciseLog.reps.join(", ")}</Typography>
        </Stack>
      </Stack>
      <Stack justifyContent="space-between" alignItems="flex-end">
        <Typography variant="caption">
          {getDayAndMonth(exerciseLog.created_at)}
        </Typography>
        <DeleteButtonWithModal
          description="Do you really want to delete this exercise log?"
          handleDelete={handleDelete}
        />
      </Stack>
    </Paper>
  );
};

export default ExerciseLog;
