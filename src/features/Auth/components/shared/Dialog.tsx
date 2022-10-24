import { useNavigate } from "react-router-dom";
import { Dialog, DialogActions, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useBackgroundLocation from "../../hooks/useBackgroundLocation";
import { ChildrenProp } from "../../types";

const AuthDialog = ({ children }: ChildrenProp) => {
  const backgroundLocation = useBackgroundLocation();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(backgroundLocation || "/");
  };

  return (
    <>
      <Dialog open={true} onClose={handleClose}>
        <DialogActions>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
        {children}
      </Dialog>
    </>
  );
};

export default AuthDialog;
