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
    const session = supabase.auth.session();
    setUser(session?.user);

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, changedSession) => {
        setUser(changedSession?.user);
        queryClient.invalidateQueries();
        if (event === "PASSWORD_RECOVERY") {
          navigate("/recover");
        }
      },
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
