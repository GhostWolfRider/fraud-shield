"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
  Cell,
} from "recharts"
import { ChartTooltip } from "@/components/ui/chart"

// Mock data for anomaly detection
const data = [
  { name: "Location", score: 85 },
  { name: "Amount", score: 92 },
  { name: "Frequency", score: 78 },
  { name: "Time", score: 65 },
  { name: "Device", score: 72 },
  { name: "Network", score: 88 },
]

export function AnomalyDetection() {
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <ChartTooltip className="bg-white border-slate-200 shadow-md">
          <div className="text-sm font-medium text-slate-900">{label} Anomaly</div>
          <div className="text-xs text-slate-600 mt-1">
            <span>Anomaly Score: {payload[0].value}/100</span>
          </div>
        </ChartTooltip>
      )
    }
    return null
  }

  const getBarColor = (score: number) => {
    if (score < 70) return "#4ade80"
    if (score < 85) return "#facc15"
    return "#ef4444"
  }

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="name"
            stroke="#64748b"
            tick={{ fill: "#64748b" }}
            tickLine={{ stroke: "#e2e8f0" }}
            axisLine={{ stroke: "#e2e8f0" }}
          />
          <YAxis
            stroke="#64748b"
            tick={{ fill: "#64748b" }}
            tickLine={{ stroke: "#e2e8f0" }}
            axisLine={{ stroke: "#e2e8f0" }}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="score" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
