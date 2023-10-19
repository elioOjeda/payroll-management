import { Database } from "./types";
import supabase from "./supabase";
import { Company } from "./company";

export type Department = Database["public"]["Tables"]["department"]["Row"] & {
  company: Company;
};

type GetDeparmentsParams = {
  where: {
    companyId?: string;
  };
};

export async function getDepartments({
  where,
}: GetDeparmentsParams): Promise<Department[]> {
  let query = supabase
    .from("department")
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
    console.error("Error in getDepartments:", error);
    throw error;
  }

  return (data as Department[]) ?? [];
}

type CreateParams = {
  companyId: string;
  name: string;
  description?: string;
};

export async function createDepartment({
  companyId,
  name,
  description,
}: CreateParams): Promise<Department> {
  const { data, error } = await supabase
    .from("department")
    .insert({
      company_id: companyId,
      name,
      description,
    })
    .select()
    .single();

  if (error) {
    console.error("Error in createDepartment:", error);
    throw error;
  }

  return data as Department;
}

type UpdateParams = {
  departmentId: string;
  name?: string;
  description?: string | null;
};

export async function updateDepartment({
  departmentId,
  name,
  description,
}: UpdateParams): Promise<Department> {
  if (!departmentId) {
    throw new Error("Error in updateDepartment: Invalid departmentId");
  }

  const { data, error } = await supabase
    .from("department")
    .update({
      name,
      description,
    })
    .eq("id", departmentId)
    .select()
    .single();

  if (error) {
    console.error("Error in updateDepartment:", error);
    throw error;
  }

  return data as Department;
}
