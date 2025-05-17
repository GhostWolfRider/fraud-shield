"use client"

import { useState, useEffect } from "react"
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  ChevronDown,
  CreditCard,
  Database,
  DollarSign,
  Download,
  FileText,
  Filter,
  HelpCircle,
  LineChart,
  LogOut,
  Moon,
  RefreshCw,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  Store,
  Sun,
  User,
  Users,
  Zap,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TransactionTable } from "@/components/transaction-table"
import { MerchantConfig } from "@/components/merchant-config"
import { UserManagement } from "@/components/user-management"
import { AIInsights } from "@/components/ai-insights"
import { TransactionChart } from "@/components/transaction-chart"
import { GeographicMap } from "@/components/geographic-map"
import { RiskScoreGauge } from "@/components/risk-score-gauge"
import { AnomalyDetection } from "@/components/anomaly-detection"
import { DateRangePicker } from "@/components/date-range-picker"
import { AlertsConfig } from "@/components/alerts-config"
import { MerchantRules } from "@/components/merchant-rules"
import { ExportOptions } from "@/components/export-options"
import { useTheme } from "next-themes"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock merchants for the merchant selector
const merchants = [
  { id: "all", name: "All Merchants" },
  { id: "tech-gadgets", name: "TechGadgets Inc." },
  { id: "luxury-electronics", name: "Luxury Electronics" },
  { id: "fashion-outlet", name: "Fashion Outlet" },
  { id: "premium-gadgets", name: "Premium Gadgets" },
  { id: "online-marketplace", name: "Online Marketplace" },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true)
  const [selectedMerchant, setSelectedMerchant] = useState("all")
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [isMerchantRulesOpen, setIsMerchantRulesOpen] = useState(false)
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null)
  const { theme, setTheme } = useTheme()

  // Simulate real-time updates
  useEffect(() => {
    if (isRealTimeEnabled) {
      const interval = setInterval(() => {
        console.log("Refreshing data...")
        // In a real app, this would fetch new data
      }, 5000)
      setRefreshInterval(interval)
    } else if (refreshInterval) {
      clearInterval(refreshInterval)
      setRefreshInterval(null)
    }

    return () => {
      if (refreshInterval) clearInterval(refreshInterval)
    }
  }, [isRealTimeEnabled])

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden">
        <Sidebar variant="floating" className="border-r border-slate-200 dark:border-slate-800 shadow-sm">
          <SidebarHeader className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                FraudShield
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "overview"}
                  onClick={() => setActiveTab("overview")}
                  tooltip="Overview"
                >
                  <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "transactions"}
                  onClick={() => setActiveTab("transactions")}
                  tooltip="Transactions"
                >
                  <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>Transactions</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "ai-insights"}
                  onClick={() => setActiveTab("ai-insights")}
                  tooltip="AI Insights"
                >
                  <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>AI Insights</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "merchants"}
                  onClick={() => setActiveTab("merchants")}
                  tooltip="Merchants"
                >
                  <Store className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>Merchants</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "users"}
                  onClick={() => setActiveTab("users")}
                  tooltip="Users"
                >
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>Users</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "alerts"}
                  onClick={() => setActiveTab("alerts")}
                  tooltip="Alerts"
                >
                  <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>Alerts</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "settings"}
                  onClick={() => setActiveTab("settings")}
                  tooltip="Settings"
                >
                  <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border border-slate-200 dark:border-slate-700">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Admin</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm z-10">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white" />
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search transactions..."
                    className="pl-8 border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus-visible:ring-blue-500"
                  />
                </div>
                <Select value={selectedMerchant} onValueChange={setSelectedMerchant}>
                  <SelectTrigger className="w-[220px] border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                    <SelectValue placeholder="Select merchant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Merchants</SelectLabel>
                      {merchants.map((merchant) => (
                        <SelectItem key={merchant.id} value={merchant.id}>
                          {merchant.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <DateRangePicker />
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  onClick={() => setIsMerchantRulesOpen(true)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Merchant Rules
                </Button>
                <Button
                  variant={isRealTimeEnabled ? "default" : "outline"}
                  size="sm"
                  className={
                    isRealTimeEnabled
                      ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                      : "border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }
                  onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${isRealTimeEnabled ? "animate-spin" : ""}`} />
                  {isRealTimeEnabled ? "Real-time On" : "Real-time Off"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  onClick={() => setIsExportOpen(true)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 relative"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                    3
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900 p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Fraud Detection Dashboard
                    {selectedMerchant !== "all" && (
                      <span className="ml-2 text-lg font-normal text-slate-500 dark:text-slate-400">
                        - {merchants.find((m) => m.id === selectedMerchant)?.name}
                      </span>
                    )}
                  </h1>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-blue-500 text-blue-600 dark:text-blue-400 font-medium">
                      <span className="mr-1 h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 inline-block animate-pulse"></span>
                      Live Data
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-green-500 text-green-600 dark:text-green-400 font-medium"
                    >
                      <span className="mr-1 h-2 w-2 rounded-full bg-green-600 dark:bg-green-400 inline-block"></span>
                      AI Active
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Total Transactions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">24,892</div>
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full text-blue-600 dark:text-blue-400">
                          <Activity className="h-5 w-5" />
                        </div>
                      </div>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center">
                        <ChevronDown className="h-3 w-3 rotate-180" />
                        12% increase from last week
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Fraud Detected
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">342</div>
                        <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-full text-red-600 dark:text-red-400">
                          <ShieldAlert className="h-5 w-5" />
                        </div>
                      </div>
                      <p className="text-xs text-red-600 dark:text-red-400 mt-2 flex items-center">
                        <ChevronDown className="h-3 w-3" />
                        8% increase from last week
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Total Amount
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">$1.28M</div>
                        <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full text-green-600 dark:text-green-400">
                          <DollarSign className="h-5 w-5" />
                        </div>
                      </div>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center">
                        <ChevronDown className="h-3 w-3 rotate-180" />
                        15% increase from last week
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Risk Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">72/100</div>
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-full text-yellow-600 dark:text-yellow-400">
                          <AlertTriangle className="h-5 w-5" />
                        </div>
                      </div>
                      <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2 flex items-center">
                        <ChevronDown className="h-3 w-3" />
                        3% increase from last week
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow lg:col-span-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Transaction Volume</CardTitle>
                          <CardDescription className="text-slate-500 dark:text-slate-400">
                            Transaction volume over time with fraud indicators
                          </CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                            >
                              <LineChart className="mr-2 h-4 w-4" />
                              View Options
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Show All Transactions</DropdownMenuItem>
                            <DropdownMenuItem>Show Fraudulent Only</DropdownMenuItem>
                            <DropdownMenuItem>Show by Amount</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Export Chart</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <TransactionChart />
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>Risk Score Analysis</CardTitle>
                      <CardDescription className="text-slate-500 dark:text-slate-400">
                        Current system risk assessment
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                      <RiskScoreGauge />
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Geographic Distribution</CardTitle>
                          <CardDescription className="text-slate-500 dark:text-slate-400">
                            Transaction locations with risk indicators
                          </CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          <Filter className="mr-2 h-4 w-4" />
                          Filter Map
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <GeographicMap />
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Anomaly Detection</CardTitle>
                          <CardDescription className="text-slate-500 dark:text-slate-400">
                            AI-detected unusual patterns
                          </CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          <BarChart3 className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <AnomalyDetection />
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription className="text-slate-500 dark:text-slate-400">
                          Latest transaction activity with fraud indicators
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                        onClick={() => setActiveTab("transactions")}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <TransactionTable limit={5} merchantId={selectedMerchant} />
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "transactions" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Transaction Management</h1>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                    onClick={() => setIsExportOpen(true)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                </div>

                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <TabsTrigger
                      value="all"
                      className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-400"
                    >
                      All Transactions
                    </TabsTrigger>
                    <TabsTrigger
                      value="flagged"
                      className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-400"
                    >
                      Flagged
                    </TabsTrigger>
                    <TabsTrigger
                      value="approved"
                      className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-400"
                    >
                      Approved
                    </TabsTrigger>
                    <TabsTrigger
                      value="declined"
                      className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-400"
                    >
                      Declined
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="mt-4">
                    <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                      <CardContent className="pt-6">
                        <TransactionTable filter="all" merchantId={selectedMerchant} />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="flagged" className="mt-4">
                    <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                      <CardContent className="pt-6">
                        <TransactionTable filter="flagged" merchantId={selectedMerchant} />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="approved" className="mt-4">
                    <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                      <CardContent className="pt-6">
                        <TransactionTable filter="approved" merchantId={selectedMerchant} />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="declined" className="mt-4">
                    <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                      <CardContent className="pt-6">
                        <TransactionTable filter="declined" merchantId={selectedMerchant} />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {activeTab === "ai-insights" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Insights & Pattern Detection</h1>
                  <Badge
                    variant="outline"
                    className="border-purple-500 text-purple-600 dark:text-purple-400 font-medium"
                  >
                    AI Model v2.4
                  </Badge>
                </div>

                <AIInsights merchantId={selectedMerchant} />
              </div>
            )}

            {activeTab === "merchants" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Merchant Configuration</h1>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsMerchantRulesOpen(true)}
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      Configure Rules
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
                      <Building2 className="mr-2 h-4 w-4" />
                      Add Merchant
                    </Button>
                  </div>
                </div>

                <MerchantConfig />
              </div>
            )}

            {activeTab === "users" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h1>
                  <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
                    <User className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </div>

                <UserManagement />
              </div>
            )}

            {activeTab === "alerts" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Alert Configuration</h1>
                  <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
                    <Bell className="mr-2 h-4 w-4" />
                    Create Alert
                  </Button>
                </div>

                <AlertsConfig merchantId={selectedMerchant} />
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">System Settings</h1>
                  <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
                    <Database className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>

                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <TabsTrigger
                      value="general"
                      className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-400"
                    >
                      General
                    </TabsTrigger>
                    <TabsTrigger
                      value="security"
                      className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-400"
                    >
                      Security
                    </TabsTrigger>
                    <TabsTrigger
                      value="notifications"
                      className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-400"
                    >
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger
                      value="api"
                      className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-400"
                    >
                      API
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="general" className="mt-4">
                    <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                      <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription className="text-slate-500 dark:text-slate-400">
                          Manage your system preferences
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                System Name
                              </label>
                              <Input
                                defaultValue="FraudShield Enterprise"
                                className="border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Environment
                              </label>
                              <Input
                                defaultValue="Production"
                                className="border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              Dashboard Refresh Rate (seconds)
                            </label>
                            <Input
                              type="number"
                              defaultValue="30"
                              className="border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              Theme Preference
                            </label>
                            <Select defaultValue={theme}>
                              <SelectTrigger className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                                <SelectValue placeholder="Select theme" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Merchant Rules Modal */}
      <MerchantRules
        isOpen={isMerchantRulesOpen}
        onClose={() => setIsMerchantRulesOpen(false)}
        merchantId={selectedMerchant}
      />

      {/* Export Options Modal */}
      <ExportOptions
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        currentView={activeTab}
        merchantId={selectedMerchant}
      />
    </SidebarProvider>
  )
}
