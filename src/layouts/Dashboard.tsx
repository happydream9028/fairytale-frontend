import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Wrapper from "../components/Wrapper";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/Main";
import Navbar from "../components/navbar/Navbar";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Settings from "../components/Settings";

import dashboardItems from "../components/sidebar/dashboardItems";
import { getUserIdFromToken } from "../utils/jwt";
import { useGetUserByIdQuery } from "../redux/appQuery";

interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => { 
  const [userId, setUserId] = useState(getUserIdFromToken());
  const { data: authenticatedUser, isLoading, isError } = useGetUserByIdQuery(userId);
  const [isUser, setIsUser] = useState(authenticatedUser?.role?.role_name === 'user');
  
  useEffect(() => {
    setIsUser(authenticatedUser?.role?.role_name === 'user'); 
 
  }, [authenticatedUser]); 
  
  return (<React.Fragment>
    <Wrapper>
      {!isUser && <Sidebar items={dashboardItems} />}
      <Main>
        <Navbar />
        <Content>
          {children}
          <Outlet />
        </Content>
        <Footer />
      </Main>
    </Wrapper>
    {/* <Settings /> */}
  </React.Fragment>)
};

export default Dashboard;
