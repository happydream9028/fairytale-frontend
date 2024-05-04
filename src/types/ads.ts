export type Campaign = {
  id: number;
  app_id: number;
  description: string;
  title: string;
  is_active: boolean; //status/tila
  ad_duration: number; //duration in secs
};

export type Ad = {
  id: number;
  media_id: number;
  campaign_id: number;
  link: string; // link contains the picture to preview?
};

export type AdCreate = {
  campaign: number;
  link: string; //? link contains the picture to preview?
};

export type CampaignStat = {
  id: number;
  ad_campaign_id: number;
  timestamp: Date;
  type: Timestamp; //TODO: verify from Aleksi that this is correct (01)
};

export type AdStat = {
  id: number;
  ad_id: number;
  added: Date;
};

export type Timestamp = {
  id: 0 | 1 | 2 | number;
  type_name: number;
};

export type AdView = {
  id: number;
  ad_stats_id: number;
  view: Date; //Number of views
};

export type AdClick = {
  id: number;
  ad_stats_id: number;
  click: Date; //number of clicks
};

export type Media = {
  media_id: number;
  owner_user_id: number;
  optional_id: number;
  url: string;
  name: string;
};
