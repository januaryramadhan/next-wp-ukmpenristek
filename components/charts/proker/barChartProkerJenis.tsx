"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { dataProker } from "@/data/dataProker"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Function to get month from date string
const getMonth = (dateStr: string) => {
  return new Date(dateStr.split('→')[0]).getMonth()
}

// Process data to count events per month by platform
const processData = () => {
  const monthlyData = Array(12).fill(null).map(() => ({
    online: 0,
    offline: 0
  }))

  dataProker.forEach(proker => {
    const month = getMonth(proker.date)
    if (proker.platform === "Online") {
      monthlyData[month].online++
    } else {
      monthlyData[month].offline++
    }
  })

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  return months.map((month, index) => ({
    month,
    online: monthlyData[index].online,
    offline: monthlyData[index].offline
  }))
}

const chartData = processData()

const chartConfig = {
  online: {
    label: "Online",
    color: "hsl(var(--primary))",
  },
  offline: {
    label: "Offline",
    color: "hsl(var(--muted))",
  },
} satisfies ChartConfig

export function BarChartProkerJenis() {
  // Calculate totals
  const totalOnline = chartData.reduce((sum, item) => sum + item.online, 0)
  const totalOffline = chartData.reduce((sum, item) => sum + item.offline, 0)
  const total = totalOnline + totalOffline

  return (
    <Card>
      <CardHeader>
        <CardTitle>Program Kerja by Month</CardTitle>
        <CardDescription>2024 - 2025</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={chartConfig}>
          <BarChart 
            data={chartData}
            margin={{ top: 20, right: 30, bottom: 0, left: 0 }}
            height={300}
          >
            <CartesianGrid 
              strokeDasharray="4 4" 
              horizontal={true}
              vertical={false}
              stroke="hsl(var(--border))"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              fontSize={12}
              tickMargin={8}
            />
            <ChartTooltip 
              cursor={{ fill: 'hsl(var(--muted))' }}
              content={<ChartTooltipContent />} 
            />
            <Bar
              name="Online"
              dataKey="online"
              stackId="a"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
            <Bar
              name="Offline"
              dataKey="offline"
              stackId="a"
              fill="hsl(var(--muted))"
              radius={[0, 0, 4, 4]}
              barSize={20}
            />
          </BarChart>
          <ChartLegend content={<ChartLegendContent />} />
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex w-full justify-between font-medium">
          <span>Total Program Kerja: {total} kegiatan</span>
          <span className="text-muted-foreground">
            Online: {totalOnline} | Offline: {totalOffline}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}