import { useRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Container, Typography } from "@mui/material";
import PasswordField from "../../../components/Forms/PasswordField";
import TextField from "../../../components/Forms/TextField";
import useBackgroundLocation from "../hooks/useBackgroundLocation";
import useRegister from "../hooks/useRegister";
import { AuthDivider } from "./shared/AuthDivider";
import { ErrorAlert } from "./shared/ErrorAlert";
import { Form } from "./shared/Form";
import { SubmitButton } from "./shared/SubmitButton";
import { Title } from "./shared/Title";
import AuthDialog from "./shared/Dialog";
import { defaultFormValues, inputRules } from "../helpers";
import { TInputs } from "../types";

const RegisterDialog = () => {
  const backgroundLocation = useBackgroundLocation();
  const { mutate: register, error, isError, isLoading } = useRegister();
  const { control, handleSubmit } = useForm<TInputs>({ defaultValues: defaultFormValues });

  const backgroundLocationRef = useRef(backgroundLocation || "/");

  const onRegister = (data: TInputs) => {
    register(data);
  };

  return (
    <AuthDialog>
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

        <Typography>
          Already have an account?{" "}
          <Link to="/login" replace state={{ backgroundLocation: backgroundLocationRef.current }}>
            Sign in
          </Link>
        </Typography>
      </Container>
    </AuthDialog>
  );
};

export default RegisterDialog;
