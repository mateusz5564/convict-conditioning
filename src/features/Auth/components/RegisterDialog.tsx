import { useForm } from "react-hook-form";
import { Container, Typography } from "@mui/material";
import PasswordField from "../../../components/Forms/PasswordField";
import TextField from "../../../components/Forms/TextField";
import { TInputs } from "../types";
import { defaultFormValues, inputRules } from "../helpers";
import { AuthDivider } from "./shared/AuthDivider";
import { ErrorAlert } from "./shared/ErrorAlert";
import { Form } from "./shared/Form";
import { SubmitButton } from "./shared/SubmitButton";
import { Title } from "./shared/Title";
import useRegister from "../hooks/useRegister";
import AuthDialog from "./shared/Dialog";

const RegisterDialog = () => {
  const { mutate: register, error, isError, isLoading } = useRegister();
  const { control, handleSubmit } = useForm<TInputs>({ defaultValues: defaultFormValues });

  const onRegister = (data: TInputs) => {
    register(data);
  };

  return (
    <AuthDialog btnTitle="Register">
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
    </AuthDialog>
  );
};

export default RegisterDialog;
