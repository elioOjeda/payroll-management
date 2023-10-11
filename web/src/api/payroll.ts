import { formatDateToUTC } from "../utils/functions/formatDateToUTC";
import supabase from "./supabase";
import { Database } from "./types";

export type Payroll = Database["public"]["Tables"]["payroll"]["Row"];

type GetPayrollsParams = {
  where: {
    companyId?: string;
  };
};

export async function getPayrolls({
  where,
}: GetPayrollsParams): Promise<Payroll[] | null> {
  if (!where.companyId) return null;

  let query = supabase
    .from("payroll")
    .select("*", { count: "exact" })
    .eq("is_disabled", false)
    .eq("company_id", where.companyId)
    .order("payroll_date", { ascending: false });

  const { data, error } = await query;

  if (error) {
    console.error("Error in getPayrolls:", error);
    throw error;
  }

  return (data as Payroll[]) ?? [];
}

type GetPayrollParams = {
  where: {
    payrollId?: string;
  };
};

export async function getPayroll({
  where,
}: GetPayrollParams): Promise<Payroll> {
  if (!where.payrollId) {
    throw new Error("Error in getPayroll: Invalid payrollId");
  }

  const { data, error } = await supabase
    .from("payroll")
    .select()
    .eq("is_disabled", false)
    .eq("id", where.payrollId);

  if (error) {
    console.error("Error in getPayroll:", error);
    throw error;
  }

  return data[0] as Payroll;
}

type CreateParams<T> = {
  companyId: string;
  payrollDate: Date;
  payrollData: Array<T>;
};

export async function createPayroll<T>({
  companyId,
  payrollDate,
  payrollData,
}: CreateParams<T>): Promise<Payroll> {
  const { data, error } = await supabase
    .from("payroll")
    .insert({
      company_id: companyId,
      payroll_date: formatDateToUTC(payrollDate),
      payroll_data: JSON.stringify(payrollData),
    })
    .select()
    .single();

  if (error) {
    console.error("Error in createPayroll:", error);
    throw error;
  }

  return data as Payroll;
}
