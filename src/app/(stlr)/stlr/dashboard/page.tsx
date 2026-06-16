"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, Column } from "@/components/shared/datatable";
import {
  useAdminRedemptions,
  useAdminTopMerchants,
  useAdminTopVouchers,
} from "@/features/analytics/hooks";
import type { TopMerchant, TopVoucher } from "@/features/analytics/types";
import { formatCurrency } from "@/lib/utils";

const topMerchantsColumns: Column<TopMerchant>[] = [
  { key: "name", label: "Merchant", sortable: true },
  { key: "redemptions", label: "Redemptions", sortable: true },
  {
    key: "totalDiscountGiven",
    label: "Discount Given",
    sortable: true,
    render: (value) => formatCurrency(parseFloat(value as string)),
  },
  { key: "uniqueCustomers", label: "Customers", sortable: true },
];

const topVouchersColumns: Column<TopVoucher>[] = [
  {
    key: "code",
    label: "Code",
    sortable: true,
    render: (value) => <span className="font-mono">{value as string}</span>,
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
      (row as TopVoucher).type === "percentage"
        ? `${value}%`
        : formatCurrency(parseFloat(value as string)),
  },
  { key: "redemptions", label: "Redemptions", sortable: true },
];

export default function StlrDashboardPage() {
  const { data: redemptions, isLoading } = useAdminRedemptions();
  const { data: topMerchants, isLoading: loadingMerchants } = useAdminTopMerchants();
  const { data: topVouchers, isLoading: loadingVouchers } = useAdminTopVouchers();

  const merchants = Array.isArray(topMerchants) ? topMerchants : [];
  const vouchers = Array.isArray(topVouchers) ? topVouchers : [];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-6">
      <header className="mb-6">
        <h2 className="text-lg font-bold">STLR Dashboard</h2>
        <p className="text-xs text-muted-foreground">
          Platform-wide analytics and administration
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm">Total Redemptions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {isLoading ? "—" : (redemptions?.totalRedemptions ?? 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm">Unique Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {isLoading ? "—" : (redemptions?.uniqueCustomers ?? 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm">Total Discount</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {isLoading
                ? "—"
                : formatCurrency(parseFloat(redemptions?.totalDiscountGiven ?? "0"))}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm">Avg Discount</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {isLoading
                ? "—"
                : formatCurrency(parseFloat(redemptions?.averageDiscount ?? "0"))}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-base font-semibold mb-3">Top Merchants</h3>
          <DataTable
            data={merchants}
            columns={topMerchantsColumns}
            pageSize={5}
          />
        </div>
        <div>
          <h3 className="text-base font-semibold mb-3">Top Vouchers</h3>
          <DataTable
            data={vouchers}
            columns={topVouchersColumns}
            pageSize={5}
          />
        </div>
      </div>
    </div>
  );
}
