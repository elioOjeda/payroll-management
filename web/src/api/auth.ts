import { Session, User } from "@supabase/supabase-js";
import supabase from "./supabase";

type SignInParams = {
  email: string;
  password: string;
};

export const signIn = async ({
  email,
  password,
}: SignInParams): Promise<{ user: User | null; session: Session | null }> => {
  const { data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return data;
};

export const signOut = async () => {
  await supabase.auth.signOut();
};

export const getSession = async () => {
  const { data } = await supabase.auth.getSession();

  return data.session;
};

export const getUser = async () => {
  const { data } = await supabase.auth.getUser();

  return data.user;
};
