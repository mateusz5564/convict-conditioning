import { Container } from "@mui/material";
import AppRoutes from "AppRoutes";
import BottomNav from "components/BottomNav/BottomNav";
import { AccountMenu } from "features/Auth";

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
