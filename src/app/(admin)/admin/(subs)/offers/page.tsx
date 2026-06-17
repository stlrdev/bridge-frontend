"use client";

import * as React from "react";
import { Button } from "@/components/shared/button";
import { DataTable, Column } from "@/components/shared/datatable";
import { Icons } from "@/components/shared/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";
import ActivityStatusChip from "@/components/shared/activity-status-chip";
import { useAdminVouchers } from "@/features/vouchers/hooks";
import type { Voucher } from "@/features/vouchers/types";

const offersColumns: Column<Voucher>[] = [
  {
    key: "code",
    label: "Voucher Code",
    sortable: true,
    render: (value) => <span className="font-mono font-bold">{value}</span>,
  },
  {
    key: "merchantName",
    label: "Merchant",
    sortable: true,
    render: (value) => value ?? "—",
  },
  {
    key: "type",
    label: "Type",
    sortable: true,
    render: (value) => (
      <span className="capitalize">{(value as string).replace(/_/g, " ")}</span>
    ),
  },
  {
    key: "value",
    label: "Value",
    sortable: true,
    render: (value, row) =>
      (row as Voucher).type === "percentage"
        ? `${value}%`
        : `$${parseFloat(value as string).toFixed(2)}`,
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value) => <ActivityStatusChip status={value} />,
  },
  {
    key: "validUntil",
    label: "Expires",
    sortable: true,
    render: (value) => new Date(value as string).toLocaleDateString(),
  },
];

const offerRowActions = (voucher: Voucher) => (
  <div className="flex items-center gap-1">
    <Button
      variant="ghost"
      size="icon-xs"
      onClick={() => {
        window.location.href = `/admin/offers/${voucher.id}`;
      }}
    >
      <Eye className="w-3 h-3" />
    </Button>
  </div>
);

export default function OffersPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const pageSize = 10;

  const { data, isLoading } = useAdminVouchers({ page: currentPage, pageSize, search: search || undefined });
  const vouchers = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  const activeCount = vouchers.filter((v) => v.status === "active").length;
  const draftCount = vouchers.filter((v) => v.status === "draft").length;
  const expiredCount = vouchers.filter((v) => v.isExpired).length;

  return (
    <>
      <div className="grid grid-cols-4 gap-[10px]">
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Total Vouchers
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-1">
            <p className="text-4xl font-bold">{isLoading ? "—" : total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Active Now
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-1">
            <p className="text-4xl font-bold text-success">
              {isLoading ? "—" : activeCount}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Expired
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-2">
            <p className="text-4xl font-bold text-warning">
              {isLoading ? "—" : expiredCount}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Drafts
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-1">
            <p className="text-4xl font-bold">{isLoading ? "—" : draftCount}</p>
          </CardContent>
        </Card>
      </div>
      <div className="my-5 flex items-center justify-between">
        <h3 className="text-lg font-bold">All Vouchers</h3>
        <Button
          leftIcon={<Icons.AddCircle color="white" />}
          className="text-white font-semibold"
          href="/admin/offers/add"
        >
          Add Voucher
        </Button>
      </div>
      <DataTable
        data={vouchers}
        columns={offersColumns}
        rowActions={offerRowActions}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        totalPages={totalPages}
        actions={{
          search: {
            placeholder: "Search vouchers...",
            onSearch: (query) => { setSearch(query); setCurrentPage(1); },
          },
        }}
      />
    </>
  );
}
