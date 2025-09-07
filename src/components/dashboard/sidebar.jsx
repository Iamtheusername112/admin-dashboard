"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Building2,
  ChevronDown,
  ChevronUp,
  FileText,
  HelpCircle,
  Home,
  Shield,
  Users,
  Zap,
  Bell,
  MessageSquare,
  Calendar,
  Database,
  Monitor,
  TrendingUp,
  Activity,
  PieChart,
  Globe,
  UserCheck,
  Clock,
  Star,
  Award,
  Target,
  Layers,
  Workflow,
  Server,
  Cloud,
  Lock,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  MoreHorizontal,
  ExternalLink,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info,
  XCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"

// Professional navigation data structure
const navigationData = {
  user: {
    name: "Admin User",
    email: "admin@company.com",
    avatar: "/avatars/admin.jpg",
    role: "Administrator",
    status: "Online"
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      badge: null,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
          icon: Activity,
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
          icon: BarChart3,
        },
        {
          title: "Reports",
          url: "/dashboard/reports",
          icon: FileText,
        },
      ],
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: Users,
      badge: "24",
      items: [
        {
          title: "All Users",
          url: "/dashboard/users",
          icon: Users,
        },
        {
          title: "Active Users",
          url: "/dashboard/users/active",
          icon: UserCheck,
        },
        {
          title: "Pending Approval",
          url: "/dashboard/users/pending",
          icon: Clock,
        },
        {
          title: "User Roles",
          url: "/dashboard/users/roles",
          icon: Shield,
        },
      ],
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: TrendingUp,
      badge: null,
      items: [
        {
          title: "Performance",
          url: "/dashboard/analytics/performance",
          icon: BarChart3,
        },
        {
          title: "Revenue",
          url: "/dashboard/analytics/revenue",
          icon: Target,
        },
        {
          title: "Traffic",
          url: "/dashboard/analytics/traffic",
          icon: Globe,
        },
        {
          title: "Conversions",
          url: "/dashboard/analytics/conversions",
          icon: Target,
        },
      ],
    },
    {
      title: "Content",
      url: "/dashboard/content",
      icon: FileText,
      badge: "12",
      items: [
        {
          title: "Posts",
          url: "/dashboard/content/posts",
          icon: FileText,
        },
        {
          title: "Pages",
          url: "/dashboard/content/pages",
          icon: Layers,
        },
        {
          title: "Media",
          url: "/dashboard/content/media",
          icon: Upload,
        },
        {
          title: "Comments",
          url: "/dashboard/content/comments",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "System",
      url: "/dashboard/system",
      icon: Server,
      badge: null,
      items: [
        {
          title: "Monitoring",
          url: "/dashboard/monitoring",
          icon: Monitor,
        },
        {
          title: "Database",
          url: "/dashboard/database",
          icon: Database,
        },
        {
          title: "Logs",
          url: "/dashboard/logs",
          icon: FileText,
        },
        {
          title: "Backups",
          url: "/dashboard/backups",
          icon: Cloud,
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Notifications",
      url: "/dashboard/notifications",
      icon: Bell,
      badge: "3",
    },
    {
      title: "Messages",
      url: "/dashboard/messages",
      icon: MessageSquare,
      badge: "7",
    },
    {
      title: "Calendar",
      url: "/dashboard/calendar",
      icon: Calendar,
      badge: null,
    },
  ],
  navSupport: [
    {
      title: "Help Center",
      url: "/help",
      icon: HelpCircle,
    },
    {
      title: "Documentation",
      url: "/docs",
      icon: FileText,
    },
    {
      title: "Contact Support",
      url: "/support",
      icon: Phone,
    },
  ],
}

export function AppSidebar({ ...props }) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = React.useState([])

  const toggleExpanded = (title) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  return (
    <Sidebar collapsible="icon" className="w-72 border-r border-slate-200/60 dark:border-slate-800/60" {...props}>
      {/* Logo at top of main navigation */}
      <SidebarContent className="px-2 py-6">
        <div className="flex justify-center mb-8">
          <Link href="/dashboard" className="flex flex-col items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex aspect-square size-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg">
              <Shield className="size-8" />
            </div>
            <div className="text-center">
              <span className="block text-xl font-bold text-slate-900 dark:text-slate-100">Admin Dashboard</span>
              <span className="block text-sm text-slate-500 dark:text-slate-400 font-medium">Enterprise Management</span>
            </div>
          </Link>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationData.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className="group relative h-11 px-3 text-sm font-medium transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 data-[active=true]:bg-blue-50 dark:data-[active=true]:bg-blue-900/20 data-[active=true]:text-blue-700 dark:data-[active=true]:text-blue-300 data-[active=true]:border-r-2 data-[active=true]:border-blue-600"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-data-[active=true]:bg-blue-100 dark:group-data-[active=true]:bg-blue-900/30">
                        <item.icon className="size-4 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-data-[active=true]:text-blue-600 dark:group-data-[active=true]:text-blue-400" />
                      </div>
                      <span className="flex-1 truncate">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto h-5 px-2 text-xs font-semibold">
                          {item.badge}
                        </Badge>
                      )}
                      {item.items && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-slate-200 dark:hover:bg-slate-700"
                          onClick={(e) => {
                            e.preventDefault()
                            toggleExpanded(item.title)
                          }}
                        >
                          {expandedItems.includes(item.title) ? (
                            <ChevronUp className="size-3" />
                          ) : (
                            <ChevronDown className="size-3" />
                          )}
                        </Button>
                      )}
                    </Link>
                  </SidebarMenuButton>
                  
                  {item.items && expandedItems.includes(item.title) && (
                    <SidebarMenuSub className="ml-4 mt-1 space-y-1">
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton 
                            asChild 
                            isActive={pathname === subItem.url}
                            className="h-9 px-3 text-sm transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/30 data-[active=true]:bg-blue-50 dark:data-[active=true]:bg-blue-900/10 data-[active=true]:text-blue-700 dark:data-[active=true]:text-blue-300"
                          >
                            <Link href={subItem.url} className="flex items-center gap-3">
                              <subItem.icon className="size-3.5 text-slate-400" />
                              <span className="flex-1 truncate">{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Secondary Navigation */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Communication
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationData.navSecondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className="group relative h-10 px-3 text-sm font-medium transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 data-[active=true]:bg-blue-50 dark:data-[active=true]:bg-blue-900/20 data-[active=true]:text-blue-700 dark:data-[active=true]:text-blue-300"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30">
                        <item.icon className="size-3.5 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                      </div>
                      <span className="flex-1 truncate">{item.title}</span>
                      {item.badge && (
                        <Badge variant="destructive" className="ml-auto h-5 px-2 text-xs font-semibold">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Support Navigation */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Support
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationData.navSupport.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className="group relative h-10 px-3 text-sm font-medium transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 data-[active=true]:bg-blue-50 dark:data-[active=true]:bg-blue-900/20 data-[active=true]:text-blue-700 dark:data-[active=true]:text-blue-300"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30">
                        <item.icon className="size-3.5 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                      </div>
                      <span className="flex-1 truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-slate-200/60 dark:border-slate-800/60 p-4">
        <div className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            &nbsp;
          </p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}