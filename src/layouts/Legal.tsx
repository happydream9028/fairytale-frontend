import React from "react";
import { Outlet } from "react-router-dom";

import Main from "../components/Main";
import NavbarSimple from "../components/navbar/NavbarSimple";
import Content from "../components/Content";

interface LegalProps {
  children?: React.ReactNode;
}

const Legal: React.FC<LegalProps> = ({ children }) => (
  <React.Fragment>
    <Main>
      <NavbarSimple />
      <Content>
        {children}
        <Outlet />
      </Content>
    </Main>
  </React.Fragment>
);

export default Legal;
