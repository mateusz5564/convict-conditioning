import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { matchPath, useLocation, useMatch, useNavigate } from "react-router-dom";
import { useBackgroundLocation } from "../../../Auth";

const ExercisesNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = useBackgroundLocation();
  const matchLogs = useMatch("workout-parts/:category/logs");
  const backgroundMatchLogs =
    backgroundLocation?.pathname &&
    matchPath("workout-parts/:category/logs", backgroundLocation.pathname);

  const [value, setValue] = useState("logs");

  useEffect(() => {
    if (backgroundLocation) {
      setValue(backgroundMatchLogs ? "logs" : "instructions");
    } else {
      setValue(matchLogs ? "logs" : "instructions");
    }
  }, [backgroundLocation, backgroundMatchLogs, location, matchLogs]);

  return (
    <Box sx={{ width: "100%", my: 2 }}>
      <Tabs
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
        }}
        centered
      >
        <Tab value={"logs"} label="Logs" onClick={() => navigate("logs")} />
        <Tab value={"instructions"} label="Instructions" onClick={() => navigate("instructions")} />
      </Tabs>
    </Box>
  );
};

export default ExercisesNavigation;
