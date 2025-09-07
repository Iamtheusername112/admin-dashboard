"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Zap, 
  Search, 
  Filter, 
  MoreHorizontal,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Clock,
  Activity,
  Server,
  Database,
  Globe,
  Shield
} from "lucide-react"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart,
  Area,
  BarChart,
  Bar
} from "recharts"
import { useState } from "react"

const systemLogs = [
  {
    id: 1,
    timestamp: "2024-03-25 14:30:15",
    level: "error",
    message: "Database connection timeout",
    context: { userId: "123", action: "user_login" },
    source: "database"
  },
  {
    id: 2,
    timestamp: "2024-03-25 14:28:42",
    level: "warn",
    message: "High memory usage detected",
    context: { memory: "85%", threshold: "80%" },
    source: "system"
  },
  {
    id: 3,
    timestamp: "2024-03-25 14:25:18",
    level: "info",
    message: "User authentication successful",
    context: { userId: "456", email: "user@example.com" },
    source: "auth"
  },
  {
    id: 4,
    timestamp: "2024-03-25 14:22:33",
    level: "error",
    message: "API rate limit exceeded",
    context: { endpoint: "/api/users", limit: "100/min" },
    source: "api"
  },
  {
    id: 5,
    timestamp: "2024-03-25 14:20:07",
    level: "info",
    message: "Scheduled backup completed",
    context: { size: "2.3GB", duration: "5m 23s" },
    source: "backup"
  },
]

const performanceMetrics = [
  { time: '14:00', cpu: 45, memory: 67, disk: 82, network: 23 },
  { time: '14:05', cpu: 52, memory: 71, disk: 83, network: 28 },
  { time: '14:10', cpu: 48, memory: 69, disk: 84, network: 25 },
  { time: '14:15', cpu: 61, memory: 75, disk: 85, network: 31 },
  { time: '14:20', cpu: 55, memory: 72, disk: 86, network: 27 },
  { time: '14:25', cpu: 58, memory: 74, disk: 87, network: 29 },
  { time: '14:30', cpu: 63, memory: 78, disk: 88, network: 33 },
]

const errorStats = [
  { type: 'Database Errors', count: 12, trend: '+2' },
  { type: 'API Errors', count: 8, trend: '-1' },
  { type: 'Authentication Errors', count: 3, trend: '0' },
  { type: 'Network Errors', count: 5, trend: '+1' },
]

const getLevelColor = (level) => {
  switch (level) {
    case 'error':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    case 'warn':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    case 'info':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    case 'debug':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
}

const getLevelIcon = (level) => {
  switch (level) {
    case 'error':
      return <XCircle className="h-4 w-4 text-red-500" />
    case 'warn':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    case 'info':
      return <Info className="h-4 w-4 text-blue-500" />
    case 'debug':
      return <Activity className="h-4 w-4 text-gray-500" />
    default:
      return <Activity className="h-4 w-4 text-gray-500" />
  }
}

export default function MonitoringPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterLevel, setFilterLevel] = useState("all")
  const [filterSource, setFilterSource] = useState("all")

  const filteredLogs = systemLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.context && JSON.stringify(log.context).toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = filterLevel === "all" || log.level === filterLevel
    const matchesSource = filterSource === "all" || log.source === filterSource
    
    return matchesSearch && matchesLevel && matchesSource
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Monitoring</h1>
          <p className="text-muted-foreground">
            Real-time system health and performance monitoring
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export Logs</Button>
          <Button>Refresh Data</Button>
        </div>
      </div>

      {/* System Health Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Operational</div>
            <p className="text-xs text-muted-foreground">
              All systems running normally
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
            <p className="text-xs text-muted-foreground">
              Within normal range
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <p className="text-xs text-muted-foreground">
              Moderate usage
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground">
              High usage - consider cleanup
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>Real-time system metrics over the last hour</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="cpu" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="memory" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="disk" stackId="3" stroke="#ffc658" fill="#ffc658" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Error Statistics</CardTitle>
            <CardDescription>Error counts by type in the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {errorStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm font-medium">{stat.type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold">{stat.count}</span>
                    <Badge variant={stat.trend.startsWith('+') ? 'destructive' : 'secondary'}>
                      {stat.trend}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Logs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>System Logs</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
            >
              <option value="all">All Levels</option>
              <option value="error">Error</option>
              <option value="warn">Warning</option>
              <option value="info">Info</option>
              <option value="debug">Debug</option>
            </select>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
            >
              <option value="all">All Sources</option>
              <option value="database">Database</option>
              <option value="system">System</option>
              <option value="auth">Authentication</option>
              <option value="api">API</option>
              <option value="backup">Backup</option>
            </select>
          </div>

          <div className="space-y-2">
            {filteredLogs.map((log) => (
              <div key={log.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  {getLevelIcon(log.level)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={getLevelColor(log.level)}>
                        {log.level.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">
                        {log.source}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {log.timestamp}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium">{log.message}</p>
                  {log.context && (
                    <div className="mt-2 p-2 bg-muted rounded text-xs font-mono">
                      {JSON.stringify(log.context, null, 2)}
                    </div>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Copy Log Entry</DropdownMenuItem>
                    <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
