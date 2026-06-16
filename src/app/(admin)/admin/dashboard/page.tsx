"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/shared/breadcrumbs";

export default function AdminDashboardPage() {
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
          <h2 className="text-lg font-bold">Dashboard</h2>
          <p className="text-xs text-muted-foreground">
            Company admin overview
          </p>
        </div>
      </header>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The admin dashboard is under construction.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
