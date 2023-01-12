import { SubmitHandler, useForm } from "react-hook-form";

import { Alert, Box } from "@mui/material";
import accountAPI from "api/account";
import SubmitButton from "components/Buttons/SubmitButton";
import PasswordField from "components/Forms/PasswordField";
import { TInputsPassword } from "features/Auth/types";

const NewPassword = () => {
  const { mutate, isLoading, isSuccess } = accountAPI.useUpdatePassword();
  const { control, handleSubmit } = useForm<TInputsPassword>({
    defaultValues: { password: "" },
  });

  const onSubmit: SubmitHandler<TInputsPassword> = (data) => {
    mutate({ newPassword: data.password });
  };

  return (
    <Box sx={{ maxWidth: "500px", mx: "auto" }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <PasswordField
          name="password"
          label="New Password"
          control={control}
          sx={{ width: "100%" }}
        />
        <SubmitButton loading={isLoading} sx={{ mt: 2 }}>
          Update Password
        </SubmitButton>
        {isSuccess && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Password successfully changed.
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default NewPassword;
