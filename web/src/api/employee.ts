import { Database } from "./types";
import supabase from "./supabase";
import { Company } from "./company";
import { formatDateToUTC } from "../utils/functions/formatDateToUTC";
import { EmployeeJob } from "./employeeJob";
import { WorkAbsence } from "./workAbsence";

export type Employee = Database["public"]["Tables"]["employee"]["Row"] & {
  company: Company;
  employee_job: EmployeeJob;
  work_absences: WorkAbsence;
};

type GetEmployeesParams = {
  where: {
    companyId?: string;
  };
};

export async function getEmployees({
  where,
}: GetEmployeesParams): Promise<Employee[]> {
  let query = supabase
    .from("employee")
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
    console.error("Error in getEmployees:", error);
    throw error;
  }

  return (data as Employee[]) ?? [];
}

type GetEmployeeParams = {
  where: {
    employeeId: string | undefined;
  };
};

export async function getEmployee({
  where,
}: GetEmployeeParams): Promise<Employee> {
  if (!where.employeeId) {
    throw new Error("Error in getEmployee: Invalid employeeId");
  }

  const { data, error } = await supabase
    .from("employee")
    .select(
      `
        *,
        company (*),
        employee_job (*),
        work_absences (*)
      `,
      { count: "exact" }
    )
    .eq("id", where.employeeId)
    .eq("is_disabled", false)
    .single();

  if (error) {
    console.error("Error in getEmployee:", error);
    throw error;
  }

  return data as unknown as Employee;
}

type CreateParams = {
  companyId: string;
  firstName: string;
  lastName: string;
  birthDate?: Date;
  address?: string;
  phone?: string;
  email?: string;
  photoUrl?: string;
  hireDate: Date;
};

export async function createEmployee({
  companyId,
  firstName,
  lastName,
  birthDate,
  address,
  phone,
  email,
  photoUrl,
  hireDate,
}: CreateParams): Promise<Employee> {
  const { data, error } = await supabase
    .from("employee")
    .insert({
      company_id: companyId,
      first_name: firstName,
      last_name: lastName,
      birth_date: birthDate ? formatDateToUTC(birthDate) : birthDate,
      address,
      phone,
      email,
      photo_url: photoUrl,
      hire_date: formatDateToUTC(hireDate),
    })
    .select(
      `
        *,
        company (*)
      `
    )
    .single();

  if (error) {
    console.error("Error in createEmployee:", error);
    throw error;
  }

  return data as Employee;
}

type UpdateParams = {
  employeeId: string;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  hireDate?: Date;
  isDisabled?: boolean;
};

export async function updateEmployee({
  employeeId,
  firstName,
  lastName,
  birthDate,
  address,
  phone,
  email,
  hireDate,
  isDisabled,
}: UpdateParams): Promise<Employee> {
  if (!employeeId) {
    throw new Error("Error in updateEmployee: Invalid employeeId");
  }

  const { data, error } = await supabase
    .from("employee")
    .update({
      first_name: firstName,
      last_name: lastName,
      birth_date: birthDate ? formatDateToUTC(birthDate) : birthDate,
      address,
      phone,
      email,
      hire_date: hireDate ? formatDateToUTC(hireDate) : hireDate,
      is_disabled: isDisabled,
    })
    .eq("id", employeeId)
    .select()
    .single();

  if (error) {
    console.error("Error in updateEmployee:", error);
  }

  return data as Employee;
}
