import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { Paper, Stack } from "@mui/material";
import exerciseApi from "api/exercise";
import workoutPartApi from "api/workoutPart";
import { getNextLevelGoal } from "features/Workout/helpers";
import { ExerciseCategory } from "types";

type Props = { category: ExerciseCategory };

const NextLevel = ({ category }: Props) => {
  const { data: progressData } = exerciseApi.useFetchProgressTable();
  const { data: workoutParts } = workoutPartApi.useFetchWorkoutParts();

  if (!(workoutParts && progressData)) return null;

  const categoryExercises = workoutParts?.find(
    (workoutPart) => workoutPart.category === category,
  ).exercises;

  const categoryProgress = progressData?.[category];
  const nextLevelGoal = getNextLevelGoal(categoryExercises, categoryProgress);

  return (
    <Paper sx={{ my: 2, p: 2 }}>
      <Stack flexDirection="row" justifyContent="center" alignItems="center">
        {typeof nextLevelGoal === "string" && nextLevelGoal}
        {typeof nextLevelGoal !== "string" && (
          <>
            <UpgradeIcon /> {nextLevelGoal.name}{" "}
            <ArrowRightAltIcon sx={{ mx: 1 }} /> {nextLevelGoal.lvl}
          </>
        )}
      </Stack>
    </Paper>
  );
};

export default NextLevel;
