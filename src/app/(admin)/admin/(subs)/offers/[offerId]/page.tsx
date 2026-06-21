"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityStatusChip from "@/components/shared/activity-status-chip";
import { useAdminVoucherById, useAdminDisableVoucher } from "@/features/vouchers/hooks";
import { formatCurrency } from "@/lib/utils";
import { toast } from "@/lib/toast";

export default function OfferDetailPage({
  params,
}: {
  params: Promise<{ offerId: string }>;
}) {
  const { offerId } = React.use(params);
  const router = useRouter();

  const { data: voucher, isLoading } = useAdminVoucherById(offerId);
  const disable = useAdminDisableVoucher();

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (!voucher) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Voucher not found.
      </div>
    );
  }

  const numericValue = parseFloat(voucher.value);
  const displayValue =
    voucher.type === "percentage"
      ? `${numericValue}% OFF`
      : formatCurrency(numericValue);

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
          <div className="flex items-center gap-3 mt-1">
            <code className="text-2xl font-bold font-mono">{voucher.code}</code>
            <ActivityStatusChip
              status={voucher.status as "active" | "inactive" | "suspended" | "expired"}
            />
          </div>
          {voucher.merchantName && (
            <p className="text-muted-foreground mt-1">{voucher.merchantName}</p>
          )}
        </div>
        {voucher.status === "active" && (
          <Button
            variant="outline"
            size="sm"
            disabled={disable.isPending}
            onClick={() =>
              disable.mutate(offerId, {
                onSuccess: () => toast.success("Voucher disabled"),
                onError: () => toast.error("Failed to disable voucher"),
              })
            }
          >
            Disable
          </Button>
        )}
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Value", value: displayValue },
          {
            label: "Redemptions",
            value: voucher.maxRedemptions
              ? `${voucher.currentRedemptions} / ${voucher.maxRedemptions}`
              : voucher.currentRedemptions,
          },
          {
            label: "Valid From",
            value: new Date(voucher.validFrom).toLocaleDateString(),
          },
          {
            label: "Expires",
            value: new Date(voucher.validUntil).toLocaleDateString(),
          },
        ].map((item) => (
          <Card key={item.label}>
            <CardHeader>
              <CardTitle className="text-xs text-muted-foreground font-medium">
                {item.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Details</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type</span>
            <span className="capitalize">{voucher.type.replace(/_/g, " ")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order Type</span>
            <span className="capitalize">{voucher.orderType.replace(/_/g, " ")}</span>
          </div>
          {voucher.minimumPurchaseAmount && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Min. Purchase</span>
              <span>{formatCurrency(parseFloat(voucher.minimumPurchaseAmount))}</span>
            </div>
          )}
          {voucher.maximumDiscountAmount && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Max. Discount</span>
              <span>{formatCurrency(parseFloat(voucher.maximumDiscountAmount))}</span>
            </div>
          )}
          {voucher.campaignName && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Campaign</span>
              <span>{voucher.campaignName}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Public</span>
            <span>{voucher.isPublic ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Created</span>
            <span>{new Date(voucher.createdAt).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Description / T&C */}
      {(voucher.description || voucher.termsAndConditions) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {voucher.description && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Description</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {voucher.description}
              </CardContent>
            </Card>
          )}
          {voucher.termsAndConditions && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">
                  Terms &amp; Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {voucher.termsAndConditions}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Applicable branches */}
      {voucher.applicableBranchNames.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Applicable Branches ({voucher.applicableBranchNames.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {voucher.applicableBranchNames.map((name) => (
                <span
                  key={name}
                  className="px-2 py-1 text-xs rounded-md bg-muted font-medium"
                >
                  {name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
