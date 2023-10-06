import React from "react";
import { QueryKey } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { getSelectData } from "../utils/functions/getSelectData";
import Select, { SelectProps } from "./commons/Select";
import { Job, getJobs } from "../api/job";

type Props = Omit<SelectProps<string>, "data"> & {
  companyId: string;
  departmentId?: string;
};

export default function JobSelect({
  companyId,
  departmentId,
  onChange,
  ...props
}: Props) {
  const { data } = useQuery({
    queryKey: [QueryKey.Jobs, { where: { companyId, departmentId } }],
    queryFn: () => getJobs({ where: { companyId, departmentId } }),
  });

  const jobs = getSelectData<Job>({
    array: data,
    label: "title",
    value: "id",
  });

  return <Select data={jobs} onChange={onChange} {...props} />;
}
