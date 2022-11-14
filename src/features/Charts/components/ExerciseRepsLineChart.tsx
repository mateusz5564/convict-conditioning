import InsightsIcon from "@mui/icons-material/Insights";
import { Box, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ResponsiveLine } from "@nivo/line";
import { ExerciseLog } from "types";
import { isOlderThan30Days } from "utils/date";

const LineChart = ({
  workoutPartlogs,
}: {
  workoutPartlogs: Array<ExerciseLog>;
}) => {
  const theme = useTheme();

  const getChartData = () => {
    if (workoutPartlogs.length < 2) return [];

    const recentExerciseId = workoutPartlogs[0].exercise.id;
    const recentExerciseLogs = workoutPartlogs?.filter(
      (log) =>
        log.exercise.id === recentExerciseId &&
        !isOlderThan30Days(log.created_at),
    );

    const data = recentExerciseLogs
      ?.map((log) => ({
        x: log.created_at.substring(0, 10),
        y: log.reps.reduce((prev, curr) => prev + curr),
      }))
      .reverse();

    return [
      {
        id: "exercise",
        data,
      },
    ];
  };

  const chartData = getChartData();

  if (!chartData.length || chartData[0].data.length < 2) {
    return (
      <Paper
        elevation={2}
        sx={{ padding: 2, pb: 0, mb: 2, textAlign: "center" }}
      >
        <Typography sx={{ display: "block" }} variant="caption">
          We need 2 logs in last month
        </Typography>
        <InsightsIcon sx={{ fontSize: 40 }} />
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ padding: 2, mb: 2 }}>
      <Typography sx={{ mb: 1 }} variant="body2">
        Recent exercise reps in last 30 days
      </Typography>
      <Box sx={{ height: "150px" }}>
        <ResponsiveLine
          theme={{
            textColor: theme.palette.text.primary,
            tooltip: {
              container: {
                background: theme.palette.grey[700],
              },
            },
          }}
          data={chartData}
          margin={{ top: 10, right: 10, bottom: 30, left: 25 }}
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
            stacked: true,
            reverse: false,
            nice: 1,
          }}
          yFormat=" >-.0d"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: "%d.%m",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            tickValues: "every 7 days",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            tickValues: 5,
          }}
          colors={["#2196f3"]}
          enableGridX={false}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
        />
      </Box>
    </Paper>
  );
};

export default LineChart;
