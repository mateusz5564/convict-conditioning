import { Typography, Container } from "@mui/material";
import { useForm } from "react-hook-form";
import PasswordField from "../Forms/PasswordField";
import TextField from "../Forms/TextField";
import {
  TInputs,
  defaultFormValues,
  inputRules,
  SubmitButton,
  Title,
  Form,
  AuthDivider,
  ErrorAlert,
} from "./common";
import useLogin from "./hooks/useLogin";

const Login = () => {
  const { mutate: login, error, isError, isLoading } = useLogin();

  const { control, handleSubmit } = useForm<TInputs>({
    defaultValues: defaultFormValues,
  });

  const onLogin = (data: TInputs) => {
    login(data);
  };

  return (
    <Container>
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

        {isError && error instanceof Error && <ErrorAlert>{error.message}</ErrorAlert>}
        <SubmitButton loading={isLoading}>Sign In</SubmitButton>
      </Form>

      <AuthDivider>or</AuthDivider>
      <Typography>Sign in with google</Typography>
      <Typography>Don't have an account? Sign Up</Typography>
    </Container>
  );
};

export default Login;
