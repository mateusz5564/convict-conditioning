import Typography from "@mui/material/Typography";
import { useAuthContext } from "../components/Auth/hooks/useAuthContext";
import AuthDialog from "../components/Auth/Dialog";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import useSignOut from "../components/Auth/hooks/useSignOut";
import { LoadingButton } from "@mui/lab";

export default function Overview() {
  const auth = useAuthContext();
  const { isLoading, mutate: signOut } = useSignOut();

  return (
    <>
      <Typography variant="h5" component="h1" textAlign="center">
        Work in progress...
      </Typography>
      <AuthDialog btnTitle="Register">
        <Register />
      </AuthDialog>
      <AuthDialog btnTitle="Login">
        <Login />
      </AuthDialog>
      <LoadingButton
        loading={isLoading}
        loadingIndicator="Loading..."
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </LoadingButton>
      <Typography>{auth?.email}</Typography>
    </>
  );
}
