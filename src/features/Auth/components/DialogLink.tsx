import { Box } from "@mui/material";
import { Link, Location } from "react-router-dom";

type Props = {
  to: "/login" | "/register";
  backgroundLocation: Location;
  children: string;
  replace?: boolean;
};

const DialogLink = ({ to, backgroundLocation, children, replace = false }: Props) => {
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
      <Link to={to} replace={replace} state={{ backgroundLocation: backgroundLocation }}>
        {children}
      </Link>
    </Box>
  );
};

export default DialogLink;
