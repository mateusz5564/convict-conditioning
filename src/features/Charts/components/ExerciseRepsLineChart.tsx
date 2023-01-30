import InsightsIcon from "@mui/icons-material/Insights";
import { Box, Paper, Typography } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import exerciseApi from "api/exercise";
import LoadingSpinner from "components/CircularProgress/CircularProgress";
import { ExerciseCategory } from "types";

import { getChartData } from "../helpers";
import useChartTheme from "../theme";

type Props = { category: ExerciseCategory };

const LineChart = ({ category }: Props) => {
  const chartTheme = useChartTheme();
  const {
    data: latestExerciseLogs,
    isLoading,
    error,
    isError,
  } = exerciseApi.useFetchLatestExerciseLogsLastMonth(category);

  if (isLoading) return <LoadingSpinner />;

  if (isError && error instanceof Error) {
    return (
      <div>
        Error!
        {error.message}
      </div>
    );
  }

  const chartData = getChartData(latestExerciseLogs);

  if (!chartData.length || chartData[0]?.data.length < 2) {
    return (
      <Paper
        elevation={2}
        sx={{ padding: 2, pb: 0, mb: 2, textAlign: "center" }}
      >
        <Typography sx={{ display: "block" }} variant="caption">
          We need min 2 logs last month
        </Typography>
        <InsightsIcon sx={{ fontSize: 40 }} />
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ padding: 2, mb: 2 }}>
      <Typography sx={{ mb: 1 }} variant="body2">
        Latest exercise reps last month
      </Typography>
      <Box sx={{ height: "150px" }}>
        <ResponsiveLine
          theme={chartTheme}
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 30, left: 32 }}
          xScale={{
            type: "time",
            format: "%Y-%m-%d",
            useUTC: false,
            precision: "day",
          }}
          xFormat="time:%d %b"
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
          }}
          axisBottom={{
            format: "%d.%m",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            tickValues: "every 5 days",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            tickValues: 5,
          }}
          yFormat=" >-.0d"
          enableGridY={false}
          enableArea
          areaOpacity={0.06}
          enablePointLabel
          axisTop={null}
          axisRight={null}
          colors={["#2196f3"]}
          enableGridX={false}
          pointSize={4}
          pointColor={{ theme: "background" }}
          pointBorderWidth={4}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
        />
      </Box>
    </Paper>
  );
};

export default LineChart;
