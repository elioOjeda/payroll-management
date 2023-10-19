import { Database } from "./types";
import supabase from "./supabase";
import { Company } from "./company";

export type User = Database["public"]["Tables"]["app_user"]["Row"] & {
  company: Company;
};

type GetUsersParams = {
  where: {
    companyId?: string;
  };
};

export async function getUsers({ where }: GetUsersParams): Promise<User[]> {
  let query = supabase
    .from("app_user")
    .select(
      `
      *,
      company (*)
    `,
      { count: "exact" }
    )
    .eq("is_disabled", false);

  if (where.companyId) {
    query.eq("company_id", where.companyId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error in getUsers:", error);
    throw error;
  }

  return (data as User[]) ?? [];
}

type UpdateParams = {
  userId: string;
  firstName?: string | null;
  lastName?: string | null;
  isAdmin?: boolean;
  isDisabled?: boolean;
};

export async function updateUser({
  userId,
  firstName,
  lastName,
  isAdmin,
  isDisabled,
}: UpdateParams): Promise<User> {
  if (!userId) {
    throw new Error("Error in updateUser: Invalid userId");
  }

  const { data, error } = await supabase
    .from("app_user")
    .update({
      first_name: firstName,
      last_name: lastName,
      is_admin: isAdmin,
      type: isAdmin ? "ADMIN" : "USER",
      is_disabled: isDisabled,
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error in updateUser:", error);
  }

  return data as User;
}
