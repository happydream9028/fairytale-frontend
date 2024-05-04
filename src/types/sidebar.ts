export type SidebarItemsType = {
  href: string;
  title: string;
  icon: React.FC<any>;
  allowedRoles?: string[],
  children: SidebarItemsType[];
  badge?: string;
};
