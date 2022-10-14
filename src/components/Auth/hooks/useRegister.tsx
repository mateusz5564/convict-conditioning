import { UserCredentials } from "@supabase/supabase-js";
import { useMutation } from "react-query";
import { supabase } from "../../../supabaseClient";

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
