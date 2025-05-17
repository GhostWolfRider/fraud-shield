"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Building2,
  Check,
  CreditCard,
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldAlert,
  Store,
  Trash,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for merchants
const merchants = [
  {
    id: 1,
    name: "TechGadgets Inc.",
    category: "Electronics",
    riskLevel: "low",
    transactionVolume: 1245,
    status: "active",
    lastUpdated: "2025-05-15T14:23:02",
  },
  {
    id: 2,
    name: "Luxury Electronics",
    category: "Electronics",
    riskLevel: "high",
    transactionVolume: 876,
    status: "active",
    lastUpdated: "2025-05-14T10:15:22",
  },
  {
    id: 3,
    name: "Fashion Outlet",
    category: "Clothing",
    riskLevel: "medium",
    transactionVolume: 2134,
    status: "active",
    lastUpdated: "2025-05-16T09:45:11",
  },
  {
    id: 4,
    name: "Premium Gadgets",
    category: "Electronics",
    riskLevel: "high",
    transactionVolume: 543,
    status: "suspended",
    lastUpdated: "2025-05-12T16:30:45",
  },
  {
    id: 5,
    name: "Online Marketplace",
    category: "Marketplace",
    riskLevel: "low",
    transactionVolume: 3421,
    status: "active",
    lastUpdated: "2025-05-17T08:20:33",
  },
  {
    id: 6,
    name: "Digital Store",
    category: "Digital Goods",
    riskLevel: "medium",
    transactionVolume: 987,
    status: "active",
    lastUpdated: "2025-05-16T11:10:55",
  },
  {
    id: 7,
    name: "Tech Accessories",
    category: "Electronics",
    riskLevel: "low",
    transactionVolume: 765,
    status: "active",
    lastUpdated: "2025-05-15T13:40:21",
  },
  {
    id: 8,
    name: "Premium Electronics",
    category: "Electronics",
    riskLevel: "high",
    transactionVolume: 432,
    status: "suspended",
    lastUpdated: "2025-05-10T15:25:18",
  },
]

export function MerchantConfig() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter merchants based on search term
  const filteredMerchants = merchants.filter((merchant) => {
    if (searchTerm) {
      return (
        merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.category.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
            <Check className="mr-1 h-3 w-3" /> Low
          </Badge>
        )
      case "medium":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200">
            <AlertTriangle className="mr-1 h-3 w-3" /> Medium
          </Badge>
        )
      case "high":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">
            <ShieldAlert className="mr-1 h-3 w-3" /> High
          </Badge>
        )
      default:
        return <Badge variant="outline">{risk}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">Active</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">Suspended</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="merchants" className="w-full">
        <TabsList className="bg-white border border-slate-200 shadow-sm">
          <TabsTrigger value="merchants" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Merchants
          </TabsTrigger>
          <TabsTrigger value="rules" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Risk Rules
          </TabsTrigger>
          <TabsTrigger value="categories" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Categories
          </TabsTrigger>
        </TabsList>

        <TabsContent value="merchants" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search merchants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 border-slate-200"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Merchant
            </Button>
          </div>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow className="hover:bg-slate-100 border-slate-200">
                    <TableHead className="text-slate-600 font-medium">Merchant</TableHead>
                    <TableHead className="text-slate-600 font-medium">Category</TableHead>
                    <TableHead className="text-slate-600 font-medium">Risk Level</TableHead>
                    <TableHead className="text-slate-600 font-medium">Transaction Volume</TableHead>
                    <TableHead className="text-slate-600 font-medium">Status</TableHead>
                    <TableHead className="text-slate-600 font-medium">Last Updated</TableHead>
                    <TableHead className="text-slate-600 font-medium text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMerchants.map((merchant) => (
                    <TableRow key={merchant.id} className="hover:bg-slate-50 border-slate-200">
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Store className="mr-2 h-4 w-4 text-slate-400" />
                          {merchant.name}
                        </div>
                      </TableCell>
                      <TableCell>{merchant.category}</TableCell>
                      <TableCell>{getRiskBadge(merchant.riskLevel)}</TableCell>
                      <TableCell>{merchant.transactionVolume.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(merchant.status)}</TableCell>
                      <TableCell>{formatDate(merchant.lastUpdated)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Merchant
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Configure Rules
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CreditCard className="mr-2 h-4 w-4" />
                              View Transactions
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Merchant
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
        </TabsContent>

        <TabsContent value="rules" className="mt-4 space-y-4">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Risk Rules Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Building2 className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-medium">Risk Rules Configuration</h3>
                <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                  Configure merchant-specific risk rules and thresholds for transaction monitoring
                </p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure Rules
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="mt-4 space-y-4">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Merchant Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Store className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-medium">Merchant Categories</h3>
                <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                  Manage merchant categories and associated risk profiles
                </p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
