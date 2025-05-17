"use client"

import { useState } from "react"
import { AlertTriangle, Check, Plus, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface MerchantRulesProps {
  isOpen: boolean
  onClose: () => void
  merchantId: string
}

// Mock merchant rules data
const mockRules = [
  {
    id: 1,
    name: "High Value Transaction",
    description: "Flag transactions above a certain amount",
    type: "amount",
    threshold: 1000,
    action: "flag",
    enabled: true,
  },
  {
    id: 2,
    name: "Unusual Location",
    description: "Flag transactions from unusual locations",
    type: "location",
    threshold: "new",
    action: "flag",
    enabled: true,
  },
  {
    id: 3,
    name: "Multiple Transactions",
    description: "Flag multiple transactions in short time period",
    type: "frequency",
    threshold: "5 in 10 minutes",
    action: "flag",
    enabled: false,
  },
  {
    id: 4,
    name: "New Card Usage",
    description: "Flag transactions with newly added cards",
    type: "card",
    threshold: "new",
    action: "review",
    enabled: true,
  },
]

export function MerchantRules({ isOpen, onClose, merchantId }: MerchantRulesProps) {
  const [activeTab, setActiveTab] = useState("rules")
  const [isAddingRule, setIsAddingRule] = useState(false)
  const [newRuleType, setNewRuleType] = useState("amount")
  const [amountThreshold, setAmountThreshold] = useState(1000)

  const handleSaveRule = () => {
    // In a real app, this would save the rule to the database
    setIsAddingRule(false)
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "amount":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 dark:border-blue-900/50">
            Amount
          </Badge>
        )
      case "location":
        return (
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50 dark:border-purple-900/50">
            Location
          </Badge>
        )
      case "frequency":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:hover:bg-yellow-900/50 dark:border-yellow-900/50">
            Frequency
          </Badge>
        )
      case "card":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 dark:border-green-900/50">
            Card
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const getActionBadge = (action: string) => {
    switch (action) {
      case "flag":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:hover:bg-yellow-900/50 dark:border-yellow-900/50">
            <AlertTriangle className="mr-1 h-3 w-3" /> Flag
          </Badge>
        )
      case "review":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 dark:border-blue-900/50">
            Review
          </Badge>
        )
      case "block":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 dark:border-red-900/50">
            <X className="mr-1 h-3 w-3" /> Block
          </Badge>
        )
      default:
        return <Badge variant="outline">{action}</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Merchant Rules Configuration</DialogTitle>
          <DialogDescription>
            Configure fraud detection rules for {merchantId === "all" ? "all merchants" : "this merchant"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <TabsTrigger
              value="rules"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-400"
            >
              Rules
            </TabsTrigger>
            <TabsTrigger
              value="thresholds"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-400"
            >
              Risk Thresholds
            </TabsTrigger>
            <TabsTrigger
              value="actions"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-400"
            >
              Automated Actions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rules" className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Active Rules</h3>
              <Button onClick={() => setIsAddingRule(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Rule
              </Button>
            </div>

            <div className="space-y-4">
              {mockRules.map((rule) => (
                <Card
                  key={rule.id}
                  className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{rule.name}</h4>
                          {getTypeBadge(rule.type)}
                          {getActionBadge(rule.action)}
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{rule.description}</p>
                        <div className="text-sm mt-2">
                          <span className="font-medium">Threshold:</span>{" "}
                          <span className="text-slate-600 dark:text-slate-300">
                            {typeof rule.threshold === "number"
                              ? `$${rule.threshold.toLocaleString()}`
                              : rule.threshold}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Switch id={`rule-${rule.id}`} checked={rule.enabled} />
                          <Label htmlFor={`rule-${rule.id}`} className="text-sm">
                            {rule.enabled ? "Enabled" : "Disabled"}
                          </Label>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {isAddingRule && (
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                  <CardTitle>Add New Rule</CardTitle>
                  <CardDescription>Configure a new fraud detection rule</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rule-name">Rule Name</Label>
                      <Input
                        id="rule-name"
                        placeholder="High Value Transaction"
                        className="border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rule-type">Rule Type</Label>
                      <Select value={newRuleType} onValueChange={setNewRuleType}>
                        <SelectTrigger
                          id="rule-type"
                          className="border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                        >
                          <SelectValue placeholder="Select rule type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="amount">Transaction Amount</SelectItem>
                          <SelectItem value="location">Location</SelectItem>
                          <SelectItem value="frequency">Transaction Frequency</SelectItem>
                          <SelectItem value="card">Card Usage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rule-description">Description</Label>
                    <Input
                      id="rule-description"
                      placeholder="Flag transactions above a certain amount"
                      className="border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>

                  {newRuleType === "amount" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Amount Threshold</Label>
                          <span className="text-sm font-medium">${amountThreshold.toLocaleString()}</span>
                        </div>
                        <Slider
                          value={[amountThreshold]}
                          min={100}
                          max={10000}
                          step={100}
                          onValueChange={(value) => setAmountThreshold(value[0])}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="rule-action">Action</Label>
                    <Select defaultValue="flag">
                      <SelectTrigger
                        id="rule-action"
                        className="border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                      >
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flag">Flag for Review</SelectItem>
                        <SelectItem value="review">Require Manual Review</SelectItem>
                        <SelectItem value="block">Block Transaction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch id="rule-enabled" defaultChecked />
                    <Label htmlFor="rule-enabled">Enable Rule</Label>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingRule(false)}
                      className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveRule}
                      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Save Rule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="thresholds" className="mt-4">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader>
                <CardTitle>Risk Thresholds</CardTitle>
                <CardDescription>Configure risk thresholds for different transaction types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Transaction Amount Risk Threshold</Label>
                      <span className="text-sm font-medium">$2,500</span>
                    </div>
                    <Slider defaultValue={[2500]} min={500} max={10000} step={100} />
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Transactions above this amount will be flagged as potentially risky
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Transaction Frequency Risk Threshold</Label>
                      <span className="text-sm font-medium">5 transactions / hour</span>
                    </div>
                    <Slider defaultValue={[5]} min={1} max={20} step={1} />
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      More than this number of transactions per hour will be flagged
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Overall Risk Score Threshold</Label>
                      <span className="text-sm font-medium">75 / 100</span>
                    </div>
                    <Slider defaultValue={[75]} min={50} max={95} step={5} />
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Transactions with a risk score above this threshold will be flagged
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="mt-4">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader>
                <CardTitle>Automated Actions</CardTitle>
                <CardDescription>Configure automated actions for different risk levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Low Risk (0-30)</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Transactions with a risk score below 30
                      </p>
                    </div>
                    <Select defaultValue="approve">
                      <SelectTrigger className="w-[180px] border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approve">Auto-Approve</SelectItem>
                        <SelectItem value="flag">Flag for Review</SelectItem>
                        <SelectItem value="block">Block Transaction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Medium Risk (31-70)</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Transactions with a risk score between 31 and 70
                      </p>
                    </div>
                    <Select defaultValue="flag">
                      <SelectTrigger className="w-[180px] border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approve">Auto-Approve</SelectItem>
                        <SelectItem value="flag">Flag for Review</SelectItem>
                        <SelectItem value="block">Block Transaction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">High Risk (71-100)</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Transactions with a risk score above 70
                      </p>
                    </div>
                    <Select defaultValue="block">
                      <SelectTrigger className="w-[180px] border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approve">Auto-Approve</SelectItem>
                        <SelectItem value="flag">Flag for Review</SelectItem>
                        <SelectItem value="block">Block Transaction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
