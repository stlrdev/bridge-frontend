"use client";

import Container from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/shared/button";
import Link from "next/link";
import { useVouchers } from "@/features/vouchers/hooks";
import { useOrgMerchants } from "@/features/merchants/hooks";
import { useOrgOffers } from "@/features/offers/hooks";

export default function DashboardPage() {
  const { data: vouchersData, isLoading: vouchersLoading } = useVouchers();
  const { data: merchantsData, isLoading: merchantsLoading } = useOrgMerchants();
  const { data: offersData, isLoading: offersLoading } = useOrgOffers();

  const vouchers = vouchersData?.data ?? [];
  const activeVouchers = vouchers.filter((v) => v.status === "active");
  const merchantCount = merchantsData?.total ?? merchantsData?.data?.length ?? 0;
  const availableOffers = (offersData?.data ?? []).filter((o) => o.isActive);

  const kpis = [
    {
      label: "Active Vouchers",
      value: vouchersLoading ? "—" : activeVouchers.length,
      href: "/my-vouchers",
      cta: "View all",
    },
    {
      label: "Partner Merchants",
      value: merchantsLoading ? "—" : merchantCount,
      href: "/marketplace",
      cta: "Browse",
    },
    {
      label: "Available Offers",
      value: offersLoading ? "—" : availableOffers.length,
      href: "/offers",
      cta: "Claim now",
    },
  ];

  return (
    <Container className="my-20">
      <h1 className="text-4xl font-extrabold">Dashboard</h1>
      <p className="text-muted-foreground mt-2">Your benefits overview.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground font-medium">
                {kpi.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <p className="text-4xl font-bold">{kpi.value}</p>
              <Link href={kpi.href}>
                <Button variant="ghost" size="sm" className="text-primary">
                  {kpi.cta} →
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {activeVouchers.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Active Vouchers</h2>
            <Link href="/my-vouchers" className="text-sm text-primary font-medium">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {activeVouchers.slice(0, 3).map((v) => (
              <Link
                key={v.id}
                href={`/my-vouchers/${v.id}`}
                className="flex items-center justify-between p-4 rounded-lg bg-card border hover:border-primary transition-colors"
              >
                <div>
                  <p className="font-semibold">
                    {v.campaignName ?? v.description ?? v.code}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {v.merchantName ?? ""}
                  </p>
                </div>
                <p className="text-sm font-bold text-primary">
                  {v.type === "percentage"
                    ? `${parseFloat(v.value)}% OFF`
                    : `$${parseFloat(v.value).toFixed(2)}`}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
