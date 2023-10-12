import { CellContext } from "@tanstack/react-table";
import { Raise } from "../../../../api/raise";

export const RaiseDateCell = ({ row }: CellContext<Raise, unknown>) => {
  return <label>{row.original.raise_date}</label>;
};
