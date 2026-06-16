"use client";

import * as React from "react";
import { DataTable, Column } from "@/components/shared/datatable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrgRedemptions } from "@/features/companies/hooks";
import { formatCurrency } from "@/lib/utils";

type RedemptionRow = {
  id: string;
  voucherCode: string;
  customerEmail: string | null;
  merchantName: string;
  discountApplied: string;
  redeemedAt: string;
};

const columns: Column<RedemptionRow>[] = [
  { key: "voucherCode", label: "Voucher Code", sortable: true, render: (v) => <span className="font-mono">{v as string}</span> },
  { key: "customerEmail", label: "Customer", sortable: true, render: (v) => (v as string | null) ?? "—" },
  { key: "merchantName", label: "Merchant", sortable: true },
  {
    key: "discountApplied",
    label: "Discount",
    sortable: true,
    render: (v) => formatCurrency(parseFloat(v as string)),
  },
  {
    key: "redeemedAt",
    label: "Redeemed",
    sortable: true,
    render: (v) => new Date(v as string).toLocaleDateString(),
  },
];

export default function ReportingPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 15;

  const { data, isLoading } = useOrgRedemptions({ page: currentPage, pageSize });
  const rows: RedemptionRow[] = (data?.data ?? []) as unknown as RedemptionRow[];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm">Total Redemptions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{isLoading ? "—" : total.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm">This Page</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{isLoading ? "—" : rows.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">Redemption History</h3>
      </div>

      <DataTable
        data={rows}
        columns={columns}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </>
  );
}
