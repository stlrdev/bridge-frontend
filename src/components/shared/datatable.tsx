"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Pagination } from "./pagination";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  MoreHorizontal,
  Search,
  Download,
  RefreshCw,
} from "lucide-react";

export interface Column<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  width?: string | number;
  minWidth?: string | number;
}

export interface DataTableProps<T = any> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  error?: string;
  empty?: React.ReactNode;
  className?: string;

  // Pagination
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  pageSize?: number;
  onPageSizeChange?: (pageSize: number) => void;

  // Sorting
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (key: string, direction: "asc" | "desc") => void;

  // Selection
  selectable?: boolean;
  selectedRows?: T[];
  onSelectionChange?: (selectedRows: T[]) => void;
  getRowId?: (row: T, index: number) => string | number;

  // Actions
  actions?: {
    search?: {
      placeholder?: string;
      onSearch: (query: string) => void;
      value?: string;
    };
    refresh?: {
      onRefresh: () => void;
      loading?: boolean;
    };
    export?: {
      onExport: () => void;
      label?: string;
    };
    custom?: React.ReactNode;
  };

  // Row actions
  rowActions?: (row: T, index: number) => React.ReactNode;

  // Styling
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  bordered?: boolean;

  // Custom rendering
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  error,
  empty = "No data available",
  className,

  // Pagination
  currentPage = 1,
  totalPages,
  onPageChange,
  pageSize = 10,
  onPageSizeChange,

  // Sorting
  sortKey,
  sortDirection,
  onSort,

  // Selection
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  getRowId = (row, index) => index,

  // Actions
  actions,

  // Row actions
  rowActions,

  // Styling
  striped = true,
  hoverable = true,
  compact = false,
  bordered = true,

  // Custom rendering
  header,
  footer,
}: DataTableProps<T>) => {
  const [searchQuery, setSearchQuery] = React.useState(
    actions?.search?.value || "",
  );

  // State for tracking row heights
  const [rowHeights, setRowHeights] = React.useState<number[]>([]);
  const rowRefs = React.useRef<(HTMLTableRowElement | null)[]>([]);
  const observerRef = React.useRef<ResizeObserver | null>(null);

  // Setup ResizeObserver to track row heights
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    observerRef.current = new ResizeObserver((entries) => {
      const newHeights: number[] = [];

      entries.forEach((entry) => {
        const rowIndex = parseInt(
          entry.target.getAttribute("data-row-index") || "0",
        );
        if (!isNaN(rowIndex)) {
          newHeights[rowIndex] = entry.contentRect.height;
        }
      });

      if (newHeights.length > 0) {
        setRowHeights((prev) => {
          const updated = [...prev];
          newHeights.forEach((height, index) => {
            if (height > 0) {
              updated[index] = height;
            }
          });
          return updated;
        });
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Calculate total pages if not provided
  const calculatedTotalPages = totalPages || Math.ceil(data.length / pageSize);

  // Paginate data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  // Add empty rows to maintain consistent table height
  const displayData = [...paginatedData];
  const emptyRowsNeeded = pageSize - paginatedData.length;

  // Create empty placeholder objects
  const emptyRow = {} as T;
  for (let i = 0; i < emptyRowsNeeded; i++) {
    displayData.push(emptyRow);
  }

  // Calculate average height of non-empty rows
  const averageRowHeight = React.useMemo(() => {
    const nonEmptyRowHeights = rowHeights.filter((height, index) => {
      const row = displayData[index];
      return height > 0 && row && Object.keys(row).length > 0;
    });

    if (nonEmptyRowHeights.length === 0) {
      return compact ? 40 : 48; // Default fallback height
    }

    const sum = nonEmptyRowHeights.reduce((acc, height) => acc + height, 0);
    return sum / nonEmptyRowHeights.length;
  }, [rowHeights, displayData, compact]);

  // Observe row elements when they change
  React.useEffect(() => {
    rowRefs.current.forEach((row, index) => {
      if (row && !row.getAttribute("data-row-index")) {
        row.setAttribute("data-row-index", index.toString());
        observerRef.current?.observe(row);
      }
    });
  }, [displayData]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    actions?.search?.onSearch(query);
  };

  // Handle selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange?.([
        ...displayData.filter((row) => row && Object.keys(row).length > 0),
      ]);
    } else {
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (row: T, checked: boolean) => {
    if (checked) {
      onSelectionChange?.([...selectedRows, row]);
    } else {
      onSelectionChange?.(
        selectedRows.filter((r) => getRowId(r, 0) !== getRowId(row, 0)),
      );
    }
  };

  const realDataCount = displayData.filter(
    (row) => row && Object.keys(row).length > 0,
  ).length;
  const isAllSelected =
    realDataCount > 0 && selectedRows.length === realDataCount;
  const isIndeterminate =
    selectedRows.length > 0 && selectedRows.length < realDataCount;

  // Handle sorting
  const handleSort = (key: string) => {
    if (!onSort) return;

    const newDirection =
      sortKey === key && sortDirection === "asc" ? "desc" : "asc";
    onSort(key, newDirection);
  };

  const getSortIcon = (key: string) => {
    if (sortKey !== key) {
      return <ChevronsUpDown className="w-4 h-4 opacity-50" />;
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  // Table styling classes
  const tableClasses = cn(
    "w-full",
    bordered && "border border-border rounded-lg overflow-hidden",
    className,
  );

  const theadClasses = cn(
    "bg-muted/50 border-b border-border",
    compact ? "h-10" : "h-12",
  );

  const tbodyClasses = cn(
    striped && "[&_tr:nth-child(even)]:bg-muted/25",
    hoverable && "[&_tr:hover]:bg-muted/50",
    "[&_tr:last-child_td]:border-b-0",
  );

  const cellClasses = cn(
    "px-4 text-sm",
    compact ? "py-2" : "py-3",
    "border-b border-border",
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 animate-spin mr-2" />
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-destructive">
        {error}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        {empty}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with actions */}
      {(header || actions) && (
        <div className="flex items-center justify-between gap-4">
          {header}

          {actions && (
            <div className="flex items-center gap-2">
              {/* Search */}
              {actions.search && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={actions.search.placeholder || "Search..."}
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
              )}

              {/* Refresh */}
              {actions.refresh && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={actions.refresh.onRefresh}
                  disabled={actions.refresh.loading}
                >
                  <RefreshCw
                    className={cn(
                      "w-4 h-4",
                      actions.refresh.loading && "animate-spin",
                    )}
                  />
                </Button>
              )}

              {/* Export */}
              {actions.export && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={actions.export.onExport}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {actions.export.label || "Export"}
                </Button>
              )}

              {/* Custom actions */}
              {actions.custom}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className={tableClasses}>
        <table className="w-full">
          <thead className={theadClasses}>
            <tr>
              {/* Select all checkbox */}
              {selectable && (
                <th className={cn(cellClasses, "w-12")}>
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-border"
                  />
                </th>
              )}

              {/* Column headers */}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    cellClasses,
                    "text-left font-medium text-foreground",
                    column.headerClassName,
                    column.sortable && "cursor-pointer hover:bg-muted/50",
                  )}
                  style={{
                    width: column.width,
                    minWidth: column.minWidth,
                  }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}

              {/* Row actions header */}
              {rowActions && (
                <th className={cn(cellClasses, "w-12 text-center")}>
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>

          <tbody className={tbodyClasses}>
            {displayData.map((row, index) => {
              const isEmptyRow = !row || Object.keys(row).length === 0;
              const isSelected =
                !isEmptyRow &&
                selectedRows.some(
                  (r) => getRowId(r, 0) === getRowId(row, index),
                );

              return (
                <tr
                  key={getRowId(row, index)}
                  ref={(el) => {
                    rowRefs.current[index] = el;
                  }}
                  className={cn(
                    isSelected && "bg-primary/5",
                    isEmptyRow && "opacity-30",
                    "transition-colors",
                  )}
                  style={{
                    height: isEmptyRow ? `${averageRowHeight}px` : undefined,
                  }}
                >
                  {/* Row selection checkbox */}
                  {selectable && (
                    <td className={cellClasses}>
                      {!isEmptyRow && (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) =>
                            handleSelectRow(row, e.target.checked)
                          }
                          className="rounded border-border"
                        />
                      )}
                    </td>
                  )}

                  {/* Data cells */}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(cellClasses, column.className)}
                    >
                      {isEmptyRow ? (
                        <span className="text-muted-foreground">&nbsp;</span>
                      ) : column.render ? (
                        column.render(row[column.key], row, index)
                      ) : (
                        row[column.key]
                      )}
                    </td>
                  ))}

                  {/* Row actions */}
                  {rowActions && (
                    <td className={cn(cellClasses, "text-center")}>
                      {!isEmptyRow ? rowActions(row, index) : null}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer with pagination */}
      {footer || (onPageChange && calculatedTotalPages > 1) ? (
        <div className="flex items-center justify-between gap-4 mt-4 p-4">
          {footer}

          {onPageChange && calculatedTotalPages > 1 && (
            <div className="flex items-center gap-4 w-full">
              {/* Pagination */}
              {onPageSizeChange && pageSize && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Show</span>
                  <select
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    className="border border-border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span className="text-sm text-muted-foreground">
                    per page
                  </span>
                </div>
              )}

              {/* Pagination */}
              <div className="flex items-center justify-between gap-5 w-full">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to {Math.min(endIndex, data.length)}{" "}
                  of {data.length} companies.
                </p>
                <Pagination
                  currentPage={currentPage}
                  totalPages={calculatedTotalPages}
                  onPageChange={onPageChange}
                />
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

DataTable.displayName = "DataTable";

export { DataTable };
