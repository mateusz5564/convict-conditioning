import { useState } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { inputRules } from "features/Auth/helpers";

type Props<TFieldValues extends FieldValues> = OutlinedInputProps & {
  name: FieldPath<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
};

const PasswordField = <TFieldValues extends {}>({
  name,
  label,
  control,
  sx,
  ...rest
}: Props<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={inputRules.password}
      render={({ field, fieldState: { error } }) => (
        <FormControl
          variant="outlined"
          sx={sx}
          error={error !== undefined}
          fullWidth={rest.fullWidth}
        >
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <OutlinedInput
            {...field}
            {...rest}
            id={name}
            type={showPassword ? "text" : "password"}
            label={label}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default PasswordField;
