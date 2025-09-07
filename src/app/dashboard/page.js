"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  Users, 
  Building2, 
  Zap, 
  TrendingUp, 
  TrendingDown,
  Activity,
  DollarSign,
  UserCheck,
  AlertTriangle,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Calendar,
  Clock,
  Globe,
  Shield,
  Target,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  RefreshCw
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, RadialBarChart, RadialBar } from "recharts"

const revenueData = [
  { month: 'Jan', revenue: 45000, users: 1200, growth: 12 },
  { month: 'Feb', revenue: 52000, users: 1350, growth: 15 },
  { month: 'Mar', revenue: 48000, users: 1280, growth: 8 },
  { month: 'Apr', revenue: 61000, users: 1520, growth: 18 },
  { month: 'May', revenue: 55000, users: 1400, growth: 10 },
  { month: 'Jun', revenue: 67000, users: 1680, growth: 22 },
  { month: 'Jul', revenue: 72000, users: 1800, growth: 25 },
  { month: 'Aug', revenue: 68000, users: 1720, growth: 20 },
]

const userDistribution = [
  { name: 'Enterprise', value: 45, color: '#3B82F6', users: 890 },
  { name: 'Professional', value: 30, color: '#10B981', users: 594 },
  { name: 'Starter', value: 20, color: '#F59E0B', users: 396 },
  { name: 'Free', value: 5, color: '#EF4444', users: 99 },
]

const performanceData = [
  { name: 'CPU', value: 75, color: '#3B82F6' },
  { name: 'Memory', value: 60, color: '#10B981' },
  { name: 'Storage', value: 45, color: '#F59E0B' },
  { name: 'Network', value: 80, color: '#8B5CF6' },
]

const recentActivity = [
  { id: 1, user: "Sarah Chen", action: "Upgraded to Enterprise plan", time: "2 min ago", type: "upgrade", amount: "$299" },
  { id: 2, user: "Mike Rodriguez", action: "Created new organization", time: "5 min ago", type: "create", amount: null },
  { id: 3, user: "Emily Johnson", action: "Payment failed", time: "12 min ago", type: "error", amount: "$99" },
  { id: 4, user: "David Kim", action: "Completed onboarding", time: "18 min ago", type: "success", amount: null },
  { id: 5, user: "Lisa Wang", action: "Downloaded report", time: "25 min ago", type: "download", amount: null },
]

const topCustomers = [
  { name: "Acme Corp", revenue: 12500, growth: 15, status: "active" },
  { name: "TechStart Inc", revenue: 8900, growth: 8, status: "active" },
  { name: "Global Solutions", revenue: 15200, growth: 22, status: "active" },
  { name: "Innovate Labs", revenue: 6800, growth: -5, status: "warning" },
  { name: "Future Systems", revenue: 11200, growth: 18, status: "active" },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Modern Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  Analytics Dashboard
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                  Real-time insights and performance metrics
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-white dark:bg-slate-800 rounded-xl p-2 shadow-sm border">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Last 30 days</span>
            </div>
            <Button variant="outline" className="h-9 px-4 rounded-xl border-slate-200 dark:border-slate-700 text-sm">
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button className="h-9 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>

        {/* Modern KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Revenue Card */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-0 shadow-lg hover:shadow-xl transition-all duration-500 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="relative p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                  <DollarSign className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm font-bold">+24.5%</span>
                </div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Total Revenue</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100">$2.4M</p>
                <div className="flex items-center gap-2">
                  <div className="w-12 sm:w-16 h-1 bg-emerald-200 dark:bg-emerald-800 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">+$480K</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Card */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0 shadow-lg hover:shadow-xl transition-all duration-500 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="relative p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <Users className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                  <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm font-bold">+18.2%</span>
                </div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Active Users</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100">12.5K</p>
                <div className="flex items-center gap-2">
                  <div className="w-12 sm:w-16 h-1 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
                    <div className="w-4/5 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">+1.9K</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Organizations Card */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0 shadow-lg hover:shadow-xl transition-all duration-500 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="relative p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                  <Building2 className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                  <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm font-bold">+12.8%</span>
                </div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Organizations</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100">1,247</p>
                <div className="flex items-center gap-2">
                  <div className="w-12 sm:w-16 h-1 bg-purple-200 dark:bg-purple-800 rounded-full overflow-hidden">
                    <div className="w-3/5 h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">+142</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Performance Card */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-0 shadow-lg hover:shadow-xl transition-all duration-500 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="relative p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
                  <Activity className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                  <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm font-bold">+2.1%</span>
                </div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Performance</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100">99.8%</p>
                <div className="flex items-center gap-2">
                  <div className="w-12 sm:w-16 h-1 bg-orange-200 dark:bg-orange-800 rounded-full overflow-hidden">
                    <div className="w-5/6 h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Uptime</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Analytics */}
          <Card className="lg:col-span-2 bg-white dark:bg-slate-800 border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl">
                    <LineChartIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">Revenue Analytics</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Monthly revenue trends and growth patterns
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +24.5%
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <ResponsiveContainer width="100%" height={300} className="sm:h-[400px]">
                <AreaChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="opacity-30" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b', fontWeight: '500' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b', fontWeight: '500' }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '16px',
                      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
                      fontSize: '14px',
                      padding: '16px'
                    }}
                    labelStyle={{ color: '#1e293b', fontWeight: '600', fontSize: '16px' }}
                    formatter={(value) => [`$${value.toLocaleString('en-US')}`, 'Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10B981"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 10, stroke: '#10B981', strokeWidth: 3, fill: 'white' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* User Distribution */}
          <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                  <PieChartIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">User Plans</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Distribution by subscription tier
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <PieChart>
                  <Pie
                    data={userDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
                      fontSize: '14px'
                    }}
                    formatter={(value, name, props) => [props.payload.users, 'Users']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-6 space-y-3">
                {userDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{item.users}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modern Activity & Performance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 bg-white dark:bg-slate-800 border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Recent Activity</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Real-time user actions and system events
                    </CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 dark:hover:from-slate-700/50 dark:hover:to-slate-600/50 transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className={`w-4 h-4 rounded-full ${
                        activity.type === 'upgrade' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                        activity.type === 'create' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                        activity.type === 'error' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                        activity.type === 'success' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                        'bg-gradient-to-r from-purple-500 to-purple-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-200">
                          {activity.user}
                        </p>
                        <div className="flex items-center gap-2">
                          {activity.amount && (
                            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                              {activity.amount}
                            </span>
                          )}
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300">
                        {activity.action}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Performance */}
          <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">System Health</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Real-time performance metrics
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                {performanceData.map((metric, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: metric.color }}></div>
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{metric.name}</span>
                      </div>
                      <span className="text-sm font-bold" style={{ color: metric.color }}>{metric.value}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out" 
                        style={{ 
                          width: `${metric.value}%`,
                          background: `linear-gradient(90deg, ${metric.color}, ${metric.color}CC)`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">System Status</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">All systems operational</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Customers Section */}
        <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Top Customers</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Highest revenue generating organizations
                  </CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-xl flex items-center justify-center">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        {customer.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100">{customer.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">${customer.revenue.toLocaleString('en-US')}/month</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      customer.growth > 0 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {customer.growth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {Math.abs(customer.growth)}%
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      customer.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
