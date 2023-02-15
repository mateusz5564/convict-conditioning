import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ResponsiveRadialBar } from "@nivo/radial-bar";
import { capitilizeFirstLetter } from "utils/string";

import useChartTheme from "../theme";

type Props = {
  workoutProgress: {
    id: string;
    data: Array<{ x: string; y: number }>;
  };
};

const WorkoutPartProgress = ({ workoutProgress }: Props) => {
  const theme = useTheme();
  const chartTheme = useChartTheme();
  let data = [{ id: "no data", data: [{ x: "", y: 0 }] }];

  if (workoutProgress) {
    data = [workoutProgress];
  }

  return (
    <Box
      sx={{
        padding: 2,
        flex: "0 1 100%",
        minWidth: "130px",
        "@media (min-width: 305px)": {
          flexBasis: "50%",
        },
        "@media (min-width: 500px)": {
          flexBasis: "33%",
        },
        "@media (min-width: 680px)": {
          flexBasis: "25%",
        },
        "@media (min-width: 980px)": {
          flexBasis: "16%",
        },
      }}
    >
      <Typography sx={{ mb: 1 }} align="center">
        {capitilizeFirstLetter(workoutProgress.data[0].x.replace("-", " "))}
      </Typography>
      <Box
        sx={{
          position: "relative",
          paddingTop: "100%",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {workoutProgress.data[0].y}%
        </Box>
        <Box
          sx={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
        >
          <ResponsiveRadialBar
            data={data}
            maxValue={100}
            startAngle={0}
            endAngle={360}
            theme={chartTheme}
            colors={[theme.palette.primary.main]}
            enableCircularGrid={false}
            enableRadialGrid={false}
            innerRadius={0.5}
            radialAxisStart={null}
            circularAxisOuter={null}
            cornerRadius={3}
            isInteractive={false}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default WorkoutPartProgress;
