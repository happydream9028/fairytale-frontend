import React, { useEffect, useState } from "react";

import { Col, Row, Spinner } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AppDataEditForm from "./AppDataEditForm";
import FairytaleFeedPage from "../fairytale-feeds";
import CreateNewFeed from "../fairytale-feeds/CreateNewFeed";
import AppSettingsPage from "../fairytale-apps-settings";
import AppWeatherPage from "../fairytale-apps-weather";

import useFairyTaleClubFeedsCrudHooks from "../../hooks/useFairyTaleClubFeedsCrudHooks";

import { useTranslation } from "react-i18next";
import Loader from "../../components/Loader";
import FairytaleAdsPage from "../fairytale-ads";
import useFairyTaleClubAdsCrudHooks from "../../hooks/useFairyTaleClubAppAdsCrudHooks";
import FairyTaleAlert from "../../components/fairytale-alert";
import { IIntegrationType } from "../../types/feed";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useGetAppByIdQuery } from "../../redux/appQuery";
import PartnerGroupPage from "../fairytale-apps-partner-group";
import PartnerGroupDetailsView from "../fairytale-apps-partner-group/PartnerGroupDetailsView";


const AppDetailComponent: React.FC = () => {
  const { appID } = useParams();
  const [appId] = useState<number>(Number(appID));
  const { data: app } = useGetAppByIdQuery(appId);
  const { t: tcommon } = useTranslation(["common"]);
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const { feeds, integrations, integrationTypes } = useFairyTaleClubFeedsCrudHooks(appId);
  const { campaigns } = useFairyTaleClubAdsCrudHooks(appId);
  const [showSpinner] = useState<boolean>(false);
  const [integrationTypesSelectValues, setIntegrationTypesSelectValues] = useState<object>({
    integration_type: [{ label: "", value: "" }],
  }); 
  const location = useLocation();

  const createSelectValuesFromintegrationTypes = (integration_types: IIntegrationType[]) => {
    const selectValues: { value: any; label: any }[] = integration_types.map((integrationType) => {
      return { value: integrationType.id, label: integrationType.type_name };
    });
    selectValues.push({ value: 0, label: tcommon("select") });
    selectValues.sort((a, b) => a.value - b.value);
    return selectValues;
  };

  useEffect(() => {
    // @ts-ignore
    const { integration_type } = integrationTypesSelectValues;
    if (integrationTypes !== undefined && integration_type[0].label === "") {
      const refactoredIntegrationTypes = createSelectValuesFromintegrationTypes(integrationTypes);
      setIntegrationTypesSelectValues({ integration_type: refactoredIntegrationTypes });
    }
  }, [feeds, integrations, integrationTypes, integrationTypesSelectValues]);

  if (!app) {
    return <Spinner animation="grow" />;
  }
  return (
    <React.Fragment>
      <Col>
        <FairyTaleAlert show={showSpinner} variant="light">
          <Loader />
        </FairyTaleAlert>
      </Col>
      <Col>
        <Tabs defaultActiveKey="basicInfo" id="justify-tab-example" className="mb-3" data-cy="app-detail-tab-menu">
          <Tab eventKey="basicInfo" title={tpagetexts("basicInfo")} data-cy="app-detail-tab-menu-item-basicInfo">
            <AppDataEditForm formData={app} />
          </Tab>
          <Tab
            eventKey="feeds"
            title={tpagetexts("feedsNnotifications")}
            data-cy="app-detail-tab-menu-item-feeds"
            id="app-detail-tab-menu-item-feeds"
          >
            <Row>
              <FairytaleFeedPage app={app} feeds={!feeds ? [] : feeds} />
            </Row>
            <Row>
              <CreateNewFeed app={app} selectValues={integrationTypesSelectValues} />
            </Row>
          </Tab>
          <Tab eventKey="ads" title={tpagetexts("tabTitle")} data-cy="app-detail-tab-menu-item-components">
            <FairytaleAdsPage app={app} campaigns={campaigns ? campaigns : []} />
          </Tab>
          <Tab eventKey="weathers" title={tpagetexts("weathers")} data-cy="app-detail-tab-menu-item-weathers">
            <AppWeatherPage app={app} />
          </Tab>
          <Tab eventKey="components" title={tpagetexts("component")} data-cy="app-detail-tab-menu-item-components">
            <AppSettingsPage app={app} />
          </Tab>
          <Tab eventKey="partner_groups" title={tpagetexts("partnerGroup")} 
              data-cy="app-detail-tab-menu-item-partner-groups"> 
            { 
            <PartnerGroupPage app={app} />
            } 
          </Tab>
        </Tabs>
      </Col>
    </React.Fragment>
  );
};

export default AppDetailComponent;
