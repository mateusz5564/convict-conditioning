import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { grey } from "@mui/material/colors";

export default function BottomNav() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  return (
    <Paper sx={{ width: "100%", position: "fixed", bottom: 0, left: 0 }}>
      <BottomNavigation
        sx={{ backgroundColor: grey[900], height: "80px" }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Overview"
          icon={<AssessmentIcon />}
          onClick={() => navigate("/")}
        />
        <BottomNavigationAction
          label="Workout Parts"
          icon={<FitnessCenterIcon />}
          onClick={() => navigate("/workout-parts/pushups")}
        />
      </BottomNavigation>
    </Paper>
  );
}
