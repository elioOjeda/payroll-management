import { CellContext } from "@tanstack/react-table";
import { Overtime } from "../../../../api/overtime";

export const DateCell = ({ row }: CellContext<Overtime, unknown>) => {
  return <label>{row.original.date}</label>;
};
