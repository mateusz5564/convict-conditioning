import { useLocation } from "react-router-dom";

import exerciseApi from "api/exercise";
import LoadingSpinner from "components/CircularProgress/CircularProgress";
import SnackbarAlert from "components/SnackbarAlert/SnackbarAlert";
import { RepsCalendarChart, WorkoutPartProgressCharts } from "features/Charts";
import { getHashMessage } from "helpers";

const Overview = () => {
  const { data, isError, isLoading } = exerciseApi.useFetchExerciseLogsPerDay();
  const location = useLocation();

  const hashMessage = getHashMessage(location.hash);

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>Error!</div>;

  return (
    <>
      {hashMessage && (
        <SnackbarAlert isOpen={Boolean(hashMessage)} severity="info">
          {hashMessage}
        </SnackbarAlert>
      )}
      {data && <RepsCalendarChart exerciseLogs={data} />}
      <WorkoutPartProgressCharts />
    </>
  );
};

export default Overview;
