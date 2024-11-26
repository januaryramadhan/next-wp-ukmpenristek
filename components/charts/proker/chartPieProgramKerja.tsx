"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { dataProker } from "@/lib/dataProker";

// Count proker by platform
const getPlatformCounts = () => {
  const counts = {
    Online: dataProker.filter((proker) => proker.platform === "Online").length,
    Offline: dataProker.filter((proker) => proker.platform === "Offline")
      .length,
  };
  return counts;
};

const platformCounts = getPlatformCounts();

const chartData = [
  { platform: "Online", count: platformCounts.Online, fill: "hsl(var(--chart-1))" },
  { platform: "Offline", count: platformCounts.Offline, fill: "hsl(var(--chart-2))" },
]

const chartConfig = {
  Online: {
    label: "Online",
    color: "hsl(var(--chart-1))",
  },
  Offline: {
    label: "Offline",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartPieProgramKerja() {
  const total = dataProker.length;
  const onlinePercentage = ((platformCounts.Online / total) * 100).toFixed(1);
  const offlinePercentage = ((platformCounts.Offline / total) * 100).toFixed(1);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Program Kerja by Platform</CardTitle>
        <CardDescription>2024 - 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="count" hideLabel />}
            />
            <Pie data={chartData} dataKey="count">
              <LabelList
                dataKey="platform"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  `${chartConfig[value].label} (${value === "Online" ? onlinePercentage : offlinePercentage}%)`
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Total Program Kerja: {total} kegiatan
        </div>
        <div className="leading-none text-muted-foreground">
          Online: {platformCounts.Online} kegiatan | Offline:{" "}
          {platformCounts.Offline} kegiatan
        </div>
      </CardFooter>
    </Card>
  );
}
