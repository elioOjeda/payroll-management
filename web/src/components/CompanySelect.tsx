import React from "react";
import { QueryKey } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { Company, getCompanies } from "../api/company";
import { getSelectData } from "../utils/functions/getSelectData";
import Select, { SelectProps } from "./commons/Select";

type Props = Omit<SelectProps<string>, "data"> & {};

export default function CompanySelect({ onChange, ...props }: Props) {
  const { data } = useQuery({
    queryKey: [QueryKey.Companies],
    queryFn: getCompanies,
  });

  const companies = getSelectData<Company>({
    array: data,
    label: "name",
    value: "id",
  });

  return <Select data={companies} onChange={onChange} {...props} />;
}
