import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function LoadingSpinner() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
}

export default LoadingSpinner;
