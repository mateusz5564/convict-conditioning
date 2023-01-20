import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

export type TInputsEmail = {
  email: string;
};

export type TInputsPassword = {
  password: string;
};

export type TInputsAuthentication = TInputsEmail & TInputsPassword;

export type FormProps<TFieldValues extends FieldValues> = {
  handleSubmit: UseFormHandleSubmit<TFieldValues>;
  submitHandler: SubmitHandler<TFieldValues>;
};
