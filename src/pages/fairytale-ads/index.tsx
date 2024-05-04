import React, { useEffect, useState } from "react";

import { Row } from "react-bootstrap";
import FairyTaleTable from "../../components/fairytale-table";
import CampaignDetail from "./CampaignDetail";

import { IApp } from "../../types/app";
import { Campaign, Ad, AdView, AdClick, Media } from "../../types/ads";
import { Column } from "react-table";

import { useTranslation } from "react-i18next";

import CreateNewCampaign from "./CreateCampaign";

interface IFairytaleAds {
  app: IApp;
  campaigns: Campaign[];
  isUser?: boolean
}

interface ICampaignDetailsStat {
  id: number;
  views: Array<AdView>;
  clicks: Array<AdClick>;
  media: Media;
}

export interface ICampaignDetails {
  campaign: Campaign;
  ads: Ad[];
  stats: ICampaignDetailsStat[];
}

const FairytaleAdsPage: React.FC<IFairytaleAds> = ({ app, campaigns, isUser = false }) => {
  const { t: tforms } = useTranslation(["formFields"]);
  const { t: tcommon } = useTranslation(["common"]);
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [pageTitle, setPageTitle] = useState<string>("All Campaigns"); //Todo: add appname to page title
  const [activeRow, setActiveRow] = useState<Campaign | null>(null);

  const CAMPAIGN_TABLE_COLUMNS: Column<Record<string, unknown>>[] = React.useMemo(
    () => [
      {
        Header: "campaignTitle",
        id: "title",
        Cell: ({ row }: { row: any }) => {
          let { title } = row.original;
          return title;
        },
      },
      {
        Header: "camapignDescription",
        id: "description",
        Cell: ({ row }: { row: any }) => {
          let { description } = row.original;
          return description;
        },
      },
      {
        Header: "campaignViews",
        id: "views",
        Cell: ({ row }: { row: any }) => {
          let { stats } = row.original;
          return 5678;
        },
      },
      {
        Header: "campaignClicks",
        id: "clicks",
        Cell: ({ row }: { row: any }) => {
          let { stats } = row.original;
          return 456;
        },
      },
      {
        Header: "Status",
        id: "is_active",
        Cell: ({ row }: { row: any }) => {
          let { is_active } = row.original;
          return is_active ? tcommon("active") : tcommon("inActive");
        },
      },
    ],
    []
  );

  const _handleRowClick = ({ original }: { original: Campaign }) => {
    // @ts-ignore
    setActiveRow(original);
  };

  useEffect(() => {
    if (campaigns.length > 0) setShowSpinner(false);
    else setShowSpinner(true);
  }, [campaigns]);

  return (
    <React.Fragment>
      <h1 className="h3 mb-3">{activeRow === null ? pageTitle : null}</h1>
      <Row>
        {activeRow === null ? (
          <FairyTaleTable
            data-cy="ads-table-main"
            columns={CAMPAIGN_TABLE_COLUMNS}
            data={campaigns.length > 0 ? campaigns : []}
            showHeader={false}
            mainTitle=""
            subtitle={`${campaigns ? campaigns.length : 0} Campaigns`}
            useSearchFilter={isUser}
            selectOptions={[
              {
                value: app.app_title,
                label: app.app_title,
              },
            ]}
            onChangeSelect={null}
            onClickTableRow={_handleRowClick}
          />
        ) : (
          <CampaignDetail onClickBack={() => setActiveRow(null)} campaign={activeRow} />
        )}
      </Row>
      <Row>{activeRow === null ? <CreateNewCampaign app={app} /> : null}</Row>
    </React.Fragment>
  );
};

export default FairytaleAdsPage;
