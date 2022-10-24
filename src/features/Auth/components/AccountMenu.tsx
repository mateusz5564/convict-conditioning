import { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useSignOut from "../hooks/useSignOut";
import { useAuthContext } from "../hooks/useAuthContext";

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isLoading, mutate: signOut } = useSignOut();
  const auth = useAuthContext();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!auth) return null;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mb: 3 }}>
        <Tooltip title="Account">
          <Button
            endIcon={<AccountCircleIcon />}
            onClick={handleClick}
            size="large"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {auth?.email?.substring(0, auth.email.indexOf("@"))}
          </Button>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          sx={{
            "& a": {
              color: "currentcolor",
              textDecoration: "none",
            },
          }}
        >
          <Link to="account/settings">
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (isLoading) return;
            signOut();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {isLoading ? "Loading..." : "Sign Out"}
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
