import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import exerciseApi from "api/exercise";
import DeleteButton from "components/Buttons/DeleteButton";
import { getDayAndMonth } from "utils/date";

interface Props {
  exerciseLog: {
    id: string;
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
        <DeleteButton
          description="Do you really want to delete this exercise log?"
          handleDelete={handleDelete}
        />
      </Stack>
    </Paper>
  );
};

export default ExerciseLog;
