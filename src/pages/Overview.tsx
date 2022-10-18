import Typography from "@mui/material/Typography";
import { LoginDialog, RegisterDialog, useAuthContext, useSignOut } from "../features/Auth";
import { LoadingButton } from "@mui/lab";

export default function Overview() {
  const auth = useAuthContext();
  const { isLoading, mutate: signOut } = useSignOut();

  return (
    <>
      <Typography variant="h5" component="h1" textAlign="center">
        Work in progress...
      </Typography>
      <LoginDialog />
      <RegisterDialog />
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
