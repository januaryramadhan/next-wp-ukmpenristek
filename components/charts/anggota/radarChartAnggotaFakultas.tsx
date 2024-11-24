"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
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

// Count members by faculty
const facultyCounts = dataAnggota.reduce((acc, curr) => {
  acc[curr.Fakultas] = (acc[curr.Fakultas] || 0) + 1
  return acc
}, {} as Record<string, number>)

const chartData = Object.entries(facultyCounts).map(([faculty, count]) => ({
  faculty,
  count,
}))

const chartConfig = {
  count: {
    label: "Jumlah Anggota",
    color: "hsl(220 70% 50%)", // Biru
  },
} satisfies ChartConfig

export function RadarChartAnggotaFakultas() {
  // Calculate total members and percentage change
  const totalMembers = chartData.reduce((acc, curr) => acc + curr.count, 0)
  const maxCount = Math.max(...chartData.map(item => item.count))

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Distribusi Anggota per Fakultas</CardTitle>
        <CardDescription>
          Persebaran anggota berdasarkan fakultas
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis 
              dataKey="faculty"
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            />
            <PolarGrid 
              stroke="hsl(var(--border))"
            />
            <Radar
              name="Jumlah Anggota"
              dataKey="count"
              fill="hsl(220 70% 50%)"
              fillOpacity={0.3}
              stroke="hsl(220 70% 50%)"
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total {totalMembers} Anggota
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          Terbanyak di {chartData.find(d => d.count === maxCount)?.faculty} dengan {maxCount} anggota
        </div>
      </CardFooter>
    </Card>
  )
}