import {
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError,
} from "@supabase/supabase-js";
import { ANON_KEY } from "../../utils/env";
import supabase from "../supabase";

type CreateUserParams = {
  email: string;
  password: string;
  companyId: string;
  isAdmin?: boolean;
};

export const createUser = async ({
  email,
  password,
  companyId,
  isAdmin,
}: CreateUserParams) => {
  try {
    const { data, error } = await supabase.functions.invoke("create-user", {
      body: JSON.stringify({
        email,
        password,
        company_id: companyId,
        is_admin: isAdmin,
      }),
      headers: {
        Authorization: `Bearer ${ANON_KEY}`,
      },
    });

    if (error instanceof FunctionsHttpError) {
      const errorMessage = await error.context.json();
      throw errorMessage;
    } else if (error instanceof FunctionsRelayError) {
      throw error.message;
    } else if (error instanceof FunctionsFetchError) {
      throw error.message;
    }

    return data;
  } catch (error) {
    console.error("Error in createUser:", error);
    return { error };
  }
};
