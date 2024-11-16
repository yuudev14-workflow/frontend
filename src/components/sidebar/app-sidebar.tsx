"use client"

import * as React from "react"
import {
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import ModeToggle from "./toggle-dark-theme"

const navData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Workflow",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Playbooks",
          url: "#",
        },
        {
          title: "Scheduler",
          url: "#",
        },
        {
          title: "Connectors",
          url: "#",
        },
      ],
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <h1 className="px-2">
          Workflow
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
        <NavUser user={navData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
