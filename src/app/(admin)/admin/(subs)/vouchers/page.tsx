"use client";

import * as React from "react";
import { Button } from "@/components/shared/button";
import { DataTable, Column } from "@/components/shared/datatable";
import { Icons } from "@/components/shared/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityStatusChip from "@/components/shared/activity-status-chip";
import { useAdminVouchers, useAdminDisableVoucher } from "@/features/vouchers/hooks";
import type { Voucher } from "@/features/vouchers/types";
import { toast } from "@/lib/toast";

const columns: Column<Voucher>[] = [
  {
    key: "code",
    label: "Code",
    sortable: true,
    render: (v) => <span className="font-mono font-bold">{v as string}</span>,
  },
  { key: "merchantName", label: "Merchant", sortable: true, render: (v) => (v as string | null) ?? "—" },
  {
    key: "type",
    label: "Type",
    sortable: true,
    render: (v) => <span className="capitalize">{(v as string).replace(/_/g, " ")}</span>,
  },
  {
    key: "value",
    label: "Value",
    sortable: true,
    render: (v, row) =>
      (row as Voucher).type === "percentage" ? `${v}%` : `$${parseFloat(v as string).toFixed(2)}`,
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (v) => <ActivityStatusChip status={v as "active" | "inactive" | "suspended" | "expired"} />,
  },
  {
    key: "validUntil",
    label: "Expires",
    sortable: true,
    render: (v) => new Date(v as string).toLocaleDateString(),
  },
];

export default function VouchersPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const pageSize = 10;

  const { data, isLoading } = useAdminVouchers({ page: currentPage, pageSize, search: search || undefined });
  const disableVoucher = useAdminDisableVoucher();

  const vouchers = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  const rowActions = (voucher: Voucher) => (
    <Button
      variant="ghost"
      size="icon-xs"
      disabled={voucher.status === "suspended" || disableVoucher.isPending}
      onClick={() =>
        disableVoucher.mutate(voucher.id, {
          onSuccess: () => toast.success("Voucher disabled"),
          onError: () => toast.error("Failed to disable voucher"),
        })
      }
    >
      <Icons.Trash size={14} />
    </Button>
  );

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm">Total Vouchers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{isLoading ? "—" : total.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-500">
              {isLoading ? "—" : vouchers.filter((v) => v.status === "active").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm">Suspended</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-destructive">
              {isLoading ? "—" : vouchers.filter((v) => v.status === "suspended").length}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">All Vouchers</h3>
      </div>

      <DataTable
        data={vouchers}
        columns={columns}
        rowActions={rowActions}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        totalPages={totalPages}
        actions={{
          search: {
            placeholder: "Search vouchers...",
            onSearch: (q) => { setSearch(q); setCurrentPage(1); },
          },
        }}
      />
    </>
  );
}
