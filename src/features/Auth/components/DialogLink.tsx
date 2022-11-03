import { FC } from "react";
import { Link, Location } from "react-router-dom";

import { Box } from "@mui/material";

type Props = {
  to: "/login" | "/register";
  backgroundLocation: Location;
  children: string;
  replace?: boolean;
};

const DialogLink: FC<Props> = ({
  to,
  backgroundLocation,
  children,
  replace = false,
}: Props) => {
  return (
    <Box
      sx={{
        "& a": {
          display: "inline-block",
          py: 1,
          px: 2,
          color: "primary.main",
          textDecoration: "none",
          textTransform: "uppercase",
          borderWidth: 1,
          borderStyle: "solid",
          borderRadius: 1,
        },
      }}
    >
      <Link to={to} replace={replace} state={{ backgroundLocation }}>
        {children}
      </Link>
    </Box>
  );
};

DialogLink.defaultProps = {
  replace: false,
};

export default DialogLink;
