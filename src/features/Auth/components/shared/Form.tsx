import { Box } from "@mui/material";
import { FormProps } from "../../types";

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