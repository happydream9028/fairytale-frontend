import { IApp } from "./app";

export type Feed = {
  feed_id: number;
  integration_in_app_id: number;
  name: string;
  push_title: string;
  push_content: string;
  enabled: boolean;
  push_notification_enabled: boolean;
  show_in_news: boolean;
};

export interface IFeed {
  feed_id: number;
  app_id: number;
  name: string;
  push_title: string;
  push_content: string;
  enabled: boolean;
  push_notification_enabled: boolean;
  show_in_news: boolean;
  deleted: boolean;
  updated_at: Date;
  processed_at: Date | null;
  show_in_comm_comp: boolean;
  integration: {
    id: number;
    app_id: number;
    owner: number;
    apikey: string;
    url: string;
    enabled: boolean;
    is_alive: boolean;
    name: string;
    icon_url: string;
    custom_icon_url: string;
    integration_type: {
      id: number;
      type_name: string;
    };
  };
}

export interface IFairytaleFeedPage {
  app: IApp;
  feeds: Array<Feed>;
}

export interface IIntegrationsListPage {
  app: IApp;
  integrations: Array<IFeedIntegration>;
}

export interface ICreateFeedComponentProps {
  app: IApp;
  selectValues: object;
}

export interface IFeedCreate {
  name: string;
  feed_name: string;
  push_title: string;
  push_content: string;
  enabled: boolean;
  push_notification_enabled: boolean;
  app_id: number;
  owner: number;
  apikey: string;
  url: string;
  integration_type: number;
  icon_url: string;
  custom_icon_url: string;
  show_in_news: boolean;
}

export interface IFeedUpdate {
  name: string;
  push_title: string;
  push_content: string;
  enabled: boolean;
  push_notification_enabled: boolean;
  app_id: number;
  owner: number;
  apikey: string;
  url: string;
  is_alive: boolean;
  integration_type: number;
  icon_url: string;
  custom_icon_url: string;
  feed_id: number;
  show_in_news: boolean;
}

export interface IFeedIntegrationCreate {
  id: number;
  app_id: number;
  name: string;
  owner: number;
  apikey: string;
  url: string;
  enabled: boolean;
  is_alive: boolean;
  integration_type: number;
}

export interface IFeedIntegration {
  id: number;
  app_id: number;
  name: string;
  owner: number;
  apikey: string;
  url: string;
  enabled: boolean;
  is_alive: boolean;
  integration_type: string;
}

export interface IFormAtributes {
  type: string;
  name: string;
  required: boolean;
  placeholder: string;
  visible: boolean;
  label: string;
  translateText: string;
  disabled: boolean;
  value?: string | number | string[] | boolean;
  description?: string;
}

export interface IIntegrationType {
  id: number;
  type_name: string;
}
