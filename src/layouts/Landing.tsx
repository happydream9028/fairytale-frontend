import React from "react";
import { Outlet } from "react-router-dom";

import Main from "../components/Main";

interface LandingProps {
  children?: React.ReactNode;
}

const Landing: React.FC<LandingProps> = ({ children }) => (
  <Main>
    {children}
    <Outlet />
  </Main>
);

export default Landing;
