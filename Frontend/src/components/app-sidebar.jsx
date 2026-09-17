"use client";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import SidebarSettings from "@/components/sidebar-settings";
import { useAuth } from "@/hooks/use-auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  GalleryVerticalEndIcon,
  HouseIcon,
} from "lucide-react";

const data = {
  teams: [
    {
      name: "TaskFlow",
      logo: <GalleryVerticalEndIcon />,
      plan: "Personal workspace",
    },
  ],
  navMain: [
    {
      title: "My tasks",
      url: "/home",
      icon: <HouseIcon />,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { user, logout } = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <SidebarSettings />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} onLogout={logout} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
