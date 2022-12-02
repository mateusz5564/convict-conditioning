import { Box } from "@mui/material";
import LoadingSpinner from "components/CircularProgress/CircularProgress";

const OverlayLoadingSpinner = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadingSpinner />
    </Box>
  );
};

export default OverlayLoadingSpinner;
