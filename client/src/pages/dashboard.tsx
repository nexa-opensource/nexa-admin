import AdminLayout from "@/components/layout/AdminLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { KPI_STATS, SOCIAL_STATS } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Twitter,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const data = [
  { name: "Mon", total: 12 },
  { name: "Tue", total: 18 },
  { name: "Wed", total: 15 },
  { name: "Thu", total: 25 },
  { name: "Fri", total: 32 },
  { name: "Sat", total: 28 },
  { name: "Sun", total: 22 },
];

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your platform performance.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <Twitter className="mr-2 h-4 w-4 text-blue-400" /> Connect X
            </Button>
            <Button variant="secondary" size="sm">
              <MessageSquare className="mr-2 h-4 w-4 text-indigo-500" /> Connect
              Discord
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {KPI_STATS.map((stat) => (
            <StatsCard
              key={stat.label}
              title={stat.label}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
            />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                Daily active users over the last week.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}k`}
                    />
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Bar
                      dataKey="total"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="col-span-3 space-y-4">
            {/* Social Integration Section */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Social Insights</CardTitle>
                <CardDescription>
                  Real-time metrics from connected accounts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Twitter className="h-5 w-5 text-blue-400" />
                        <span className="font-medium">X (Twitter)</span>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-green-600 bg-green-50 border-green-200"
                      >
                        Connected
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {SOCIAL_STATS.filter((s) => s.platform === "twitter").map(
                        (stat, i) => (
                          <div key={i} className="bg-muted/40 p-3 rounded-md">
                            <p className="text-xs text-muted-foreground">
                              {stat.metric}
                            </p>
                            <div className="flex items-end justify-between">
                              <p className="text-xl font-bold">{stat.value}</p>
                              <span
                                className={`text-xs flex items-center ${stat.trend === "up" ? "text-green-600" : "text-red-500"}`}
                              >
                                {stat.trend === "up" ? (
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                ) : (
                                  <TrendingDown className="h-3 w-3 mr-1" />
                                )}
                                {stat.change}
                              </span>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-indigo-500" />
                        <span className="font-medium">Discord Community</span>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-green-600 bg-green-50 border-green-200"
                      >
                        Connected
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {SOCIAL_STATS.filter((s) => s.platform === "discord").map(
                        (stat, i) => (
                          <div key={i} className="bg-muted/40 p-3 rounded-md">
                            <p className="text-xs text-muted-foreground">
                              {stat.metric}
                            </p>
                            <div className="flex items-end justify-between">
                              <p className="text-xl font-bold">{stat.value}</p>
                              <span
                                className={`text-xs flex items-center ${stat.trend === "up" ? "text-green-600" : "text-red-500"}`}
                              >
                                {stat.trend === "up" ? (
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                ) : (
                                  <TrendingDown className="h-3 w-3 mr-1" />
                                )}
                                {stat.change}
                              </span>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
