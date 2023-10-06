import { CellContext } from "@tanstack/react-table";
import { WorkAbsence } from "../../../../api/workAbsence";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export const RequestCell = ({ row }: CellContext<WorkAbsence, unknown>) => {
  const fileUrl = row.original.request_url ?? "";

  const showLink = row.original.request_url;

  return showLink ? (
    <a href={fileUrl} rel="noreferrer" target="_blank">
      <FaArrowUpRightFromSquare />
    </a>
  ) : (
    "-"
  );
};
