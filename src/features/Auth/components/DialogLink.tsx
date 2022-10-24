import { Link, Location } from "react-router-dom";

type Props = {
  to: "/login" | "/register";
  backgroundLocation: Location;
  children: string;
  replace?: boolean;
};

const DialogLink = ({ to, backgroundLocation, children, replace = false }: Props) => {
  return (
    <Link to={to} replace={replace} state={{ backgroundLocation: backgroundLocation }}>
      {children}
    </Link>
  );
};

export default DialogLink;
