"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FormattedProker } from "@/libs/types/notion/type";

interface BarChartInteractiveProps {
  proker: FormattedProker[];
}

// Process data to count monthly events by platform
const processMonthlyData = (proker: FormattedProker[]) => {
  // Initialize array for months from Dec 2024 to Oct 2025 (11 months)
  const monthlyData = Array(11)
    .fill(null)
    .map(() => ({
      offline: 0,
      online: 0,
    }));

  proker.forEach((item) => {
    const date = new Date(item.tanggal);
    const year = date.getFullYear();
    const month = date.getMonth();

    // Only process data from Dec 2024 to Oct 2025
    if (
      (year === 2024 && month === 11) || // December 2024
      (year === 2025 && month <= 9)      // January to October 2025
    ) {
      const monthIndex = year === 2024 ? 0 : month + 1; // Dec 2024 = index 0
      if (item.platform === "Online") {
        monthlyData[monthIndex].online++;
      } else {
        monthlyData[monthIndex].offline++;
      }
    }
  });

  // Create dates array from Dec 2024 to Oct 2025
  const dates = [
    new Date(2024, 11, 1), // December 2024
    ...Array(10)
      .fill(null)
      .map((_, i) => new Date(2025, i, 1)), // Jan to Oct 2025
  ];

  return dates.map((date, index) => ({
    date: date.toISOString().split("T")[0],
    offline: monthlyData[index].offline,
    online: monthlyData[index].online,
  }));
};

interface ChartConfigItem {
  label: string;
  color?: string;
}

const chartConfig: Record<string, ChartConfigItem> = {
  views: {
    label: "Jumlah Program Kerja",
  },
  offline: {
    label: "Offline",
    color: "hsl(var(--chart-1))",
  },
  online: {
    label: "Online",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarChartInteractive({ proker }: BarChartInteractiveProps) {
  const [activeChart, setActiveChart] = React.useState<"offline" | "online">("offline");
  
  const chartData = React.useMemo(() => processMonthlyData(proker), [proker]);

  const total = React.useMemo(
    () => ({
      offline: proker.filter(item => item.platform === "Offline").length,
      online: proker.filter(item => item.platform === "Online").length,
    }),
    [proker]
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Program Kerja</CardTitle>
          <CardDescription>
            Distribusi program kerja tahun 2025
          </CardDescription>
        </div>
        <div className="flex">
          {["offline", "online"].map((key) => {
            const chart = key as "offline" | "online";
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[chart]}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("id-ID", {
                  month: "short",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="proker"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("id-ID", {
                      month: "long",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill={chartConfig[activeChart].color || "hsl(var(--chart-1))"}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}