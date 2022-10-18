import { TInputs } from "../types";

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
