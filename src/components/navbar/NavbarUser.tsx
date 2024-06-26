import React from "react";
import { Dropdown } from "react-bootstrap";
import { PieChart, Settings, User } from "react-feather";

import avatar1 from "../../assets/img/avatars/avatar.jpg";
import { IUser } from "../../types/user";

interface INavBarUserProps {
  authenticatedUser: IUser | null;
  isLoading: boolean | unknown;
  signOut: () => void;
}
const NavbarUser: React.FC<INavBarUserProps> = ({ authenticatedUser, isLoading, signOut }) => {
  return (
    <Dropdown className="nav-item" align="end">
      <span className="d-inline-block d-sm-none">
        <Dropdown.Toggle as="a" className="nav-link">
          <Settings size={18} className="align-middle" />
        </Dropdown.Toggle>
      </span>
      <span className="d-none d-sm-inline-block">
        <Dropdown.Toggle as="a" className="nav-link">
          {/* <img src={avatar1} className="avatar img-fluid rounded-circle me-1" alt="Chris Wood" /> */}
          <span className="text-dark">
            {isLoading ? <></> : authenticatedUser?.first_name + " " + authenticatedUser?.last_name}
          </span>
        </Dropdown.Toggle>
      </span>
      <Dropdown.Menu>
        <Dropdown.Item>
          <User size={18} className="align-middle me-2" />
          Profile
        </Dropdown.Item>
        <Dropdown.Item>
          <PieChart size={18} className="align-middle me-2" />
          Analytics
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Settings & Privacy</Dropdown.Item>
        <Dropdown.Item>Help</Dropdown.Item>
        <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavbarUser;
