import { UserCredentials } from "@supabase/supabase-js";

import { useMutation } from "react-query";

import supabase from "../../../supabase/supabaseClient";

const useLogin = () => {
  const mutation = useMutation(async (credentials: UserCredentials) => {
    const { error } = await supabase.auth.signIn(credentials);

    if (error) {
      throw new Error(error.message);
    }
  });

  return mutation;
};

export default useLogin;
