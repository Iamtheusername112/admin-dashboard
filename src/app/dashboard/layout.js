import { AppSidebar } from "@/components/dashboard/sidebar"
import { AppHeader } from "@/components/dashboard/header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar className="sidebar" />
      <SidebarInset className="sidebar-inset">
        <AppHeader />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
