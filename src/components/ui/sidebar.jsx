import * as React from "react"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const sidebarVariants = cva(
  "group/sidebar-wrapper flex h-full w-full has-[[data-variant=inset]]:bg-sidebar",
  {
    variants: {
      variant: {
        sidebar: "has-[[data-variant=sidebar]]:bg-sidebar",
        header: "has-[[data-variant=header]]:bg-sidebar",
        inset: "has-[[data-variant=inset]]:bg-sidebar",
      },
    },
    defaultVariants: {
      variant: "sidebar",
    },
  }
)

const Sidebar = React.forwardRef(({ className, variant, ...props }, ref) => (
  <aside
    ref={ref}
    data-variant={variant}
    className={cn(sidebarVariants({ variant }), className)}
    {...props}
  />
))
Sidebar.displayName = "Sidebar"

const SidebarInset = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex-1 flex flex-col gap-2 p-4 pt-0 group-data-[collapsible=icon]:gap-2",
      className
    )}
    {...props}
  />
))
SidebarInset.displayName = "SidebarInset"

const SidebarProvider = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("group/sidebar-wrapper flex h-full w-full", className)}
    {...props}
  />
))
SidebarProvider.displayName = "SidebarProvider"

const SidebarTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9",
      className
    )}
    {...props}
  />
))
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarRail = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-1 rounded-full bg-sidebar-border mx-1 group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarRail.displayName = "SidebarRail"

const SidebarSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn("mx-2 w-full bg-sidebar-border", className)}
    {...props}
  />
))
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 p-2", className)}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
    {...props}
  />
))
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
      className
    )}
    {...props}
  />
))
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupAction = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
      className
    )}
    {...props}
  />
))
SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarGroupContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full text-sm", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("group/menu-item relative", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuAction = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? "span" : "button"
  return (
    <Comp
      ref={ref}
      className={cn(
        "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarMenuBadge = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute right-2 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
      className
    )}
    {...props}
  />
))
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarMenuButton = React.forwardRef(({ 
  asChild = false, 
  isActive = false, 
  tooltip, 
  className, 
  ...props 
}, ref) => {
  const Comp = asChild ? "span" : "button"
  return (
    <SidebarMenuAction
      ref={ref}
      asChild={asChild}
      data-active={isActive}
      className={cn(
        "peer/menu-button",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuSkeleton = React.forwardRef(({ className, showIcon = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-9 w-full items-center gap-2 px-2 py-2", className)}
    {...props}
  >
    {showIcon && (
      <Skeleton className="size-4 rounded-md" />
    )}
    <Skeleton className="h-4 flex-1" />
  </div>
))
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

const SidebarMenuSub = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("w-full min-w-0 flex flex-col gap-1", className)}
    {...props}
  />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("group/menu-sub-item", className)}
    {...props}
  />
))
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSubButton = React.forwardRef(({ 
  asChild = false, 
  isActive = false, 
  size = "md", 
  className, 
  ...props 
}, ref) => {
  const Comp = asChild ? "span" : "button"
  return (
    <SidebarMenuAction
      ref={ref}
      asChild={asChild}
      data-active={isActive}
      data-size={size}
      className={cn(
        "group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2",
        size === "sm" && "h-7 text-xs",
        size === "md" && "h-8 text-sm",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

const SidebarMenuSubBadge = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute right-2 flex h-4 min-w-4 items-center justify-center rounded px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
      className
    )}
    {...props}
  />
))
SidebarMenuSubBadge.displayName = "SidebarMenuSubBadge"

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 p-2", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 p-2", className)}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarLeading = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
))
SidebarLeading.displayName = "SidebarLeading"

const SidebarTrailing = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
))
SidebarTrailing.displayName = "SidebarTrailing"

const Skeleton = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("animate-pulse rounded-md bg-sidebar-primary/10", className)}
    {...props}
  />
))
Skeleton.displayName = "Skeleton"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarLeading,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubBadge,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrailing,
  SidebarTrigger,
}
