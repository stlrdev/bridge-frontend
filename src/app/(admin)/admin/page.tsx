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
  Legend,
} from "recharts";

export default function Page() {
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
          <Card className="">
            <CardHeader className="flex justify-between">
              <CardTitle className="text-muted-foreground text-sm">
                Total Redemptions
              </CardTitle>
              <div className="bg-green-400/20 text-green-400 px-2 py-1 rounded-full text-xs">
                <p>+12.5%</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">1,234</p>
              <div className="mt-4 relative">
                <div className="w-full h-2 bg-primary/15 rounded-full"></div>
                <div className="w-3/4 h-2 bg-primary rounded-full absolute top-0 left-0"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader className="flex justify-between">
              <CardTitle>Active Vouchers</CardTitle>
              <div className="bg-green-400/20 text-green-400 px-2 py-1 rounded-full text-xs">
                <p>+4.2%</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">128,400</p>
              <div className="mt-4 relative">
                <div className="w-full h-2 bg-primary/15 rounded-full"></div>
                <div className="w-1/4 h-2 bg-primary rounded-full absolute top-0 left-0"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader className="flex justify-between">
              <CardTitle>Merchant Partners</CardTitle>
              <div className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full text-xs">
                <p>-2.1%</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">1,420</p>
              <div className="mt-4 relative">
                <div className="w-full h-2 bg-primary/15 rounded-full"></div>
                <div className="w-2/3 h-2 bg-primary rounded-full absolute top-0 left-0"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader className="flex justify-between">
              <CardTitle>Total Redemptions</CardTitle>
              <div className="bg-green-400/20 text-green-400 px-2 py-1 rounded-full text-xs">
                <p>+18.4%</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{formatCurrency(1.12)}M</p>
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
        {/* Bar Chart - Total Redemptions */}
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
                data={[
                  { week: "WK 12", value: 2400 },
                  { week: "WK 13", value: 1398 },
                  { week: "WK 14", value: 9800 },
                  { week: "WK 15", value: 3908 },
                  { week: "WK 16", value: 4800 },
                  { week: "WK 17", value: 3800 },
                  { week: "WK 18", value: 4300 },
                  { week: "WK 19", value: 2100 },
                  { week: "WK 20", value: 2400 },
                ]}
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

        {/* Donut Chart - Redemptions by Tier */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Redemptions by Tier</CardTitle>
              <div className="text-2xl font-bold">42K</div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Platinum", value: 54, color: "#3b82f6" },
                    { name: "Gold", value: 22, color: "#f59e0b" },
                    { name: "Silver", value: 18, color: "#6b7280" },
                    { name: "Bronze", value: 6, color: "#92400e" },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {[
                    { name: "Platinum", value: 54, color: "#3b82f6" },
                    { name: "Gold", value: 22, color: "#f59e0b" },
                    { name: "Silver", value: 18, color: "#6b7280" },
                    { name: "Bronze", value: 6, color: "#92400e" },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs">Platinum (54%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-xs">Gold (22%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-xs">Silver (18%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-800 rounded-full"></div>
                <span className="text-xs">Bronze (6%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
