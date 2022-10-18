import { Typography } from "@mui/material";
import { ChildrenProp } from "../../types";

export const Title = ({ children }: ChildrenProp) => (
  <Typography variant="h5" textAlign="center" sx={{ my: 3 }}>
    {children}
  </Typography>
);