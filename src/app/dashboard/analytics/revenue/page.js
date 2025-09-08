"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Target,
  Users,
  CreditCard,
  Calendar,
  RefreshCw,
  Download,
  Filter,
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react"
import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts"

export default function RevenuePage() {
  const [revenueData, setRevenueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  const fetchRevenueData = async () => {
    try {
      setLoading(true);
      // Mock revenue data
      const mockData = {
        overview: {
          totalRevenue: 2450000,
          monthlyRecurringRevenue: 180000,
          averageOrderValue: 1250,
          conversionRate: 3.2
        },
        revenueData: [
          { month: 'Jan', revenue: 180000, subscriptions: 120, churn: 8 },
          { month: 'Feb', revenue: 195000, subscriptions: 135, churn: 6 },
          { month: 'Mar', revenue: 220000, subscriptions: 150, churn: 5 },
          { month: 'Apr', revenue: 240000, subscriptions: 165, churn: 7 },
          { month: 'May', revenue: 260000, subscriptions: 180, churn: 4 },
          { month: 'Jun', revenue: 280000, subscriptions: 195, churn: 6 },
          { month: 'Jul', revenue: 300000, subscriptions: 210, churn: 5 },
          { month: 'Aug', revenue: 320000, subscriptions: 225, churn: 3 },
        ],
        revenueByPlan: [
          { plan: 'Enterprise', revenue: 1200000, percentage: 49, users: 45 },
          { plan: 'Professional', revenue: 800000, percentage: 33, users: 30 },
          { plan: 'Starter', revenue: 350000, percentage: 14, users: 20 },
          { plan: 'Free', revenue: 100000, percentage: 4, users: 5 },
        ],
        topCustomers: [
          { name: 'Acme Corp', revenue: 25000, growth: 15, plan: 'Enterprise' },
          { name: 'TechStart Inc', revenue: 18000, growth: 8, plan: 'Professional' },
          { name: 'Global Solutions', revenue: 32000, growth: 22, plan: 'Enterprise' },
          { name: 'Innovate Labs', revenue: 12000, growth: -5, plan: 'Professional' },
          { name: 'Future Systems', revenue: 22000, growth: 18, plan: 'Enterprise' },
        ],
        revenueSources: [
          { source: 'Subscriptions', amount: 1800000, percentage: 73 },
          { source: 'One-time Sales', amount: 450000, percentage: 18 },
          { source: 'Add-ons', amount: 200000, percentage: 9 },
        ]
      };
      
      setRevenueData(mockData);
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenueData();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading revenue data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Revenue Analytics</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Track revenue growth and financial performance</p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button 
              onClick={fetchRevenueData}
              disabled={loading}
              size="sm" 
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Revenue</p>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                    ${(revenueData?.overview?.totalRevenue || 2450000).toLocaleString('en-US')}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">+24.5% from last month</span>
                  </div>
                </div>
                <div className="p-3 bg-green-500 rounded-xl">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">MRR</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                    ${(revenueData?.overview?.monthlyRecurringRevenue || 180000).toLocaleString('en-US')}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">+18.2% from last month</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Avg Order Value</p>
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                    ${(revenueData?.overview?.averageOrderValue || 1250).toLocaleString('en-US')}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">+8.5% from last month</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-500 rounded-xl">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Conversion Rate</p>
                  <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                    {revenueData?.overview?.conversionRate || 3.2}%
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">+0.3% from last month</span>
                  </div>
                </div>
                <div className="p-3 bg-orange-500 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue and subscription growth</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData?.revenueData || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'revenue' ? `$${value.toLocaleString('en-US')}` : value,
                      name === 'revenue' ? 'Revenue' : 'Subscriptions'
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue by Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Revenue by Plan</CardTitle>
              <CardDescription>Distribution of revenue across subscription plans</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={revenueData?.revenueByPlan || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="revenue"
                  >
                    {revenueData?.revenueByPlan?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString('en-US')}`, 'Revenue']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {revenueData?.revenueByPlan?.map((plan, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index] }}
                      ></div>
                      <span className="text-slate-600 dark:text-slate-400">{plan.plan}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        ${plan.revenue.toLocaleString('en-US')}
                      </span>
                      <Badge variant="secondary">{plan.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Customers and Revenue Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Customers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Top Revenue Customers</CardTitle>
              <CardDescription>Highest revenue generating customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueData?.topCustomers?.map((customer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-xl flex items-center justify-center">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">{customer.name}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{customer.plan}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        ${customer.revenue.toLocaleString('en-US')}
                      </p>
                      <div className="flex items-center gap-1">
                        {customer.growth > 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-600" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-600" />
                        )}
                        <span className={`text-xs ${customer.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {Math.abs(customer.growth)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Revenue Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Revenue Sources</CardTitle>
              <CardDescription>Breakdown of revenue by source</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueData?.revenueSources?.map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {source.source}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          ${source.amount.toLocaleString('en-US')}
                        </span>
                        <Badge variant="secondary">{source.percentage}%</Badge>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                      <div 
                        className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
