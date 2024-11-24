"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import { dataAnggota } from "@/data/dataAnggota"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Count members by type
const memberCounts = dataAnggota.reduce((acc, curr) => {
  acc[curr["Jenis Anggota"]] = (acc[curr["Jenis Anggota"]] || 0) + 1
  return acc
}, {} as Record<string, number>)

const chartData = [
  { 
    type: "Anggota Aktif", 
    count: memberCounts["Anggota Aktif"], 
    fill: "hsl(var(--chart-1))" // Menggunakan variabel CSS
  },
  { 
    type: "Anggota Umum", 
    count: memberCounts["Anggota Umum"], 
    fill: "hsl(var(--chart-2))" // Menggunakan variabel CSS
  },
]

const chartConfig = {
  count: {
    label: "Jumlah",
  },
  "Anggota Aktif": {
    label: "Anggota Aktif",
    color: "hsl(var(--chart-1))", // Menggunakan variabel CSS
  },
  "Anggota Umum": {
    label: "Anggota Umum",
    color: "hsl(var(--chart-2))", // Menggunakan variabel CSS
  },
} satisfies ChartConfig

export function ChartPieAnggota() {
  const totalMembers = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribusi Jenis Anggota</CardTitle>
        <CardDescription>Total Anggota UKM Penristek</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalMembers}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Anggota
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Menampilkan distribusi jenis keanggotaan UKM Penristek
        </div>
      </CardFooter>
    </Card>
  )
}