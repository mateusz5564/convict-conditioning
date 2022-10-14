import { FieldValues, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { Alert, Box, Divider, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export type TInputs = {
  email: string;
  password: string;
};

export const defaultFormValues: TInputs = { email: "", password: "" };

export const inputRules = {
  email: {
    required: { value: true, message: "Email is required" },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Incorrect email format",
    },
  },
  password: {
    required: { value: true, message: "Password is required" },
    minLength: { value: 8, message: "Password must be min 8 characters long" },
  },
};

type ChildrenProp = {
  children: React.ReactNode;
};

export const Title = ({ children }: ChildrenProp) => (
  <Typography variant="h5" textAlign="center" sx={{ my: 3 }}>
    {children}
  </Typography>
);

type FormProps<TFieldValues extends FieldValues> = ChildrenProp & {
  handleSubmit: UseFormHandleSubmit<TFieldValues>;
  submitHandler: SubmitHandler<TFieldValues>;
};

export const Form = <TFieldValues extends {}>({
  children,
  handleSubmit,
  submitHandler,
}: FormProps<TFieldValues>) => (
  <Box
    component="form"
    onSubmit={handleSubmit(submitHandler)}
    sx={{
      "& .MuiFormControl-root": {
        my: 1,
      },
    }}
  >
    {children}
  </Box>
);

export const ErrorAlert = ({ children }: ChildrenProp) => {
  return (
    <Alert severity="error" variant="outlined" sx={{ mt: 2 }}>
      {children}
    </Alert>
  );
};

type SubmitButtonProps = ChildrenProp & {
  loading: boolean;
};

export const SubmitButton = ({ children, loading }: SubmitButtonProps) => (
  <LoadingButton
    type="submit"
    variant="contained"
    fullWidth
    sx={{ mt: 2 }}
    loading={loading}
    loadingIndicator="Loading..."
  >
    {children}
  </LoadingButton>
);

export const AuthDivider = ({ children }: ChildrenProp) => (
  <Divider sx={{ my: 5 }}>{children}</Divider>
);
