import { useTheme } from "@mui/material/styles";

const useChartTheme = () => {
  const theme = useTheme();

  const chartTheme = {
    textColor: theme.palette.text.primary,
    tooltip: {
      container: {
        background: theme.palette.grey[700],
      },
    },
  };

  return chartTheme;
};

export default useChartTheme;
