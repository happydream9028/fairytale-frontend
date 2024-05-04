import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";

import Header from "./Header"; 
import { getUserIdFromToken } from "../../../utils/jwt";
import { useGetAppCampaignsQuery, useGetUserByIdQuery } from "../../../redux/appQuery";
import FairytaleMessages from "../../fairytale-messaging";
import CreateMessage from "../../fairytale-messaging/CreateMessage";
import FairytaleAdsPage from "../../fairytale-ads";
import { IApp } from "../../../types/app";

const Default = () => { 
  const [userId, setUserId] = useState<number>(getUserIdFromToken());
  const { data: authenticatedUser, isLoading, isError } = useGetUserByIdQuery(userId);
  const [isUser, setIsUser] = useState(authenticatedUser?.role?.role_name === 'user');
  const [app, setApp] = useState<IApp>(authenticatedUser?.user_group?.app);
 
   useEffect(() => {
    setIsUser(authenticatedUser?.role?.role_name === 'user');
    setApp(authenticatedUser?.user_group?.app) 
  }, [authenticatedUser]); 
  
  const appId = app?.app_id;

  const { data: campaigns, isLoading: isLoadingCanp, error } = useGetAppCampaignsQuery(appId, {
    skip: !isUser || !appId
  });

  return (
    <>
      <Helmet title='Dashboard'  />
      <Container fluid className="p-0">
        <Header title={isUser ? app?.app_title || '' : 'Dashboard'} />
        {isUser && app && (
            <>
              <FairytaleMessages isUser={isUser} app={app} />
              <CreateMessage isUser={isUser} app={app} />
              <FairytaleAdsPage isUser={isUser} app={app} campaigns={campaigns ? campaigns : []} />
            </>
        )}
      </Container>
    </>
  );
};


export default Default;
