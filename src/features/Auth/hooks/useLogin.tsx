import { useMutation } from "react-query";

import { SignInWithPasswordCredentials } from "@supabase/supabase-js";
import supabase from "supabase/supabaseClient";

const useLogin = () => {
  const mutation = useMutation(
    async (credentials: SignInWithPasswordCredentials) => {
      const { error } = await supabase.auth.signInWithPassword(credentials);

      if (error) {
        throw new Error(error.message);
      }
    },
  );

  return mutation;
};

export default useLogin;
