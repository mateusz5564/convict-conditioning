import { Alert } from "@mui/material";
import { ChildrenProp } from "../../types";

export const ErrorAlert = ({ children }: ChildrenProp) => {
  return (
    <Alert severity="error" variant="outlined" sx={{ mt: 2 }}>
      {children}
    </Alert>
  );
};
