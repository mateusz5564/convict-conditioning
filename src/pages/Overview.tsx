import exerciseApi from "api/exercise";
import LoadingSpinner from "components/CircularProgress/CircularProgress";
import HashMesssage from "components/HashMessage/HashMessage";
import SnackbarAlert from "components/SnackbarAlert/SnackbarAlert";
import { RepsCalendarChart, WorkoutPartProgressCharts } from "features/Charts";

const Overview = () => {
  const { data, isError, isLoading } = exerciseApi.useFetchExerciseLogsPerDay();

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>Error!</div>;

  return (
    <>
      <HashMesssage>
        {(hashMessage) => (
          <SnackbarAlert isOpen={Boolean(hashMessage)} severity="info">
            {hashMessage}
          </SnackbarAlert>
        )}
      </HashMesssage>
      {data && <RepsCalendarChart exerciseLogs={data} />}
      <WorkoutPartProgressCharts />
    </>
  );
};

export default Overview;
