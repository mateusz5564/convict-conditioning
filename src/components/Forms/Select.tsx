import { FormControl, InputLabel, Select as MuiSelect, SxProps } from "@mui/material";
import { ReactNode } from "react";
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";

type Props<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  rules: Exclude<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
  sx: SxProps;
  children: ReactNode;
};

const Select = <TFieldValues extends {}>({
  name,
  control,
  rules,
  sx,
  children,
}: Props<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <FormControl sx={sx} size="small" error={error !== undefined}>
          <InputLabel id={name}>Exercise</InputLabel>
          <MuiSelect labelId={name} label="Exercise" {...field}>
            {children}
          </MuiSelect>
        </FormControl>
      )}
    />
  );
};

export default Select;
