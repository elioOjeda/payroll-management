import { Route, Routes } from "react-router-dom";
import EmployeesPage from "../pages/EmployeesPage";
import AppShell from "../components/layout/AppShell";
import JobPage from "../pages/JobPage";
import RaisesPage from "../pages/RaisesPage";
import EmployeeProfilePage from "../pages/EmployeeProfilePage";
import WorkAbsencesPage from "../pages/WorkAbsencesPage";
import PayrollsPage from "../pages/PayrollsPage";

export default function PrivateRouter() {
  return (
    <AppShell>
      <Routes>
        <Route path="employees" element={<EmployeesPage />} />

        <Route path="employees/:employeeId" element={<EmployeeProfilePage />} />

        <Route path="job-positions" element={<JobPage />} />

        <Route path="raises" element={<RaisesPage />} />

        <Route path="work-absences" element={<WorkAbsencesPage />} />

        <Route path="payrolls" element={<PayrollsPage />} />

        <Route path="*" element={<EmployeesPage />} />
      </Routes>
    </AppShell>
  );
}
