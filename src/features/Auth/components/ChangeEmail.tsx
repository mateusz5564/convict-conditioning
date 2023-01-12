import { SubmitHandler, useForm } from "react-hook-form";

import { Alert, Box } from "@mui/material";
import accountAPI from "api/account";
import SubmitButton from "components/Buttons/SubmitButton";
import TextField from "components/Forms/TextField";

import { inputRules } from "../helpers";
import { TInputsEmail } from "../types";

const ChangeEmail = () => {
  const { isLoading, isSuccess, mutate } = accountAPI.useUpdateEmail();
  const { control, handleSubmit } = useForm<TInputsEmail>({
    defaultValues: { email: "" },
  });

  const onSubmit: SubmitHandler<TInputsEmail> = (data) => {
    mutate({ email: data.email });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ flexBasis: "100%" }}
    >
      <TextField
        name="email"
        label="New Email"
        rules={inputRules.email}
        control={control}
        sx={{ width: "100%" }}
      />
      <SubmitButton loading={isLoading} sx={{ mt: 2 }}>
        Change Email
      </SubmitButton>
      {isSuccess && (
        <Alert severity="info" sx={{ mt: 2 }}>
          We've sent you two links, to your old and new email. Please accept
          both to approve the change.
        </Alert>
      )}
    </Box>
  );
};

export default ChangeEmail;
