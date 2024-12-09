"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter, 
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FormattedProker } from "@/libs/types/notion/type";

// Constants
const PERIOD = [
  { month: "Dec", year: 2024 },
  { month: "Jan", year: 2025 },
  { month: "Feb", year: 2025 },
  { month: "Mar", year: 2025 },
  { month: "Apr", year: 2025 },
  { month: "May", year: 2025 },
  { month: "Jun", year: 2025 },
  { month: "Jul", year: 2025 },
  { month: "Aug", year: 2025 },
  { month: "Sep", year: 2025 },
  { month: "Oct", year: 2025 }
];

const chartConfig: ChartConfig = {
  online: {
    label: "Online",
    color: "hsl(var(--chart-1))"
  },
  offline: {
    label: "Offline",
    color: "hsl(var(--chart-2))"
  }
};

interface BarChartProkerJenisProps {
  proker: FormattedProker[];
}

const processData = (proker: FormattedProker[]) => {
  const monthlyData = PERIOD.map(period => ({
    monthYear: `${period.month} ${period.year}`,
    online: 0,
    offline: 0,
    total: 0
  }));

  proker.forEach((item) => {
    const date = new Date(item.tanggal.split("→")[0].trim());
    const year = date.getFullYear();
    const month = date.getMonth();

    // Find matching period
    const periodIndex = PERIOD.findIndex(p => {
      if (year === 2024 && month === 11) return p.month === "Dec" && p.year === 2024;
      if (year === 2025) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
        return p.month === monthNames[month] && p.year === 2025;
      }
      return false;
    });

    if (periodIndex !== -1) {
      if (item.platform === "Online") {
        monthlyData[periodIndex].online++;
      } else {
        monthlyData[periodIndex].offline++;
      }
      monthlyData[periodIndex].total++;
    }
  });

  return monthlyData;
};

export function BarChartProkerJenis({ proker }: BarChartProkerJenisProps) {
  const chartData = processData(proker);
  
  const totalOnline = chartData.reduce((sum, item) => sum + item.online, 0);
  const totalOffline = chartData.reduce((sum, item) => sum + item.offline, 0);
  const total = totalOnline + totalOffline;

  const onlinePercentage = ((totalOnline / total) * 100).toFixed(1);
  const offlinePercentage = ((totalOffline / total) * 100).toFixed(1);

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="items-center">
        <CardTitle>Program Kerja Per Bulan</CardTitle>
        <CardDescription>Desember 2024 - Oktober 2025</CardDescription>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart 
              data={chartData} 
              margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
            >
              <CartesianGrid 
                strokeDasharray="4 4"
                horizontal={true}
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="monthYear"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={{ fill: "hsl(var(--muted)/.1)" }}
                content={({ active, payload }) => {
                  if (!active || !payload) return null;
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {payload[0]?.payload.monthYear}
                          </span>
                          <span className="font-bold">
                            Total: {payload[0]?.payload.total}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-[hsl(var(--chart-1))]" />
                            <span className="text-[0.70rem]">
                              Online: {payload[0]?.payload.online}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-[hsl(var(--chart-2))]" />
                            <span className="text-[0.70rem]">
                              Offline: {payload[0]?.payload.offline}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
              <Bar
                name="Online"
                dataKey="online"
                stackId="a"
                fill={chartConfig.online.color}
                radius={[0, 0, 0, 0]}
                barSize={20}
              />
              <Bar
                name="Offline"
                dataKey="offline"
                stackId="a"
                fill={chartConfig.offline.color}
                radius={[0, 0, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
          <ChartLegend content={<ChartLegendContent />} />
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex w-full justify-between font-medium">
          <span>Total Program Kerja: {total} kegiatan</span>
        </div>
        <div className="flex w-full justify-between text-muted-foreground">
          <span>Online: {totalOnline} ({onlinePercentage}%)</span>
          <span>Offline: {totalOffline} ({offlinePercentage}%)</span>
        </div>
      </CardFooter>
    </Card>
  );
}