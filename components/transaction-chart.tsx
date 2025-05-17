"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, type TooltipProps } from "recharts"
import { ChartTooltip } from "@/components/ui/chart"

// Mock data for transaction volume chart
const data = [
  { name: "00:00", transactions: 120, fraudulent: 5 },
  { name: "02:00", transactions: 85, fraudulent: 3 },
  { name: "04:00", transactions: 65, fraudulent: 2 },
  { name: "06:00", transactions: 98, fraudulent: 4 },
  { name: "08:00", transactions: 156, fraudulent: 7 },
  { name: "10:00", transactions: 245, fraudulent: 12 },
  { name: "12:00", transactions: 302, fraudulent: 18 },
  { name: "14:00", transactions: 278, fraudulent: 15 },
  { name: "16:00", transactions: 325, fraudulent: 22 },
  { name: "18:00", transactions: 310, fraudulent: 19 },
  { name: "20:00", transactions: 265, fraudulent: 14 },
  { name: "22:00", transactions: 190, fraudulent: 9 },
]

export function TransactionChart() {
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <ChartTooltip className="bg-white border-slate-200 shadow-md">
          <div className="text-sm font-medium text-slate-900">{label}</div>
          <div className="text-xs text-slate-600">
            <div className="flex items-center mt-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span>Transactions: {payload[0].value}</span>
            </div>
            <div className="flex items-center mt-1">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span>Fraudulent: {payload[1].value}</span>
            </div>
            <div className="flex items-center mt-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span>Fraud Rate: {((Number(payload[1].value) / Number(payload[0].value)) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </ChartTooltip>
      )
    }
    return null
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="transactions"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4, fill: "#ffffff", strokeWidth: 2, stroke: "#3b82f6" }}
            activeDot={{ r: 6, fill: "#3b82f6", stroke: "#ffffff", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="fraudulent"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 4, fill: "#ffffff", strokeWidth: 2, stroke: "#ef4444" }}
            activeDot={{ r: 6, fill: "#ef4444", stroke: "#ffffff", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
