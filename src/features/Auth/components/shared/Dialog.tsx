import { useNavigate } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogActions, IconButton } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ChildrenProp } from "types";

import useBackgroundLocation from "../../hooks/useBackgroundLocation";

const AuthDialog = ({ children }: ChildrenProp) => {
  const backgroundLocation = useBackgroundLocation();
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:500px)");

  const handleClose = () => {
    navigate(backgroundLocation || "/");
  };

  return (
    <Dialog open onClose={handleClose} fullScreen={!matches}>
      <DialogActions>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
      {children}
    </Dialog>
  );
};

export default AuthDialog;
