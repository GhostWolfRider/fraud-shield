"use client"

import { useState } from "react"
import {
  Check,
  Edit,
  Key,
  Lock,
  MoreHorizontal,
  Search,
  Settings,
  Shield,
  Trash,
  UserCog,
  UserPlus,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for users
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "2025-05-17T14:23:02",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Analyst",
    status: "active",
    lastLogin: "2025-05-16T10:15:22",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "Manager",
    status: "active",
    lastLogin: "2025-05-15T09:45:11",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Analyst",
    status: "inactive",
    lastLogin: "2025-05-10T16:30:45",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "Viewer",
    status: "active",
    lastLogin: "2025-05-17T08:20:33",
  },
  {
    id: 6,
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    role: "Manager",
    status: "active",
    lastLogin: "2025-05-14T11:10:55",
  },
]

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    if (searchTerm) {
      return (
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
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
      hour: "2-digit",
      minute: "2-digit",
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
        return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200">Inactive</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200">Admin</Badge>
      case "Manager":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">Manager</Badge>
      case "Analyst":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">Analyst</Badge>
      case "Viewer":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200">Viewer</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="bg-white border border-slate-200 shadow-sm">
          <TabsTrigger value="users" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 border-slate-200"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow className="hover:bg-slate-100 border-slate-200">
                    <TableHead className="text-slate-600 font-medium">User</TableHead>
                    <TableHead className="text-slate-600 font-medium">Email</TableHead>
                    <TableHead className="text-slate-600 font-medium">Role</TableHead>
                    <TableHead className="text-slate-600 font-medium">Status</TableHead>
                    <TableHead className="text-slate-600 font-medium">Last Login</TableHead>
                    <TableHead className="text-slate-600 font-medium text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-slate-50 border-slate-200">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 border border-slate-200">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                            <AvatarFallback className="bg-blue-100 text-blue-700">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{formatDate(user.lastLogin)}</TableCell>
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
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserCog className="mr-2 h-4 w-4" />
                              Change Role
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Key className="mr-2 h-4 w-4" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete User
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

        <TabsContent value="roles" className="mt-4 space-y-4">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Shield className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-medium">Role Management</h3>
                <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                  Configure user roles and their associated permissions for system access
                </p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                  <Settings className="mr-2 h-4 w-4" />
                  Manage Roles
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4 space-y-4">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Lock className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-medium">Security Configuration</h3>
                <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                  Configure password policies, MFA requirements, and session settings
                </p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                  <Settings className="mr-2 h-4 w-4" />
                  Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
