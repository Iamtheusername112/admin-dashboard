"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  MessageSquare, 
  Search, 
  Filter, 
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Tag,
  ChevronDown,
  Download,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  Reply,
  Flag,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle
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

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });

  const fetchComments = async (page = 1, search = '') => {
    try {
      setLoading(true);
      // Mock comments data
      const mockData = {
        comments: [
          {
            id: '1',
            content: 'This is really helpful! Thanks for sharing this guide.',
            author: { 
              name: 'John Smith', 
              email: 'john@example.com',
              avatar: '/api/placeholder/40/40'
            },
            post: { 
              title: 'Getting Started with Our Platform',
              slug: '/posts/getting-started',
              type: 'post'
            },
            status: 'approved',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            likes: 5,
            dislikes: 0,
            replies: 2,
            isSpam: false,
            isFlagged: false,
            ipAddress: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          {
            id: '2',
            content: 'I have a question about the pricing. Can you clarify the enterprise plan?',
            author: { 
              name: 'Sarah Johnson', 
              email: 'sarah@example.com',
              avatar: '/api/placeholder/40/40'
            },
            post: { 
              title: 'Pricing Plans Overview',
              slug: '/pricing',
              type: 'page'
            },
            status: 'pending',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            likes: 3,
            dislikes: 0,
            replies: 1,
            isSpam: false,
            isFlagged: false,
            ipAddress: '192.168.1.101',
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
          },
          {
            id: '3',
            content: 'This is spam! Click here for free money!',
            author: { 
              name: 'Spam User', 
              email: 'spam@fake.com',
              avatar: null
            },
            post: { 
              title: 'Getting Started with Our Platform',
              slug: '/posts/getting-started',
              type: 'post'
            },
            status: 'spam',
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            likes: 0,
            dislikes: 2,
            replies: 0,
            isSpam: true,
            isFlagged: true,
            ipAddress: '192.168.1.999',
            userAgent: 'SpamBot/1.0'
          },
          {
            id: '4',
            content: 'Great article! I learned a lot from this. Looking forward to more content like this.',
            author: { 
              name: 'Mike Wilson', 
              email: 'mike@example.com',
              avatar: '/api/placeholder/40/40'
            },
            post: { 
              title: 'Advanced Analytics Features',
              slug: '/posts/advanced-analytics',
              type: 'post'
            },
            status: 'approved',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            likes: 8,
            dislikes: 0,
            replies: 0,
            isSpam: false,
            isFlagged: false,
            ipAddress: '192.168.1.102',
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
          },
          {
            id: '5',
            content: 'I disagree with this approach. Here\'s why...',
            author: { 
              name: 'Emily Davis', 
              email: 'emily@example.com',
              avatar: '/api/placeholder/40/40'
            },
            post: { 
              title: 'User Management Best Practices',
              slug: '/posts/user-management',
              type: 'post'
            },
            status: 'approved',
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            likes: 2,
            dislikes: 4,
            replies: 3,
            isSpam: false,
            isFlagged: true,
            ipAddress: '192.168.1.103',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 5,
          pages: 1
        }
      };
      
      setComments(mockData.comments);
      setPagination(mockData.pagination);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchComments(1, searchTerm);
  };

  const handlePageChange = (newPage) => {
    fetchComments(newPage, searchTerm);
  };

  const handleApprove = async (commentId) => {
    try {
      // Mock API call
      console.log('Approving comment:', commentId);
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, status: 'approved' }
          : comment
      ));
    } catch (error) {
      console.error('Error approving comment:', error);
    }
  };

  const handleReject = async (commentId) => {
    try {
      // Mock API call
      console.log('Rejecting comment:', commentId);
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, status: 'rejected' }
          : comment
      ));
    } catch (error) {
      console.error('Error rejecting comment:', error);
    }
  };

  const handleMarkSpam = async (commentId) => {
    try {
      // Mock API call
      console.log('Marking as spam:', commentId);
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, status: 'spam', isSpam: true }
          : comment
      ));
    } catch (error) {
      console.error('Error marking as spam:', error);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      case 'spam':
        return <Badge variant="destructive" className="bg-red-600"><AlertTriangle className="w-3 h-3 mr-1" />Spam</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Comments</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Manage user comments and moderation</p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button 
              onClick={() => fetchComments(pagination.page, searchTerm)}
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
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Comments</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{pagination.total}</p>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Approved</p>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                    {comments.filter(comment => comment.status === 'approved').length}
                  </p>
                </div>
                <div className="p-3 bg-green-500 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Pending</p>
                  <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">
                    {comments.filter(comment => comment.status === 'pending').length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-500 rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">Spam</p>
                  <p className="text-3xl font-bold text-red-900 dark:text-red-100">
                    {comments.filter(comment => comment.status === 'spam').length}
                  </p>
                </div>
                <div className="p-3 bg-red-500 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-white" />
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
                    placeholder="Search comments by content or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                  <option value="">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                  <option value="spam">Spam</option>
                </select>
                <select className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                  <option value="">All Posts</option>
                  <option value="post">Posts</option>
                  <option value="page">Pages</option>
                </select>
                <Button type="submit" size="sm" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Comments Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">All Comments</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  {pagination.total} comments found
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-slate-600 dark:text-slate-400">Loading comments...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      {comment.author.avatar ? (
                        <img 
                          src={comment.author.avatar} 
                          alt={comment.author.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-semibold text-sm">
                          {comment.author.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                          {comment.author.name}
                        </h3>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {comment.author.email}
                        </span>
                        {getStatusBadge(comment.status)}
                        {comment.isFlagged && (
                          <Badge variant="outline" className="border-red-500 text-red-600">
                            <Flag className="w-3 h-3 mr-1" />
                            Flagged
                          </Badge>
                        )}
                        {comment.isSpam && (
                          <Badge variant="destructive">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Spam
                          </Badge>
                        )}
                      </div>
                      <p className="text-slate-900 dark:text-slate-100 mb-3">
                        {comment.content}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(comment.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {comment.post.title}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {comment.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsDown className="w-3 h-3" />
                          {comment.dislikes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Reply className="w-3 h-3" />
                          {comment.replies} replies
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 dark:text-slate-500">
                        IP: {comment.ipAddress} • {comment.userAgent}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {comment.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(comment.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(comment.id)}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
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
                            View Post
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Comment
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Reply className="w-4 h-4 mr-2" />
                            Reply
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleApprove(comment.id)}
                            className="text-green-600 dark:text-green-400"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleReject(comment.id)}
                            className="text-red-600 dark:text-red-400"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleMarkSpam(comment.id)}
                            className="text-red-600 dark:text-red-400"
                          >
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Mark as Spam
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 dark:text-red-400">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Comment
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
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} comments
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
