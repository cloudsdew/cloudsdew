"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Clock, Eye, Download, LogOut, Star, User } from "lucide-react"

interface Registration {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  current_role_title?: string
  experience_level: "beginner" | "intermediate" | "advanced"
  program_type: "mentorship" | "bootcamp"
  areas_of_interest?: string
  schedule_preference?: string
  goals_expectations?: string
  terms_accepted: boolean
  status: "pending" | "approved" | "rejected" | "completed"
  created_at: string
  updated_at: string
}

interface Stats {
  totalRegistrations: number
  pendingRegistrations: number
  mentorshipRegistrations: number
  bootcampRegistrations: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [stats, setStats] = useState<Stats>({
    totalRegistrations: 0,
    pendingRegistrations: 0,
    mentorshipRegistrations: 0,
    bootcampRegistrations: 0,
  })
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [programFilter, setProgramFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuthenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      fetchData()
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogin = () => {
    if (password === "password@1234") {
      setIsAuthenticated(true)
      sessionStorage.setItem("adminAuthenticated", "true")
      fetchData()
    } else {
      alert("Invalid password")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("adminAuthenticated")
    router.push("/")
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch stats
      const statsResponse = await fetch("/api/admin/stats")
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      // Fetch registrations
      const registrationsResponse = await fetch("/api/admin/registrations")
      if (registrationsResponse.ok) {
        const registrationsData = await registrationsResponse.json()
        setRegistrations(registrationsData)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateRegistrationStatus = async (id: string, status: string) => {
    try {
      const response = await fetch("/api/admin/registrations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })

      if (response.ok) {
        setRegistrations((prev) => prev.map((reg) => (reg.id === id ? { ...reg, status: status as any } : reg)))
        setStats((prev) => ({
          ...prev,
          pendingRegistrations: status === "pending" ? prev.pendingRegistrations + 1 : prev.pendingRegistrations - 1,
        }))
      }
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  const exportToCSV = (data: any[], filename: string) => {
    const csv = [
      Object.keys(data[0]).join(","),
      ...data.map((row) =>
        Object.values(row)
          .map((val) => `"${val}"`)
          .join(","),
      ),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch =
      reg.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || reg.status === statusFilter
    const matchesProgram = programFilter === "all" || reg.program_type === programFilter
    return matchesSearch && matchesStatus && matchesProgram
  })

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-emerald-950 flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-gray-900/50 border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white flex items-center justify-center space-x-2">
              <Star className="w-6 h-6 text-green-400" />
              <span>Admin Access</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800/50 border-gray-600 text-white"
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full bg-gradient-to-r from-green-500 to-cyan-500 text-black">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-emerald-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-emerald-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <Star className="w-8 h-8 text-green-400" />
            <h1 className="text-3xl font-bold text-white">CloudsDew Admin</h1>
          </div>
          <Button onClick={handleLogout} variant="outline" className="text-white border-gray-600 bg-transparent">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Registrations</p>
                  <p className="text-2xl font-bold text-white">{stats.totalRegistrations}</p>
                </div>
                <Users className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Reviews</p>
                  <p className="text-2xl font-bold text-white">{stats.pendingRegistrations}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Mentorship</p>
                  <p className="text-2xl font-bold text-white">{stats.mentorshipRegistrations}</p>
                </div>
                <User className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Bootcamp</p>
                  <p className="text-2xl font-bold text-white">{stats.bootcampRegistrations}</p>
                </div>
                <Star className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Filters */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-64">
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 bg-gray-800/50 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={programFilter} onValueChange={setProgramFilter}>
                  <SelectTrigger className="w-40 bg-gray-800/50 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Programs</SelectItem>
                    <SelectItem value="mentorship">Mentorship</SelectItem>
                    <SelectItem value="bootcamp">Bootcamp</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => exportToCSV(filteredRegistrations, "registrations.csv")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Registrations Table */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Program Registrations ({filteredRegistrations.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-700">
                    <tr>
                      <th className="text-left p-4 text-gray-300">Name</th>
                      <th className="text-left p-4 text-gray-300">Email</th>
                      <th className="text-left p-4 text-gray-300">Program</th>
                      <th className="text-left p-4 text-gray-300">Status</th>
                      <th className="text-left p-4 text-gray-300">Date</th>
                      <th className="text-left p-4 text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegistrations.map((registration) => (
                      <tr key={registration.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                        <td className="p-4 text-white">
                          {registration.first_name} {registration.last_name}
                        </td>
                        <td className="p-4 text-gray-300">{registration.email}</td>
                        <td className="p-4">
                          <Badge
                            variant={registration.program_type === "mentorship" ? "default" : "secondary"}
                            className={
                              registration.program_type === "mentorship"
                                ? "bg-green-600 text-white"
                                : "bg-blue-600 text-white"
                            }
                          >
                            {registration.program_type}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={
                              registration.status === "approved"
                                ? "border-green-500 text-green-400"
                                : registration.status === "rejected"
                                  ? "border-red-500 text-red-400"
                                  : registration.status === "completed"
                                    ? "border-blue-500 text-blue-400"
                                    : "border-yellow-500 text-yellow-400"
                            }
                          >
                            {registration.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-gray-300">
                          {new Date(registration.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => setSelectedRegistration(registration)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Select
                              value={registration.status}
                              onValueChange={(value) => updateRegistrationStatus(registration.id, value)}
                            >
                              <SelectTrigger className="w-32 h-8 bg-gray-800 border-gray-600 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Registration Detail Modal */}
        <Dialog open={!!selectedRegistration} onOpenChange={() => setSelectedRegistration(null)}>
          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-green-400" />
                <span>Registration Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedRegistration && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Name</label>
                    <p className="text-white">
                      {selectedRegistration.first_name} {selectedRegistration.last_name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white">{selectedRegistration.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Phone</label>
                    <p className="text-white">{selectedRegistration.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Current Role</label>
                    <p className="text-white">{selectedRegistration.current_role_title || "Not specified"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Experience Level</label>
                    <p className="text-white capitalize">{selectedRegistration.experience_level}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Program Type</label>
                    <p className="text-white capitalize">{selectedRegistration.program_type}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Areas of Interest</label>
                    <p className="text-white">{selectedRegistration.areas_of_interest || "Not specified"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Schedule Preference</label>
                    <p className="text-white capitalize">
                      {selectedRegistration.schedule_preference || "Not specified"}
                    </p>
                  </div>
                </div>
                {selectedRegistration.goals_expectations && (
                  <div>
                    <label className="text-sm text-gray-400">Goals & Expectations</label>
                    <p className="text-white">{selectedRegistration.goals_expectations}</p>
                  </div>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div>
                    <label className="text-sm text-gray-400">Status</label>
                    <p className="text-white capitalize">{selectedRegistration.status}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Registered</label>
                    <p className="text-white">{new Date(selectedRegistration.created_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
