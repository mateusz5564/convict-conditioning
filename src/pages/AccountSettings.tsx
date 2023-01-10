import { SyntheticEvent, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { getTabIndex } from "features/Account/helpers";

const AccountSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabIndex = getTabIndex(location.pathname);
  const [value, setValue] = useState(tabIndex);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex", border: 1, borderColor: "divider" }}>
      <Box sx={{ flexShrink: 0, borderRight: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          orientation="vertical"
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
          <Tab
            label="Delete Account"
            icon={<PersonOffIcon />}
            iconPosition="start"
            onClick={() => navigate("delete-account")}
          />
        </Tabs>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AccountSettings;
