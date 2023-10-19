import { CellContext } from "@tanstack/react-table";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Employee } from "../../../../api/employee";

export const TitlePhotostaticCell = ({
  row,
}: CellContext<Employee, unknown>) => {
  const fileUrl = row.original.title_photostatic ?? "";

  const showLink = row.original.title_photostatic;

  return showLink ? (
    <a href={fileUrl} rel="noreferrer" target="_blank">
      <FaArrowUpRightFromSquare />
    </a>
  ) : (
    "-"
  );
};
