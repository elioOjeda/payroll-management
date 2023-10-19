import { Database } from "./types";
import supabase from "./supabase";
import { Company } from "./company";
import { Department } from "./department";

export type Job = Database["public"]["Tables"]["job"]["Row"] & {
  company: Company;
  department: Department;
};

type GetJobsParams = {
  where: {
    companyId?: string;
    departmentId?: string;
  };
};

export async function getJobs({ where }: GetJobsParams): Promise<Job[]> {
  let query = supabase
    .from("job")
    .select(
      `
      *,
      company (*),
      department (*)
    `,
      { count: "exact" }
    )
    .eq("is_disabled", false);

  if (where.companyId) {
    query.eq("company_id", where.companyId);
  }

  if (where.departmentId) {
    query.eq("department_id", where.departmentId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error in getJobs:", error);
    throw error;
  }

  return (data as Job[]) ?? [];
}

type CreateParams = {
  companyId: string;
  departmentId: string;
  title: string;
  description?: string;
};

export async function createJob({
  companyId,
  departmentId,
  title,
  description,
}: CreateParams): Promise<Job> {
  const { data, error } = await supabase
    .from("job")
    .insert({
      company_id: companyId,
      department_id: departmentId,
      title,
      description,
    })
    .select(
      `
        *,
        company (*)
      `
    )
    .single();

  if (error) {
    console.error("Error in createJob:", error);
    throw error;
  }

  return data as Job;
}

type UpdateParams = {
  jobId: string;
  departmentId?: string;
  title?: string;
  description?: string | null;
  isDisabled?: boolean;
};

export async function updateJob({
  jobId,
  departmentId,
  title,
  description,
  isDisabled,
}: UpdateParams): Promise<Job> {
  if (!jobId) {
    throw new Error("Error in updateJob: Invalid jobId");
  }

  const { data, error } = await supabase
    .from("job")
    .update({
      department_id: departmentId,
      title,
      description,
      is_disabled: isDisabled,
    })
    .eq("id", jobId)
    .select()
    .single();

  if (error) {
    console.error("Error in updateJob:", error);
  }

  return data as Job;
}
