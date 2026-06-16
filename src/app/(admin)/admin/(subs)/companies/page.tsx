"use client";

import * as React from "react";
import { Button } from "@/components/shared/button";
import { DataTable } from "@/components/shared/datatable";
import { Icons } from "@/components/shared/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatEmployees, companies, type Company } from "@/data/companies";
import { formatCurrency } from "@/lib/utils";
import { Column } from "@/components/shared/datatable";
import { Edit, Trash2, Eye } from "lucide-react";
import { Input } from "@/components/shared/input";
import ActivityStatusChip from "@/components/shared/activity-status-chip";
import TierChip from "@/components/shared/tier-chip";

const companiesColumns: Column<Company>[] = [
  {
    key: "companyName",
    label: "Company Name",
    sortable: true,
  },
  {
    key: "tier",
    label: "Tier",
    sortable: true,
    render: (value) => <TierChip tier={value} />,
  },
  {
    key: "employeesRange",
    label: "Employees",
    sortable: true,
    render: (value) => formatEmployees(value),
  },
  {
    key: "monthlyFee",
    label: "Monthly Fee",
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
    key: "usagePercentage",
    label: "Usage",
    sortable: true,
    render: (value) => (
      <div className="">
        <span className="text-xs px-2">{value}%</span>
        <div className="relative">
          <div className="w-full h-2 bg-primary/15 rounded-full"></div>
          <div
            className="h-2 bg-primary rounded-full absolute top-0 left-0"
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
    ),
  },
];

const companyRowActions = (company: Company, index: number) => (
  <div className="flex items-center gap-1">
    <Button
      variant="ghost"
      size="icon-xs"
      onClick={() => console.log("View", company)}
    >
      <Eye className="w-3 h-3" />
    </Button>
    <Button
      variant="ghost"
      size="icon-xs"
      onClick={() => console.log("Edit", company)}
    >
      <Edit className="w-3 h-3" />
    </Button>
    <Button
      variant="ghost"
      size="icon-xs"
      onClick={() => console.log("Delete", company)}
    >
      <Trash2 className="w-3 h-3" />
    </Button>
  </div>
);

export default function CompaniesPage() {
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
        <h3 className="text-lg font-bold">All Companies</h3>
        <Button
          leftIcon={<Icons.AddCircle color="white" />}
          className="text-white font-semibold"
          href="/admin/companies/add"
        >
          Add Company
        </Button>
      </div>
      <DataTable
        data={companies}
        columns={companiesColumns}
        rowActions={companyRowActions}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        pageSize={pageSize}
        actions={{
          search: {
            placeholder: "Search companies...",
            onSearch: (query) => console.log("Search:", query),
          },
        }}
      />
    </>
  );
}
