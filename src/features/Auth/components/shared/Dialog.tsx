import { useNavigate } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogActions, IconButton } from "@mui/material";

import useBackgroundLocation from "../../hooks/useBackgroundLocation";
import { ChildrenProp } from "../../types";

const AuthDialog = ({ children }: ChildrenProp) => {
  const backgroundLocation = useBackgroundLocation();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(backgroundLocation || "/");
  };

  return (
    <Dialog open onClose={handleClose}>
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
