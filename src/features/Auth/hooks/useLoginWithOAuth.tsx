import { useMutation } from "react-query";

import { Provider } from "@supabase/supabase-js";
import supabase from "supabase/supabaseClient";

const useLoginWithOAuth = () => {
  const mutation = useMutation(async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });

    if (error) {
      throw new Error(error.message);
    }
  });

  return mutation;
};

export default useLoginWithOAuth;
