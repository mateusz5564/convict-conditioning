import { useLocation } from "react-router-dom";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Paper, Typography } from "@mui/material";

import { DialogLink } from "../../features/Auth";

type Props = {
  text: string;
};

const NoUser = ({ text }: Props) => {
  const location = useLocation();

  return (
    <Paper sx={{ padding: 2, textAlign: "center" }}>
      <PersonAddIcon fontSize="large" sx={{ display: "block", mx: "auto" }} />
      <Typography sx={{ mb: 2 }}>{text}</Typography>
      <DialogLink to="/login" backgroundLocation={location}>
        Sign In or Create Account
      </DialogLink>
    </Paper>
  );
};

export default NoUser;
