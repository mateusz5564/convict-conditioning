import { useState } from "react";

import { Box, Pagination } from "@mui/material";
import exerciseApi from "api/exercise";
import LoadingSpinner from "components/CircularProgress/CircularProgress";
import OverlayLoadingSpinner from "features/Auth/components/shared/OverlayLoadingSpinner";
import { ExerciseRepsLineChart } from "features/Charts";
import AddExerciseLog from "features/Workout/components/Exercises/Logs/AddExerciseLog";
import ExerciseLog from "features/Workout/components/Exercises/Logs/ExerciseLog";
import NoLogs from "features/Workout/components/Exercises/Logs/NoLogs";
import useWorkoutPartContext from "features/Workout/hooks/useWorkoutPartContext";

const ExerciseLogs = () => {
  const { workoutPart } = useWorkoutPartContext();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const {
    data: logs,
    error,
    isError,
    isLoading,
    isFetching,
  } = exerciseApi.useFetchPaginatedExerciseLogsByCategory(
    workoutPart.category,
    page,
    pageSize,
  );

  if (isLoading) return <LoadingSpinner />;

  if (isError && error instanceof Error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div>
      <ExerciseRepsLineChart category={workoutPart.category} />
      <AddExerciseLog />

      {!logs?.count && <NoLogs />}

      {/* used Boolean to prevent showing 0 on the screen */}
      {Boolean(logs?.count) && (
        <>
          <Box sx={{ position: "relative" }}>
            {isFetching && <OverlayLoadingSpinner />}
            {logs?.data.map((log) => (
              <ExerciseLog
                key={log.id}
                exerciseLog={{
                  id: log.id,
                  created_at: log.created_at,
                  name: log.exercise.name,
                  step: log.exercise.step,
                  reps: log.reps,
                }}
              />
            ))}
          </Box>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Pagination
              sx={{ display: "inline-block", mb: 2, mt: 1 }}
              count={Math.ceil(Number(logs?.count) / pageSize)}
              onChange={(e, value) => {
                setPage(value);
              }}
            />
          </Box>
        </>
      )}
    </div>
  );
};

export default ExerciseLogs;
