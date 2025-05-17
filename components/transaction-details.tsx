"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Calendar,
  Check,
  CreditCard,
  DollarSign,
  FileText,
  MapPin,
  Shield,
  ShoppingBag,
  User,
  X,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface Transaction {
  id: string
  date: string
  amount: number
  merchant: string
  merchantId: string
  card: string
  status: string
  riskScore: number
}

interface TransactionDetailsProps {
  transaction: Transaction
}

export function TransactionDetails({ transaction }: TransactionDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 dark:border-green-900/50">
            <Check className="mr-1 h-3 w-3" /> Approved
          </Badge>
        )
      case "flagged":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:hover:bg-yellow-900/50 dark:border-yellow-900/50">
            <AlertTriangle className="mr-1 h-3 w-3" /> Flagged
          </Badge>
        )
      case "declined":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 dark:border-red-900/50">
            <X className="mr-1 h-3 w-3" /> Declined
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRiskIndicator = (score: number) => {
    let color = ""
    let label = ""

    if (score < 30) {
      color = "bg-green-500 dark:bg-green-400"
      label = "Low Risk"
    } else if (score < 70) {
      color = "bg-yellow-500 dark:bg-yellow-400"
      label = "Medium Risk"
    } else {
      color = "bg-red-500 dark:bg-red-400"
      label = "High Risk"
    }

    return (
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full ${color} mr-2`}></div>
        <span className="font-medium">{score}</span>
        <span className="text-slate-500 dark:text-slate-400 ml-1">({label})</span>
      </div>
    )
  }

  // Mock additional transaction details
  const transactionDetails = {
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
    },
    location: {
      ip: "192.168.1.1",
      country: "United States",
      city: "New York",
      coordinates: "40.7128° N, 74.0060° W",
    },
    device: {
      type: "Desktop",
      browser: "Chrome 98.0.4758.102",
      os: "Windows 10",
      fingerprint: "a1b2c3d4e5f6g7h8i9j0",
    },
    riskFactors: [
      { factor: "Unusual location", severity: "high" },
      { factor: "New device", severity: "medium" },
      { factor: "Large transaction amount", severity: "medium" },
    ],
    timeline: [
      { time: "2025-05-17T14:23:02", event: "Transaction initiated", status: "info" },
      { time: "2025-05-17T14:23:05", event: "Risk assessment performed", status: "info" },
      { time: "2025-05-17T14:23:08", event: "Flagged for review", status: "warning" },
      { time: "2025-05-17T14:23:15", event: "Manual review required", status: "warning" },
    ],
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Transaction {transaction.id}</h3>
            {getStatusBadge(transaction.status)}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full text-blue-600 dark:text-blue-400">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Date & Time</p>
                <p className="text-sm font-medium">{formatDate(transaction.date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full text-green-600 dark:text-green-400">
                <DollarSign className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Amount</p>
                <p className="text-sm font-medium">${transaction.amount.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-full text-purple-600 dark:text-purple-400">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Merchant</p>
                <p className="text-sm font-medium">{transaction.merchant}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Card</p>
                <p className="text-sm font-medium">{transaction.card}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-full text-yellow-600 dark:text-yellow-400">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Risk Score</p>
              <div className="text-sm">{getRiskIndicator(transaction.riskScore)}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full text-blue-600 dark:text-blue-400">
              <User className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Customer</p>
              <p className="text-sm font-medium">{transactionDetails.customer.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{transactionDetails.customer.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full text-green-600 dark:text-green-400">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Location</p>
              <p className="text-sm font-medium">
                {transactionDetails.location.city}, {transactionDetails.location.country}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">IP: {transactionDetails.location.ip}</p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Risk Factors</h4>
            <div className="space-y-2">
              {transactionDetails.riskFactors.map((factor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm p-2 bg-slate-50 dark:bg-slate-800/50 rounded-md"
                >
                  <span>{factor.factor}</span>
                  <Badge
                    className={
                      factor.severity === "high"
                        ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/50"
                        : factor.severity === "medium"
                          ? "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-900/50"
                          : "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900/50"
                    }
                  >
                    {factor.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator className="dark:border-slate-700" />

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <TabsTrigger
            value="timeline"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-400"
          >
            Timeline
          </TabsTrigger>
          <TabsTrigger
            value="customer"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-400"
          >
            Customer Details
          </TabsTrigger>
          <TabsTrigger
            value="device"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-400"
          >
            Device Info
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="mt-4">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Transaction Timeline</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Chronological events for this transaction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 border-l border-slate-200 dark:border-slate-700 space-y-4">
                {transactionDetails.timeline.map((event, index) => {
                  const date = new Date(event.time)
                  const time = date.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })

                  return (
                    <div key={index} className="relative">
                      <div
                        className={`absolute -left-[25px] w-4 h-4 rounded-full ${
                          event.status === "warning"
                            ? "bg-yellow-500 dark:bg-yellow-400"
                            : event.status === "error"
                              ? "bg-red-500 dark:bg-red-400"
                              : "bg-blue-500 dark:bg-blue-400"
                        }`}
                      ></div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{time}</p>
                      <p className="text-sm font-medium">{event.event}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer" className="mt-4">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Customer Information</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Details about the customer who made this transaction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{transactionDetails.customer.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{transactionDetails.customer.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{transactionDetails.customer.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{transactionDetails.customer.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="device" className="mt-4">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Device Information</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Details about the device used for this transaction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Device Type</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{transactionDetails.device.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Browser</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{transactionDetails.device.browser}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Operating System</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{transactionDetails.device.os}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Device Fingerprint</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{transactionDetails.device.fingerprint}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="outline"
          className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <FileText className="mr-2 h-4 w-4" />
          Export Details
        </Button>
        {transaction.status === "flagged" && (
          <>
            <Button
              variant="outline"
              className="border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <X className="mr-2 h-4 w-4" />
              Decline
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
              <Check className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
