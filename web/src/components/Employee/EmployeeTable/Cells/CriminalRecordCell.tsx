import { CellContext } from "@tanstack/react-table";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Employee } from "../../../../api/employee";

export const CriminalRecordCell = ({ row }: CellContext<Employee, unknown>) => {
  const fileUrl = row.original.criminal_record ?? "";

  const showLink = row.original.criminal_record;

  return showLink ? (
    <a href={fileUrl} rel="noreferrer" target="_blank">
      <FaArrowUpRightFromSquare />
    </a>
  ) : (
    "-"
  );
};
