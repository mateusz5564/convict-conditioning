import { useMutation } from "react-query";

import { UserCredentials } from "@supabase/supabase-js";
import supabase from "supabase/supabaseClient";

const useRegister = () => {
  const mutation = useMutation(async (credentials: UserCredentials) => {
    const { error } = await supabase.auth.signUp(credentials);

    if (error) {
      throw new Error(error.message);
    }
  });

  return mutation;
};

export default useRegister;
