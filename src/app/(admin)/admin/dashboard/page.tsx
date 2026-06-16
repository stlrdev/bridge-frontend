"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/shared/breadcrumbs";
import { useMyOrganization, useOrgEmployees, useOrgRedemptions } from "@/features/companies/hooks";
import { useOrgMerchants } from "@/features/merchants/hooks";
import { formatCurrency } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { data: org, isLoading: loadingOrg } = useMyOrganization();
  const { data: employees, isLoading: loadingEmployees } = useOrgEmployees();
  const { data: merchants, isLoading: loadingMerchants } = useOrgMerchants();
  const { data: redemptions, isLoading: loadingRedemptions } = useOrgRedemptions();

  return (
    <div className="container max-w-7xl mx-auto px-4 py-6">
      <header className="mb-6">
        <Breadcrumb
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Dashboard", isActive: true },
          ]}
        />
        <div className="mt-4">
          <h2 className="text-lg font-bold">
            {loadingOrg ? "Loading..." : (org?.name ?? "Company Dashboard")}
          </h2>
          <p className="text-xs text-muted-foreground">Company admin overview</p>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold capitalize">
              {loadingOrg ? "—" : (org?.status ?? "—")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm">Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {loadingEmployees ? "—" : (employees?.total ?? 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm">Merchants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {loadingMerchants ? "—" : (merchants?.total ?? 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm">Total Redemptions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {loadingRedemptions ? "—" : (redemptions?.total ?? 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
