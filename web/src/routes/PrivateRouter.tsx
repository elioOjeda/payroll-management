import { Route, Routes } from "react-router-dom";
import EmployeesPage from "../pages/EmployeesPage";
import AppShell from "../components/layout/AppShell";
import JobPage from "../pages/JobPage";
import EmployeeProfilePage from "../pages/EmployeeProfilePage";
import WorkAbsencesPage from "../pages/WorkAbsencesPage";
import PayrollsPage from "../pages/PayrollsPage";
import GeneratePayrollPage from "../pages/GeneratePayrollPage";
import PayrollDetail from "../pages/PayrollDetail";

export default function PrivateRouter() {
  return (
    <AppShell>
      <Routes>
        <Route path="employees" element={<EmployeesPage />} />

        <Route path="employees/:employeeId" element={<EmployeeProfilePage />} />

        <Route path="job-positions" element={<JobPage />} />

        <Route path="work-absences" element={<WorkAbsencesPage />} />

        <Route path="generate-payroll" element={<GeneratePayrollPage />} />

        <Route path="payrolls" element={<PayrollsPage />} />

        <Route path="payrolls/:payrollId" element={<PayrollDetail />} />

        <Route path="*" element={<EmployeesPage />} />
      </Routes>
    </AppShell>
  );
}
