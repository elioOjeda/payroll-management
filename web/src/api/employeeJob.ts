import { Database } from "./types";
import supabase from "./supabase";
import { Company } from "./company";
import { formatDateToUTC } from "../utils/functions/formatDateToUTC";

export type EmployeeJob =
  Database["public"]["Tables"]["employee_job"]["Row"] & {
    company: Company;
  };

type GetCurrentEmployeeJobParams = {
  where: {
    employeeId: string | undefined;
  };
};

export async function getCurrentEmployeeJob({
  where,
}: GetCurrentEmployeeJobParams): Promise<EmployeeJob> {
  if (!where.employeeId) {
    throw new Error("Error in getCurrentEmployeeJob: Invalid employeeId");
  }

  const { data, error } = await supabase
    .from("employee_job")
    .select()
    .eq("employee_id", where.employeeId)
    .eq("is_disabled", false)
    .eq("is_current_job", true)
    .single();

  if (error) {
    console.error("Error in getCurrentEmployeeJob:", error);
    throw error;
  }

  return data as EmployeeJob;
}

type CreateParams = {
  companyId: string;
  employeeId: string;
  jobId: string;
  startDate: Date;
};

export async function createEmployeeJob({
  companyId,
  employeeId,
  jobId,
  startDate,
}: CreateParams): Promise<EmployeeJob> {
  const { data, error } = await supabase
    .from("employee_job")
    .insert({
      company_id: companyId,
      employee_id: employeeId,
      job_id: jobId,
      start_date: formatDateToUTC(startDate),
    })
    .select(
      `
        *,
        company (*)
      `
    )
    .single();

  if (error) {
    console.error("Error in createEmployeeJob:", error);
    throw error;
  }

  return data as EmployeeJob;
}

type UpdateParams = {
  employeeJobId: string;
  currentSalary: number;
};

export async function updateEmployeeJob({
  employeeJobId,
  currentSalary,
}: UpdateParams): Promise<EmployeeJob> {
  const { data, error } = await supabase
    .from("employee_job")
    .update({
      current_salary: currentSalary,
    })
    .eq("id", employeeJobId)
    .select()
    .single();

  if (error) {
    console.error("Error in updateEmployeeJob:", error);
    throw error;
  }

  return data as EmployeeJob;
}
