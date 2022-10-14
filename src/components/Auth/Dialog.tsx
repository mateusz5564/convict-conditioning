import { Button, Dialog, DialogActions, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

type Props = {
  btnTitle: string;
  children: React.ReactNode;
};

const AuthDialog = ({ btnTitle, children }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen}>{btnTitle}</Button>
      <Dialog open={open} onClose={handleClose} fullScreen>
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
