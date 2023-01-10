import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

import useAuthContext from "../hooks/useAuthContext";
import useSignOut from "../hooks/useSignOut";
import DialogLink from "./DialogLink";

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const { isLoading, mutate: signOut } = useSignOut();
  const auth = useAuthContext();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        mb: 2,
      }}
    >
      {!auth && (
        <DialogLink to="/login" backgroundLocation={location}>
          Sign In
        </DialogLink>
      )}
      {auth && (
        <>
          <Tooltip title="Account">
            <Button
              startIcon={<AccountCircleIcon />}
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
                  display: "flex",
                  alignItems: "center",
                },
              }}
            >
              <Link to="account">
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
      )}
    </Box>
  );
};

export default AccountMenu;
