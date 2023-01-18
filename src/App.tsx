import { Container } from "@mui/material";
import AppRoutes from "AppRoutes";
import { AccountMenu } from "features/Auth";
import BottomNav from "features/BottomNav";

const App = () => {
  return (
    <Container sx={{ padding: "12px", paddingBottom: "80px" }}>
      <AccountMenu />
      <AppRoutes />
      <BottomNav />
    </Container>
  );
};

export default App;
