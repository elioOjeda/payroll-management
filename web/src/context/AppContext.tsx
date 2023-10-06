import { Session, User } from "@supabase/supabase-js";
import supabase from "../api/supabase";
import { ReactNode, createContext, useEffect, useState } from "react";

type AppContextState = {
  hasSession: boolean;
  session?: Session | null;
  user?: User | null;
  isSuperAdmin?: boolean;
  isAdmin?: boolean;
};

export const AppContext = createContext<AppContextState>({
  hasSession: false,
});

export const AppConsumer = AppContext.Consumer;

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | undefined | null>();
  const [user, setUser] = useState<User | undefined | null>();
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>();
  const [isAdmin, setIsAdmin] = useState<boolean>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user);
      setIsSuperAdmin(session?.user?.user_metadata?.is_super_admin);
      setIsAdmin(session?.user?.user_metadata?.is_admin);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        hasSession: !!user,
        session,
        user,
        isSuperAdmin,
        isAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
