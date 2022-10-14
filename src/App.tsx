import BottomNav from "./components/BottomNav/BottomNav";
import WorkoutParts from "./pages/WorkoutParts";
import Overview from "./pages/Overview";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";

function App() {
  return (
    <Container sx={{ padding: "12px", paddingBottom: "80px" }}>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/workout-parts/*" element={<WorkoutParts />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
      <BottomNav />
    </Container>
  );
}

export default App;
