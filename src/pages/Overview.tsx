import Typography from "@mui/material/Typography";
import { DialogLink } from "../features/Auth";
import { useLocation } from "react-router-dom";

export default function Overview() {
  const location = useLocation();

  return (
    <>
      <Typography variant="h5" component="h1" textAlign="center">
        Work in progress...
      </Typography>

      <DialogLink to="/login" backgroundLocation={location}>
        Login
      </DialogLink>
      <DialogLink to="/register" backgroundLocation={location}>
        Register
      </DialogLink>
    </>
  );
}
