import { useMutation } from "react-query";

import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import supabase from "supabase/supabaseClient";

const useRegister = () => {
  const mutation = useMutation(
    async (credentials: SignUpWithPasswordCredentials) => {
      const { error } = await supabase.auth.signUp(credentials);

      if (error) {
        throw new Error(error.message);
      }
    },
  );

  return mutation;
};

export default useRegister;
