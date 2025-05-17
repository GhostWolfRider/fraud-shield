"use client"

import { useState } from "react"
import { AlertTriangle, Check, Edit, MoreHorizontal, Plus, Trash, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for alerts
const alerts = [
  {
    id: 1,
    name: "High Risk Transaction",
    description: "Alert when a transaction has a risk score above 80",
    type: "risk",
    threshold: "80",
    status: "active",
    notifyVia: ["email", "dashboard"],
    createdAt: "2025-05-10T14:23:02",
  },
  {
    id: 2,
    name: "Unusual Location",
    description: "Alert when a transaction occurs from a new country",
    type: "location",
    threshold: "new country",
    status: "active",
    notifyVia: ["email", "sms", "dashboard"],
    createdAt: "2025-05-12T10:15:22",
  },
  {
    id: 3,
    name: "Large Transaction Amount",
    description: "Alert when a transaction amount exceeds $5,000",
    type: "amount",
    threshold: "$5,000",
    status: "active",
    notifyVia: ["dashboard"],
    createdAt: "2025-05-14T09:45:11",
  },
  {
    id: 4,
    name: "Multiple Failed Attempts",
    description: "Alert when there are 3+ failed transaction attempts within 1 hour",
    type: "attempts",
    threshold: "3 attempts/hour",
    status: "inactive",
    notifyVia: ["email"],
    createdAt: "2025-05-15T16:30:45",
  },
  {
    id: 5,
    name: "New Device Detection",
    description: "Alert when a transaction is made from a new device",
    type: "device",
    threshold: "new device",
    status: "active",
    notifyVia: ["email", "dashboard"],
    createdAt: "2025-05-16T08:20:33",
  },
]

export function AlertsConfig() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false)

  // Filter alerts based on search term
  const filteredAlerts = alerts.filter((alert) => {
    if (searchTerm) {
      return (
        alert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    return true
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
            <Check className="mr-1 h-3 w-3" /> Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200">
            <X className="mr-1 h-3 w-3" /> Inactive
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "risk":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">
            <AlertTriangle className="mr-1 h-3 w-3" /> Risk
          </Badge>
        )
      case "location":
        return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200">Location</Badge>
      case "amount":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">Amount</Badge>
      case "attempts":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200">Attempts</Badge>
      case "device":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">Device</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Alerts Configuration</CardTitle>
          <CardDescription>Manage and configure custom alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Input
              type="text"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <Button onClick={() => setIsCreateAlertOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Create Alert
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Threshold</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notify Via</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>{alert.name}</TableCell>
                  <TableCell>{alert.description}</TableCell>
                  <TableCell>{getTypeBadge(alert.type)}</TableCell>
                  <TableCell>{alert.threshold}</TableCell>
                  <TableCell>{getStatusBadge(alert.status)}</TableCell>
                  <TableCell>
                    {alert.notifyVia.map((channel, index) => (
                      <span key={index} className="mr-2">
                        {channel.charAt(0).toUpperCase() + channel.slice(1)}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell>{formatDate(alert.createdAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={isCreateAlertOpen} onOpenChange={setIsCreateAlertOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Open</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Alert</DialogTitle>
            <DialogDescription>
              Configure a new alert with specific criteria and notification channels.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input id="description" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select alert type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="risk">Risk</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="attempts">Attempts</SelectItem>
                  <SelectItem value="device">Device</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="threshold" className="text-right">
                Threshold
              </Label>
              <Input id="threshold" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Switch id="status" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notifyVia" className="text-right">
                Notify Via
              </Label>
              <Select multiple id="notifyVia" className="col-span-3">
                <SelectTrigger>
                  <SelectValue placeholder="Select notification channels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="dashboard">Dashboard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Alert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
