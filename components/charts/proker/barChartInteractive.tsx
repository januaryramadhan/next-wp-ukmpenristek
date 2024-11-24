"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { dataProker } from "@/data/dataProker"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Process data to count monthly events by platform for specific period
const processMonthlyData = () => {
  // Initialize array for months from Dec 2024 to Oct 2025
  const monthlyData = Array(11).fill(null).map(() => ({
    offline: 0,
    online: 0
  }))

  dataProker.forEach(proker => {
    const date = new Date(proker.date.split('→')[0])
    const year = date.getFullYear()
    const month = date.getMonth()

    // Only process data from Dec 2024 to Oct 2025
    if ((year === 2024 && month === 11) || // December 2024
        (year === 2025 && month <= 9)) {   // Jan to Oct 2025
      const monthIndex = year === 2024 ? 0 : month + 1 // Adjust index for Dec 2024
      if (proker.platform === "Online") {
        monthlyData[monthIndex].online++
      } else {
        monthlyData[monthIndex].offline++
      }
    }
  })

  // Create dates array from Dec 2024 to Oct 2025
  const dates = [
    new Date(2024, 11, 1), // December 2024
    ...Array(10).fill(null).map((_, i) => new Date(2025, i, 1)) // Jan to Oct 2025
  ]

  return dates.map((date, index) => ({
    date: date.toISOString().split('T')[0],
    offline: monthlyData[index].offline,
    online: monthlyData[index].online
  }))
}

const chartData = processMonthlyData()

const chartConfig = {
  views: {
    label: "Jumlah Program Kerja",
  },
  offline: {
    label: "Program Kerja Offline",
    color: "hsl(var(--chart-1))", // Menggunakan warna dari variabel CSS chart-1
  },
  online: {
    label: "Program Kerja Online",
    color: "hsl(var(--chart-2))", // Menggunakan warna dari variabel CSS chart-2
  },
} satisfies ChartConfig

export function BarChartInteractive() {
  const [activeChart, setActiveChart] = 
    React.useState<keyof typeof chartConfig>("offline")

  const total = React.useMemo(
    () => ({
      offline: chartData.reduce((acc, curr) => acc + curr.offline, 0),
      online: chartData.reduce((acc, curr) => acc + curr.online, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Program Kerja per Bulan</CardTitle>
          <CardDescription>
            Distribusi program kerja (Des 2024 - Okt 2025)
          </CardDescription>
        </div>
        <div className="flex">
          {["offline", "online"].map((key) => {
            const chart = key as keyof typeof chartConfig
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
                  {total[key as keyof typeof total]}
                </span>
              </button>
            )
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
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "2-digit"
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="proker"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar 
              dataKey={activeChart}
              fill={chartConfig[activeChart].color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}