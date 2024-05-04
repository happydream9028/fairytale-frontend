import React, { useState } from "react";

import PerfectScrollbar from "react-perfect-scrollbar";

import useSidebar from "../../hooks/useSidebar";
import SidebarFooter from "./SidebarFooter";
import SidebarNav from "./SidebarNav";
import Logo from "../../assets/img/Fairytale_Logo.png";

import { SidebarItemsType } from "../../types/sidebar";
import { getUserIdFromToken } from "../../utils/jwt";
import { useGetUserByIdQuery } from "../../redux/appQuery";

interface SidebarProps {
  items: {
    title: string;
    pages: SidebarItemsType[];
  }[];
  open?: boolean;
  showFooter?: boolean;
}

const Sidebar = ({ items, showFooter = true }: SidebarProps) => {
  const { isOpen } = useSidebar();
  // const [userId, setUserId] = useState(getUserIdFromToken());
  // const { data: user, isLoading: authUserLoading } = useGetUserByIdQuery(userId);

  // const currentUserRole = user?.role.role_name || '';

  // const filteredNavItems = items.map(section => ({
  //   ...section,
  //   pages: section.pages.filter(page => page?.allowedRoles?.includes(currentUserRole)),
  // })).filter(section => section.pages.length > 0)

  // showFooter = currentUserRole !== 'user';

  return (
    <nav className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      <div className="sidebar-content">
        <PerfectScrollbar>
          <a className="sidebar-brand" href="/">
            <img
              src={Logo}
              alt="Chris Wood"
              className="img-fluid rounded-circle"
              style={{ objectFit: "contain" }}
              width="50"
              height="50"
            />{" "}
            <span className="align-middle me-3"></span>
          </a>
          <SidebarNav items={items} />
          {/* {!!showFooter && <SidebarFooter />} */}
        </PerfectScrollbar>
      </div>
    </nav>
  );
};

export default Sidebar;
