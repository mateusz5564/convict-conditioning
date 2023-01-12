import { ReactNode, useState } from "react";

import { Alert, AlertProps, Snackbar } from "@mui/material";

const SnackbarAlert = ({
  isOpen,
  children,
  severity,
}: {
  isOpen: boolean;
  children: ReactNode;
  severity: AlertProps["severity"];
}) => {
  const [open, setOpen] = useState(isOpen);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={10000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {children}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
