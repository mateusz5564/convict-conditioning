import { useMutation } from "react-query";

import supabase from "supabase/supabaseClient";

const updateEmail = async ({ email }: { email: string }) => {
  const { data, error } = await supabase.auth.updateUser({ email });

  if (error) throw new Error(error.message);

  return data;
};

const resetPassword = async ({ email }: { email: string }) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin,
  });

  if (error) throw new Error(error.message);

  return data;
};

const updatePassword = async ({ newPassword }: { newPassword: string }) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw new Error(error.message);

  return data;
};

const useResetPassword = () => useMutation(resetPassword);
const useUpdateEmail = () => useMutation(updateEmail);
const useUpdatePassword = () => useMutation(updatePassword);

export default { useResetPassword, useUpdateEmail, useUpdatePassword };
