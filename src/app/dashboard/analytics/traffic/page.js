"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Globe, 
  TrendingUp, 
  TrendingDown,
  Users,
  Eye,
  MousePointer,
  Clock,
  RefreshCw,
  Download,
  Filter,
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react"
import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts"

export default function TrafficPage() {
  const [trafficData, setTrafficData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  const fetchTrafficData = async () => {
    try {
      setLoading(true);
      // Mock traffic data
      const mockData = {
        overview: {
          totalVisitors: 125000,
          pageViews: 450000,
          bounceRate: 42.5,
          avgSessionDuration: 180
        },
        trafficData: [
          { date: '2024-01-01', visitors: 12000, pageViews: 45000, sessions: 8500 },
          { date: '2024-01-02', visitors: 13500, pageViews: 52000, sessions: 9200 },
          { date: '2024-01-03', visitors: 11800, pageViews: 41000, sessions: 7800 },
          { date: '2024-01-04', visitors: 14200, pageViews: 58000, sessions: 10100 },
          { date: '2024-01-05', visitors: 15800, pageViews: 62000, sessions: 11200 },
          { date: '2024-01-06', visitors: 13200, pageViews: 48000, sessions: 8900 },
          { date: '2024-01-07', visitors: 14500, pageViews: 55000, sessions: 9800 },
        ],
        trafficSources: [
          { source: 'Direct', visitors: 45000, percentage: 36, color: '#3B82F6' },
          { source: 'Organic Search', visitors: 38000, percentage: 30.4, color: '#10B981' },
          { source: 'Social Media', visitors: 25000, percentage: 20, color: '#F59E0B' },
          { source: 'Email', visitors: 12000, percentage: 9.6, color: '#EF4444' },
          { source: 'Referral', visitors: 5000, percentage: 4, color: '#8B5CF6' },
        ],
        topPages: [
          { page: '/dashboard', visitors: 25000, pageViews: 75000, bounceRate: 35 },
          { page: '/dashboard/users', visitors: 18000, pageViews: 45000, bounceRate: 28 },
          { page: '/dashboard/analytics', visitors: 15000, pageViews: 38000, bounceRate: 42 },
          { page: '/dashboard/content', visitors: 12000, pageViews: 30000, bounceRate: 38 },
          { page: '/dashboard/settings', visitors: 8000, pageViews: 20000, bounceRate: 45 },
        ],
        deviceBreakdown: [
          { device: 'Desktop', visitors: 75000, percentage: 60 },
          { device: 'Mobile', visitors: 40000, percentage: 32 },
          { device: 'Tablet', visitors: 10000, percentage: 8 },
        ],
        topCountries: [
          { country: 'United States', visitors: 45000, percentage: 36 },
          { country: 'United Kingdom', visitors: 18000, percentage: 14.4 },
          { country: 'Canada', visitors: 15000, percentage: 12 },
          { country: 'Germany', visitors: 12000, percentage: 9.6 },
          { country: 'Australia', visitors: 10000, percentage: 8 },
        ]
      };
      
      setTrafficData(mockData);
    } catch (error) {
      console.error('Error fetching traffic data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrafficData();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading traffic data...</p>
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
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Traffic Analytics</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Monitor website traffic and user behavior</p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button 
              onClick={fetchTrafficData}
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
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Visitors</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                    {(trafficData?.overview?.totalVisitors || 125000).toLocaleString('en-US')}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">+12.5% from last week</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Page Views</p>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                    {(trafficData?.overview?.pageViews || 450000).toLocaleString('en-US')}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">+18.2% from last week</span>
                  </div>
                </div>
                <div className="p-3 bg-green-500 rounded-xl">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Bounce Rate</p>
                  <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                    {trafficData?.overview?.bounceRate || 42.5}%
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">-2.1% from last week</span>
                  </div>
                </div>
                <div className="p-3 bg-orange-500 rounded-xl">
                  <MousePointer className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Avg Session</p>
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                    {Math.floor((trafficData?.overview?.avgSessionDuration || 180) / 60)}m {((trafficData?.overview?.avgSessionDuration || 180) % 60)}s
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">+5.3% from last week</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-500 rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Traffic Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Traffic Trend</CardTitle>
              <CardDescription>Daily visitors and page views over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trafficData?.trafficData || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="opacity-30" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="pageViews"
                    stackId="2"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Traffic Sources</CardTitle>
              <CardDescription>Where your visitors come from</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={trafficData?.trafficSources || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="visitors"
                  >
                    {trafficData?.trafficSources?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value.toLocaleString('en-US'), 'Visitors']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {trafficData?.trafficSources?.map((source, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: source.color }}
                      ></div>
                      <span className="text-slate-600 dark:text-slate-400">{source.source}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {source.visitors.toLocaleString('en-US')}
                      </span>
                      <Badge variant="secondary">{source.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Pages and Device Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Top Pages</CardTitle>
              <CardDescription>Most visited pages on your site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficData?.topPages?.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-slate-100">{page.page}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {page.visitors.toLocaleString('en-US')} visitors • {page.pageViews.toLocaleString('en-US')} views
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={page.bounceRate > 40 ? 'destructive' : 'secondary'}>
                        {page.bounceRate}% bounce
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Device Breakdown</CardTitle>
              <CardDescription>Traffic by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficData?.deviceBreakdown?.map((device, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {device.device}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {device.visitors.toLocaleString('en-US')}
                        </span>
                        <Badge variant="secondary">{device.percentage}%</Badge>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                      <div 
                        className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Countries */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Top Countries</CardTitle>
            <CardDescription>Geographic distribution of your visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficData?.topCountries?.map((country, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {country.country.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">{country.country}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {country.visitors.toLocaleString('en-US')} visitors
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                      <div 
                        className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                        style={{ width: `${country.percentage}%` }}
                      ></div>
                    </div>
                    <Badge variant="secondary">{country.percentage}%</Badge>
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
