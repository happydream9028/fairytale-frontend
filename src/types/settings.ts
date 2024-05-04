export interface ISetting {
  id: number;
  key: string;
  value: string;
}
export interface ICreateSetting {
  key: string;
  value: string;
}
export interface ICreateSettingsReqOptions {
  appId: number;
  setting: ICreateSetting | ISetting;
}
