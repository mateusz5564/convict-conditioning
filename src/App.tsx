import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import Overview from "./pages/Overview";
import WorkoutParts from "./pages/WorkoutParts";
import { LoginDialog, RegisterDialog, useBackgroundLocation } from "./features/Auth";
import BottomNav from "./features/BottomNav";
import { ExerciseInstructions, ExerciseLogs, WorkoutPart } from "./features/Workout";

function App() {
  const location = useLocation();
  const backgroundLocation = useBackgroundLocation();

  const appLocation =
    backgroundLocation ||
    (location.pathname === "/register" || location.pathname === "/login" ? "/" : location);

  return (
    <Container sx={{ padding: "12px", paddingBottom: "80px" }}>
      <Routes location={appLocation}>
        <Route path="/" element={<Overview />} />
        <Route path="/workout-parts" element={<WorkoutParts />}>
          <Route path=":category" element={<WorkoutPart />}>
            <Route index element={<Navigate to="logs" />} />
            <Route path="logs" element={<ExerciseLogs />} />
            <Route path="instructions" element={<ExerciseInstructions />} />
          </Route>
        </Route>
        <Route path="/login" element={<Overview />} />
        <Route path="/register" element={<Overview />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>

      <Routes>
        <Route path="/login" element={<LoginDialog />} />
        <Route path="/register" element={<RegisterDialog />} />
        <Route path="*" element={null} />
      </Routes>
      <BottomNav />
    </Container>
  );
}

export default App;
