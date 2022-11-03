import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { Paper } from "@mui/material";

const NoLogs = () => {
  return (
    <Paper sx={{ padding: 1, textAlign: "center" }}>
      <DoNotDisturbIcon
        fontSize="large"
        sx={{ display: "block", mx: "auto", mb: 1 }}
      />
      No logs, yet. Use the form above.
    </Paper>
  );
};

export default NoLogs;
