import { ColumnDef, OnChangeFn, RowSelectionState, VisibilityState, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"

type UseTableProps<T extends object> = {
  columns: ColumnDef<T, unknown>[]
  columnVisibility?: VisibilityState
  data: T[] | undefined
  manualPagination: boolean
  rowSelection?: RowSelectionState
  setRowSelection?: OnChangeFn<RowSelectionState>
}

export function useTable<T extends object>({
  columns,
  columnVisibility,
  manualPagination,
  data,
  rowSelection,
  setRowSelection
}: UseTableProps<T>) {
  const table = useReactTable({
    data: data ?? [],
    columns,
    initialState: {
      columnVisibility
    },
    manualPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
    enableMultiRowSelection: true,
    state: {
      rowSelection
    },
    onRowSelectionChange: setRowSelection,
  })

  return table
}