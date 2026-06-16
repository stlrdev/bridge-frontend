"use client";

import { Icons } from "@/components/shared/icons";
import { Select } from "@/components/shared/select";
import { Breadcrumb } from "@/components/shared/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useAdminRedemptions, useAdminRedemptionTrend, useAdminTopMerchants } from "@/features/analytics/hooks";

export default function Page() {
  const { data: redemptions, isLoading: loadingRedemptions } = useAdminRedemptions();
  const { data: trend, isLoading: loadingTrend } = useAdminRedemptionTrend();
  const { data: topMerchants } = useAdminTopMerchants();

  const trendChartData = Array.isArray(trend)
    ? trend.map((point) => ({ week: point.date, value: point.redemptions }))
    : [];

  const merchantPieData = Array.isArray(topMerchants)
    ? topMerchants.slice(0, 4).map((m, i) => ({
        name: m.name,
        value: m.redemptions,
        color: ["#3b82f6", "#f59e0b", "#6b7280", "#92400e"][i],
      }))
    : [
        { name: "Platinum", value: 54, color: "#3b82f6" },
        { name: "Gold", value: 22, color: "#f59e0b" },
        { name: "Silver", value: 18, color: "#6b7280" },
        { name: "Bronze", value: 6, color: "#92400e" },
      ];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-6">
      <header className="mb-6 flex justify-between items-center">
        <div className="flex-1">
          <Breadcrumb items={[{ label: "Admin", isActive: true }]} />
          <div className="mt-4">
            <h2 className="text-lg font-bold">Analytics Overview</h2>
            <p className="text-xs text-muted-foreground">
              Real-time Performance metrics for voucher ecosystem
            </p>
          </div>
        </div>
        <div>
          <Select
            options={[
              { value: "1", label: "Last 24 hours" },
              { value: "2", label: "Last 7 days" },
              { value: "3", label: "Last 30 days" },
              { value: "4", label: "Last 90 days" },
              { value: "5", label: "Last 365 days" },
            ]}
            placeholder="select"
            prefixIcon={<Icons.Calendar />}
            defaultValue={"3"}
            fullWidth={true}
          />
        </div>
      </header>
      <div>
        <div className="grid grid-cols-4 gap-[10px]">
          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle className="text-muted-foreground text-sm">
                Total Redemptions
              </CardTitle>
              <div className="bg-green-400/20 text-green-400 px-2 py-1 rounded-full text-xs">
                <p>+12.5%</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {loadingRedemptions
                  ? "—"
                  : (redemptions?.totalRedemptions ?? 0).toLocaleString()}
              </p>
              <div className="mt-4 relative">
                <div className="w-full h-2 bg-primary/15 rounded-full"></div>
                <div className="w-3/4 h-2 bg-primary rounded-full absolute top-0 left-0"></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle>Unique Customers</CardTitle>
              <div className="bg-green-400/20 text-green-400 px-2 py-1 rounded-full text-xs">
                <p>+4.2%</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {loadingRedemptions
                  ? "—"
                  : (redemptions?.uniqueCustomers ?? 0).toLocaleString()}
              </p>
              <div className="mt-4 relative">
                <div className="w-full h-2 bg-primary/15 rounded-full"></div>
                <div className="w-1/4 h-2 bg-primary rounded-full absolute top-0 left-0"></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle>Total Discount Given</CardTitle>
              <div className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full text-xs">
                <p>+8.1%</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {loadingRedemptions
                  ? "—"
                  : formatCurrency(
                      parseFloat(redemptions?.totalDiscountGiven ?? "0"),
                    )}
              </p>
              <div className="mt-4 relative">
                <div className="w-full h-2 bg-primary/15 rounded-full"></div>
                <div className="w-2/3 h-2 bg-primary rounded-full absolute top-0 left-0"></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle>Avg. Discount</CardTitle>
              <div className="bg-green-400/20 text-green-400 px-2 py-1 rounded-full text-xs">
                <p>+18.4%</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {loadingRedemptions
                  ? "—"
                  : formatCurrency(
                      parseFloat(redemptions?.averageDiscount ?? "0"),
                    )}
              </p>
              <div className="mt-4 relative">
                <div className="w-full h-2 bg-primary/15 rounded-full"></div>
                <div className="w-1/2 h-2 bg-primary rounded-full absolute top-0 left-0"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-3 gap-[10px] mt-6">
        {/* Bar Chart - Redemption Trend */}
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Total Redemptions</CardTitle>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs bg-muted rounded-md">
                  Day
                </button>
                <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md">
                  Week
                </button>
                <button className="px-3 py-1 text-xs bg-muted rounded-md">
                  Month
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={
                  loadingTrend || trendChartData.length === 0
                    ? [
                        { week: "WK 12", value: 2400 },
                        { week: "WK 13", value: 1398 },
                        { week: "WK 14", value: 9800 },
                        { week: "WK 15", value: 3908 },
                        { week: "WK 16", value: 4800 },
                        { week: "WK 17", value: 3800 },
                        { week: "WK 18", value: 4300 },
                      ]
                    : trendChartData
                }
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Donut Chart - Top Merchants / Redemptions by source */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">
                {Array.isArray(topMerchants) && topMerchants.length > 0
                  ? "Top Merchants"
                  : "Redemptions by Tier"}
              </CardTitle>
              <div className="text-2xl font-bold">
                {loadingRedemptions
                  ? "—"
                  : `${Math.round((redemptions?.totalRedemptions ?? 0) / 1000)}K`}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={merchantPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {merchantPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {merchantPieData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-xs">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
