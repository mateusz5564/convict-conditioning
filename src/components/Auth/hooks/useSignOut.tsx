import { useMutation } from "react-query";
import { supabase } from "../../../supabaseClient";

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
