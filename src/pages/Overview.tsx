import exerciseApi from "api/exercise";
import LoadingSpinner from "components/CircularProgress/CircularProgress";
import { RepsCalendarChart, WorkoutPartProgressCharts } from "features/Charts";

const Overview = () => {
  const { data, isError, isLoading } = exerciseApi.useFetchExerciseLogsPerDay();

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>Error!</div>;

  return (
    <>
      {data && <RepsCalendarChart exerciseLogs={data} />}
      <WorkoutPartProgressCharts />
    </>
  );
};

export default Overview;
