import React, { MouseEventHandler, useState } from "react";

import { Card, Col, Container, Row } from "react-bootstrap";
import { ArrowLeftCircle } from "react-feather";
import FairyTaleTable from "../../components/fairytale-table";
import FairyTaleAlert from "../../components/fairytale-alert";
import FairytaleFormComponent from "../../components/fairytale-form";

import { Column } from "react-table";
import { AdCreate, Campaign } from "../../types/ads";
import useFairyTaleClubAdsCrudHooks from "../../hooks/useFairyTaleClubAppAdsCrudHooks";
import { AD_FORM_INITIAL_VALUES, CREATE_ADS_FORM_ATTRIB_DATA } from "./constants";
import fairytaleYup from "../../yup";
import { useTranslation } from "react-i18next";
import { useGetAppCampaignAdsQuery } from "../../redux/appQuery";

interface ICampaignDetail {
  onClickBack: MouseEventHandler<SVGElement>;
  campaign: Campaign;
}

interface IDetailsDisplayCard {
  mainTitle: string;
  subTitle?: string;
  bodyText?: string;
  icon?: React.JSX.Element;
  bgColor?: string;
}

export interface IMonthlyStatObject {
  clicksPerMonth: number[];
  viewsPermonth: number[];
}

const DetailsDisplayCard: React.FC<IDetailsDisplayCard> = ({ mainTitle, subTitle, bodyText, bgColor }) => {
  return (
    <Col>
      <Card style={{ backgroundColor: `${bgColor}` }} className="ads-display-card">
        <Card.Header as="h6">{mainTitle}</Card.Header>
        <Card.Body>
          <Card.Title as="p">{subTitle}</Card.Title>
          <Card.Text>{bodyText}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

const CampaignDetail: React.FC<ICampaignDetail> = ({ onClickBack, campaign }) => {
  const { t: tforms } = useTranslation(["formFields"]);
  const { t: tcommon } = useTranslation(["common"]);
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const { is_active, title, description, ad_duration } = campaign;
  const { createAppCampaignAd } = useFairyTaleClubAdsCrudHooks(campaign.app_id);
  const { data: campaignAds, isLoading: campaignAdsLoading } = useGetAppCampaignAdsQuery(campaign.id);
  const [stats, setStats] = useState<any[]>([]);
  const [alertVariant, setAlertVariant] = useState<"light" | "success" | "danger">("light");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const AD_SCHEMA = fairytaleYup.object().shape({
    link: fairytaleYup.string().required(tforms("fieldIsRequired")),
  });

  const AD_TABLE_COLUMNS: Column<Record<string, unknown>>[] = React.useMemo(
    () => [
      {
        Header: "adLinkLabel",
        id: "link",
        Cell: ({ row }: { row: any }) => {
          let { link } = row.original;
          return link;
        },
      },
      {
        Header: "Last upadte",
        id: "updatedAt",
        Cell: ({ row }: { row: any }) => {
          let { updatedAt } = row.original;
          return new Date(updatedAt).toLocaleDateString();
        },
      },
    ],
    []
  );
  const _handleSubmit = async (values: AdCreate, { setStatus, setErrors, setSubmitting, resetForm }: any) => {
    values.campaign = campaign.id;
    console.log("Submit Ads create form", values);
    const result = (await createAppCampaignAd(values)) as { data: any };
    console.log("Submit Ads create form result ", result);
    if (result.data) {
      setAlertVariant("success");
      setAlertMessage(tforms("feedCreateSuccess"));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      resetForm();
    } else {
      // @ts-ignore
      const message = result.error.data.message;
      setStatus({ success: false });
      setErrors({ submit: message });
      setSubmitting(false);
      setAlertVariant("danger");
      setAlertMessage(tforms("somethingWentWrong"));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  const _handleAdTableRowClick = () => {
    console.log("Ads row clicked");
  };

  return (
    <React.Fragment>
      <Container fluid className="p-0">
        <ArrowLeftCircle className="cursor-pointer mb-3" onClick={onClickBack} />
        <Row>
          <Card>
            <Card.Body>
              <div className="mb-3">
                <h3>{title}</h3>
                <p>{description}</p>
                {is_active ? (
                  <p>
                    {`Campaign is `}
                    <b>active</b>
                  </p>
                ) : (
                  <p>
                    {`Campaign is `}
                    <b>not active</b>
                  </p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          <DetailsDisplayCard
            mainTitle="Ads duration"
            subTitle="Total time in secs for each ad in this campaign to run"
            bodyText={ad_duration.toString() + " seconds"}
          />
          <DetailsDisplayCard
            mainTitle="Number of Ads"
            subTitle="Total number ads in this campaign"
            bodyText={campaignAdsLoading ? 0 : campaignAds.length.toString()}
          />
          <DetailsDisplayCard
            mainTitle="Clicks"
            subTitle="Total number of times all ads in this campaign have been clicked"
            bodyText={stats.reduce((a, b) => a + b.clicks.length, 0).toString()}
          />
          <DetailsDisplayCard
            mainTitle="Views"
            subTitle="Total number of times all ads in this campaign have been viewed "
            bodyText={stats.reduce((a, b) => a + b.views.length, 0).toString()}
          />
        </Row>
        <Row>
          <Col>
            <Row>
              <FairyTaleTable
                columns={AD_TABLE_COLUMNS}
                data={campaignAdsLoading ? [] : campaignAds}
                showHeader={true}
                mainTitle="Ads"
                subtitle={`${campaignAdsLoading ? 0 : campaignAds.length.toString()} ads in this campaign`}
                onClickTableRow={_handleAdTableRowClick}
              />
            </Row>
            <Row>
              <Card>
                <Card.Body>
                  <h3>Create new ad</h3>
                  <FairytaleFormComponent
                    formProps={CREATE_ADS_FORM_ATTRIB_DATA}
                    editMode={false}
                    onSubmit={_handleSubmit}
                    initialFormValues={AD_FORM_INITIAL_VALUES}
                    formSchema={AD_SCHEMA}
                  />
                  <FairyTaleAlert
                    variant={alertVariant}
                    message={tpagetexts(alertMessage)}
                    heading=""
                    show={showAlert}
                    name="feed-create"
                  />
                </Card.Body>
              </Card>
            </Row>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <div className="mb-3">
                  <p>Analytics here, coming soon!</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default CampaignDetail;
