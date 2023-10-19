import { formatDateToUTC } from "../utils/functions/formatDateToUTC";
import {
  EmployeeJob,
  getCurrentEmployeeJob,
  updateEmployeeJob,
} from "./employeeJob";
import { Job } from "./job";
import supabase from "./supabase";
import { Database } from "./types";

export type Raise = Database["public"]["Tables"]["raise"]["Row"] & {
  employee_job: EmployeeJob & {
    job: Job;
  };
};

type GetRaisesParams = {
  where: {
    employeeId?: string;
  };
};

export async function getRaises({ where }: GetRaisesParams): Promise<Raise[]> {
  let query = supabase
    .from("raise")
    .select(
      `
      *,
      employee_job!inner (
        *,
        job (
          *,
          department (*)
        )
      )
    `,
      { count: "exact" }
    )
    .eq("is_disabled", false);

  if (where.employeeId) {
    query.eq("employee_job.employee_id", where.employeeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error in getRaises:", error);
    throw error;
  }

  return (data as Raise[]) ?? [];
}

type CreateParams = {
  companyId: string;
  employeeId: string;
  raiseAmount: number;
  raiseDate: Date;
  description?: string;
};

export async function createRaise({
  companyId,
  employeeId,
  raiseAmount,
  raiseDate,
  description,
}: CreateParams): Promise<Raise> {
  const currentEmployeeJob = await getCurrentEmployeeJob({
    where: { employeeId },
  });

  const { id: employeeJobId, current_salary: currentSalary } =
    currentEmployeeJob;

  const { data, error } = await supabase
    .from("raise")
    .insert({
      company_id: companyId,
      employee_job_id: employeeJobId,
      raise_amount: raiseAmount,
      raise_date: formatDateToUTC(raiseDate),
      description,
    })
    .select()
    .single();

  if (error) {
    console.error("Error in createRaise:", error);
    throw error;
  }

  if (currentSalary) {
    await updateEmployeeJob({
      employeeJobId,
      currentSalary: Number(currentSalary) + Number(raiseAmount),
    });
  }

  return data as Raise;
}
