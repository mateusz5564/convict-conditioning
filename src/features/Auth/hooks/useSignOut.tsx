import { useMutation } from "react-query";
import { supabase } from "../../../supabase/supabaseClient";

const useSignOut = () => {
  const mutation = useMutation(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }
  });

  return mutation;
};

export default useSignOut;
