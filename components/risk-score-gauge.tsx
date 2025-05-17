"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Risk", value: 72 },
  { name: "Safe", value: 28 },
]

const COLORS = ["#ef4444", "#3b82f6"]

export function RiskScoreGauge() {
  return (
    <div className="relative w-full h-[200px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-bold text-slate-900">72</div>
        <div className="text-sm text-slate-500">Risk Score</div>
      </div>
      <div className="absolute bottom-0 w-full flex justify-between px-4">
        <div className="text-sm text-green-600">Low Risk</div>
        <div className="text-sm text-red-600">High Risk</div>
      </div>
    </div>
  )
}
