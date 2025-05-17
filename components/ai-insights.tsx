"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, BarChart3, Brain, FileText, LineChart, Network, PieChart, RefreshCw, Zap } from "lucide-react"

// Mock patterns detected by AI
const patterns = [
  {
    id: 1,
    name: "Unusual Location Access",
    description: "Multiple transactions from different countries within short time periods",
    severity: "high",
    detectedCount: 28,
    lastDetected: "10 minutes ago",
  },
  {
    id: 2,
    name: "Velocity Pattern",
    description: "Rapid succession of small transactions followed by large purchase",
    severity: "high",
    detectedCount: 15,
    lastDetected: "25 minutes ago",
  },
  {
    id: 3,
    name: "Card Testing Pattern",
    description: "Multiple small transactions to test card validity",
    severity: "medium",
    detectedCount: 42,
    lastDetected: "45 minutes ago",
  },
  {
    id: 4,
    name: "Time Anomaly",
    description: "Transactions occurring at unusual times for the customer",
    severity: "medium",
    detectedCount: 36,
    lastDetected: "1 hour ago",
  },
  {
    id: 5,
    name: "Amount Anomaly",
    description: "Transaction amounts significantly different from customer history",
    severity: "low",
    detectedCount: 53,
    lastDetected: "2 hours ago",
  },
]

export function AIInsights() {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">
            <AlertTriangle className="mr-1 h-3 w-3" /> High
          </Badge>
        )
      case "medium":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200">
            <AlertTriangle className="mr-1 h-3 w-3" /> Medium
          </Badge>
        )
      case "low":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
            <AlertTriangle className="mr-1 h-3 w-3" /> Low
          </Badge>
        )
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="patterns" className="w-full">
        <TabsList className="bg-white border border-slate-200 shadow-sm">
          <TabsTrigger value="patterns" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Detected Patterns
          </TabsTrigger>
          <TabsTrigger value="models" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            AI Models
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Predictive Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="patterns" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">Total Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">5</div>
                  <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                    <Brain className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">Detected Instances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">174</div>
                  <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                    <Network className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">Prevention Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">92.7%</div>
                  <div className="p-2 bg-green-100 rounded-full text-green-600">
                    <Zap className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>AI-Detected Patterns</CardTitle>
                  <CardDescription className="text-slate-500">
                    Patterns detected by our AI models based on transaction data
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 hover:bg-slate-100">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patterns.map((pattern) => (
                  <div
                    key={pattern.id}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-slate-900">{pattern.name}</h3>
                          {getSeverityBadge(pattern.severity)}
                        </div>
                        <p className="mt-1 text-sm text-slate-500">{pattern.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                      <div>Detected {pattern.detectedCount} times</div>
                      <div>Last detected: {pattern.lastDetected}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow col-span-full">
              <CardHeader>
                <CardTitle>AI Models Performance</CardTitle>
                <CardDescription className="text-slate-500">
                  Current performance metrics for deployed AI models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Transaction Classifier</div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">Active</Badge>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        style={{ width: "94%" }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div>Accuracy: 94%</div>
                      <div>v2.4.1</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Pattern Recognition</div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">Active</Badge>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        style={{ width: "89%" }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div>Accuracy: 89%</div>
                      <div>v3.1.0</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Anomaly Detector</div>
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200">
                        Training
                      </Badge>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div>Accuracy: 78%</div>
                      <div>v1.9.5</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Predictive Risk Analysis</CardTitle>
                <CardDescription className="text-slate-500">
                  AI-powered predictions for future fraud patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4">
                    <LineChart className="h-16 w-16 mx-auto text-blue-600" />
                    <div className="text-sm text-slate-500">Predictive analytics visualization placeholder</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Fraud Trend Forecast</CardTitle>
                <CardDescription className="text-slate-500">Projected fraud activity for next 30 days</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4">
                    <BarChart3 className="h-16 w-16 mx-auto text-purple-600" />
                    <div className="text-sm text-slate-500">Trend forecast visualization placeholder</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Emerging Threat Categories</CardTitle>
              <CardDescription className="text-slate-500">
                AI-predicted new fraud patterns likely to emerge
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <PieChart className="h-16 w-16 mx-auto text-green-600" />
                  <div className="text-sm text-slate-500">Threat categories visualization placeholder</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
