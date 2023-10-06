import { Database } from "./types";
import supabase from "./supabase";
import { Company } from "./company";
import { formatDateToUTC } from "../utils/functions/formatDateToUTC";

export type EmployeeJob =
  Database["public"]["Tables"]["employee_job"]["Row"] & {
    company: Company;
  };

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
