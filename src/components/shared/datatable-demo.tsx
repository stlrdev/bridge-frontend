"use client";

import * as React from "react";
import { DataTable, Column } from "./datatable";
import { Button } from "./button";
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";

// Sample data type
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  lastLogin: string;
}

// Sample data
const sampleUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    createdAt: "2024-01-15",
    lastLogin: "2024-04-06",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
    createdAt: "2024-02-20",
    lastLogin: "2024-04-05",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "inactive",
    createdAt: "2024-03-10",
    lastLogin: "2024-03-25",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Manager",
    status: "pending",
    createdAt: "2024-03-25",
    lastLogin: "Never",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "User",
    status: "active",
    createdAt: "2024-04-01",
    lastLogin: "2024-04-06",
  },
];

export function DataTableDemo() {
  const [data, setData] = React.useState<User[]>(sampleUsers);
  const [loading, setLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [sortKey, setSortKey] = React.useState<string>("name");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc",
  );
  const [selectedRows, setSelectedRows] = React.useState<User[]>([]);

  // Filter data based on search
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return data;

    return data.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [data, searchQuery]);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey as keyof User];
      const bValue = b[sortKey as keyof User];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Define columns
  const columns: Column<User>[] = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (value) => <div className="font-medium">{value}</div>,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
          {value}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => {
        const colors: Record<string, string> = {
          active: "bg-green-100 text-green-800",
          inactive: "bg-gray-100 text-gray-800",
          pending: "bg-yellow-100 text-yellow-800",
        };
        return (
          <span
            className={`px-2 py-1 text-xs rounded-full ${colors[value] || "bg-gray-100 text-gray-800"}`}
          >
            {value}
          </span>
        );
      },
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
    },
    {
      key: "lastLogin",
      label: "Last Login",
      sortable: true,
    },
  ];

  // Row actions
  const rowActions = (row: User) => (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon-xs">
        <Eye className="w-3 h-3" />
      </Button>
      <Button variant="ghost" size="icon-xs">
        <Edit className="w-3 h-3" />
      </Button>
      <Button variant="ghost" size="icon-xs">
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  );

  // Handlers
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSort = (key: string, direction: "asc" | "desc") => {
    setSortKey(key);
    setSortDirection(direction);
  };

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    // Simulate export functionality
    console.log("Exporting data...");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Data Table Demo</h1>
        <p className="text-muted-foreground">
          A customizable datatable component with pagination, sorting, search,
          and selection.
        </p>
      </div>

      <DataTable
        data={paginatedData}
        columns={columns}
        loading={loading}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        getRowId={(row) => row.id}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setCurrentPage(1);
        }}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={handleSort}
        rowActions={rowActions}
        actions={{
          search: {
            placeholder: "Search users...",
            onSearch: handleSearch,
            value: searchQuery,
          },
          refresh: {
            onRefresh: handleRefresh,
            loading,
          },
          export: {
            onExport: handleExport,
            label: "Export CSV",
          },
        }}
        striped
        hoverable
        bordered
        header={
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Users</h2>
            {selectedRows.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {selectedRows.length} user{selectedRows.length > 1 ? "s" : ""}{" "}
                selected
              </p>
            )}
          </div>
        }
        footer={
          <div className="text-sm text-muted-foreground">
            Showing {paginatedData.length} of {sortedData.length} users
          </div>
        }
      />
    </div>
  );
}
