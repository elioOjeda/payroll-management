import { CellContext } from "@tanstack/react-table";
import React from "react";
import { Job } from "../../../../api/job";

export const BaseSalaryCell = ({ row }: CellContext<Job, unknown>) => {
  return <label>{row.original.base_salary?.toFixed(2)}</label>;
};
