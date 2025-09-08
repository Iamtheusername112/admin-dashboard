"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Monitor, 
  Server, 
  Database, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  HardDrive,
  Cpu,
  MemoryStick,
  Wifi,
  Shield,
  RefreshCw,
  Download,
  Settings,
  Eye,
  Trash2
} from "lucide-react"
import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

export default function MonitoringPage() {
  const [systemHealth, setSystemHealth] = useState(null);
  const [performanceData, setPerformanceData] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMonitoringData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/dashboard');
      const data = await response.json();
      
      setSystemHealth(data.systemHealth);
      setPerformanceData(data.performanceData || []);
      
      // Mock logs data
      setLogs([
        {
          id: 1,
          level: 'info',
          message: 'User authentication successful',
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          source: 'auth-service'
        },
        {
          id: 2,
          level: 'warn',
          message: 'High memory usage detected',
          timestamp: new Date(Date.now() - 1000 * 60 * 10),
          source: 'monitoring'
        },
        {
          id: 3,
          level: 'error',
          message: 'Database connection timeout',
          timestamp: new Date(Date.now() - 1000 * 60 * 15),
          source: 'database'
        },
        {
          id: 4,
          level: 'info',
          message: 'Scheduled backup completed',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          source: 'backup-service'
        },
        {
          id: 5,
          level: 'info',
          message: 'API rate limit reset',
          timestamp: new Date(Date.now() - 1000 * 60 * 45),
          source: 'api-gateway'
        }
      ]);
    } catch (error) {
      console.error('Error fetching monitoring data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonitoringData();
    const interval = setInterval(fetchMonitoringData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getLogLevelColor = (level) => {
    switch (level) {
      case 'error': return 'text-red-600 dark:text-red-400';
      case 'warn': return 'text-yellow-600 dark:text-yellow-400';
      case 'info': return 'text-blue-600 dark:text-blue-400';
      case 'debug': return 'text-slate-600 dark:text-slate-400';
      default: return 'text-slate-600 dark:text-slate-400';
    }
  };

  const getLogLevelIcon = (level) => {
    switch (level) {
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      case 'warn': return <AlertTriangle className="w-4 h-4" />;
      case 'info': return <CheckCircle className="w-4 h-4" />;
      case 'debug': return <Activity className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getHealthStatus = (value, thresholds) => {
    if (value >= thresholds.critical) return { status: 'critical', color: 'text-red-600 dark:text-red-400' };
    if (value >= thresholds.warning) return { status: 'warning', color: 'text-yellow-600 dark:text-yellow-400' };
    return { status: 'healthy', color: 'text-green-600 dark:text-green-400' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading monitoring data...</p>
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
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">System Monitoring</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Real-time system health and performance metrics</p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Logs
            </Button>
            <Button 
              onClick={fetchMonitoringData}
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

        {/* System Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Uptime</p>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">{systemHealth?.uptime || 99.8}%</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">Last 30 days</p>
                </div>
                <div className="p-3 bg-green-500 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Response Time</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{systemHealth?.responseTime || 120}ms</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Average</p>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Error Rate</p>
                  <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">{systemHealth?.errorRate || 0.02}%</p>
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Last hour</p>
                </div>
                <div className="p-3 bg-orange-500 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Active Users</p>
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">1,247</p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Currently online</p>
                </div>
                <div className="p-3 bg-purple-500 rounded-xl">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">CPU & Memory Usage</CardTitle>
              <CardDescription>Real-time resource utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">CPU Usage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{systemHealth?.cpuUsage || 45}%</span>
                    <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                      <div 
                        className="h-2 bg-blue-600 rounded-full" 
                        style={{ width: `${systemHealth?.cpuUsage || 45}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MemoryStick className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Memory Usage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{systemHealth?.memoryUsage || 67}%</span>
                    <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                      <div 
                        className="h-2 bg-green-600 rounded-full" 
                        style={{ width: `${systemHealth?.memoryUsage || 67}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium">Disk Usage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{systemHealth?.diskUsage || 23}%</span>
                    <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                      <div 
                        className="h-2 bg-orange-600 rounded-full" 
                        style={{ width: `${systemHealth?.diskUsage || 23}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Network Status</CardTitle>
              <CardDescription>Connection and bandwidth metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Connection Status</span>
                  </div>
                  <Badge variant="default" className="bg-green-600">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Bandwidth</span>
                  </div>
                  <span className="text-sm font-medium">1.2 Gbps</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium">SSL Status</span>
                  </div>
                  <Badge variant="default" className="bg-green-600">Valid</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium">Server Load</span>
                  </div>
                  <span className="text-sm font-medium">0.45</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Logs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">System Logs</CardTitle>
                <CardDescription>Recent system events and alerts</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View All
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Clear
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className={`flex-shrink-0 ${getLogLevelColor(log.level)}`}>
                    {getLogLevelIcon(log.level)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-sm font-medium ${getLogLevelColor(log.level)}`}>
                        {log.level.toUpperCase()}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {log.source}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-900 dark:text-slate-100 mb-1">
                      {log.message}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {log.timestamp.toLocaleString()}
                    </p>
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