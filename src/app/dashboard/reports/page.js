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
  Plus,
  RefreshCw,
  Eye,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Settings,
  Share,
  Edit,
  Trash2
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

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, pages: 0 });

  const fetchReports = async (page = 1, search = '', category = '') => {
    try {
      setLoading(true);
      // Mock reports data
      const mockData = {
        reports: [
          {
            id: '1',
            title: 'Monthly Revenue Report',
            description: 'Comprehensive revenue analysis for the current month',
            category: 'financial',
            type: 'scheduled',
            status: 'completed',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            lastGenerated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            nextRun: new Date(Date.now() + 29 * 24 * 60 * 60 * 1000).toISOString(),
            size: '2.4 MB',
            format: 'PDF',
            frequency: 'monthly',
            author: 'System',
            views: 45,
            downloads: 12,
            isPublic: false,
            tags: ['revenue', 'monthly', 'financial']
          },
          {
            id: '2',
            title: 'User Activity Dashboard',
            description: 'Real-time user engagement and activity metrics',
            category: 'analytics',
            type: 'dashboard',
            status: 'active',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            lastGenerated: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            nextRun: null,
            size: '1.2 MB',
            format: 'HTML',
            frequency: 'real-time',
            author: 'Sarah Johnson',
            views: 128,
            downloads: 8,
            isPublic: true,
            tags: ['users', 'activity', 'engagement']
          },
          {
            id: '3',
            title: 'System Performance Report',
            description: 'Weekly system performance and health metrics',
            category: 'system',
            type: 'scheduled',
            status: 'completed',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            lastGenerated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            nextRun: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            size: '3.1 MB',
            format: 'PDF',
            frequency: 'weekly',
            author: 'System',
            views: 23,
            downloads: 5,
            isPublic: false,
            tags: ['performance', 'system', 'health']
          },
          {
            id: '4',
            title: 'Content Performance Analysis',
            description: 'Analysis of content engagement and performance metrics',
            category: 'content',
            type: 'manual',
            status: 'completed',
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            lastGenerated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            nextRun: null,
            size: '1.8 MB',
            format: 'Excel',
            frequency: 'on-demand',
            author: 'Mike Wilson',
            views: 67,
            downloads: 15,
            isPublic: false,
            tags: ['content', 'performance', 'engagement']
          },
          {
            id: '5',
            title: 'Security Audit Report',
            description: 'Monthly security audit and vulnerability assessment',
            category: 'security',
            type: 'scheduled',
            status: 'in_progress',
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            lastGenerated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            nextRun: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
            size: '4.2 MB',
            format: 'PDF',
            frequency: 'monthly',
            author: 'System',
            views: 12,
            downloads: 3,
            isPublic: false,
            tags: ['security', 'audit', 'vulnerabilities']
          },
          {
            id: '6',
            title: 'Customer Satisfaction Survey',
            description: 'Quarterly customer satisfaction and feedback analysis',
            category: 'customer',
            type: 'scheduled',
            status: 'completed',
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            lastGenerated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            nextRun: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000).toISOString(),
            size: '2.7 MB',
            format: 'PDF',
            frequency: 'quarterly',
            author: 'Emily Davis',
            views: 89,
            downloads: 22,
            isPublic: true,
            tags: ['customer', 'satisfaction', 'feedback']
          },
          {
            id: '7',
            title: 'Database Performance Metrics',
            description: 'Daily database performance and optimization metrics',
            category: 'system',
            type: 'scheduled',
            status: 'failed',
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            lastGenerated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            nextRun: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
            size: '0 MB',
            format: 'PDF',
            frequency: 'daily',
            author: 'System',
            views: 5,
            downloads: 0,
            isPublic: false,
            tags: ['database', 'performance', 'metrics'],
            error: 'Database connection timeout'
          },
          {
            id: '8',
            title: 'Marketing Campaign ROI',
            description: 'ROI analysis for recent marketing campaigns',
            category: 'marketing',
            type: 'manual',
            status: 'completed',
            createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            lastGenerated: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            nextRun: null,
            size: '1.5 MB',
            format: 'PowerPoint',
            frequency: 'on-demand',
            author: 'David Brown',
            views: 34,
            downloads: 7,
            isPublic: false,
            tags: ['marketing', 'roi', 'campaigns']
          }
        ],
        pagination: {
          page: 1,
          limit: 12,
          total: 8,
          pages: 1
        }
      };
      
      setReports(mockData.reports);
      setPagination(mockData.pagination);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchReports(1, searchTerm, selectedCategory);
  };

  const handlePageChange = (newPage) => {
    fetchReports(newPage, searchTerm, selectedCategory);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'active':
        return <Badge variant="default" className="bg-blue-600"><Activity className="w-3 h-3 mr-1" />Active</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600"><Clock className="w-3 h-3 mr-1" />In Progress</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      case 'scheduled':
        return <Badge variant="secondary"><Calendar className="w-3 h-3 mr-1" />Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'financial':
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'analytics':
        return <BarChart3 className="w-5 h-5 text-blue-600" />;
      case 'system':
        return <Settings className="w-5 h-5 text-purple-600" />;
      case 'content':
        return <FileText className="w-5 h-5 text-orange-600" />;
      case 'security':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'customer':
        return <Users className="w-5 h-5 text-pink-600" />;
      case 'marketing':
        return <TrendingUp className="w-5 h-5 text-indigo-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'scheduled':
        return <Badge variant="outline" className="text-xs">Scheduled</Badge>;
      case 'dashboard':
        return <Badge variant="outline" className="text-xs">Dashboard</Badge>;
      case 'manual':
        return <Badge variant="outline" className="text-xs">Manual</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{type}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getReportStats = () => {
    return {
      total: reports.length,
      completed: reports.filter(r => r.status === 'completed').length,
      active: reports.filter(r => r.status === 'active').length,
      failed: reports.filter(r => r.status === 'failed').length,
      totalViews: reports.reduce((sum, report) => sum + report.views, 0),
      totalDownloads: reports.reduce((sum, report) => sum + report.downloads, 0)
    };
  };

  const stats = getReportStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Reports</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Generate and manage your business reports</p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            <Button 
              onClick={() => fetchReports(pagination.page, searchTerm, selectedCategory)}
              disabled={loading}
              size="sm" 
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button size="sm" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4" />
              Create Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Reports</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.total}</p>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl">
                  <FileText className="w-6 h-6 text-white" />
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

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Views</p>
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.totalViews}</p>
                </div>
                <div className="p-3 bg-purple-500 rounded-xl">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Downloads</p>
                  <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">{stats.totalDownloads}</p>
                </div>
                <div className="p-3 bg-orange-500 rounded-xl">
                  <Download className="w-6 h-6 text-white" />
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
                    placeholder="Search reports by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="">All Categories</option>
                  <option value="financial">Financial</option>
                  <option value="analytics">Analytics</option>
                  <option value="system">System</option>
                  <option value="content">Content</option>
                  <option value="security">Security</option>
                  <option value="customer">Customer</option>
                  <option value="marketing">Marketing</option>
                </select>
                <select className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                  <option value="">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="active">Active</option>
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

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(report.category)}
                    <div>
                      <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        {report.title}
                      </CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400">
                        {report.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(report.status)}
                    {getTypeBadge(report.type)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Author</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{report.author}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Format</span>
                    <Badge variant="outline" className="text-xs">{report.format}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Size</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{report.size}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Frequency</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{report.frequency}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Last Generated</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {formatDate(report.lastGenerated)}
                    </span>
                  </div>
                  {report.nextRun && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Next Run</span>
                      <span className="font-medium text-slate-900 dark:text-slate-100">
                        {formatDate(report.nextRun)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Views</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{report.views}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Downloads</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{report.downloads}</span>
                  </div>
                  {report.isPublic && (
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-600 border-green-200">
                        Public
                      </Badge>
                    </div>
                  )}
                  {report.error && (
                    <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                      Error: {report.error}
                    </div>
                  )}
                  <div className="flex items-center gap-1 flex-wrap">
                    {report.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
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
                        View Report
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600 dark:text-red-400">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between mt-8">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} reports
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
      </div>
    </div>
  )
}
