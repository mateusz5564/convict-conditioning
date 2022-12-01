import React, { createContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";

import { User } from "@supabase/supabase-js";
import supabase from "supabase/supabaseClient";

export const AuthContext = createContext<User | null | undefined>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user);

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, changedSession) => {
        setUser(changedSession?.user);
        queryClient.invalidateQueries();
      },
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
