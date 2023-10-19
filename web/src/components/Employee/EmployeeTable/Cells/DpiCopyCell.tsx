import { CellContext } from "@tanstack/react-table";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Employee } from "../../../../api/employee";

export const DpiCopyCell = ({ row }: CellContext<Employee, unknown>) => {
  const fileUrl = row.original.dpi_copy ?? "";

  const showLink = row.original.dpi_copy;

  return showLink ? (
    <a href={fileUrl} rel="noreferrer" target="_blank">
      <FaArrowUpRightFromSquare />
    </a>
  ) : (
    "-"
  );
};
