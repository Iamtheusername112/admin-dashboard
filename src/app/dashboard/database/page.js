"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Database, 
  Search, 
  Filter, 
  MoreHorizontal,
  Play,
  Pause,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Activity,
  HardDrive,
  Cpu,
  MemoryStick,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye
} from "lucide-react"
import { useEffect, useState } from 'react'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

export default function DatabasePage() {
  const [dbStats, setDbStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDatabaseStats = async () => {
    try {
      setLoading(true);
      // Mock database stats
      const mockData = {
        overview: {
          status: 'healthy',
          uptime: '99.9%',
          connections: 45,
          maxConnections: 100,
          version: 'PostgreSQL 15.2',
          size: '2.4 GB',
          tables: 12,
          indexes: 28
        },
        performance: {
          queriesPerSecond: 125,
          avgQueryTime: 45,
          slowQueries: 3,
          cacheHitRatio: 98.5
        },
        tables: [
          {
            name: 'users',
            size: '850 MB',
            rows: 125000,
            indexes: 5,
            lastAnalyzed: '2024-01-15 10:30:00',
            status: 'healthy'
          },
          {
            name: 'posts',
            size: '420 MB',
            rows: 45000,
            indexes: 3,
            lastAnalyzed: '2024-01-15 10:25:00',
            status: 'healthy'
          },
          {
            name: 'comments',
            size: '180 MB',
            rows: 89000,
            indexes: 2,
            lastAnalyzed: '2024-01-15 10:20:00',
            status: 'healthy'
          },
          {
            name: 'analytics',
            size: '320 MB',
            rows: 250000,
            indexes: 4,
            lastAnalyzed: '2024-01-15 10:15:00',
            status: 'warning'
          },
          {
            name: 'sessions',
            size: '95 MB',
            rows: 15000,
            indexes: 1,
            lastAnalyzed: '2024-01-15 10:10:00',
            status: 'healthy'
          }
        ],
        recentQueries: [
          {
            id: '1',
            query: 'SELECT * FROM users WHERE status = "active"',
            duration: 25,
            rows: 1250,
            timestamp: '2024-01-15 10:35:00',
            status: 'success'
          },
          {
            id: '2',
            query: 'INSERT INTO posts (title, content) VALUES (...)',
            duration: 12,
            rows: 1,
            timestamp: '2024-01-15 10:34:00',
            status: 'success'
          },
          {
            id: '3',
            query: 'SELECT COUNT(*) FROM analytics WHERE date > "2024-01-01"',
            duration: 1200,
            rows: 1,
            timestamp: '2024-01-15 10:33:00',
            status: 'slow'
          },
          {
            id: '4',
            query: 'UPDATE users SET last_login = NOW() WHERE id = 123',
            duration: 8,
            rows: 1,
            timestamp: '2024-01-15 10:32:00',
            status: 'success'
          }
        ],
        performanceData: [
          { time: '00:00', queries: 45, connections: 12, cpu: 25 },
          { time: '04:00', queries: 38, connections: 8, cpu: 20 },
          { time: '08:00', queries: 125, connections: 45, cpu: 65 },
          { time: '12:00', queries: 180, connections: 67, cpu: 78 },
          { time: '16:00', queries: 165, connections: 58, cpu: 72 },
          { time: '20:00', queries: 95, connections: 35, cpu: 45 },
        ]
      };
      
      setDbStats(mockData);
    } catch (error) {
      console.error('Error fetching database stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatabaseStats();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'healthy':
        return <Badge variant="default" className="bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />Healthy</Badge>;
      case 'warning':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600"><AlertTriangle className="w-3 h-3 mr-1" />Warning</Badge>;
      case 'error':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getQueryStatusBadge = (status) => {
    switch (status) {
      case 'success':
        return <Badge variant="default" className="bg-green-600">Success</Badge>;
      case 'slow':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600">Slow</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Database Management</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Monitor and manage your database performance</p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button 
              onClick={fetchDatabaseStats}
              disabled={loading}
              size="sm" 
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button size="sm" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Database Status</p>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                    {dbStats?.overview?.status || 'Healthy'}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">
                      {dbStats?.overview?.uptime || '99.9%'} uptime
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-green-500 rounded-xl">
                  <Database className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Active Connections</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                    {dbStats?.overview?.connections || 0}/{dbStats?.overview?.maxConnections || 100}
                  </p>
                  <div className="flex items-center mt-2">
                    <Activity className="w-4 h-4 text-blue-600 mr-1" />
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      {dbStats?.performance?.queriesPerSecond || 0} queries/sec
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Database Size</p>
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                    {dbStats?.overview?.size || '0 GB'}
                  </p>
                  <div className="flex items-center mt-2">
                    <HardDrive className="w-4 h-4 text-purple-600 mr-1" />
                    <span className="text-sm text-purple-600 dark:text-purple-400">
                      {dbStats?.overview?.tables || 0} tables
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-purple-500 rounded-xl">
                  <HardDrive className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Cache Hit Ratio</p>
                  <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                    {dbStats?.performance?.cacheHitRatio || 0}%
                  </p>
                  <div className="flex items-center mt-2">
                    <MemoryStick className="w-4 h-4 text-orange-600 mr-1" />
                    <span className="text-sm text-orange-600 dark:text-orange-400">
                      {dbStats?.performance?.avgQueryTime || 0}ms avg query
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-orange-500 rounded-xl">
                  <MemoryStick className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Performance Metrics</CardTitle>
              <CardDescription>Database performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dbStats?.performanceData || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="opacity-30" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="queries"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="connections"
                    stackId="2"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Database Tables</CardTitle>
              <CardDescription>Table sizes and health status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dbStats?.tables?.map((table, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">{table.name}</h3>
                        {getStatusBadge(table.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <span>{table.size}</span>
                        <span>{table.rows.toLocaleString('en-US')} rows</span>
                        <span>{table.indexes} indexes</span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-slate-500 dark:text-slate-400">
                      <p>Last analyzed:</p>
                      <p>{new Date(table.lastAnalyzed).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Queries */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Recent Queries</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Latest database queries and performance
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Play className="w-4 h-4 mr-1" />
                  Start Monitoring
                </Button>
                <Button variant="outline" size="sm">
                  <Pause className="w-4 h-4 mr-1" />
                  Pause
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dbStats?.recentQueries?.map((query, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-mono text-slate-900 dark:text-slate-100 truncate">
                        {query.query}
                      </code>
                      {getQueryStatusBadge(query.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {query.duration}ms
                      </span>
                      <span className="flex items-center gap-1">
                        <BarChart3 className="w-3 h-3" />
                        {query.rows} rows
                      </span>
                      <span className="flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        {new Date(query.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
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
