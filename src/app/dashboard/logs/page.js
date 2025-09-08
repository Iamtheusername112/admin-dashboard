"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  FileText, 
  Search, 
  Filter, 
  MoreHorizontal,
  Download,
  RefreshCw,
  Trash2,
  Eye,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Bug,
  Activity,
  ChevronDown,
  Play,
  Pause,
  RotateCcw
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

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 50, total: 0, pages: 0 });

  const fetchLogs = async (page = 1, search = '', level = '') => {
    try {
      setLoading(true);
      // Mock logs data
      const mockData = {
        logs: [
          {
            id: '1',
            timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
            level: 'info',
            message: 'User authentication successful',
            source: 'auth-service',
            userId: 'user_123',
            ipAddress: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            details: {
              method: 'POST',
              endpoint: '/api/auth/login',
              duration: 125,
              statusCode: 200
            }
          },
          {
            id: '2',
            timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
            level: 'error',
            message: 'Database connection failed',
            source: 'database-service',
            userId: null,
            ipAddress: '192.168.1.101',
            userAgent: null,
            details: {
              error: 'Connection timeout',
              retryCount: 3,
              lastAttempt: '2024-01-15T10:30:00Z'
            }
          },
          {
            id: '3',
            timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
            level: 'warning',
            message: 'High memory usage detected',
            source: 'monitoring-service',
            userId: null,
            ipAddress: '192.168.1.102',
            userAgent: null,
            details: {
              memoryUsage: '85%',
              threshold: '80%',
              process: 'node-app'
            }
          },
          {
            id: '4',
            timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
            level: 'debug',
            message: 'Cache miss for key: user_profile_456',
            source: 'cache-service',
            userId: 'user_456',
            ipAddress: '192.168.1.103',
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            details: {
              cacheKey: 'user_profile_456',
              ttl: 3600,
              hitRate: '92%'
            }
          },
          {
            id: '5',
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            level: 'info',
            message: 'API request processed',
            source: 'api-gateway',
            userId: 'user_789',
            ipAddress: '192.168.1.104',
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
            details: {
              method: 'GET',
              endpoint: '/api/users/profile',
              duration: 45,
              statusCode: 200
            }
          },
          {
            id: '6',
            timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
            level: 'error',
            message: 'Failed to send email notification',
            source: 'email-service',
            userId: 'user_321',
            ipAddress: '192.168.1.105',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            details: {
              error: 'SMTP connection refused',
              recipient: 'user@example.com',
              template: 'welcome_email'
            }
          },
          {
            id: '7',
            timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
            level: 'info',
            message: 'Background job completed',
            source: 'job-processor',
            userId: null,
            ipAddress: '192.168.1.106',
            userAgent: null,
            details: {
              jobType: 'data_cleanup',
              duration: 300,
              recordsProcessed: 1500
            }
          },
          {
            id: '8',
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            level: 'warning',
            message: 'Rate limit exceeded for IP',
            source: 'rate-limiter',
            userId: null,
            ipAddress: '192.168.1.107',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            details: {
              limit: 100,
              window: '1m',
              current: 150
            }
          }
        ],
        pagination: {
          page: 1,
          limit: 50,
          total: 8,
          pages: 1
        }
      };
      
      setLogs(mockData.logs);
      setPagination(mockData.pagination);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLogs(1, searchTerm, selectedLevel);
  };

  const handlePageChange = (newPage) => {
    fetchLogs(newPage, searchTerm, selectedLevel);
  };

  const getLevelBadge = (level) => {
    switch (level) {
      case 'error':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Error</Badge>;
      case 'warning':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600"><AlertTriangle className="w-3 h-3 mr-1" />Warning</Badge>;
      case 'info':
        return <Badge variant="default" className="bg-blue-600"><Info className="w-3 h-3 mr-1" />Info</Badge>;
      case 'debug':
        return <Badge variant="secondary"><Bug className="w-3 h-3 mr-1" />Debug</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-600" />;
      case 'debug':
        return <Bug className="w-4 h-4 text-gray-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getLogCounts = () => {
    return {
      total: logs.length,
      error: logs.filter(log => log.level === 'error').length,
      warning: logs.filter(log => log.level === 'warning').length,
      info: logs.filter(log => log.level === 'info').length,
      debug: logs.filter(log => log.level === 'debug').length
    };
  };

  const counts = getLogCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">System Logs</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Monitor and analyze system logs in real-time</p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Button 
              variant={isLive ? "default" : "outline"}
              size="sm" 
              onClick={() => setIsLive(!isLive)}
              className="flex items-center gap-2"
            >
              {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isLive ? 'Pause' : 'Live'}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button 
              onClick={() => fetchLogs(pagination.page, searchTerm, selectedLevel)}
              disabled={loading}
              size="sm" 
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Clear Logs
            </Button>
          </div>
        </div>

        {/* Log Level Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/20 dark:to-slate-700/20 border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{counts.total}</p>
                </div>
                <div className="p-3 bg-slate-500 rounded-xl">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">Errors</p>
                  <p className="text-3xl font-bold text-red-900 dark:text-red-100">{counts.error}</p>
                </div>
                <div className="p-3 bg-red-500 rounded-xl">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Warnings</p>
                  <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">{counts.warning}</p>
                </div>
                <div className="p-3 bg-yellow-500 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Info</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{counts.info}</p>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Info className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Debug</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{counts.debug}</p>
                </div>
                <div className="p-3 bg-gray-500 rounded-xl">
                  <Bug className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search logs by message, source, or user..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select 
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="">All Levels</option>
                  <option value="error">Error</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                  <option value="debug">Debug</option>
                </select>
                <select className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                  <option value="">All Sources</option>
                  <option value="auth-service">Auth Service</option>
                  <option value="database-service">Database Service</option>
                  <option value="api-gateway">API Gateway</option>
                  <option value="email-service">Email Service</option>
                </select>
                <Button type="submit" size="sm" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">System Logs</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  {pagination.total} log entries found
                </CardDescription>
              </div>
              {isLive && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-red-600 dark:text-red-400">Live</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-slate-600 dark:text-slate-400">Loading logs...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      {getLevelIcon(log.level)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-mono text-slate-500 dark:text-slate-400">
                          {formatTimestamp(log.timestamp)}
                        </span>
                        {getLevelBadge(log.level)}
                        <Badge variant="outline" className="text-xs">
                          {log.source}
                        </Badge>
                        {log.userId && (
                          <Badge variant="secondary" className="text-xs">
                            User: {log.userId}
                          </Badge>
                        )}
                      </div>
                      <p className="text-slate-900 dark:text-slate-100 mb-2">
                        {log.message}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                        {log.ipAddress && (
                          <span>IP: {log.ipAddress}</span>
                        )}
                        {log.userAgent && (
                          <span className="truncate max-w-xs">UA: {log.userAgent}</span>
                        )}
                        {log.details && (
                          <span>
                            {Object.entries(log.details).map(([key, value]) => 
                              `${key}: ${value}`
                            ).join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Export Entry
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 dark:text-red-400">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Entry
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
