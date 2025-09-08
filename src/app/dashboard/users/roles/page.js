"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Shield, 
  Search, 
  Filter, 
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  Settings,
  Activity,
  ChevronDown,
  Download,
  RefreshCw,
  Eye,
  Key
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

export default function UserRolesPage() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRoles = async () => {
    try {
      setLoading(true);
      // Mock roles data
      const mockData = [
        {
          id: '1',
          name: 'Administrator',
          description: 'Full system access with all permissions',
          permissions: ['users:read', 'users:write', 'users:delete', 'analytics:read', 'content:read', 'content:write', 'content:delete', 'system:read', 'system:write'],
          userCount: 3,
          color: 'red',
          createdAt: '2024-01-01',
          isSystem: true
        },
        {
          id: '2',
          name: 'Manager',
          description: 'Management access with limited administrative permissions',
          permissions: ['users:read', 'users:write', 'analytics:read', 'content:read', 'content:write'],
          userCount: 12,
          color: 'blue',
          createdAt: '2024-01-15',
          isSystem: false
        },
        {
          id: '3',
          name: 'Editor',
          description: 'Content management and editing permissions',
          permissions: ['content:read', 'content:write', 'analytics:read'],
          userCount: 25,
          color: 'green',
          createdAt: '2024-02-01',
          isSystem: false
        },
        {
          id: '4',
          name: 'Viewer',
          description: 'Read-only access to most features',
          permissions: ['analytics:read', 'content:read'],
          userCount: 45,
          color: 'gray',
          createdAt: '2024-02-15',
          isSystem: false
        },
        {
          id: '5',
          name: 'Guest',
          description: 'Limited access for external users',
          permissions: ['content:read'],
          userCount: 8,
          color: 'yellow',
          createdAt: '2024-03-01',
          isSystem: false
        }
      ];
      
      setRoles(mockData);
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // In real app, implement search functionality
  };

  const getRoleColor = (color) => {
    const colors = {
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      gray: 'bg-gray-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500'
    };
    return colors[color] || 'bg-gray-500';
  };

  const getPermissionCategory = (permission) => {
    if (permission.startsWith('users:')) return 'Users';
    if (permission.startsWith('analytics:')) return 'Analytics';
    if (permission.startsWith('content:')) return 'Content';
    if (permission.startsWith('system:')) return 'System';
    return 'Other';
  };

  const groupedPermissions = (permissions) => {
    const grouped = {};
    permissions.forEach(permission => {
      const category = getPermissionCategory(permission);
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(permission);
    });
    return grouped;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">User Roles</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Manage user roles and permissions</p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button 
              onClick={fetchRoles}
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
              Create Role
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Roles</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{roles.length}</p>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">System Roles</p>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                    {roles.filter(role => role.isSystem).length}
                  </p>
                </div>
                <div className="p-3 bg-green-500 rounded-xl">
                  <Settings className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Custom Roles</p>
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                    {roles.filter(role => !role.isSystem).length}
                  </p>
                </div>
                <div className="p-3 bg-purple-500 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Total Users</p>
                  <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                    {roles.reduce((sum, role) => sum + role.userCount, 0)}
                  </p>
                </div>
                <div className="p-3 bg-orange-500 rounded-xl">
                  <Activity className="w-6 h-6 text-white" />
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
                    placeholder="Search roles by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                  <option value="">All Types</option>
                  <option value="system">System Roles</option>
                  <option value="custom">Custom Roles</option>
                </select>
                <Button type="submit" size="sm" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {roles.map((role) => {
            const groupedPermissions = role.permissions.reduce((acc, permission) => {
              const category = getPermissionCategory(permission);
              if (!acc[category]) acc[category] = [];
              acc[category].push(permission);
              return acc;
            }, {});

            return (
              <Card key={role.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${getRoleColor(role.color)} rounded-lg flex items-center justify-center`}>
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          {role.name}
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">
                          {role.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {role.isSystem && (
                        <Badge variant="default" className="bg-green-600">
                          System
                        </Badge>
                      )}
                      <Badge variant="secondary">
                        {role.userCount} users
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                        Permissions ({role.permissions.length})
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(groupedPermissions).map(([category, permissions]) => (
                          <div key={category}>
                            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                              {category}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {permissions.map((permission, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {permission.split(':')[1]}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Created: {new Date(role.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        {!role.isSystem && (
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Create Role Button */}
        <div className="mt-8 text-center">
          <Button size="lg" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-5 h-5" />
            Create New Role
          </Button>
        </div>
      </div>
    </div>
  )
}
