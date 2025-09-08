"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Target, 
  TrendingUp, 
  TrendingDown,
  Users,
  MousePointer,
  ShoppingCart,
  CreditCard,
  RefreshCw,
  Download,
  Filter,
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react"
import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts"

export default function ConversionsPage() {
  const [conversionData, setConversionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  const fetchConversionData = async () => {
    try {
      setLoading(true);
      // Mock conversion data
      const mockData = {
        overview: {
          conversionRate: 3.2,
          totalConversions: 1250,
          revenuePerConversion: 1250,
          costPerConversion: 45
        },
        conversionData: [
          { date: '2024-01-01', visitors: 12000, conversions: 380, rate: 3.17 },
          { date: '2024-01-02', visitors: 13500, conversions: 420, rate: 3.11 },
          { date: '2024-01-03', visitors: 11800, conversions: 350, rate: 2.97 },
          { date: '2024-01-04', visitors: 14200, conversions: 480, rate: 3.38 },
          { date: '2024-01-05', visitors: 15800, conversions: 520, rate: 3.29 },
          { date: '2024-01-06', visitors: 13200, conversions: 410, rate: 3.11 },
          { date: '2024-01-07', visitors: 14500, conversions: 460, rate: 3.17 },
        ],
        conversionFunnel: [
          { stage: 'Visitors', count: 125000, percentage: 100 },
          { stage: 'Page Views', count: 450000, percentage: 360 },
          { stage: 'Add to Cart', count: 15000, percentage: 12 },
          { stage: 'Checkout', count: 8500, percentage: 6.8 },
          { stage: 'Purchase', count: 4000, percentage: 3.2 },
        ],
        conversionSources: [
          { source: 'Organic Search', conversions: 480, rate: 4.2, revenue: 600000 },
          { source: 'Direct', conversions: 350, rate: 2.8, revenue: 437500 },
          { source: 'Social Media', conversions: 280, rate: 3.1, revenue: 350000 },
          { source: 'Email', conversions: 120, rate: 2.5, revenue: 150000 },
          { source: 'Referral', conversions: 20, rate: 1.8, revenue: 25000 },
        ],
        topConvertingPages: [
          { page: '/dashboard', conversions: 250, rate: 4.5, revenue: 312500 },
          { page: '/dashboard/users', conversions: 180, rate: 3.8, revenue: 225000 },
          { page: '/dashboard/analytics', conversions: 150, rate: 3.2, revenue: 187500 },
          { page: '/dashboard/content', conversions: 120, rate: 2.9, revenue: 150000 },
          { page: '/dashboard/settings', conversions: 80, rate: 2.1, revenue: 100000 },
        ],
        deviceConversions: [
          { device: 'Desktop', conversions: 800, rate: 4.2, revenue: 1000000 },
          { device: 'Mobile', conversions: 350, rate: 2.1, revenue: 437500 },
          { device: 'Tablet', conversions: 100, rate: 2.8, revenue: 125000 },
        ]
      };
      
      setConversionData(mockData);
    } catch (error) {
      console.error('Error fetching conversion data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversionData();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading conversion data...</p>
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
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Conversion Analytics</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Track conversion rates and optimize your funnel</p>
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
              onClick={fetchConversionData}
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
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Conversion Rate</p>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                    {conversionData?.overview?.conversionRate || 3.2}%
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">+0.3% from last month</span>
                  </div>
                </div>
                <div className="p-3 bg-green-500 rounded-xl">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Conversions</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                    {(conversionData?.overview?.totalConversions || 1250).toLocaleString('en-US')}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">+12.5% from last month</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Revenue per Conversion</p>
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                    ${(conversionData?.overview?.revenuePerConversion || 1250).toLocaleString('en-US')}
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
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Cost per Conversion</p>
                  <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                    ${conversionData?.overview?.costPerConversion || 45}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">-5.2% from last month</span>
                  </div>
                </div>
                <div className="p-3 bg-orange-500 rounded-xl">
                  <MousePointer className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Conversion Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Conversion Trend</CardTitle>
              <CardDescription>Daily conversions and conversion rate over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={conversionData?.conversionData || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="opacity-30" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="conversions"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.6}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="rate"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Conversion Funnel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Conversion Funnel</CardTitle>
              <CardDescription>User journey through your conversion process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionData?.conversionFunnel?.map((stage, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {stage.stage}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {stage.count.toLocaleString('en-US')}
                        </span>
                        <Badge variant="secondary">{stage.percentage}%</Badge>
                      </div>
                    </div>
                    <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full">
                      <div 
                        className="h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                        style={{ width: `${Math.min(stage.percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conversion Sources and Top Converting Pages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Conversion Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Conversion Sources</CardTitle>
              <CardDescription>Which channels drive the most conversions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionData?.conversionSources?.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-slate-100">{source.source}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {source.conversions.toLocaleString('en-US')} conversions • {source.rate}% rate
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        ${source.revenue.toLocaleString('en-US')}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Converting Pages */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Top Converting Pages</CardTitle>
              <CardDescription>Pages with the highest conversion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionData?.topConvertingPages?.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-slate-100">{page.page}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {page.conversions.toLocaleString('en-US')} conversions • {page.rate}% rate
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        ${page.revenue.toLocaleString('en-US')}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Device Conversions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Device Conversions</CardTitle>
            <CardDescription>Conversion performance by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {conversionData?.deviceConversions?.map((device, index) => (
                <div key={index} className="text-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">
                      {device.device.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">{device.device}</h3>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                    {device.conversions.toLocaleString('en-US')}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">conversions</p>
                  <Badge variant="default" className="mb-2">{device.rate}% rate</Badge>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    ${device.revenue.toLocaleString('en-US')} revenue
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
