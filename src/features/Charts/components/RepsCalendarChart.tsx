import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { ResponsiveTimeRange } from "@nivo/calendar";
import { ExerciseLogPerDay } from "types";
import { getDaysBefore } from "utils/date";

import useChartTheme from "../theme";

type Props = {
  exerciseLogs: Array<ExerciseLogPerDay>;
};

const RepsCalendarChart = ({ exerciseLogs }: Props) => {
  const theme = useTheme();
  const chartTheme = useChartTheme();
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
            colors={[
              theme.palette.primary.dark,
              theme.palette.primary.main,
              theme.palette.primary.light,
            ]}
            margin={{ top: 20, right: 0, bottom: 0, left: 5 }}
            theme={chartTheme}
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
