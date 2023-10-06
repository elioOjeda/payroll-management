import { CellContext } from "@tanstack/react-table";
import React from "react";
import { Link } from "react-router-dom";
import { Employee } from "../../../../api/employee";

export default function FirstNameCell({ row }: CellContext<Employee, unknown>) {
  const route = `/employees/${row.original.id}`;

  return <Link to={route}>{row.original.first_name}</Link>;
}
