import BottomNav from "./components/BottomNav/BottomNav";
import WorkoutPartProvider from "./context/WorkoutPart/WorkoutPart";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import WorkoutParts from "./pages/WorkoutParts";
import Overview from "./pages/Overview";
import theme from "./theme";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <WorkoutPartProvider>
        <CssBaseline />
        <Container sx={{ padding: "12px", paddingBottom: "80px" }}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/workout-parts/*" element={<WorkoutParts />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
          <BottomNav />
        </Container>
      </WorkoutPartProvider>
    </ThemeProvider>
  );
}

export default App;
