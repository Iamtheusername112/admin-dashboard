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
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    overview: { totalUsers: 0, totalOrganizations: 0, totalPosts: 0, unreadNotifications: 0 },
    revenueData: [],
    userDistribution: [],
    topCustomers: [],
    recentActivities: [],
    recentPosts: [],
    systemHealth: { uptime: 99.8, responseTime: 120, errorRate: 0.02, cpuUsage: 45, memoryUsage: 67, diskUsage: 23 }
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);
      const response = await fetch('/api/dashboard');
      const data = await response.json();
      
      // Merge with fallback data to ensure all properties exist
      setDashboardData({
        overview: data.overview || { totalUsers: 0, totalOrganizations: 0, totalPosts: 0, unreadNotifications: 0 },
        revenueData: data.revenueData || [
          { month: 'Jan', revenue: 45000, users: 1200, growth: 12 },
          { month: 'Feb', revenue: 52000, users: 1350, growth: 15 },
          { month: 'Mar', revenue: 48000, users: 1280, growth: 8 },
          { month: 'Apr', revenue: 61000, users: 1520, growth: 18 },
          { month: 'May', revenue: 55000, users: 1400, growth: 10 },
          { month: 'Jun', revenue: 67000, users: 1680, growth: 22 },
          { month: 'Jul', revenue: 72000, users: 1800, growth: 25 },
          { month: 'Aug', revenue: 68000, users: 1720, growth: 20 },
        ],
        userDistribution: data.userDistribution || [
          { name: 'Enterprise', value: 45, color: '#3B82F6', users: 890 },
          { name: 'Professional', value: 30, color: '#10B981', users: 594 },
          { name: 'Starter', value: 20, color: '#F59E0B', users: 396 },
          { name: 'Free', value: 5, color: '#EF4444', users: 99 },
        ],
        topCustomers: data.topCustomers || [
          { name: "Acme Corp", revenue: 12500, growth: 15, status: "active" },
          { name: "TechStart Inc", revenue: 8900, growth: 8, status: "active" },
          { name: "Global Solutions", revenue: 15200, growth: 22, status: "active" },
          { name: "Innovate Labs", revenue: 6800, growth: -5, status: "warning" },
          { name: "Future Systems", revenue: 11200, growth: 18, status: "active" },
        ],
        recentActivities: data.recentActivities || [],
        recentPosts: data.recentPosts || [],
        systemHealth: data.systemHealth || { uptime: 99.8, responseTime: 120, errorRate: 0.02, cpuUsage: 45, memoryUsage: 67, diskUsage: 23 }
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const { overview, revenueData, userDistribution, topCustomers, recentActivities, recentPosts, systemHealth } = dashboardData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Analytics Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Real-time insights and performance metrics</p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button 
              onClick={fetchDashboardData} 
              disabled={refreshing}
              size="sm" 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Total Revenue</p>
                  <p className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">$2.4M</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600 mr-1" />
                    <span className="text-sm text-emerald-600 dark:text-emerald-400">+$480K (+24.5%)</span>
                  </div>
                </div>
                <div className="p-3 bg-emerald-500 rounded-xl">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Active Users</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{overview?.totalUsers?.toLocaleString('en-US') || '0'}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
                    <span className="text-sm text-blue-600 dark:text-blue-400">+1.9K (+18.2%)</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Organizations</p>
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{overview?.totalOrganizations?.toLocaleString('en-US') || '0'}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-purple-600 mr-1" />
                    <span className="text-sm text-purple-600 dark:text-purple-400">+142 (+12.8%)</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-500 rounded-xl">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Performance</p>
                  <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">{systemHealth?.uptime || 99.8}% Uptime</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-orange-600 mr-1" />
                    <span className="text-sm text-orange-600 dark:text-orange-400">+2.1%</span>
                  </div>
                </div>
                <div className="p-3 bg-orange-500 rounded-xl">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Analytics */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg">
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
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
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
        </div>

        {/* User Distribution and Top Customers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Distribution */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                  <PieChartIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">User Distribution</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Distribution by subscription tier
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {userDistribution?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) => [
                      `${value}% (${props.payload.users} users)`,
                      name
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {userDistribution?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-slate-600 dark:text-slate-400">{item.name}</span>
                    </div>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{item.users}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Customers */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
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
                {topCustomers?.map((customer, index) => (
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
                        {customer.growth > 0 ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        {Math.abs(customer.growth)}%
                      </div>
                      <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                        {customer.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity and System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Recent Activity</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Latest user actions and system events
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                {recentActivities?.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">
                        {activity.user?.firstName?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {activity.user?.firstName} {activity.user?.lastName}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {activity.description || activity.action}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                        {new Date(activity.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">System Health</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Real-time system performance metrics
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Uptime</span>
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{systemHealth?.uptime || 99.8}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Response Time</span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{systemHealth?.responseTime || 120}ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Error Rate</span>
                  <span className="text-lg font-bold text-orange-600 dark:text-orange-400">{systemHealth?.errorRate || 0.02}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">CPU Usage</span>
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{systemHealth?.cpuUsage || 45}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Memory Usage</span>
                  <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{systemHealth?.memoryUsage || 67}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}