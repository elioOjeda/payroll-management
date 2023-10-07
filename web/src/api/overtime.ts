import { formatDateToUTC } from "../utils/functions/formatDateToUTC";
import supabase from "./supabase";
import { Database } from "./types";

export type Overtime = Database["public"]["Tables"]["overtime"]["Row"];
export type OvertimeType = Database["public"]["Enums"]["overtime_type"];

type GetOvertimeParams = {
  where: {
    employeeId?: string;
  };
};

export async function getOvertime({
  where,
}: GetOvertimeParams): Promise<Overtime[]> {
  let query = supabase
    .from("overtime")
    .select(
      `
      *
    `,
      { count: "exact" }
    )
    .eq("is_disabled", false);

  if (where.employeeId) {
    query.eq("employee_id", where.employeeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error in getOvertime:", error);
    throw error;
  }

  return (data as Overtime[]) ?? [];
}

type CreateParams = {
  companyId: string;
  employeeId: string;
  type: OvertimeType;
  date: Date;
  quantity: number;
};

export async function createOvertime({
  companyId,
  employeeId,
  type,
  date,
  quantity,
}: CreateParams): Promise<Overtime> {
  const { data, error } = await supabase
    .from("overtime")
    .insert({
      company_id: companyId,
      employee_id: employeeId,
      type,
      date: formatDateToUTC(date),
      quantity,
    })
    .select()
    .single();

  if (error) {
    console.error("Error in createOvertime:", error);
    throw error;
  }

  return data as Overtime;
}
