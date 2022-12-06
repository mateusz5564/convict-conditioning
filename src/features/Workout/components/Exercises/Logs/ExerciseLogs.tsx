import { useState } from "react";

import { Box, Pagination } from "@mui/material";
import exerciseApi from "api/exercise";
import LoadingSpinner from "components/CircularProgress/CircularProgress";
import OverlayLoadingSpinner from "features/Auth/components/shared/OverlayLoadingSpinner";
import { ExerciseRepsLineChart } from "features/Charts";
import { ExerciseCategory } from "types";

import useWorkoutPartContext from "../../../hooks/useWorkoutPartContext";
import AddExerciseLog from "./AddExerciseLog";
import ExerciseLog from "./ExerciseLog";
import NoLogs from "./NoLogs";

const ExerciseLogs = () => {
  const { workoutPart } = useWorkoutPartContext();
  const [page, setPage] = useState(1);
  const {
    data: logs,
    error,
    isError,
    isLoading,
    isFetching,
  } = exerciseApi.useFetchPaginatedExerciseLogsByCategory(
    workoutPart.category as ExerciseCategory,
    page,
  );

  if (isLoading) return <LoadingSpinner />;

  if (isError && error instanceof Error) {
    return (
      <div>
        Error!
        {error.message}
      </div>
    );
  }

  return (
    <div>
      <ExerciseRepsLineChart category={workoutPart.category} />
      <AddExerciseLog />

      {!logs?.count && <NoLogs />}

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
              count={Math.ceil(Number(logs?.count) / 2)}
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
