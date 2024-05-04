import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Navbar, Nav, Form, InputGroup } from "react-bootstrap";

import { AlertCircle, Bell, BellOff, Home, MessageCircle, UserPlus, Search } from "react-feather";

import useSidebar from "../../hooks/useSidebar";

import NavbarDropdown from "./NavbarDropdown";
import NavbarDropdownItem from "./NavbarDropdownItem";
import NavbarLanguages from "./NavbarLanguages";
import NavbarUser from "./NavbarUser";

import avatar1 from "../../assets/img/avatars/avatar.jpg";
import avatar3 from "../../assets/img/avatars/avatar-3.jpg";
import avatar4 from "../../assets/img/avatars/avatar-4.jpg";
import avatar5 from "../../assets/img/avatars/avatar-5.jpg";
import useAuth from "../../hooks/useAuth";
import { useGetUserByIdQuery } from "../../redux/appQuery";
import { getUserIdFromToken } from "../../utils/jwt";

const notifications = [
  {
    type: "important",
    title: "Update completed",
    description: "Restart server 12 to complete the update.",
    time: "2h ago",
  },
  {
    type: "default",
    title: "Lorem ipsum",
    description: "Aliquam ex eros, imperdiet vulputate hendrerit et.",
    time: "6h ago",
  },
  {
    type: "login",
    title: "Login from 192.186.1.1",
    description: "",
    time: "6h ago",
  },
  {
    type: "request",
    title: "New connection",
    description: "Anna accepted your request.",
    time: "12h ago",
  },
];

const messages = [
  {
    name: "Ashley Briggs",
    avatar: avatar5,
    description: "Nam pretium turpis et arcu. Duis arcu tortor.",
    time: "15m ago",
  },
  {
    name: "Chris Wood",
    avatar: avatar1,
    description: "Curabitur ligula sapien euismod vitae.",
    time: "2h ago",
  },
  {
    name: "Stacie Hall",
    avatar: avatar4,
    description: "Pellentesque auctor neque nec urna.",
    time: "4h ago",
  },
  {
    name: "Bertha Martin",
    avatar: avatar3,
    description: "Aenean tellus metus, bibendum sed, posuere ac, mattis non.",
    time: "5h ago",
  },
];

const getIconByType = (type: string) => {
  switch (type) {
    case "important":
      return <AlertCircle size={18} className="text-danger" />;
    case "login":
      return <Home size={18} className="text-primary" />;
    case "request":
      return <UserPlus size={18} className="text-success" />;
    default:
      return <Bell size={18} className="text-warning" />;
  }
};

const NavbarComponent = () => {
  const { t } = useTranslation();
  const { isOpen, setIsOpen } = useSidebar();
  const { isAuthenticated, signOut } = useAuth();
  const [userId, setUserId] = useState<number>(getUserIdFromToken());
  const { data: authenticatedUser, isLoading, isError } = useGetUserByIdQuery(userId);
  const [isUser, setIsUser] = useState(authenticatedUser?.role?.role_name === 'user');
 
   useEffect(() => {
    setIsUser(authenticatedUser?.role?.role_name === 'user');
  }, [authenticatedUser]); 
 
  return (
    <Navbar variant="light" expand className="navbar-bg">
      {!isUser && <span
        className="sidebar-toggle d-flex"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <i className="hamburger align-self-center" />
      </span>}
 
      <Navbar.Collapse>
        <Nav className="navbar-align">
      
          <NavbarLanguages />
          <NavbarUser
            authenticatedUser={isLoading ? null : authenticatedUser}
            isLoading={isLoading}
            signOut={signOut}
          />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
