import { Paper } from "@mui/material";
import exerciseApi from "api/exercise";
import workoutPartApi from "api/workoutPart";
import LoadingSpinner from "components/CircularProgress/CircularProgress";

import WorkoutPartProgressRadialBar from "./WorkoutPartProgressRadialBar";

const WorkoutPartProgressCharts = () => {
  const {
    data: workoutPartsData,
    isLoading: workoutPartsIsLoading,
    isError: workoutPartsIsError,
  } = workoutPartApi.useFetchWorkoutParts();
  const {
    data: progressData,
    isLoading: progressIsLoading,
    isError: progressIsError,
  } = exerciseApi.useFetchProgressTable();

  const progressChartData =
    workoutPartsData &&
    progressData &&
    workoutPartsData?.map((workoutPart) => {
      const categoryProgress = progressData[workoutPart.category];

      return {
        id: workoutPart.category,
        data: [
          {
            x: workoutPart.category,
            y: categoryProgress
              ? Math.round(
                  ((categoryProgress.exercise_step * 3 +
                    categoryProgress.exercise_lvl_reached) /
                    33) *
                    100,
                )
              : 0,
          },
        ],
      };
    });

  if (workoutPartsIsLoading || progressIsLoading) return <LoadingSpinner />;

  if (workoutPartsIsError || progressIsError) return <div>Error!</div>;

  return (
    <Paper
      sx={{
        mt: 2,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {progressChartData?.map((progress) => (
        <WorkoutPartProgressRadialBar
          key={progress.id}
          workoutProgress={progress}
        />
      ))}
    </Paper>
  );
};

export default WorkoutPartProgressCharts;
