import React, { createContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { User } from "@supabase/supabase-js";
import supabase from "supabase/supabaseClient";
import { ChildrenProp } from "types";

export const AuthContext = createContext<User | null | undefined>(null);

export const AuthContextProvider = ({ children }: ChildrenProp) => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw new Error(error.message);

      setUser(session?.user);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, changedSession) => {
      setUser(changedSession?.user);
      queryClient.invalidateQueries();
      if (event === "PASSWORD_RECOVERY") {
        navigate("/recover");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
