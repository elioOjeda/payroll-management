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
