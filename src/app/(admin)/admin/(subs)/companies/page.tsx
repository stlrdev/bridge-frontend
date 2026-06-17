"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/button";
import { DataTable, Column } from "@/components/shared/datatable";
import { Icons } from "@/components/shared/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";
import ActivityStatusChip from "@/components/shared/activity-status-chip";
import { useCompanies } from "@/features/companies/hooks";
import type { Company } from "@/features/companies/types";

const companiesColumns: Column<Company>[] = [
  {
    key: "name",
    label: "Company Name",
    sortable: true,
  },
  {
    key: "contactEmail",
    label: "Contact Email",
    sortable: true,
    render: (value) => value ?? "—",
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value) => <ActivityStatusChip status={value} />,
  },
  {
    key: "enabledMerchants",
    label: "Merchants",
    sortable: false,
    render: (value: string[]) => (
      <span className="text-sm font-medium">{value.length}</span>
    ),
  },
  {
    key: "createdAt",
    label: "Created",
    sortable: true,
    render: (value) => new Date(value).toLocaleDateString(),
  },
];

export default function CompaniesPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const pageSize = 10;

  const { data, isLoading } = useCompanies({ page: currentPage, pageSize, search: search || undefined });

  const companyRowActions = (company: Company) => (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={() => router.push(`/admin/companies/${company.id}`)}
      >
        <Eye className="w-3 h-3" />
      </Button>
    </div>
  );
  const companies = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  return (
    <>
      <div className="grid grid-cols-4 gap-[10px]">
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Total Companies
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-1">
            <p className="text-4xl font-bold">{isLoading ? "—" : total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Active Companies
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-1">
            <p className="text-4xl font-bold text-green-500">
              {isLoading
                ? "—"
                : companies.filter((c) => c.status === "active").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Suspended
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-2">
            <p className="text-4xl font-bold text-warning">
              {isLoading
                ? "—"
                : companies.filter((c) => c.status === "suspended").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Inactive
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-1">
            <p className="text-4xl font-bold text-muted-foreground">
              {isLoading
                ? "—"
                : companies.filter((c) => c.status === "inactive").length}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="my-5 flex items-center justify-between">
        <h3 className="text-lg font-bold">All Companies</h3>
        <Button
          leftIcon={<Icons.AddCircle color="white" />}
          className="text-white font-semibold"
          href="/admin/companies/add"
        >
          Add Company
        </Button>
      </div>
      <DataTable
        data={companies}
        columns={companiesColumns}
        rowActions={companyRowActions}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        totalPages={totalPages}
        actions={{
          search: {
            placeholder: "Search companies...",
            onSearch: (query) => { setSearch(query); setCurrentPage(1); },
          },
        }}
      />
    </>
  );
}
