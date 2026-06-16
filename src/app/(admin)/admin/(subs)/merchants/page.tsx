"use client";

import { Button } from "@/components/shared/button";
import { DataTable } from "@/components/shared/datatable";
import { Icons } from "@/components/shared/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { merchants, type Merchant, type Tier } from "@/data/admin-merchants";
import { formatCurrency } from "@/lib/utils";
import { Column } from "@/components/shared/datatable";
import { Edit, Trash2, Eye } from "lucide-react";
import { Input } from "@/components/shared/input";
import ActivityStatusChip from "@/components/shared/activity-status-chip";
import TierChip from "@/components/shared/tier-chip";
import CategoryChip from "@/components/shared/category-chip";
import React from "react";

const merchantColumns: Column<Merchant>[] = [
  {
    key: "name",
    label: "Merchant Name",
    sortable: true,
  },
  {
    key: "category",
    label: "Category",
    sortable: true,
    render: (value) => <CategoryChip category={value} />,
  },
  {
    key: "activeOffers",
    label: "Active Offers",
    sortable: true,
  },
  {
    key: "visibleTiers",
    label: "Visible Tiers",
    sortable: true,
    render: (value: Tier[]) => (
      <div className="flex gap-1">
        {value.map((tier) => (
          <TierChip key={tier} tier={tier} compact />
        ))}
      </div>
    ),
  },
  {
    key: "monthlyRedemptions",
    label: "Monthly Redemptions",
    sortable: true,
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value) => <ActivityStatusChip status={value} />,
  },
];

const merchantRowActions = (merchant: Merchant, index: number) => (
  <div className="flex items-center gap-1">
    <Button
      variant="ghost"
      size="icon-xs"
      onClick={() => console.log("View", merchant)}
    >
      <Eye className="w-3 h-3" />
    </Button>
    <Button
      variant="ghost"
      size="icon-xs"
      onClick={() => console.log("Edit", merchant)}
    >
      <Edit className="w-3 h-3" />
    </Button>
    <Button
      variant="ghost"
      size="icon-xs"
      onClick={() => console.log("Delete", merchant)}
    >
      <Trash2 className="w-3 h-3" />
    </Button>
  </div>
);

export default function MerchantsPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="grid grid-cols-4 gap-[10px]">
        <Card className="">
          <CardHeader className="flex justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Total Merchants
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-1">
            <p className="text-4xl font-bold">128</p>
            <div className="text-green-400 px-2 py-1 rounded-full text-xs flex items-center">
              <Icons.ArrowUp size={12} />
              <p>12%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader className="flex justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Monthly Redemptions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-1">
            <p className="text-4xl font-bold">42,890</p>
            <div className="text-green-400 px-2 py-1 rounded-full text-xs flex items-center">
              <Icons.ArrowUp size={12} />
              <p>8%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader className="flex justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Active Offers
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-2">
            <p className="text-4xl font-bold">1,024</p>
            <div className="text-muted-foreground text-xs">Stable</div>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader className="flex justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Avg. Partner Rating
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-1">
            <p className="text-4xl font-bold">4.8/5</p>
            <div className="text-primary px-2 py-1 rounded-full text-xs flex items-center gap-1">
              <Icons.Star />
              <Icons.Star />
              <Icons.Star />
              <Icons.Star />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="my-5 flex items-center justify-between">
        <h3 className="text-lg font-bold">All Merchants</h3>
        <Button
          leftIcon={<Icons.AddCircle color="white" />}
          className="text-white font-semibold"
          href="/admin/merchants/add"
        >
          Add Merchant
        </Button>
      </div>
      <DataTable
        data={merchants}
        columns={merchantColumns}
        rowActions={merchantRowActions}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        pageSize={pageSize}
        actions={{
          search: {
            placeholder: "Search merchants...",
            onSearch: (query) => console.log("Search:", query),
          },
        }}
      />
    </>
  );
}
