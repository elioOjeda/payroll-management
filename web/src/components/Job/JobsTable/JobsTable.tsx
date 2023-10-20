import React, { useMemo } from "react";
import styled from "styled-components";
import Table from "../../commons/Table";
import { useTable } from "../../../hooks/useTable";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../utils/constants";
import { Job, getJobs } from "../../../api/job";
import { ActionsCell, BaseSalaryCell } from "./Cells";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

type Props = {
  companyId?: string;
  departmentId?: string;
};

export default function JobsTable({ companyId, departmentId }: Props) {
  const { data } = useQuery({
    queryKey: [QueryKey.Jobs, { where: { companyId, departmentId } }],
    queryFn: () => getJobs({ where: { companyId, departmentId } }),
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "department.name",
        header: "Departamento",
      },
      {
        accessorKey: "title",
        header: "Puesto",
      },
      {
        accessorKey: "description",
        header: "Descripción",
      },
      {
        accessorKey: "base_salary",
        header: "Salario base (GTQ)",
        cell: BaseSalaryCell,
      },
      {
        header: "Acciones",
        cell: ActionsCell,
      },
    ],
    []
  );

  const table = useTable<Job>({
    columns,
    data: data ?? [],
    manualPagination: true,
  });

  if (!data) return null;

  const exportData = data.map(
    ({ department: { name }, title, description }) => ({
      Departamento: name,
      Puesto: title,
      Descripción: description,
    })
  );

  return (
    <Container>
      <Table
        table={table}
        exportData={exportData}
        exportFilename="puestos-laborales"
      />
    </Container>
  );
}
