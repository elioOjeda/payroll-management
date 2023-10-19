import { Table as MantineTable } from "@mantine/core";
import { flexRender, Table as ReactTableProps } from "@tanstack/react-table";
import { HTMLAttributes } from "react";
import styled from "styled-components";
import { CSVLink } from "react-csv";
import Button from "./Button";

const Figure = styled.figure`
  margin: 0;
  overflow-x: auto;
`;

const UITable = styled(MantineTable)`
  table-layout: fixed;
  width: 100%;
`;

type Props<T extends object> = HTMLAttributes<HTMLDivElement> & {
  table: ReactTableProps<T>;
  exportData?: any;
  exportFilename?: string;
};

export default function Table<T extends object>({
  table,
  exportData,
  exportFilename,
}: Props<T>) {
  const DEFAULT_HEADER_SIZE = 150;
  const showCSVLink = exportData && exportFilename;

  return (
    <Figure style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {showCSVLink && (
        <CSVLink data={exportData} filename={exportFilename} separator={";"}>
          <Button variant="outline">Exportar a CSV</Button>
        </CSVLink>
      )}

      <UITable striped>
        <thead>
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{
                    textAlign: "center",
                    width:
                      header.getSize() !== DEFAULT_HEADER_SIZE
                        ? header.getSize()
                        : 250,
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ textAlign: "center" }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </UITable>
    </Figure>
  );
}
