"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityStatusChip from "@/components/shared/activity-status-chip";
import { useCompany } from "@/features/companies/hooks";

export default function CompanyDetailPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = React.use(params);
  const router = useRouter();

  const { data: company, isLoading } = useCompany(companyId);

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (!company) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Company not found.
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
          <h1 className="text-2xl font-bold">{company.name}</h1>
          {company.description && (
            <p className="text-muted-foreground mt-1">{company.description}</p>
          )}
        </div>
        <ActivityStatusChip status={company.status} />
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Contact Email", value: company.contactEmail ?? "—" },
          { label: "Phone", value: company.contactPhone ?? "—" },
          { label: "Enabled Merchants", value: company.enabledMerchants.length },
          { label: "Active Campaigns", value: company.enabledCampaigns.length },
        ].map((item) => (
          <Card key={item.label}>
            <CardHeader>
              <CardTitle className="text-xs text-muted-foreground font-medium">
                {item.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Metadata */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Details</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Created</span>
            <span>{new Date(company.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last Updated</span>
            <span>{new Date(company.updatedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Slug</span>
            <span className="font-mono text-xs">{company.slug}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Vouchers Enabled</span>
            <span>{company.enabledVouchers.length}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
