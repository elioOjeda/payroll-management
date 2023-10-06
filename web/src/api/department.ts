import { Database } from "./types";
import supabase from "./supabase";
import { Company } from "./company";

export type Deparment = Database["public"]["Tables"]["department"]["Row"] & {
  company: Company;
};

type GetDeparmentsParams = {
  where: {
    companyId: string;
  };
};

export async function getDepartments({
  where,
}: GetDeparmentsParams): Promise<Deparment[]> {
  const { data, error } = await supabase
    .from("department")
    .select(
      `
      *,
      company (*)
    `,
      { count: "exact" }
    )
    .eq("company_id", where.companyId)
    .eq("is_disabled", false);

  if (error) {
    console.error("Error in getDepartments:", error);
    throw error;
  }

  return (data as Deparment[]) ?? [];
}
