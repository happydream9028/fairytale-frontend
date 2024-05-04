import React from "react";
import { Outlet } from "react-router-dom";

import Wrapper from "../components/Wrapper";
import Settings from "../components/Settings";
import Content from "../components/Content";

interface AppProps {
  children?: React.ReactNode;
}

const Appdetail: React.FC<AppProps> = ({ children }) => (
  <React.Fragment>
    <h3>Apps</h3>
    <Content>
      {children}
      <Outlet />
    </Content>
    <Settings />
  </React.Fragment>
);

export default Appdetail;
