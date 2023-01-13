import { Divider } from "@mui/material";

import { ChildrenProp } from "../../types";

const AuthDivider = ({ children }: ChildrenProp) => {
  return <Divider sx={{ my: 3 }}>{children}</Divider>;
};

export default AuthDivider;
