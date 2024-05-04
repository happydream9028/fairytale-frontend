import { SidebarItemsType } from "../../types/sidebar";

import { Home, MessageSquare, Film, Smartphone, Users } from "react-feather";

const dashboardSection = [
  {
    href: "/private/dashboard/default",
    icon: Home,
    title: "Dashboard",
    allowedRoles: ["admin", "superuser"],
    children: [
      {
        href: "/private/dashboard/home",
        title: "Home",
      },
      {
        href: "/private/dashboard/test",
        title: "Tests",
      },
    ],
  },
] as SidebarItemsType[];
const usersSection = [
  {
    href: "/private/dashboard/default",
    icon: Users,
    title: "Users",
    allowedRoles: ["admin", "superuser"],
    children: [
      {
        href: "/private/users/list",
        title: "Users List",
      },
      {
        href: "/private/users/new",
        title: "New user",
      },
    ],
  },
] as SidebarItemsType[];

const usersGroupSection = [
  {
    href: "/private/dashboard/default",
    icon: Users,
    title: "User-groups",
    allowedRoles: ["admin", "superuser"],
    children: [
      {
        href: "/private/users-groups/list",
        title: "User groups List",
      }, 
    ],
  },
] as SidebarItemsType[];

const appsSection = [
  {
    href: "/dashboard/default",
    icon: Smartphone,
    title: "Apps",
    allowedRoles: ["admin", "superuser"],
    children: [
      {
        href: "/private/apps/list/all",
        title: "Apps List",
      },
      {
        href: "/private/apps/new",
        title: "Create an app",
      },
    ],
  },
] as SidebarItemsType[];
const messagingSection = [
  {
    href: "/private/messaging",
    icon: MessageSquare,
    title: "Messaging",
    allowedRoles: ["admin", "superuser"],
    children: [
      {
        href: "/private/messaging/view",
        title: "View scheduled and sent messages",
      },
      {
        href: "/private/messaging/send",
        title: "Send an instant message",
      },
    ],
  },
] as SidebarItemsType[];
const mediaSection = [
  {
    href: "/private/media",
    icon: Film,
    title: "Media and files",
    allowedRoles: ["admin", "superuser"],
    children: [
      {
        href: "/private/media/view",
        title: "All media",
      },
      {
        href: "/private/media/upload",
        title: "Upload",
      },
    ],
  },
] as SidebarItemsType[];

const navItems = [
  {
    title: "",
    pages: dashboardSection,
  },
  {
    title: "",
    pages: usersSection,
  },
  {
    title: "",
    pages: usersGroupSection,
  },
  {
    title: "",
    pages: appsSection,
  },
  {
    title: "",
    pages: messagingSection,
  },
  {
    title: "",
    pages: mediaSection,
  },
];

export default navItems;
