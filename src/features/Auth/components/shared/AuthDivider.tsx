import { Divider } from "@mui/material";
import { ChildrenProp } from "../../types";

export const AuthDivider = ({ children }: ChildrenProp) => (
  <Divider sx={{ my: 5 }}>{children}</Divider>
);
