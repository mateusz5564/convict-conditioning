import { Typography } from "@mui/material";
import { ChildrenProp } from "types";

const Title = ({ children }: ChildrenProp) => {
  return (
    <Typography variant="h5" textAlign="center" sx={{ my: 3 }}>
      {children}
    </Typography>
  );
};

export default Title;
