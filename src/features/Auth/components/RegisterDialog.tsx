import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Container, Typography } from "@mui/material";

import PasswordField from "../../../components/Forms/PasswordField";
import TextField from "../../../components/Forms/TextField";
import { defaultFormValues, inputRules } from "../helpers";
import useBackgroundLocation from "../hooks/useBackgroundLocation";
import useNavigateOnSuccess from "../hooks/useNavigateOnSuccess";
import useRegister from "../hooks/useRegister";
import { TInputs } from "../types";
import AuthDivider from "./shared/AuthDivider";
import AuthDialog from "./shared/Dialog";
import ErrorAlert from "./shared/ErrorAlert";
import Form from "./shared/Form";
import SubmitButton from "./shared/SubmitButton";
import Title from "./shared/Title";

const RegisterDialog = () => {
  const backgroundLocation = useBackgroundLocation();
  const {
    mutate: register,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useRegister();
  const { control, handleSubmit } = useForm<TInputs>({
    defaultValues: defaultFormValues,
  });
  useNavigateOnSuccess(isSuccess, backgroundLocation);

  const backgroundLocationRef = useRef(backgroundLocation || "/");

  const onRegister = (data: TInputs) => {
    register(data);
  };

  return (
    <AuthDialog>
      <Container sx={{ pb: 2 }}>
        <Title>Create your account</Title>
        <Form handleSubmit={handleSubmit} submitHandler={onRegister}>
          <TextField
            name="email"
            rules={inputRules.email}
            control={control}
            label="Email"
            fullWidth
          />
          <PasswordField
            name="password"
            rules={inputRules.password}
            control={control}
            fullWidth
          />

          {isError && error instanceof Error && (
            <ErrorAlert>{error.message}</ErrorAlert>
          )}

          <SubmitButton loading={isLoading}>Sign Up</SubmitButton>
        </Form>

        <AuthDivider>or</AuthDivider>

        <Typography>Sign up with google</Typography>

        <Typography sx={{ "& a": { color: "primary.main", ml: 1 } }}>
          Already have an account?{" "}
          <Link
            to="/login"
            replace
            state={{ backgroundLocation: backgroundLocationRef.current }}
          >
            Sign in
          </Link>
        </Typography>
      </Container>
    </AuthDialog>
  );
};

export default RegisterDialog;
