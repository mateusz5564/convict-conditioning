import { SyntheticEvent, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { getTabIndex } from "features/Auth/helpers";

const AccountSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabIndex = getTabIndex(location.pathname);
  const [value, setValue] = useState(tabIndex);
  const matches = useMediaQuery("(min-width: 700px)");

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: "850px",
        mx: "auto",
        flexDirection: matches ? "row" : "column",
        border: matches ? "1px solid" : "none",
        borderColor: matches ? "divider" : "",
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          borderRight: matches ? 1 : 0,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          orientation={matches ? "vertical" : "horizontal"}
          aria-label="account settings tab"
        >
          <Tab
            label="Change Password"
            icon={<LockIcon />}
            iconPosition="start"
            onClick={() => navigate("change-password")}
          />
          <Tab
            label="Change Email"
            icon={<EmailIcon />}
            iconPosition="start"
            onClick={() => navigate("change-email")}
          />
        </Tabs>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          p: matches ? 4 : 0,
          pt: matches ? 4 : 2,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AccountSettings;
