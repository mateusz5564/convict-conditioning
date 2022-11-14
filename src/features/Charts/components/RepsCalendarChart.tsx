import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import { ResponsiveTimeRange } from "@nivo/calendar";
import { ExerciseLogsPerDay } from "types";
import { getDaysBefore } from "utils/date";

const RepsCalendarChart = ({
  exerciseLogs,
}: {
  exerciseLogs: Array<ExerciseLogsPerDay>;
}) => {
  const theme = useTheme();
  const oneYearEarlier = getDaysBefore(365);

  const chartData = exerciseLogs?.map((day) => ({
    day: day.day,
    value: day.value,
  }));

  return (
    <Paper
      sx={{
        padding: 2,
      }}
    >
      <Typography mb={2}>Exercises per day</Typography>
      <Box
        sx={{
          overflow: "hidden",
          display: "flex",
          justifyContent: "flex-end",
          flexWrap: "wrap",
        }}
      >
        <Box
          height="163px"
          sx={{
            minWidth: 1120,
          }}
        >
          <ResponsiveTimeRange
            data={chartData}
            from={oneYearEarlier}
            to={new Date()}
            minValue={1}
            emptyColor={theme.palette.grey[800]}
            colors={[blue[900], blue[600], blue[300]]}
            margin={{ top: 20, right: 0, bottom: 0, left: 5 }}
            theme={{
              textColor: theme.palette.text.primary,
              tooltip: {
                container: {
                  background: theme.palette.grey[700],
                },
              },
            }}
            dayBorderWidth={0}
            daySpacing={4}
            dayRadius={2}
            weekdayLegendOffset={70}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default RepsCalendarChart;
