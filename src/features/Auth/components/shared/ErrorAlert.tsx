import { Alert } from "@mui/material";

import { ChildrenProp } from "../../types";

const ErrorAlert = ({ children }: ChildrenProp) => {
  return (
    <Alert severity="error" variant="outlined" sx={{ mt: 2 }}>
      {children}
    </Alert>
  );
};

export default ErrorAlert;
