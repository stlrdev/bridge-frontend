"use client";

import * as React from "react";
import { Button } from "@/components/shared/button";
import { DataTable } from "@/components/shared/datatable";
import { Icons } from "@/components/shared/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { offers } from "@/data/offers";
import { Column } from "@/components/shared/datatable";
import { Edit, Trash2, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import ActivityStatusChip from "@/components/shared/activity-status-chip";
import TierChip from "@/components/shared/tier-chip";

type Offer = {
  id: string;
  title: string;
  uid: string;
  merchant: string;
  discount: number;
  startDate: string;
  endDate: string;
  tiers: { primary: string; extra: number };
  cap: number;
  status: string;
  image: string;
};

const offersColumns: Column<Offer>[] = [
  {
    key: "title",
    label: "Offer Title",
    sortable: true,
    render: (value) => <span className="font-bold">{value}</span>,
  },
  {
    key: "uid",
    label: "Offer ID",
    sortable: true,
  },
  {
    key: "merchant",
    label: "Merchant",
    sortable: true,
  },
  {
    key: "discount",
    label: "Discount",
    sortable: true,
    render: (value) => `${value}%`,
  },
  {
    key: "tiers",
    label: "Tier",
    sortable: true,
    render: (value) => <TierChip tier={value.primary} />,
  },
  {
    key: "cap",
    label: "Cap",
    sortable: true,
    render: (value) => formatCurrency(value),
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value) => <ActivityStatusChip status={value} />,
  },
  {
    key: "endDate",
    label: "End Date",
    sortable: true,
  },
];

const offerRowActions = (offer: Offer, index: number) => (
  <div className="flex items-center gap-1">
    <Button
      variant="ghost"
      size="icon-xs"
      onClick={() => {
        // TODO: Navigate to offer details page
        window.location.href = `/admin/offers/${offer.id}`;
      }}
    >
      <Eye className="w-3 h-3" />
    </Button>
    <Button
      variant="ghost"
      size="icon-xs"
      onClick={() => console.log("Edit", offer)}
    >
      <Edit className="w-3 h-3" />
    </Button>
    <Button
      variant="ghost"
      size="icon-xs"
      onClick={() => console.log("Delete", offer)}
    >
      <Trash2 className="w-3 h-3" />
    </Button>
  </div>
);

export default function OffersPage() {
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
              Total Offers
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-1">
            <p className="text-4xl font-bold">1,284</p>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader className="flex justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Active Now
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-1">
            <p className="text-4xl font-bold text-success">8,136</p>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader className="flex justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Expiring Soon
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-2">
            <p className="text-4xl font-bold text-warning">47</p>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader className="flex justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Drafts
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-1">
            <p className="text-4xl font-bold">12</p>
          </CardContent>
        </Card>
      </div>
      <div className="my-5 flex items-center justify-between">
        <h3 className="text-lg font-bold">All Offers</h3>
        <Button
          leftIcon={<Icons.AddCircle color="white" />}
          className="text-white font-semibold"
          href="/admin/offers/add"
        >
          Add Offer
        </Button>
      </div>
      <DataTable
        data={offers}
        columns={offersColumns}
        rowActions={offerRowActions}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        pageSize={pageSize}
        actions={{
          search: {
            placeholder: "Search offers...",
            onSearch: (query) => console.log("Search:", query),
          },
        }}
      />
    </>
  );
}
