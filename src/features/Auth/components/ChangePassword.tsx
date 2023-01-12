import { SubmitHandler, useForm } from "react-hook-form";

import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import accountAPI from "api/account";
import SubmitButton from "components/Buttons/SubmitButton";
import TextField from "components/Forms/TextField";

import { inputRules } from "../helpers";
import { TInputsEmail } from "../types";

const ChangePassword = () => {
  const { isLoading, isSuccess, mutate } = accountAPI.useResetPassword();
  const { control, handleSubmit } = useForm<TInputsEmail>({
    defaultValues: { email: "" },
  });

  const onSubmit: SubmitHandler<TInputsEmail> = (data) =>
    mutate({ email: data.email });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ flexBasis: "100%" }}
    >
      <TextField
        name="email"
        label="Email"
        rules={inputRules.email}
        control={control}
        sx={{ width: "100%" }}
      />
      <SubmitButton loading={isLoading} sx={{ mt: 2 }}>
        Send Reset Link
      </SubmitButton>
      {isSuccess && (
        <Alert severity="success" sx={{ mt: 2 }}>
          We've sent you a link to your email address
        </Alert>
      )}
    </Box>
  );
};

export default ChangePassword;
