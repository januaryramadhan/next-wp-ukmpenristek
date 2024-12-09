"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { FormattedAnggota } from "@/libs/types/notion/type"

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

interface ChartPieAnggotaProps {
  anggota: FormattedAnggota[]
}

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

export function ChartPieAnggota({ anggota }: ChartPieAnggotaProps) {
  // Hitung jumlah anggota berdasarkan jenis anggota menggunakan useMemo
  const memberCounts = React.useMemo(() => {
    return anggota.reduce((acc, curr) => {
      acc[curr["jenisAnggota"]] = (acc[curr["jenisAnggota"]] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }, [anggota])

  // Format data untuk chart
  const chartData = React.useMemo(() => [
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
  ], [memberCounts])

  const totalMembers = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col justify-between ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribusi Jenis Anggota</CardTitle>
        <CardDescription>Total Anggota UKM Penristek</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
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
      <CardFooter className="flex-col text-sm text-center">
        <div className="leading-none text-muted-foreground">
          Menampilkan distribusi jenis keanggotaan UKM Penristek
        </div>
      </CardFooter>
    </Card>
  )
}