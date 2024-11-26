"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart, Cell } from "recharts";
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
import { FormattedProker } from "@/lib/notion/type";

interface ChartPieProgramKerjaProps {
  proker: FormattedProker[];
}

// Count proker by specific types
const getProkerCountsByType = (proker: FormattedProker[]) => {
  const types = ["Sharing Session", "Mimbar Mahasiswa"];

  const counts = types.reduce((acc, type) => {
    acc[type] = proker.filter((item) => item.jenis === type).length;
    return acc;
  }, {} as Record<string, number>);

  return counts;
};

const chartConfig = {
  "Sharing Session": {
    label: "Sharing Session",
    color: "hsl(var(--chart-1))",
  },
  "Mimbar Mahasiswa": {
    label: "Mimbar Mahasiswa",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ChartPieProgramKerja({ proker }: ChartPieProgramKerjaProps) {
  const prokerCounts = getProkerCountsByType(proker);
  const total = proker.length;

  const chartData = Object.keys(prokerCounts).map((key) => ({
    type: key,
    count: prokerCounts[key],
    fill: chartConfig[key].color,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Program Kerja Berdasarkan Jenis</CardTitle>
        <CardDescription>Sharing Session / Mimbar Mahasiswa</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="count" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="type"
              labelLine={false}
              outerRadius={80}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    className="text-xs"
                  >
                    {`${chartData[index].type} (${(percent * 100).toFixed(0)}%)`}
                  </text>
                );
              }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Total Program Kerja: {total} kegiatan
        </div>
        <div className="leading-none text-muted-foreground text-center">
          {Object.keys(prokerCounts).map((key) => (
            <div className="pt-2" key={key}>
              {chartConfig[key].label}: {prokerCounts[key]} kegiatan
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}