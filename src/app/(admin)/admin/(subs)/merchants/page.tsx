"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/button";
import { DataTable, Column } from "@/components/shared/datatable";
import { Icons } from "@/components/shared/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";
import ActivityStatusChip from "@/components/shared/activity-status-chip";
import CategoryChip from "@/components/shared/category-chip";
import { useMerchants } from "@/features/merchants/hooks";
import type { Merchant } from "@/features/merchants/types";

const merchantColumns: Column<Merchant>[] = [
  {
    key: "name",
    label: "Merchant Name",
    sortable: true,
  },
  {
    key: "category",
    label: "Category",
    sortable: true,
    render: (value) => <CategoryChip category={value} />,
  },
  {
    key: "contactEmail",
    label: "Contact Email",
    sortable: false,
    render: (value) => value ?? "—",
  },
  {
    key: "branchCount",
    label: "Branches",
    sortable: true,
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value) => <ActivityStatusChip status={value} />,
  },
];

export default function MerchantsPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const pageSize = 10;

  const { data, isLoading } = useMerchants({ page: currentPage, pageSize, search: search || undefined });

  const merchantRowActions = (merchant: Merchant) => (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={() => router.push(`/admin/merchants/${merchant.id}`)}
      >
        <Eye className="w-3 h-3" />
      </Button>
    </div>
  );
  const merchants = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  return (
    <>
      <div className="grid grid-cols-4 gap-[10px]">
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Total Merchants
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-1">
            <p className="text-4xl font-bold">{isLoading ? "—" : total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Active
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-1">
            <p className="text-4xl font-bold text-green-500">
              {isLoading
                ? "—"
                : merchants.filter((m) => m.status === "active").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-2">
            <p className="text-4xl font-bold text-warning">
              {isLoading
                ? "—"
                : merchants.filter((m) => m.status === "pending").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Suspended
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-1">
            <p className="text-4xl font-bold text-destructive">
              {isLoading
                ? "—"
                : merchants.filter((m) => m.status === "suspended").length}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="my-5 flex items-center justify-between">
        <h3 className="text-lg font-bold">All Merchants</h3>
        <Button
          leftIcon={<Icons.AddCircle color="white" />}
          className="text-white font-semibold"
          href="/admin/merchants/add"
        >
          Add Merchant
        </Button>
      </div>
      <DataTable
        data={merchants}
        columns={merchantColumns}
        rowActions={merchantRowActions}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        totalPages={totalPages}
        actions={{
          search: {
            placeholder: "Search merchants...",
            onSearch: (query) => { setSearch(query); setCurrentPage(1); },
          },
        }}
      />
    </>
  );
}
