import supabase from "./supabase";
import { Database } from "./types";

export type Company = Database["public"]["Tables"]["company"]["Row"];

export async function getCompanies(): Promise<Company[]> {
  const { data, error } = await supabase
    .from("company")
    .select()
    .eq("is_disabled", false);

  if (error) {
    console.error("Error in getCompanies:", error);
    throw error;
  }

  return data ?? [];
}

type GetCompanyParams = {
  where: {
    companyId: string | undefined;
  };
};

export async function getCompany({
  where,
}: GetCompanyParams): Promise<Company | null> {
  if (!where.companyId) {
    return null;
  }

  const { data, error } = await supabase
    .from("company")
    .select()
    .eq("id", where.companyId)
    .eq("is_disabled", false)
    .single();

  if (error) {
    console.error("Error in getCompany:", error);
    throw error;
  }

  return data;
}

type CreateParams = {
  name: string;
};

export async function createCompany({ name }: CreateParams): Promise<Company> {
  const { data, error } = await supabase
    .from("company")
    .insert({
      name,
    })
    .select()
    .single();

  if (error) {
    console.error("Error in createCompany:", error);
    throw error;
  }

  return data;
}

type UpdateParams = {
  companyId: string;
  name?: string;
};

export async function updateCompany({
  companyId,
  name,
}: UpdateParams): Promise<Company> {
  if (!companyId) {
    throw new Error("Error in updateCompany: Invalid companyId");
  }

  const { data, error } = await supabase
    .from("company")
    .update({
      name,
    })
    .eq("id", companyId)
    .select()
    .single();

  if (error) {
    console.error("Error in updateCompany:", error);
    throw error;
  }

  return data;
}
