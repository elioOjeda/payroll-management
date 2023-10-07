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
