"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Bell, 
  Search, 
  Filter, 
  MoreHorizontal,
  Check,
  X,
  Trash2,
  Eye,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Mail,
  Settings,
  MarkAsRead,
  MarkAsUnread,
  Archive,
  RefreshCw
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

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 0 });

  const fetchNotifications = async (page = 1, search = '', type = '') => {
    try {
      setLoading(true);
      // Mock notifications data
      const mockData = {
        notifications: [
          {
            id: '1',
            title: 'New user registered',
            message: 'John Smith has registered for an account and is pending approval.',
            type: 'user',
            priority: 'medium',
            isRead: false,
            createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
            actionUrl: '/dashboard/users/pending',
            metadata: {
              userId: 'user_123',
              userName: 'John Smith',
              userEmail: 'john@example.com'
            }
          },
          {
            id: '2',
            title: 'System backup completed',
            message: 'Daily backup has been successfully completed. Size: 2.4 GB',
            type: 'system',
            priority: 'low',
            isRead: true,
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            actionUrl: '/dashboard/backups',
            metadata: {
              backupId: 'backup_456',
              size: '2.4 GB',
              duration: '15 minutes'
            }
          },
          {
            id: '3',
            title: 'High memory usage alert',
            message: 'Server memory usage has exceeded 85% threshold.',
            type: 'alert',
            priority: 'high',
            isRead: false,
            createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            actionUrl: '/dashboard/monitoring',
            metadata: {
              serverId: 'server_001',
              memoryUsage: '85%',
              threshold: '80%'
            }
          },
          {
            id: '4',
            title: 'Payment received',
            message: 'Payment of $299.00 received from Acme Corp for Enterprise plan.',
            type: 'billing',
            priority: 'medium',
            isRead: true,
            createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            actionUrl: '/dashboard/billing',
            metadata: {
              amount: '$299.00',
              customer: 'Acme Corp',
              plan: 'Enterprise'
            }
          },
          {
            id: '5',
            title: 'Database connection failed',
            message: 'Failed to connect to primary database. Retrying...',
            type: 'error',
            priority: 'critical',
            isRead: false,
            createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            actionUrl: '/dashboard/database',
            metadata: {
              error: 'Connection timeout',
              retryCount: 3,
              lastAttempt: '2024-01-15T10:30:00Z'
            }
          },
          {
            id: '6',
            title: 'New comment awaiting moderation',
            message: 'A new comment has been posted and is awaiting your approval.',
            type: 'content',
            priority: 'low',
            isRead: true,
            createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            actionUrl: '/dashboard/content/comments',
            metadata: {
              commentId: 'comment_789',
              postTitle: 'Getting Started Guide',
              author: 'Sarah Johnson'
            }
          },
          {
            id: '7',
            title: 'Scheduled maintenance reminder',
            message: 'Scheduled maintenance will begin in 2 hours. Expected downtime: 30 minutes.',
            type: 'maintenance',
            priority: 'medium',
            isRead: false,
            createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            actionUrl: '/dashboard/maintenance',
            metadata: {
              startTime: '2024-01-15T14:00:00Z',
              duration: '30 minutes',
              affectedServices: ['API', 'Database']
            }
          },
          {
            id: '8',
            title: 'Security scan completed',
            message: 'Weekly security scan completed. No vulnerabilities found.',
            type: 'security',
            priority: 'low',
            isRead: true,
            createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
            actionUrl: '/dashboard/security',
            metadata: {
              scanId: 'scan_101',
              vulnerabilities: 0,
              duration: '45 minutes'
            }
          }
        ],
        pagination: {
          page: 1,
          limit: 20,
          total: 8,
          pages: 1
        }
      };
      
      setNotifications(mockData.notifications);
      setPagination(mockData.pagination);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNotifications(1, searchTerm, selectedType);
  };

  const handlePageChange = (newPage) => {
    fetchNotifications(newPage, searchTerm, selectedType);
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      setNotifications(notifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAsUnread = async (notificationId) => {
    try {
      setNotifications(notifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: false }
          : notification
      ));
    } catch (error) {
      console.error('Error marking notification as unread:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      setNotifications(notifications.map(notification => 
        ({ ...notification, isRead: true })
      ));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'critical':
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Critical</Badge>;
      case 'high':
        return <Badge variant="outline" className="border-red-500 text-red-600"><AlertTriangle className="w-3 h-3 mr-1" />High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600"><Info className="w-3 h-3 mr-1" />Medium</Badge>;
      case 'low':
        return <Badge variant="secondary"><Info className="w-3 h-3 mr-1" />Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'user':
        return <Bell className="w-5 h-5 text-blue-600" />;
      case 'system':
        return <Settings className="w-5 h-5 text-green-600" />;
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'billing':
        return <Mail className="w-5 h-5 text-purple-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'content':
        return <Bell className="w-5 h-5 text-orange-600" />;
      case 'maintenance':
        return <Settings className="w-5 h-5 text-yellow-600" />;
      case 'security':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatDate = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getNotificationStats = () => {
    return {
      total: notifications.length,
      unread: notifications.filter(n => !n.isRead).length,
      critical: notifications.filter(n => n.priority === 'critical').length,
      today: notifications.filter(n => {
        const today = new Date();
        const notificationDate = new Date(n.createdAt);
        return notificationDate.toDateString() === today.toDateString();
      }).length
    };
  };

  const stats = getNotificationStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Notifications</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your system notifications and alerts</p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Button 
              onClick={handleMarkAllAsRead}
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
            >
              <MarkAsRead className="w-4 h-4" />
              Mark All Read
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            <Button 
              onClick={() => fetchNotifications(pagination.page, searchTerm, selectedType)}
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.total}</p>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Bell className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">Unread</p>
                  <p className="text-3xl font-bold text-red-900 dark:text-red-100">{stats.unread}</p>
                </div>
                <div className="p-3 bg-red-500 rounded-xl">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Critical</p>
                  <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">{stats.critical}</p>
                </div>
                <div className="p-3 bg-orange-500 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Today</p>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.today}</p>
                </div>
                <div className="p-3 bg-green-500 rounded-xl">
                  <Calendar className="w-6 h-6 text-white" />
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
                    placeholder="Search notifications by title or message..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="">All Types</option>
                  <option value="user">User</option>
                  <option value="system">System</option>
                  <option value="alert">Alert</option>
                  <option value="billing">Billing</option>
                  <option value="error">Error</option>
                  <option value="content">Content</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="security">Security</option>
                </select>
                <select className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                  <option value="">All Priorities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <Button type="submit" size="sm" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">All Notifications</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  {pagination.total} notifications found
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-slate-600 dark:text-slate-400">Loading notifications...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`flex items-start gap-4 p-4 border rounded-lg transition-colors ${
                      notification.isRead 
                        ? 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50' 
                        : 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                    }`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`font-semibold truncate ${
                          notification.isRead 
                            ? 'text-slate-900 dark:text-slate-100' 
                            : 'text-blue-900 dark:text-blue-100'
                        }`}>
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                        {getPriorityBadge(notification.priority)}
                        <Badge variant="outline" className="text-xs">
                          {notification.type}
                        </Badge>
                      </div>
                      <p className={`text-sm mb-2 ${
                        notification.isRead 
                          ? 'text-slate-600 dark:text-slate-400' 
                          : 'text-blue-700 dark:text-blue-300'
                      }`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(notification.createdAt)}
                        </span>
                        {notification.metadata && Object.entries(notification.metadata).slice(0, 2).map(([key, value]) => (
                          <span key={key}>
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right text-sm">
                        {notification.actionUrl && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => window.open(notification.actionUrl, '_blank')}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            View
                          </Button>
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
                          <DropdownMenuItem 
                            onClick={() => notification.isRead ? handleMarkAsUnread(notification.id) : handleMarkAsRead(notification.id)}
                          >
                            {notification.isRead ? (
                              <>
                                <MarkAsUnread className="w-4 h-4 mr-2" />
                                Mark as Unread
                              </>
                            ) : (
                              <>
                                <MarkAsRead className="w-4 h-4 mr-2" />
                                Mark as Read
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="w-4 h-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 dark:text-red-400">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
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
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} notifications
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
