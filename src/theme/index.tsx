import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#4dabf5",
      main: "#2196f3",
      dark: "#1769aa",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffa733",
      main: "#ff9100",
      dark: "#b26500",
      contrastText: "#000",
    },
  },
});

export default theme;