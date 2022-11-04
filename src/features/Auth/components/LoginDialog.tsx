import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Container, Typography } from "@mui/material";
import PasswordField from "components/Forms/PasswordField";
import TextField from "components/Forms/TextField";

import { defaultFormValues, inputRules } from "../helpers";
import useBackgroundLocation from "../hooks/useBackgroundLocation";
import useLogin from "../hooks/useLogin";
import useNavigateOnSuccess from "../hooks/useNavigateOnSuccess";
import { TInputs } from "../types";
import AuthDivider from "./shared/AuthDivider";
import AuthDialog from "./shared/Dialog";
import ErrorAlert from "./shared/ErrorAlert";
import Form from "./shared/Form";
import SubmitButton from "./shared/SubmitButton";
import Title from "./shared/Title";

const LoginDialog = () => {
  const backgroundLocation = useBackgroundLocation();
  const { mutate: login, error, isError, isLoading, isSuccess } = useLogin();
  const { control, handleSubmit } = useForm<TInputs>({
    defaultValues: defaultFormValues,
  });
  useNavigateOnSuccess(isSuccess, backgroundLocation);

  const backgroundLocationRef = useRef(backgroundLocation);

  const onLogin = (data: TInputs) => {
    login(data);
  };

  return (
    <AuthDialog>
      <Container sx={{ pb: 2 }}>
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
            control={control}
            rules={inputRules.password}
            label="Password"
            fullWidth
          />

          <Typography variant="caption" display="block" textAlign="right">
            Forgot Password?
          </Typography>

          {isError && error instanceof Error && (
            <ErrorAlert>{error.message}</ErrorAlert>
          )}
          <SubmitButton loading={isLoading}>Sign In</SubmitButton>
        </Form>

        <AuthDivider>or</AuthDivider>
        <Typography>Sign in with google</Typography>
        <Typography sx={{ "& a": { color: "primary.main", ml: 1 } }}>
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
