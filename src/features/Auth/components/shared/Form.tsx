import { Box } from "@mui/material";

import { FormProps } from "../../types";

const Form = <TFieldValues extends {}>({
  children,
  handleSubmit,
  submitHandler,
}: FormProps<TFieldValues>) => {
  return (
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
};

export default Form;
