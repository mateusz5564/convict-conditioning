import { useEffect, useState } from "react";
import BottomNav from "./components/BottomNav/BottomNav";
import { supabase } from "./supabaseClient";
import { WorkoutPart } from "./types";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import WorkoutParts from "./pages/WorkoutParts";
import Overview from "./pages/Overview";
import theme from "./theme";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";

function App() {
  const [workoutParts, setWorkoutParts] = useState<WorkoutPart[]>();

  useEffect(() => {
    getWorkoutParts();
  }, []);

  const getWorkoutParts = async () => {
    try {
      const { data } = await supabase.from("workout_part").select(`*, exercises:exercise(*)`);
      if (data) {
        setWorkoutParts(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ padding: "8px" }}>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/workout-parts" element={<WorkoutParts workoutParts={workoutParts} />} />
        </Routes>
        <BottomNav />
      </Container>
    </ThemeProvider>
  );
}

export default App;
