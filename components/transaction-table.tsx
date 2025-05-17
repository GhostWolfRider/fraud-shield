"use client"

import { useState } from "react"
import { AlertTriangle, ArrowDown, ArrowUp, Check, CreditCard, Eye, MoreHorizontal, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TransactionDetails } from "@/components/transaction-details"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data for transactions
const mockTransactions = [
  {
    id: "TX-78945",
    date: "2025-05-17T14:23:02",
    amount: 1249.99,
    merchant: "TechGadgets Inc.",
    merchantId: "tech-gadgets",
    card: "**** **** **** 4532",
    status: "approved",
    riskScore: 12,
  },
  {
    id: "TX-78944",
    date: "2025-05-17T13:45:18",
    amount: 3499.99,
    merchant: "Luxury Electronics",
    merchantId: "luxury-electronics",
    card: "**** **** **** 7865",
    status: "flagged",
    riskScore: 87,
  },
  {
    id: "TX-78943",
    date: "2025-05-17T12:32:45",
    amount: 299.5,
    merchant: "Fashion Outlet",
    merchantId: "fashion-outlet",
    card: "**** **** **** 1243",
    status: "approved",
    riskScore: 23,
  },
  {
    id: "TX-78942",
    date: "2025-05-17T11:18:36",
    amount: 5999.99,
    merchant: "Premium Gadgets",
    merchantId: "premium-gadgets",
    card: "**** **** **** 9876",
    status: "declined",
    riskScore: 95,
  },
  {
    id: "TX-78941",
    date: "2025-05-17T10:05:22",
    amount: 149.99,
    merchant: "Online Marketplace",
    merchantId: "online-marketplace",
    card: "**** **** **** 6543",
    status: "approved",
    riskScore: 18,
  },
  {
    id: "TX-78940",
    date: "2025-05-17T09:47:11",
    amount: 2499.99,
    merchant: "Digital Store",
    merchantId: "digital-store",
    card: "**** **** **** 3214",
    status: "flagged",
    riskScore: 76,
  },
  {
    id: "TX-78939",
    date: "2025-05-17T08:33:59",
    amount: 799.99,
    merchant: "Tech Accessories",
    merchantId: "tech-accessories",
    card: "**** **** **** 7890",
    status: "approved",
    riskScore: 32,
  },
  {
    id: "TX-78938",
    date: "2025-05-17T07:22:47",
    amount: 4999.99,
    merchant: "Premium Electronics",
    merchantId: "premium-electronics",
    card: "**** **** **** 4567",
    status: "declined",
    riskScore: 91,
  },
  {
    id: "TX-78937",
    date: "2025-05-17T06:15:33",
    amount: 199.99,
    merchant: "Online Shop",
    merchantId: "online-shop",
    card: "**** **** **** 1234",
    status: "approved",
    riskScore: 15,
  },
  {
    id: "TX-78936",
    date: "2025-05-17T05:08:21",
    amount: 1999.99,
    merchant: "Gadget World",
    merchantId: "gadget-world",
    card: "**** **** **** 8765",
    status: "flagged",
    riskScore: 82,
  },
]

interface TransactionTableProps {
  filter?: string
  limit?: number
  merchantId?: string
}

export function TransactionTable({ filter, limit, merchantId = "all" }: TransactionTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
    if (score < 30) {
      return (
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 mr-2"></div>
          <span className="font-medium">{score}</span>
        </div>
      )
    } else if (score < 70) {
      return (
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-yellow-500 dark:bg-yellow-400 mr-2"></div>
          <span className="font-medium">{score}</span>
        </div>
      )
    } else {
      return (
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-red-500 dark:bg-red-400 mr-2"></div>
          <span className="font-medium">{score}</span>
        </div>
      )
    }
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const sortTransactions = (transactions: typeof mockTransactions) => {
    if (!sortField) return transactions

    return [...transactions].sort((a, b) => {
      let aValue = a[sortField as keyof typeof a]
      let bValue = b[sortField as keyof typeof b]

      if (sortField === "date") {
        aValue = new Date(a.date).getTime()
        bValue = new Date(b.date).getTime()
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }

  const openTransactionDetails = (id: string) => {
    setSelectedTransaction(id)
    setIsDetailsOpen(true)
  }

  // Filter transactions based on filter prop, merchant ID, and search term
  const filteredTransactions = mockTransactions
    .filter((transaction) => {
      // Filter by status if specified
      if (filter && filter !== "all") {
        return transaction.status === filter
      }
      return true
    })
    .filter((transaction) => {
      // Filter by merchant if specified
      if (merchantId && merchantId !== "all") {
        return transaction.merchantId === merchantId
      }
      return true
    })
    .filter((transaction) => {
      // Filter by search term
      if (searchTerm) {
        return (
          transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      return true
    })

  const sortedTransactions = sortTransactions(filteredTransactions).slice(0, limit || filteredTransactions.length)

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />
  }

  return (
    <div className="space-y-4">
      {!limit && (
        <div className="flex items-center justify-between">
          <div className="relative w-64">
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 border-slate-200 dark:border-slate-700 dark:bg-slate-800"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`border-slate-200 dark:border-slate-700 dark:bg-slate-800 ${sortField === "date" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
              onClick={() => handleSort("date")}
            >
              <span className="flex items-center">Date {getSortIcon("date")}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`border-slate-200 dark:border-slate-700 dark:bg-slate-800 ${sortField === "amount" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
              onClick={() => handleSort("amount")}
            >
              <span className="flex items-center">Amount {getSortIcon("amount")}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`border-slate-200 dark:border-slate-700 dark:bg-slate-800 ${sortField === "riskScore" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
              onClick={() => handleSort("riskScore")}
            >
              <span className="flex items-center">Risk {getSortIcon("riskScore")}</span>
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-md border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800 shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
            <TableRow className="hover:bg-slate-100 dark:hover:bg-slate-800/80 border-slate-200 dark:border-slate-700">
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium">Transaction ID</TableHead>
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium">Date & Time</TableHead>
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium">Amount</TableHead>
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium hidden md:table-cell">
                Merchant
              </TableHead>
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium hidden lg:table-cell">
                Card
              </TableHead>
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium">Status</TableHead>
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium">Risk Score</TableHead>
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTransactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 border-slate-200 dark:border-slate-700"
              >
                <TableCell className="font-medium text-blue-600 dark:text-blue-400">{transaction.id}</TableCell>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell className="font-medium">${transaction.amount.toLocaleString()}</TableCell>
                <TableCell className="hidden md:table-cell">{transaction.merchant}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4 text-slate-400" />
                    {transaction.card}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                <TableCell>{getRiskIndicator(transaction.riskScore)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      onClick={() => openTransactionDetails(transaction.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openTransactionDetails(transaction.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Check className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                          Approve Transaction
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <AlertTriangle className="mr-2 h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                          Flag as Suspicious
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <X className="mr-2 h-4 w-4 text-red-600 dark:text-red-400" />
                          Decline Transaction
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {sortedTransactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-slate-500 dark:text-slate-400">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <TransactionDetails transaction={mockTransactions.find((t) => t.id === selectedTransaction)!} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
