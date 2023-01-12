import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

import { SxProps } from "@mui/material";

export type TInputsEmail = {
  email: string;
};

export type TInputsPassword = {
  password: string;
};

export type TInputsAuthentication = TInputsEmail & TInputsPassword;

export type ChildrenProp = {
  children: React.ReactNode;
};

export type FormProps<TFieldValues extends FieldValues> = ChildrenProp & {
  handleSubmit: UseFormHandleSubmit<TFieldValues>;
  submitHandler: SubmitHandler<TFieldValues>;
};

export type SubmitButtonProps = ChildrenProp & {
  loading: boolean;
  sx?: SxProps;
};
