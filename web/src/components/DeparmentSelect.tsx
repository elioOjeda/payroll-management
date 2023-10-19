import React from "react";
import { QueryKey } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { getSelectData } from "../utils/functions/getSelectData";
import Select, { SelectProps } from "./commons/Select";
import { Department, getDepartments } from "../api/department";

type Props = Omit<SelectProps<string>, "data"> & {
  companyId: string;
};

export default function DeparmentSelect({
  companyId,
  onChange,
  ...props
}: Props) {
  const { data } = useQuery({
    queryKey: [QueryKey.Deparments, { where: { companyId } }],
    queryFn: () => getDepartments({ where: { companyId } }),
  });

  const deparments = getSelectData<Department>({
    array: data,
    label: "name",
    value: "id",
  });

  return <Select data={deparments} onChange={onChange} {...props} />;
}
