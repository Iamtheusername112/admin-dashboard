"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  Eye,
  MousePointer,
  Clock,
  Globe
} from "lucide-react"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter
} from "recharts"

const analyticsData = [
  { name: 'Jan', visitors: 4000, pageViews: 24000, sessions: 1200, bounceRate: 45 },
  { name: 'Feb', visitors: 3000, pageViews: 13980, sessions: 980, bounceRate: 42 },
  { name: 'Mar', visitors: 2000, pageViews: 9800, sessions: 680, bounceRate: 38 },
  { name: 'Apr', visitors: 2780, pageViews: 3908, sessions: 890, bounceRate: 35 },
  { name: 'May', visitors: 1890, pageViews: 4800, sessions: 750, bounceRate: 32 },
  { name: 'Jun', visitors: 2390, pageViews: 3800, sessions: 920, bounceRate: 28 },
]

const deviceData = [
  { name: 'Desktop', value: 65, color: '#0088FE' },
  { name: 'Mobile', value: 25, color: '#00C49F' },
  { name: 'Tablet', value: 10, color: '#FFBB28' },
]

const topPages = [
  { page: '/dashboard', views: 1234, unique: 890, bounceRate: 25 },
  { page: '/analytics', views: 987, unique: 654, bounceRate: 30 },
  { page: '/users', views: 756, unique: 543, bounceRate: 35 },
  { page: '/settings', views: 432, unique: 321, bounceRate: 40 },
  { page: '/billing', views: 234, unique: 198, bounceRate: 45 },
]

const realTimeData = [
  { time: '12:00', users: 45 },
  { time: '12:05', users: 52 },
  { time: '12:10', users: 48 },
  { time: '12:15', users: 61 },
  { time: '12:20', users: 55 },
  { time: '12:25', users: 58 },
  { time: '12:30', users: 63 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your platform performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export Report</Button>
          <Button>Refresh Data</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500" />
              <span className="text-green-500 ml-1">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89,234</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500" />
              <span className="text-green-500 ml-1">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,678</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500" />
              <span className="text-green-500 ml-1">+15.3%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32.1%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 text-green-500" />
              <span className="text-green-500 ml-1">-5.2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>Visitor trends over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="visitors" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="pageViews" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Real-time and Device Analytics */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Real-time Activity</CardTitle>
            <CardDescription>Current active users</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={realTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Distribution</CardTitle>
            <CardDescription>Traffic by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
          <CardDescription>Most visited pages in the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{page.page}</p>
                  <p className="text-sm text-muted-foreground">
                    {page.views.toLocaleString()} views • {page.unique.toLocaleString()} unique
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{page.bounceRate}%</p>
                    <p className="text-xs text-muted-foreground">Bounce Rate</p>
                  </div>
                  <Badge variant="secondary">#{index + 1}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
