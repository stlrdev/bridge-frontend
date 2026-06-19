"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/button";
import { DataTable, Column } from "@/components/shared/datatable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityStatusChip from "@/components/shared/activity-status-chip";
import {
  useMerchant,
  useActivateMerchant,
  useSuspendMerchant,
  useMerchantBranches,
} from "@/features/merchants/hooks";
import { useCampaigns, useActivateCampaign, usePauseCampaign } from "@/features/offers/hooks";
import { useMerchantVouchers } from "@/features/vouchers/hooks";
import type { Campaign } from "@/features/offers/types";
import type { Voucher } from "@/features/vouchers/types";
import { toast } from "@/lib/toast";

const campaignColumns: Column<Campaign>[] = [
  { key: "name", label: "Campaign", sortable: true },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (v) => <span className="capitalize">{v as string}</span>,
  },
  {
    key: "startDate",
    label: "Start",
    render: (v) => new Date(v as string).toLocaleDateString(),
  },
  {
    key: "endDate",
    label: "End",
    render: (v) => new Date(v as string).toLocaleDateString(),
  },
  { key: "voucherCount", label: "Vouchers", sortable: true },
];

const voucherColumns: Column<Voucher>[] = [
  {
    key: "code",
    label: "Code",
    render: (v) => <span className="font-mono text-sm">{v as string}</span>,
  },
  {
    key: "type",
    label: "Type",
    render: (v) => <span className="capitalize">{(v as string).replace(/_/g, " ")}</span>,
  },
  {
    key: "value",
    label: "Value",
    render: (v, row) =>
      (row as Voucher).type === "percentage"
        ? `${v}%`
        : `$${parseFloat(v as string).toFixed(2)}`,
  },
  {
    key: "status",
    label: "Status",
    render: (v) => <ActivityStatusChip status={v as "active" | "inactive" | "suspended" | "expired"} />,
  },
  {
    key: "validUntil",
    label: "Expires",
    render: (v) => new Date(v as string).toLocaleDateString(),
  },
];

export default function MerchantDetailPage({
  params,
}: {
  params: Promise<{ merchantId: string }>;
}) {
  const { merchantId } = React.use(params);
  const router = useRouter();

  const { data: merchant, isLoading } = useMerchant(merchantId);
  const { data: campaignsData } = useCampaigns(merchantId);
  const { data: vouchersData } = useMerchantVouchers(merchantId);
  const { data: branchesData } = useMerchantBranches(merchantId);

  const activate = useActivateMerchant();
  const suspend = useSuspendMerchant();
  const activateCampaign = useActivateCampaign(merchantId);
  const pauseCampaign = usePauseCampaign(merchantId);

  const campaigns = campaignsData?.data ?? [];
  const vouchers = vouchersData?.data ?? [];
  const branches = branchesData?.data ?? [];

  const campaignRowActions = (campaign: Campaign) => (
    <div className="flex gap-1">
      {campaign.status === "active" ? (
        <Button
          size="sm"
          variant="outline"
          disabled={pauseCampaign.isPending}
          onClick={() =>
            pauseCampaign.mutate(campaign.id, {
              onSuccess: () => toast.success("Campaign paused"),
              onError: () => toast.error("Failed to pause campaign"),
            })
          }
        >
          Pause
        </Button>
      ) : (
        <Button
          size="sm"
          disabled={activateCampaign.isPending}
          onClick={() =>
            activateCampaign.mutate(campaign.id, {
              onSuccess: () => toast.success("Campaign activated"),
              onError: () => toast.error("Failed to activate campaign"),
            })
          }
        >
          Activate
        </Button>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (!merchant) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Merchant not found.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <button
            onClick={() => router.back()}
            className="text-sm text-muted-foreground hover:text-foreground mb-2 flex items-center gap-1"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">{merchant.name}</h1>
          <p className="text-muted-foreground capitalize mt-1">{merchant.category}</p>
        </div>
        <div className="flex items-center gap-3">
          <ActivityStatusChip status={merchant.status as "active" | "inactive" | "suspended" | "expired"} />
          {merchant.status === "active" ? (
            <Button
              variant="outline"
              size="sm"
              disabled={suspend.isPending}
              onClick={() =>
                suspend.mutate(merchantId, {
                  onSuccess: () => toast.success("Merchant suspended"),
                  onError: () => toast.error("Failed to suspend merchant"),
                })
              }
            >
              Suspend
            </Button>
          ) : (
            <Button
              size="sm"
              disabled={activate.isPending}
              onClick={() =>
                activate.mutate(merchantId, {
                  onSuccess: () => toast.success("Merchant activated"),
                  onError: () => toast.error("Failed to activate merchant"),
                })
              }
            >
              Activate
            </Button>
          )}
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Contact Email", value: merchant.contactEmail ?? "—" },
          { label: "Phone", value: merchant.contactPhone ?? "—" },
          { label: "Branches", value: merchant.branchCount },
          { label: "City", value: merchant.city ?? "—" },
        ].map((item) => (
          <Card key={item.label}>
            <CardHeader>
              <CardTitle className="text-xs text-muted-foreground font-medium">
                {item.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold truncate">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaigns */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Campaigns</h2>
        <DataTable
          data={campaigns}
          columns={campaignColumns}
          rowActions={campaignRowActions}
          pageSize={5}
          totalPages={campaignsData?.totalPages ?? 1}
        />
      </div>

      {/* Vouchers */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Vouchers</h2>
        <DataTable
          data={vouchers}
          columns={voucherColumns}
          pageSize={5}
          totalPages={vouchersData?.totalPages ?? 1}
        />
      </div>

      {/* Branches */}
      {branches.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">
            Branches ({branches.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {branches.map((branch) => (
              <Card key={branch.id}>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">{branch.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-1">
                  {branch.address && <p>{branch.address}</p>}
                  {branch.city && <p>{branch.city}</p>}
                  {branch.phoneNumber && <p>{branch.phoneNumber}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
