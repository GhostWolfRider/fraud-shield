"use client"

import { useState } from "react"
import { Download, FileText, Table } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface ExportOptionsProps {
  isOpen: boolean
  onClose: () => void
  currentView: string
  merchantId: string
}

export function ExportOptions({ isOpen, onClose, currentView, merchantId }: ExportOptionsProps) {
  const [exportFormat, setExportFormat] = useState("csv")
  const [dateRange, setDateRange] = useState("last7days")
  const [includeDetails, setIncludeDetails] = useState(true)

  const handleExport = () => {
    // In a real app, this would trigger the export process
    console.log("Exporting data:", {
      format: exportFormat,
      dateRange,
      includeDetails,
      currentView,
      merchantId,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Export Data</DialogTitle>
          <DialogDescription>
            Choose your export options for {currentView === "overview" ? "dashboard" : currentView} data
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label>Export Format</Label>
            <RadioGroup defaultValue={exportFormat} onValueChange={setExportFormat} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="flex items-center gap-2 cursor-pointer">
                  <Table className="h-4 w-4" />
                  CSV
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excel" id="excel" />
                <Label htmlFor="excel" className="flex items-center gap-2 cursor-pointer">
                  <Table className="h-4 w-4" />
                  Excel
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center gap-2 cursor-pointer">
                  <FileText className="h-4 w-4" />
                  PDF
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date-range">Date Range</Label>
            <Select defaultValue={dateRange} onValueChange={setDateRange}>
              <SelectTrigger id="date-range" className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7days">Last 7 days</SelectItem>
                <SelectItem value="last30days">Last 30 days</SelectItem>
                <SelectItem value="thisMonth">This month</SelectItem>
                <SelectItem value="lastMonth">Last month</SelectItem>
                <SelectItem value="custom">Custom (use date picker)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Export Options</Label>
            <div className="flex flex-col gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-details"
                  checked={includeDetails}
                  onCheckedChange={(checked) => setIncludeDetails(!!checked)}
                />
                <Label htmlFor="include-details" className="cursor-pointer">
                  Include detailed transaction data
                </Label>
              </div>
              {merchantId === "all" && (
                <div className="flex items-center space-x-2">
                  <Checkbox id="separate-merchants" defaultChecked />
                  <Label htmlFor="separate-merchants" className="cursor-pointer">
                    Create separate files for each merchant
                  </Label>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Checkbox id="include-risk" defaultChecked />
                <Label htmlFor="include-risk" className="cursor-pointer">
                  Include risk scores and analysis
                </Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
