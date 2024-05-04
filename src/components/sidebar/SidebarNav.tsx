import React from "react";

import SidebarNavSection from "./SidebarNavSection";
import { SidebarItemsType } from "../../types/sidebar";

interface SidebarNavProps {
  items: {
    title: string;
    pages: SidebarItemsType[];
  }[];
}

const SidebarNav = ({ items }: SidebarNavProps) => {
  return (
    <ul className="sidebar-nav">
      {items && items.map((item, index) => <SidebarNavSection key={index} pages={item.pages} title={item.title} />)}
    </ul>
  );
};

export default SidebarNav;
