import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

export type TInputs = {
  email: string;
  password: string;
};

export type ChildrenProp = {
  children: React.ReactNode;
};

export type FormProps<TFieldValues extends FieldValues> = ChildrenProp & {
  handleSubmit: UseFormHandleSubmit<TFieldValues>;
  submitHandler: SubmitHandler<TFieldValues>;
};

export type SubmitButtonProps = ChildrenProp & {
  loading: boolean;
};
