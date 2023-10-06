import React from "react";
import { QueryKey } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { getSelectData } from "../utils/functions/getSelectData";
import Select, { SelectProps } from "./commons/Select";
import { Employee, getEmployees } from "../api/employee";

type Props = Omit<SelectProps<string>, "data"> & {
  companyId: string;
};

export default function EmployeeSelect({
  companyId,
  onChange,
  ...props
}: Props) {
  const { data } = useQuery({
    queryKey: [QueryKey.Employees, { where: { companyId } }],
    queryFn: () => getEmployees({ where: { companyId } }),
  });

  const employees = getSelectData<Employee>({
    array: data,
    label: "first_name",
    value: "id",
  });

  return <Select data={employees} onChange={onChange} {...props} />;
}
