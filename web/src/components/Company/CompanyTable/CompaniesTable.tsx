import React, { useMemo } from "react";
import styled from "styled-components";
import Table from "../../commons/Table";
import { useTable } from "../../../hooks/useTable";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../utils/constants";
import { ActionsCell } from "./Cells";
import { Company, getCompanies } from "../../../api/company";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

type Props = {
  companyId?: string;
  departmentId?: string;
};

export default function CompaniesTable({ companyId, departmentId }: Props) {
  const { data } = useQuery({
    queryKey: [QueryKey.Companies],
    queryFn: getCompanies,
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Nombre",
      },
      {
        header: "Acciones",
        cell: ActionsCell,
      },
    ],
    []
  );

  const table = useTable<Company>({
    columns,
    data: data ?? [],
    manualPagination: true,
  });

  if (!data) return null;

  const exportData = data.map(({ name }) => ({
    Nombre: name,
  }));

  return (
    <Container>
      <Table table={table} exportData={exportData} exportFilename="empresas" />
    </Container>
  );
}
