"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DateRangePicker({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  })

  const [preset, setPreset] = React.useState<string>("last7days")

  const handlePresetChange = (value: string) => {
    setPreset(value)

    const today = new Date()

    switch (value) {
      case "today":
        setDate({ from: today, to: today })
        break
      case "yesterday":
        const yesterday = addDays(today, -1)
        setDate({ from: yesterday, to: yesterday })
        break
      case "last7days":
        setDate({ from: addDays(today, -7), to: today })
        break
      case "last30days":
        setDate({ from: addDays(today, -30), to: today })
        break
      case "thisMonth":
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
        setDate({ from: firstDayOfMonth, to: today })
        break
      case "lastMonth":
        const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
        setDate({ from: firstDayOfLastMonth, to: lastDayOfLastMonth })
        break
      case "custom":
        // Keep the current date range
        break
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            size="sm"
            className={cn(
              "w-[260px] justify-start border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-left font-normal text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 border-b border-slate-200 dark:border-slate-700">
            <Select value={preset} onValueChange={handlePresetChange}>
              <SelectTrigger className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                <SelectValue placeholder="Select a preset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7days">Last 7 days</SelectItem>
                <SelectItem value="last30days">Last 30 days</SelectItem>
                <SelectItem value="thisMonth">This month</SelectItem>
                <SelectItem value="lastMonth">Last month</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate)
              if (newDate?.from && newDate?.to) {
                setPreset("custom")
              }
            }}
            numberOfMonths={2}
            className="dark:bg-slate-800 dark:text-white"
          />
          <div className="p-3 border-t border-slate-200 dark:border-slate-700 flex justify-end">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={() => {
                // In a real app, this would trigger data refresh
                console.log("Applying date range:", date)
              }}
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
