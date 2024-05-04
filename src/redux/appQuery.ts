import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICreateSettingsReqOptions } from "../types/settings";

// @ts-ignore
export const dashboardApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.REACT_APP_CONTEXT === "dev"
        ? (process.env.REACT_APP_FAIRYTALE_API_URL_DEV as string)
        : process.env.REACT_APP_FAIRYTALE_API_URL,
    prepareHeaders: (headers, { getState }: { getState: any }) => {
      const token = sessionStorage.getItem("accessToken"); //getState().auth.token;
      /*console.log(getState());
      console.log("HEADERS", headers);*/

      //TODO: Why does 401 error happen after a period of inactivity?

      if (!headers.has("Authorization") && token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "dashboard_api",
  tagTypes: [
    "users",
    "feeds",
    "apps",
    "campaigns",
    "ads",
    "adStats",
    "_adStats",
    "media",
    "integration_types",
    "integrations",
    "app",
    "settings",
    "images",
    "auth",
    "userRoles",
    "userGroups",
    "messages",
    'weathers',
    'groupPartners',
    'partners'
  ],
  endpoints: (build) => {
    return {
      /*Auth queries*/
      login: build.mutation({
        query: (payLoad: { username: string; password: string }) => ({
          url: `auth/login`,
          method: "POST",
          body: payLoad,
        }),
        invalidatesTags: ["auth"],
      }),
      logout: build.mutation({
        query: () => ({ url: `auth/logout`, method: "POST" }),
        invalidatesTags: ["auth"],
      }),
      /*User queries*/
      getUsers: build.query({
        query: () => ({ url: `users`, method: "GET" }),
        providesTags: ["users"],
      }),
      getUserRoles: build.query({
        query: () => ({ url: `users/roles`, method: "GET" }),
        providesTags: ["userRoles"],
      }),
      getUserGroups: build.query({
        query: () => ({ url: `users/groups`, method: "GET" }),
        providesTags: ["userGroups"],
      }),
      getUserById: build.query({
        query: (user_id) => ({ url: `users/${user_id}`, method: "GET" }),
        providesTags: ["users"],
      }),
      createNewUserGroup: build.mutation({
        query: (body) => ({ url: `users/groups/create`, method: "POST", body: body }),
        invalidatesTags: ["userGroups"],
      }),
      createNewUser: build.mutation({
        query: (user) => ({ url: `users/create`, method: "POST", body: user }),
        invalidatesTags: ["users"],
      }),
      editUser: build.mutation({
        query: ({ user, user_id }) => ({ url: `users/update/${user_id}`, method: "PATCH", body: user }),
        invalidatesTags: ["users"],
      }),
      deleteUser: build.mutation({
        query: (user) => ({ url: `users/delete/${user.user_id}`, method: "DELETE", body: user }),
        invalidatesTags: ["users"],
      }),
      sendPasswordResetEmail: build.mutation({
        query: (email) => ({ url: `users/reset-password`, method: "POST", body: { email: email } }),
        invalidatesTags: ["users"],
      }),
      getWeatherByAppId: build.query({
        query: (app_id) => ({ url: `weather/get-data-of-app/${app_id}`, method: "GET" }),
        providesTags: ["weathers"], 
      }),
      deleteWeatherByAppId: build.mutation({
        query: (weatherId) => ({ url: `weather/delete-setting/${weatherId}`, method: "DELETE" }),
        invalidatesTags: ["weathers"], 
      }),
      createWeather: build.mutation({
        query: (body) => ({ url: `weather/add-setting`, method: "POST",  body: body }),
        invalidatesTags: ["weathers"], 
      }),
      updateWeatherByAppId: build.mutation({
        query: ({weatherId, body}) => ({ url: `weather/update-setting/${weatherId}`, method: "PATCH",  body: body }),
        invalidatesTags: ["weathers"], 
      }),
      updateUserGroup: build.mutation({
        query: ({id, body}) => ({ url: `users/groups/update/${id}`, method: "PATCH", body: body }),
        invalidatesTags: ["userGroups"],
      }),
      deleteUserGroup: build.mutation({
        query: (id) => ({ url: `users/groups/delete/${id}`, method: "DELETE", }),
        invalidatesTags: ["userGroups"],
      }),
      resetPassword: build.mutation({
        query: (passwordResetParams: { email: string; password: string; token: string }) => ({
          url: `users/reset-password/token`,
          method: "POST",
          body: passwordResetParams,
        }),
        invalidatesTags: ["users"],
      }),
      /*App queries*/
      getAppById: build.query({
        query: (appId) => ({ url: `apps/${appId}`, method: "GET" }),
        providesTags: ["app"], //?works
      }),
      getApps: build.query({
        query: () => ({ url: `apps`, method: "GET" }),
        providesTags: ["apps"], //?works
      }),
      createNewApp: build.mutation({
        query: (app) => ({ url: `apps/create`, method: "POST", body: app }),
        invalidatesTags: ["apps"], //?works
      }),
      editApp: build.mutation({
        query: ({ app, app_id }) => ({ url: `apps/update/${app_id}`, method: "PATCH", body: app }),
        invalidatesTags: ["apps", "app"], //?works
      }),
      deleteApp: build.mutation({
        query: (app) => ({ url: `apps/delete/${app.app_id}`, method: "DELETE", body: app }),
        invalidatesTags: ["apps"], //?works
      }),
      getAppsByGroupId: build.query({
        query: (groupId) => ({ url: `apps/group/${groupId}`, method: "GET" }),
        providesTags: ["apps"],
      }),
      /*Feed and Integration queries*/
      getAppFeeds: build.query({
        query: (appId) => ({ url: `feeds/app/${appId}`, method: "GET" }),
        providesTags: ["feeds"],
      }),
      createNewAppFeed: build.mutation({
        query: (feed) => ({ url: `feeds/create`, method: "POST", body: feed }),
        invalidatesTags: ["feeds"],
      }),
      editAppFeed: build.mutation({
        // @ts-ignore
        query: (feed) => ({ url: `feeds/update/${feed.feed_id}`, method: "PATCH", body: feed }),
        invalidatesTags: ["feeds"],
      }),
      deleteAppFeed: build.mutation({
        // @ts-ignore
        query: (feed) => ({ url: `feeds/delete/${feed.feed_id}`, method: "DELETE", body: feed }),
        invalidatesTags: ["feeds"],
      }),
      getIntegrationTypes: build.query({
        query: (appId) => ({ url: `feeds/integration-type`, method: "GET" }),
        providesTags: ["integration_types"],
      }),
      getIntegrations: build.query({
        query: (appId) => ({ url: `feeds/integrations`, method: "GET" }),
        providesTags: ["integrations"],
      }),
      createNewAppIntegration: build.mutation({
        query: (integration) => ({ url: `feeds/integrations/create`, method: "POST", body: integration }),
        invalidatesTags: ["integrations"],
      }),
      /*Ad and Campaign queries*/
      getAppCampaigns: build.query({
        query: (appId: number) => ({ url: `ads/campaigns/byAppId/${appId}`, method: "GET" }),
        providesTags: ["campaigns"],
      }),
      createAppCampaign: build.mutation({
        query: (campaign) => ({ url: `ads/campaigns/create`, method: "POST", body: campaign }),
        invalidatesTags: ["campaigns"],
      }),
      createAppCampaignAd: build.mutation({
        query: (ad) => ({ url: `ads/create`, method: "POST", body: ad }),
        invalidatesTags: ["ads"],
      }),
      deleteAppCampaign: build.mutation({
        // TODO: refactor to correct url
        query: (campaign) => ({ url: `ads/campaigns/${campaign.id}`, method: "DELETE", body: campaign }),
        invalidatesTags: ["campaigns"],
      }),
      editAppCampaign: build.mutation({
        // TODO: refactor to correct url
        query: (campaign) => ({ url: `ads/campaigns/${campaign.id}`, method: "PATCH", body: campaign }),
        invalidatesTags: ["campaigns"],
      }),
      getAppCampaignAds: build.query({
        // @ts-ignore
        query: (campaignId: number) => ({ url: `ads/campaigns/${campaignId}/ads`, method: "GET" }),
        providesTags: ["ads"],
      }),
      getAppCampaignAdStats: build.mutation({
        // TODO: refactor to correct url
        query: (appId: number) => ({ url: `ads/campaigns/byAppId/${appId}`, method: "GET" }),
        invalidatesTags: ["adStats"],
      }),
      getAppCampaignAdStatViewsAndClicks: build.mutation({
        // TODO: refactor to correct url
        query: (appId: number) => ({ url: `ads/campaigns/byAppId/${appId}`, method: "GET" }),
        invalidatesTags: ["_adStats"],
      }),
      getAppCampaignAdMedia: build.mutation({
        // TODO: refactor to correct url
        query: (appId: number) => ({ url: `ads/campaigns/byAppId/${appId}`, method: "GET" }),
        invalidatesTags: ["media"],
      }),

      /*App Settings*/
      getAppSettings: build.query({
        query: (appId) => ({ url: `apps/${appId}/settings`, method: "GET" }),
        providesTags: ["settings"],
      }),
      createNewAppSetting: build.mutation({
        query: ({ appId, setting }: ICreateSettingsReqOptions) => ({
          url: `apps/${appId}/settings`,
          method: "POST",
          body: setting,
        }),
        invalidatesTags: ["settings"],
      }),
      editAppSetting: build.mutation({
        query: ({ appId, setting }: ICreateSettingsReqOptions) => ({
          url: `apps/${appId}/settings`,
          method: "PATCH",
          body: setting,
        }),
        invalidatesTags: ["settings"],
      }),
      deleteAppSetting: build.mutation({
        query: ({ appId, settingId }) => ({ url: `apps/${appId}/settings/delete/${settingId}`, method: "DELETE" }),
        invalidatesTags: ["settings"],
      }),

      /*App Images*/
      getImages: build.query({
        query: () => ({ url: `images`, method: "GET" }),
        providesTags: ["images"],
      }),
      getImage: build.query({
        query: (imageId) => ({ url: `images/item/${imageId}`, method: "GET" }),
        providesTags: ["images"],
      }),
      uploadNewImage: build.mutation({
        query: (formData) => ({
          url: `images/upload`,
          method: "POST",
          body: formData,
          formData: true,
        }),
        invalidatesTags: ["images"],
      }),
      updateImage: build.mutation({
        query: ({ imageId, imageData }) => ({
          url: `images/upload/${imageId}`,
          method: "POST",
          body: imageData,
        }),
        invalidatesTags: ["images"],
      }),
      deleteImage: build.mutation({
        query: (imageId) => ({ url: `images/delete/${imageId}`, method: "DELETE" }),
        invalidatesTags: ["images"],
      }),
      /*InAppMessages queries*/
      getMessages: build.query({
        query: ({ appId, limit }) => ({ url: `apps/${appId}/in-app-messages/all/${limit}`, method: "GET" }),
        providesTags: ["messages"],
      }),
      createNewMessage: build.mutation({
        query: ({ appId, message }) => ({ url: `apps/${appId}/in-app-messages/create`, method: "POST", body: message }),
        invalidatesTags: ["messages"],
      }),
      updateMessage: build.mutation({
        query: ({ appId, messageId, message }) => ({
          url: `apps/${appId}/in-app-messages/update/${messageId}`,
          method: "PATCH",
          body: message,
        }),
        invalidatesTags: ["messages"],
      }),
      deleteMessage: build.mutation({
        query: ({ appId, messageId }) => ({
          url: `apps/${appId}/in-app-messages/delete/${messageId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["messages"],
      }),
      getPartnersGroupById: build.query({
        query: ({ groupId }) => ({
          url: `partners/groups/${groupId}`,
          method: "GET",
        }),
        providesTags: ["groupPartners"],
      }),
      getPartnersGroup: build.query({
        query: ({ appId }) => ({
          url: `partners/groups-by-app/${appId}`,
          method: "GET",
        }),
        providesTags: ["groupPartners"],
      }),
      createPartnersGroup: build.mutation({
        query: ({ body }) => ({
          url: `partners/groups/create`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["groupPartners"],
      }),
      updatePartnersGroup: build.mutation({
        query: ({ id, body }) => ({
          url: `partners/groups/update/${id}`,
          method: "PATCH",
          body: body,
        }),
        invalidatesTags: ["groupPartners"],
      }),
      deletePartnersGroup: build.mutation({
        query: ({  id }) => ({
          url: `partners/groups/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["groupPartners"],
      }),
      getPartners: build.query({
        query: ({ id }) => ({
          url: `partners`,
          method: "GET",
        }),
        providesTags: ["partners"],
      }),
      createNewPartner: build.mutation({
        query: ({ body }) => ({ url: `partners/create`, method: "POST", body: body }),
        invalidatesTags: ["partners"],
      }),
      updatePartners: build.mutation({
        query: ({ id, body }) => ({
          url: `partners/update/${id}`,
          method: "PATCH",
          body: body
        }),
        invalidatesTags: ["partners"],
      }),
    };
  },
});

export const {
  useUpdateMessageMutation,
  useDeleteMessageMutation,
  useCreateNewMessageMutation,
  useGetMessagesQuery,
  useGetUsersQuery,
  useGetUserRolesQuery,
  useGetUserGroupsQuery,
  useGetUserByIdQuery,
  useGetWeatherByAppIdQuery,
  useDeleteWeatherByAppIdMutation,
  useCreateWeatherMutation,
  useCreateNewUserGroupMutation,
  useUpdateWeatherByAppIdMutation,
  useUpdateUserGroupMutation,
  useDeleteUserGroupMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useCreateNewUserMutation,
  useSendPasswordResetEmailMutation,
  useResetPasswordMutation,
  useGetAppByIdQuery,
  useGetAppsQuery,
  useEditAppMutation,
  useDeleteAppMutation,
  useCreateNewAppMutation,
  useGetAppFeedsQuery,
  useGetIntegrationsQuery,
  useGetIntegrationTypesQuery,
  useCreateNewAppIntegrationMutation,
  useEditAppFeedMutation,
  useDeleteAppFeedMutation,
  useGetAppsByGroupIdQuery,
  useCreateNewAppFeedMutation,
  useGetAppCampaignsQuery,
  useCreateAppCampaignMutation,
  useCreateAppCampaignAdMutation,
  useDeleteAppCampaignMutation,
  useEditAppCampaignMutation,
  useGetAppCampaignAdsQuery,
  useGetAppCampaignAdStatsMutation,
  useGetAppCampaignAdStatViewsAndClicksMutation,
  useGetAppCampaignAdMediaMutation,
  useGetAppSettingsQuery,
  useCreateNewAppSettingMutation,
  useEditAppSettingMutation,
  useDeleteAppSettingMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetImagesQuery,
  useUploadNewImageMutation,
  useUpdateImageMutation,
  useDeleteImageMutation,
  useGetPartnersGroupByIdQuery,
  useGetPartnersGroupQuery,
  useCreatePartnersGroupMutation,
  useUpdatePartnersGroupMutation,
  useDeletePartnersGroupMutation,
  useGetPartnersQuery,
  useUpdatePartnersMutation,
  useCreateNewPartnerMutation
} = dashboardApi;

export const { endpoints, reducerPath, reducer, middleware } = dashboardApi;
