import { FC } from "react";
import { Link, Location } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";

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
    <Link
      to={to}
      replace={replace}
      state={{ backgroundLocation }}
      style={{ textDecoration: "none" }}
    >
      <Button variant="outlined" startIcon={<AccountCircleIcon />}>
        {children}
      </Button>
    </Link>
  );
};

DialogLink.defaultProps = {
  replace: false,
};

export default DialogLink;
