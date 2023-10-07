import { Database } from "./types";
import supabase from "./supabase";
import { Company } from "./company";
import { Employee } from "./employee";
import { formatDateToUTC } from "../utils/functions/formatDateToUTC";

export type WorkAbsence =
  Database["public"]["Tables"]["work_absences"]["Row"] & {
    company: Company;
    employee: Employee;
  };

type GetWorkAbsencesParams = {
  where: {
    companyId?: string;
    employeeId?: string;
  };
};

export async function getWorkAbsences({
  where,
}: GetWorkAbsencesParams): Promise<WorkAbsence[]> {
  let query = supabase
    .from("work_absences")
    .select(
      `
      *,
      company (*),
      employee (*)
    `,
      { count: "exact" }
    )
    .eq("is_disabled", false)
    .order("absence_date", { ascending: false });

  if (where.companyId) {
    query.eq("company_id", where.companyId);
  }

  if (where.employeeId) {
    query.eq("employee_id", where.employeeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error in getWorkAbsences:", error);
    throw error;
  }

  return (data as WorkAbsence[]) ?? [];
}

type CreateParams = {
  companyId: string;
  employeeId: string;
  type: string;
  absenceDate: Date;
  requestUrl?: string;
};

export async function createWorkAbsence({
  companyId,
  employeeId,
  type,
  absenceDate,
  requestUrl,
}: CreateParams): Promise<WorkAbsence> {
  const { data, error } = await supabase
    .from("work_absences")
    .insert({
      company_id: companyId,
      employee_id: employeeId,
      type,
      absence_date: formatDateToUTC(absenceDate),
      request_url: requestUrl,
    })
    .select(
      `
        *,
        company (*)
      `
    )
    .single();

  if (error) {
    console.error("Error in createWorkAbsence:", error);
    throw error;
  }

  return data as WorkAbsence;
}

type UpdateParams = {
  workAbsenceId: string;
  type?: string;
  absenceDate?: Date;
  isApproved?: boolean;
  isWithPay?: boolean;
  isDisabled?: boolean;
};

export async function updateWorkAbsence({
  workAbsenceId,
  type,
  absenceDate,
  isApproved,
  isWithPay,
  isDisabled,
}: UpdateParams): Promise<WorkAbsence> {
  const { data, error } = await supabase
    .from("work_absences")
    .update({
      absence_date: absenceDate ? formatDateToUTC(absenceDate) : absenceDate,
      type,
      is_approved: isApproved,
      is_with_pay: isWithPay,
      is_disabled: isDisabled,
    })
    .eq("id", workAbsenceId)
    .select()
    .single();

  if (error) {
    console.error("Error in updateWorkAbsence:", error);
    throw error;
  }

  return data as WorkAbsence;
}
