import Typography from "@mui/material/Typography";
import exerciseApi from "api/exercise";
import LoadingSpinner from "components/CircularProgress/CircularProgress";
import { RepsCalendarChart, WorkoutPartProgressCharts } from "features/Charts";

const Overview = () => {
  const { data, isError, isLoading } = exerciseApi.useFetchExerciseLogsPerDay();

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>Error!</div>;

  return (
    <>
      <Typography variant="h5" component="h1" mb={2} textAlign="center">
        Work in progress...
      </Typography>
      {data && <RepsCalendarChart exerciseLogs={data} />}
      <WorkoutPartProgressCharts />
    </>
  );
};

export default Overview;
