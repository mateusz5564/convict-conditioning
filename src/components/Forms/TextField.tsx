import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

import { TextField as MuiTextField, TextFieldProps } from "@mui/material";

type Props<TFieldValues extends FieldValues> = TextFieldProps & {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  rules: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
};

const TextField = <TFieldValues extends {}>({
  name,
  control,
  rules,
  ...rest
}: Props<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <MuiTextField
          {...field}
          {...rest}
          error={error !== undefined}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default TextField;
