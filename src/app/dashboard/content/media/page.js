"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Upload, 
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
  Image,
  File,
  Video,
  Music,
  Archive,
  Copy,
  Share
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

export default function MediaPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, pages: 0 });

  const fetchMedia = async (page = 1, search = '') => {
    try {
      setLoading(true);
      // Mock media data
      const mockData = {
        media: [
          {
            id: '1',
            name: 'hero-image.jpg',
            type: 'image',
            mimeType: 'image/jpeg',
            size: 2048576, // 2MB
            url: '/api/placeholder/400/300',
            thumbnail: '/api/placeholder/200/150',
            alt: 'Hero image for homepage',
            caption: 'Beautiful landscape for our homepage hero section',
            author: { name: 'John Smith', email: 'john@example.com' },
            uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['hero', 'landscape', 'homepage'],
            dimensions: { width: 1920, height: 1080 },
            usage: 3
          },
          {
            id: '2',
            name: 'product-demo.mp4',
            type: 'video',
            mimeType: 'video/mp4',
            size: 15728640, // 15MB
            url: '/api/placeholder/400/300',
            thumbnail: '/api/placeholder/200/150',
            alt: 'Product demonstration video',
            caption: 'How to use our platform - step by step guide',
            author: { name: 'Sarah Johnson', email: 'sarah@example.com' },
            uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['demo', 'video', 'tutorial'],
            dimensions: { width: 1280, height: 720 },
            duration: 120, // seconds
            usage: 1
          },
          {
            id: '3',
            name: 'company-logo.png',
            type: 'image',
            mimeType: 'image/png',
            size: 512000, // 512KB
            url: '/api/placeholder/400/300',
            thumbnail: '/api/placeholder/200/150',
            alt: 'Company logo',
            caption: 'Our official company logo',
            author: { name: 'Mike Wilson', email: 'mike@example.com' },
            uploadedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['logo', 'branding', 'company'],
            dimensions: { width: 500, height: 500 },
            usage: 15
          },
          {
            id: '4',
            name: 'presentation.pdf',
            type: 'document',
            mimeType: 'application/pdf',
            size: 5242880, // 5MB
            url: '/api/placeholder/400/300',
            thumbnail: '/api/placeholder/200/150',
            alt: 'Company presentation',
            caption: 'Q4 2024 company presentation',
            author: { name: 'Emily Davis', email: 'emily@example.com' },
            uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['presentation', 'pdf', 'company'],
            pages: 25,
            usage: 2
          },
          {
            id: '5',
            name: 'background-music.mp3',
            type: 'audio',
            mimeType: 'audio/mpeg',
            size: 3145728, // 3MB
            url: '/api/placeholder/400/300',
            thumbnail: '/api/placeholder/200/150',
            alt: 'Background music',
            caption: 'Upbeat background music for videos',
            author: { name: 'David Brown', email: 'david@example.com' },
            uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['music', 'audio', 'background'],
            duration: 180, // seconds
            usage: 0
          },
          {
            id: '6',
            name: 'user-avatar-placeholder.jpg',
            type: 'image',
            mimeType: 'image/jpeg',
            size: 256000, // 256KB
            url: '/api/placeholder/400/300',
            thumbnail: '/api/placeholder/200/150',
            alt: 'Default user avatar',
            caption: 'Default avatar for users without profile pictures',
            author: { name: 'John Smith', email: 'john@example.com' },
            uploadedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ['avatar', 'user', 'default'],
            dimensions: { width: 200, height: 200 },
            usage: 8
          }
        ],
        pagination: {
          page: 1,
          limit: 12,
          total: 6,
          pages: 1
        }
      };
      
      setMedia(mockData.media);
      setPagination(mockData.pagination);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMedia(1, searchTerm);
  };

  const handlePageChange = (newPage) => {
    fetchMedia(newPage, searchTerm);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'image':
        return <Image className="w-6 h-6" />;
      case 'video':
        return <Video className="w-6 h-6" />;
      case 'audio':
        return <Music className="w-6 h-6" />;
      case 'document':
        return <File className="w-6 h-6" />;
      default:
        return <Archive className="w-6 h-6" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Media Library</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your media files and assets</p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button 
              onClick={() => fetchMedia(pagination.page, searchTerm)}
              disabled={loading}
              size="sm" 
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button size="sm" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <Upload className="w-4 h-4" />
              Upload Media
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Files</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{pagination.total}</p>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Upload className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Images</p>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                    {media.filter(item => item.type === 'image').length}
                  </p>
                </div>
                <div className="p-3 bg-green-500 rounded-xl">
                  <Image className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Videos</p>
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                    {media.filter(item => item.type === 'video').length}
                  </p>
                </div>
                <div className="p-3 bg-purple-500 rounded-xl">
                  <Video className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Total Size</p>
                  <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                    {formatFileSize(media.reduce((sum, item) => sum + item.size, 0))}
                  </p>
                </div>
                <div className="p-3 bg-orange-500 rounded-xl">
                  <Archive className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and View Toggle */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search media files by name or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </form>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                  <option value="">All Types</option>
                  <option value="image">Images</option>
                  <option value="video">Videos</option>
                  <option value="audio">Audio</option>
                  <option value="document">Documents</option>
                </select>
                <div className="flex border border-slate-300 dark:border-slate-600 rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    List
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media Grid/List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Media Library</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  {pagination.total} files found
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-slate-600 dark:text-slate-400">Loading media...</p>
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {media.map((item) => (
                  <div key={item.id} className="group relative bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                      <img
                        src={item.thumbnail}
                        alt={item.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {getFileIcon(item.type)}
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {formatFileSize(item.size)}
                      </p>
                      {item.dimensions && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                          {item.dimensions.width} × {item.dimensions.height}
                        </p>
                      )}
                      {item.duration && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                          Duration: {formatDuration(item.duration)}
                        </p>
                      )}
                      <div className="flex items-center gap-1 mb-2">
                        {item.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Used {item.usage} times
                        </span>
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
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy URL
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download
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
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {media.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                        <img
                          src={item.thumbnail}
                          alt={item.alt}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                          {item.caption}
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            {getFileIcon(item.type)}
                            {item.type}
                          </span>
                          <span>{formatFileSize(item.size)}</span>
                          {item.dimensions && (
                            <span>{item.dimensions.width} × {item.dimensions.height}</span>
                          )}
                          <span>Used {item.usage} times</span>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          {item.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {new Date(item.uploadedAt).toLocaleDateString()}
                      </span>
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
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy URL
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download
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
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} files
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
