"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Cloud, 
  Search, 
  Filter, 
  MoreHorizontal,
  Download,
  Upload,
  RefreshCw,
  Trash2,
  Eye,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  HardDrive,
  Database,
  Archive,
  Settings,
  Activity,
  Shield
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

export default function BackupsPage() {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });

  const fetchBackups = async (page = 1, search = '') => {
    try {
      setLoading(true);
      // Mock backups data
      const mockData = {
        backups: [
          {
            id: '1',
            name: 'full_backup_2024_01_15',
            type: 'full',
            size: '2.4 GB',
            status: 'completed',
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000 + 15 * 60 * 1000).toISOString(),
            duration: 15, // minutes
            location: 's3://backups/production/2024/01/15/',
            checksum: 'sha256:abc123def456...',
            compression: 'gzip',
            encryption: 'AES-256',
            retention: 30, // days
            expiresAt: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
            tables: 12,
            records: 1250000
          },
          {
            id: '2',
            name: 'incremental_backup_2024_01_15_12',
            type: 'incremental',
            size: '450 MB',
            status: 'completed',
            createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            completedAt: new Date(Date.now() - 4 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString(),
            duration: 5,
            location: 's3://backups/production/2024/01/15/incremental/',
            checksum: 'sha256:def456ghi789...',
            compression: 'gzip',
            encryption: 'AES-256',
            retention: 7,
            expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            tables: 12,
            records: 45000
          },
          {
            id: '3',
            name: 'full_backup_2024_01_14',
            type: 'full',
            size: '2.3 GB',
            status: 'completed',
            createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
            completedAt: new Date(Date.now() - 26 * 60 * 60 * 1000 + 18 * 60 * 1000).toISOString(),
            duration: 18,
            location: 's3://backups/production/2024/01/14/',
            checksum: 'sha256:ghi789jkl012...',
            compression: 'gzip',
            encryption: 'AES-256',
            retention: 30,
            expiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
            tables: 12,
            records: 1200000
          },
          {
            id: '4',
            name: 'incremental_backup_2024_01_14_18',
            type: 'incremental',
            size: '380 MB',
            status: 'failed',
            createdAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
            completedAt: null,
            duration: null,
            location: 's3://backups/production/2024/01/14/incremental/',
            checksum: null,
            compression: 'gzip',
            encryption: 'AES-256',
            retention: 7,
            expiresAt: null,
            tables: 12,
            records: 0,
            error: 'Connection timeout to S3'
          },
          {
            id: '5',
            name: 'full_backup_2024_01_13',
            type: 'full',
            size: '2.2 GB',
            status: 'completed',
            createdAt: new Date(Date.now() - 50 * 60 * 60 * 1000).toISOString(),
            completedAt: new Date(Date.now() - 50 * 60 * 60 * 1000 + 20 * 60 * 1000).toISOString(),
            duration: 20,
            location: 's3://backups/production/2024/01/13/',
            checksum: 'sha256:jkl012mno345...',
            compression: 'gzip',
            encryption: 'AES-256',
            retention: 30,
            expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            tables: 12,
            records: 1150000
          },
          {
            id: '6',
            name: 'database_backup_2024_01_15',
            type: 'database',
            size: '1.8 GB',
            status: 'in_progress',
            createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            completedAt: null,
            duration: null,
            location: 's3://backups/production/2024/01/15/database/',
            checksum: null,
            compression: 'gzip',
            encryption: 'AES-256',
            retention: 14,
            expiresAt: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000).toISOString(),
            tables: 12,
            records: 0,
            progress: 65
          }
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 6,
          pages: 1
        }
      };
      
      setBackups(mockData.backups);
      setPagination(mockData.pagination);
    } catch (error) {
      console.error('Error fetching backups:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackups();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBackups(1, searchTerm);
  };

  const handlePageChange = (newPage) => {
    fetchBackups(newPage, searchTerm);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="border-blue-500 text-blue-600"><Activity className="w-3 h-3 mr-1" />In Progress</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600"><Clock className="w-3 h-3 mr-1" />Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'full':
        return <Database className="w-5 h-5 text-blue-600" />;
      case 'incremental':
        return <Archive className="w-5 h-5 text-green-600" />;
      case 'database':
        return <HardDrive className="w-5 h-5 text-purple-600" />;
      default:
        return <Cloud className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const getBackupStats = () => {
    return {
      total: backups.length,
      completed: backups.filter(backup => backup.status === 'completed').length,
      failed: backups.filter(backup => backup.status === 'failed').length,
      inProgress: backups.filter(backup => backup.status === 'in_progress').length,
      totalSize: backups.reduce((sum, backup) => {
        const size = parseFloat(backup.size);
        const unit = backup.size.split(' ')[1];
        const multiplier = unit === 'GB' ? 1024 : 1;
        return sum + (size * multiplier);
      }, 0)
    };
  };

  const stats = getBackupStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Backups</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Manage and monitor your system backups</p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button 
              onClick={() => fetchBackups(pagination.page, searchTerm)}
              disabled={loading}
              size="sm" 
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button size="sm" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <Cloud className="w-4 h-4" />
              Create Backup
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Backups</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.total}</p>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Cloud className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Completed</p>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.completed}</p>
                </div>
                <div className="p-3 bg-green-500 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">Failed</p>
                  <p className="text-3xl font-bold text-red-900 dark:text-red-100">{stats.failed}</p>
                </div>
                <div className="p-3 bg-red-500 rounded-xl">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Size</p>
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                    {(stats.totalSize / 1024).toFixed(1)} GB
                  </p>
                </div>
                <div className="p-3 bg-purple-500 rounded-xl">
                  <HardDrive className="w-6 h-6 text-white" />
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
                    placeholder="Search backups by name or type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                  <option value="">All Types</option>
                  <option value="full">Full Backup</option>
                  <option value="incremental">Incremental</option>
                  <option value="database">Database</option>
                </select>
                <select className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                  <option value="">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="failed">Failed</option>
                  <option value="scheduled">Scheduled</option>
                </select>
                <Button type="submit" size="sm" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Backups Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Backup History</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  {pagination.total} backups found
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-slate-600 dark:text-slate-400">Loading backups...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {backups.map((backup) => (
                  <div key={backup.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex-shrink-0">
                        {getTypeIcon(backup.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                            {backup.name}
                          </h3>
                          {getStatusBadge(backup.status)}
                          <Badge variant="outline" className="text-xs">
                            {backup.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-2">
                          <span className="flex items-center gap-1">
                            <HardDrive className="w-3 h-3" />
                            {backup.size}
                          </span>
                          <span className="flex items-center gap-1">
                            <Database className="w-3 h-3" />
                            {backup.tables} tables
                          </span>
                          <span className="flex items-center gap-1">
                            <Activity className="w-3 h-3" />
                            {backup.records.toLocaleString('en-US')} records
                          </span>
                          {backup.duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {backup.duration} min
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                          <span>Created: {formatDate(backup.createdAt)}</span>
                          {backup.completedAt && (
                            <span>Completed: {formatDate(backup.completedAt)}</span>
                          )}
                          <span>Retention: {backup.retention} days</span>
                          {backup.expiresAt && (
                            <span>Expires: {formatDate(backup.expiresAt)}</span>
                          )}
                        </div>
                        {backup.error && (
                          <div className="mt-2 text-xs text-red-600 dark:text-red-400">
                            Error: {backup.error}
                          </div>
                        )}
                        {backup.status === 'in_progress' && backup.progress && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                              <span>Progress</span>
                              <span>{backup.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${backup.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right text-sm">
                        <p className="text-slate-500 dark:text-slate-400">
                          {backup.location}
                        </p>
                        {backup.checksum && (
                          <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                            {backup.checksum.substring(0, 16)}...
                          </p>
                        )}
                      </div>
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
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Restore
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 dark:text-red-400">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Backup
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
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} backups
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
