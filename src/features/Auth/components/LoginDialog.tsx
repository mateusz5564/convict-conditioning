import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Container, Typography } from "@mui/material";
import SubmitButton from "components/Buttons/SubmitButton";
import PasswordField from "components/Forms/PasswordField";
import TextField from "components/Forms/TextField";

import { defaultFormValues, inputRules } from "../helpers";
import useBackgroundLocation from "../hooks/useBackgroundLocation";
import useLogin from "../hooks/useLogin";
import useNavigateOnSuccess from "../hooks/useNavigateOnSuccess";
import { TInputsAuthentication } from "../types";
import ResetPasswordDialog from "./ResetPasswordDialog";
import SignInWithGoogle from "./SignInWithGoogle";
import AuthDivider from "./shared/AuthDivider";
import AuthDialog from "./shared/Dialog";
import ErrorAlert from "./shared/ErrorAlert";
import Form from "./shared/Form";
import Title from "./shared/Title";

const LoginDialog = () => {
  const backgroundLocation = useBackgroundLocation();
  const { mutate: login, error, isError, isLoading, isSuccess } = useLogin();
  const { control, handleSubmit } = useForm<TInputsAuthentication>({
    defaultValues: defaultFormValues,
  });
  useNavigateOnSuccess(isSuccess, backgroundLocation);

  const backgroundLocationRef = useRef(backgroundLocation);

  const onLogin: SubmitHandler<TInputsAuthentication> = (data) => {
    login(data);
  };

  return (
    <AuthDialog>
      <Container sx={{ pb: 2, textAlign: "center" }}>
        <Title>Log in to your account</Title>
        <Form handleSubmit={handleSubmit} submitHandler={onLogin}>
          <TextField
            name="email"
            control={control}
            rules={inputRules.email}
            label="Email"
            fullWidth
          />

          <PasswordField
            name="password"
            label="Password"
            control={control}
            fullWidth
          />

          {isError && error instanceof Error && (
            <ErrorAlert>{error.message}</ErrorAlert>
          )}
          <SubmitButton loading={isLoading} sx={{ my: 1 }}>
            Sign In
          </SubmitButton>
        </Form>

        <ResetPasswordDialog />

        <AuthDivider>or</AuthDivider>

        <SignInWithGoogle />

        <Typography
          variant="body2"
          sx={{
            "& a": { color: "primary.main", ml: 1 },
            mt: 4,
            display: "block",
          }}
        >
          Don't have an account?
          <Link
            to="/register"
            replace
            state={{ backgroundLocation: backgroundLocationRef.current }}
          >
            Sign Up
          </Link>
        </Typography>
      </Container>
    </AuthDialog>
  );
};

export default LoginDialog;
