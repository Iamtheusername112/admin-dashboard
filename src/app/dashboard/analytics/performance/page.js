"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Zap,
  Clock,
  Users,
  Server,
  Cpu,
  MemoryStick,
  HardDrive,
  Wifi,
  RefreshCw,
  Download,
  Filter,
  Calendar
} from "lucide-react"
import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts"

export default function PerformancePage() {
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('24h');

  const fetchPerformanceData = async () => {
    try {
      setLoading(true);
      // Mock performance data
      const mockData = {
        overview: {
          avgResponseTime: 120,
          uptime: 99.8,
          totalRequests: 125000,
          errorRate: 0.02
        },
        responseTimeData: [
          { time: '00:00', responseTime: 115, requests: 1200 },
          { time: '04:00', responseTime: 98, requests: 800 },
          { time: '08:00', responseTime: 135, requests: 2100 },
          { time: '12:00', responseTime: 142, requests: 3200 },
          { time: '16:00', responseTime: 128, requests: 2800 },
          { time: '20:00', responseTime: 110, requests: 1500 },
        ],
        cpuUsageData: [
          { time: '00:00', cpu: 25, memory: 45, disk: 15 },
          { time: '04:00', cpu: 20, memory: 42, disk: 15 },
          { time: '08:00', cpu: 65, memory: 68, disk: 16 },
          { time: '12:00', cpu: 78, memory: 72, disk: 17 },
          { time: '16:00', cpu: 70, memory: 65, disk: 16 },
          { time: '20:00', cpu: 45, memory: 50, disk: 15 },
        ],
        topEndpoints: [
          { endpoint: '/api/users', requests: 15420, avgTime: 95, errors: 12 },
          { endpoint: '/api/posts', requests: 12300, avgTime: 120, errors: 8 },
          { endpoint: '/api/analytics', requests: 8900, avgTime: 180, errors: 5 },
          { endpoint: '/api/notifications', requests: 6700, avgTime: 75, errors: 3 },
          { endpoint: '/api/dashboard', requests: 5400, avgTime: 200, errors: 2 },
        ],
        errorRates: [
          { status: '200', count: 118500, percentage: 94.8 },
          { status: '400', count: 3200, percentage: 2.6 },
          { status: '401', count: 1800, percentage: 1.4 },
          { status: '500', count: 500, percentage: 0.4 },
          { status: '503', count: 1000, percentage: 0.8 },
        ]
      };
      
      setPerformanceData(mockData);
    } catch (error) {
      console.error('Error fetching performance data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformanceData();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading performance data...</p>
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
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Performance Analytics</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Monitor system performance and response times</p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button 
              onClick={fetchPerformanceData}
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
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Avg Response Time</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{performanceData?.overview?.avgResponseTime || 120}ms</p>
                  <div className="flex items-center mt-2">
                    <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">-5.2% from yesterday</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Uptime</p>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">{performanceData?.overview?.uptime || 99.8}%</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">+0.1% from last week</span>
                  </div>
                </div>
                <div className="p-3 bg-green-500 rounded-xl">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Requests</p>
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{(performanceData?.overview?.totalRequests || 125000).toLocaleString('en-US')}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">+12.5% from yesterday</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-500 rounded-xl">
                  <Server className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Error Rate</p>
                  <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">{performanceData?.overview?.errorRate || 0.02}%</p>
                  <div className="flex items-center mt-2">
                    <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">-0.01% from yesterday</span>
                  </div>
                </div>
                <div className="p-3 bg-orange-500 rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Response Time Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Response Time Over Time</CardTitle>
              <CardDescription>Average response time by hour</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData?.responseTimeData || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="opacity-30" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="responseTime"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Resource Usage Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Resource Usage</CardTitle>
              <CardDescription>CPU, Memory, and Disk usage over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData?.cpuUsageData || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="opacity-30" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="cpu" stroke="#EF4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="memory" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="disk" stroke="#F59E0B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Endpoints and Error Rates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Endpoints */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Top Endpoints</CardTitle>
              <CardDescription>Most requested API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData?.topEndpoints?.map((endpoint, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-slate-100">{endpoint.endpoint}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {endpoint.requests.toLocaleString('en-US')} requests • {endpoint.avgTime}ms avg
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={endpoint.errors > 10 ? 'destructive' : 'secondary'}>
                        {endpoint.errors} errors
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Error Rates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">HTTP Status Codes</CardTitle>
              <CardDescription>Distribution of response status codes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {performanceData?.errorRates?.map((status, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={status.status === '200' ? 'default' : status.status.startsWith('4') ? 'destructive' : 'secondary'}
                        className="w-12 justify-center"
                      >
                        {status.status}
                      </Badge>
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {status.count.toLocaleString('en-US')} responses
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            status.status === '200' ? 'bg-green-500' : 
                            status.status.startsWith('4') ? 'bg-red-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${status.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400 w-12 text-right">
                        {status.percentage}%
                      </span>
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
