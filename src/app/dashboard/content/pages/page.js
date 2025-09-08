"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Layers, 
  Search, 
  Filter, 
  Plus,
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
  Globe,
  Home
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

export default function PagesPage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });

  const fetchPages = async (page = 1, search = '') => {
    try {
      setLoading(true);
      // Mock pages data
      const mockData = {
        pages: [
          {
            id: '1',
            title: 'Home',
            slug: '/',
            excerpt: 'Welcome to our platform - your gateway to success',
            content: 'Full content here...',
            status: 'published',
            author: { name: 'John Smith', email: 'john@example.com' },
            publishedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['homepage', 'landing', 'main'],
            views: 15420,
            isHomepage: true,
            seoTitle: 'Home - Our Platform',
            seoDescription: 'Welcome to our platform'
          },
          {
            id: '2',
            title: 'About Us',
            slug: '/about',
            excerpt: 'Learn more about our company and mission',
            content: 'Full content here...',
            status: 'published',
            author: { name: 'Sarah Johnson', email: 'sarah@example.com' },
            publishedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['about', 'company', 'mission'],
            views: 8900,
            isHomepage: false,
            seoTitle: 'About Us - Our Platform',
            seoDescription: 'Learn about our company and mission'
          },
          {
            id: '3',
            title: 'Contact',
            slug: '/contact',
            excerpt: 'Get in touch with our team',
            content: 'Full content here...',
            status: 'published',
            author: { name: 'Mike Wilson', email: 'mike@example.com' },
            publishedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['contact', 'support', 'help'],
            views: 5600,
            isHomepage: false,
            seoTitle: 'Contact Us - Our Platform',
            seoDescription: 'Get in touch with our team'
          },
          {
            id: '4',
            title: 'Privacy Policy',
            slug: '/privacy',
            excerpt: 'Our privacy policy and data protection information',
            content: 'Full content here...',
            status: 'published',
            author: { name: 'Emily Davis', email: 'emily@example.com' },
            publishedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['privacy', 'legal', 'policy'],
            views: 3200,
            isHomepage: false,
            seoTitle: 'Privacy Policy - Our Platform',
            seoDescription: 'Our privacy policy and data protection information'
          },
          {
            id: '5',
            title: 'Terms of Service',
            slug: '/terms',
            excerpt: 'Terms and conditions for using our platform',
            content: 'Full content here...',
            status: 'draft',
            author: { name: 'David Brown', email: 'david@example.com' },
            publishedAt: null,
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['terms', 'legal', 'conditions'],
            views: 0,
            isHomepage: false,
            seoTitle: 'Terms of Service - Our Platform',
            seoDescription: 'Terms and conditions for using our platform'
          }
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 5,
          pages: 1
        }
      };
      
      setPages(mockData.pages);
      setPagination(mockData.pagination);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPages(1, searchTerm);
  };

  const handlePageChange = (newPage) => {
    fetchPages(newPage, searchTerm);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <Badge variant="default" className="bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />Published</Badge>;
      case 'draft':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Draft</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'archived':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Pages</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your website pages and content</p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button 
              onClick={() => fetchPages(pagination.page, searchTerm)}
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
              New Page
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Pages</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{pagination.total}</p>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Layers className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Published</p>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                    {pages.filter(page => page.status === 'published').length}
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
                  <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Drafts</p>
                  <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">
                    {pages.filter(page => page.status === 'draft').length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-500 rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Views</p>
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                    {pages.reduce((sum, page) => sum + page.views, 0).toLocaleString('en-US')}
                  </p>
                </div>
                <div className="p-3 bg-purple-500 rounded-xl">
                  <Eye className="w-6 h-6 text-white" />
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
                    placeholder="Search pages by title or content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                  <option value="">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="pending">Pending</option>
                  <option value="archived">Archived</option>
                </select>
                <select className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                  <option value="">All Authors</option>
                  <option value="john">John Smith</option>
                  <option value="sarah">Sarah Johnson</option>
                  <option value="mike">Mike Wilson</option>
                </select>
                <Button type="submit" size="sm" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Pages Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">All Pages</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  {pagination.total} pages found
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-slate-600 dark:text-slate-400">Loading pages...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {pages.map((page) => (
                  <div key={page.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                        {page.isHomepage ? (
                          <Home className="w-6 h-6 text-white" />
                        ) : (
                          <Layers className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                            {page.title}
                          </h3>
                          {page.isHomepage && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                              <Home className="w-3 h-3 mr-1" />
                              Homepage
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                          {page.excerpt}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {getStatusBadge(page.status)}
                          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              {page.slug}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {page.author.name}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(page.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {page.views} views
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          {page.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Tag className="w-2 h-2 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right text-sm">
                        <p className="text-slate-500 dark:text-slate-400">
                          Updated: {new Date(page.updatedAt).toLocaleDateString()}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400">
                          SEO: {page.seoTitle}
                        </p>
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
                            View Page
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Page
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Layers className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          {!page.isHomepage && (
                            <DropdownMenuItem>
                              <Home className="w-4 h-4 mr-2" />
                              Set as Homepage
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 dark:text-red-400">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Page
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
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} pages
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
