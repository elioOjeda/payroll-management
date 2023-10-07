import supabase from "../supabase";
import { formatDateToUTC } from "../../utils/functions/formatDateToUTC";
import { Database } from "../types";
import { lastDayOfMonth } from "date-fns";

type Params = {
  where: {
    companyId?: string;
    month: Date;
  };
};

export type CalculateMonthlyPayroll =
  Database["public"]["Functions"]["calculate_monthly_payroll"]["Returns"];

export async function calculateMonthlyPayroll({
  where: { companyId, month },
}: Params): Promise<CalculateMonthlyPayroll | null> {
  if (!companyId) return null;

  const { data: employees } = await supabase
    .from("employee")
    .select("*", { count: "exact" })
    .eq("is_disabled", false)
    .eq("company_id", companyId);

  if (!employees) return null;

  const promises = employees.map(async (employee) => {
    const { data, error } = await supabase.rpc("calculate_monthly_payroll", {
      p_employee_id: employee.id,
      p_start_date: formatDateToUTC(month),
      p_end_date: formatDateToUTC(lastDayOfMonth(month)),
    });

    if (error) {
      console.error(`Error para el empleado ${employee.id}:`, error);
      return null;
    }

    return data[0];
  });

  const results = await Promise.all(promises);

  return (results as CalculateMonthlyPayroll) ?? [];
}
