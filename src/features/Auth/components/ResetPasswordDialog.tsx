import * as React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { DialogContent, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import ChangePassword from "./ChangePassword";

const ResetPasswordDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        size="small"
        sx={{ display: "block", marginLeft: "auto" }}
        onClick={handleClickOpen}
      >
        Forgot Password?
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <DialogTitle id="alert-dialog-title">Reset your password</DialogTitle>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogContent sx={{ paddingTop: "10px !important" }}>
          <ChangePassword />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResetPasswordDialog;
