import { useForm } from "react-hook-form";
import { Container, Typography } from "@mui/material";
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
import useRegister from "./hooks/useRegister";

const Register = () => {
  const { mutate: register, error, isError, isLoading } = useRegister();
  const { control, handleSubmit } = useForm<TInputs>({ defaultValues: defaultFormValues });

  const onRegister = (data: TInputs) => {
    register(data);
  };

  return (
    <Container>
      <Title>Create your account</Title>
      <Form handleSubmit={handleSubmit} submitHandler={onRegister}>
        <TextField
          name="email"
          rules={inputRules.email}
          control={control}
          label="Email"
          fullWidth
        />
        <PasswordField name="password" rules={inputRules.password} control={control} fullWidth />

        {isError && error instanceof Error && <ErrorAlert>{error.message}</ErrorAlert>}

        <SubmitButton loading={isLoading}>Sign Up</SubmitButton>
      </Form>

      <AuthDivider>or</AuthDivider>

      <Typography>Sign up with google</Typography>

      <Typography>Already have an account? Sign in</Typography>
    </Container>
  );
};

export default Register;
