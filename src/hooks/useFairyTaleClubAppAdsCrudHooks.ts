import React, { useCallback, useEffect, useState } from "react";

import {
  useGetAppCampaignsQuery,
  useCreateAppCampaignMutation,
  useDeleteAppCampaignMutation,
  useGetAppCampaignAdStatsMutation,
  useGetAppCampaignAdStatViewsAndClicksMutation,
  useGetAppCampaignAdMediaMutation,
  useEditAppCampaignMutation,
  useCreateAppCampaignAdMutation,
} from "../../src/redux/appQuery";

const useFairyTaleClubAdsCrudHooks = (appId: number) => {
  const { data: campaigns, isLoading, error } = useGetAppCampaignsQuery(appId);
  const [createAppCampaign] = useCreateAppCampaignMutation();
  /*
   * TODO:
   *  1. create endpoint for campaign ads
   *  2. create endpoint for campaign stats
   *  3. Edit and delete endpoints are missing for all
   *  4. create stats missing
   * */
  const [deleteAppCampaign] = useDeleteAppCampaignMutation();
  const [editAppCampaign] = useEditAppCampaignMutation();
  const [getAppCampaignAdStats] = useGetAppCampaignAdStatsMutation();
  const [getAppCampaignAdMedia] = useGetAppCampaignAdMediaMutation();
  const [getAppCampaignAdStatViewsAndClicks] = useGetAppCampaignAdStatViewsAndClicksMutation();
  const [createAppCampaignAd] = useCreateAppCampaignAdMutation();

  return {
    isLoading,
    error,
    campaigns,
    createAppCampaign,
    deleteAppCampaign,
    editAppCampaign,
    getAppCampaignAdStats,
    getAppCampaignAdStatViewsAndClicks,
    getAppCampaignAdMedia,
    createAppCampaignAd,
  };
};

export default useFairyTaleClubAdsCrudHooks;
