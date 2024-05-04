import {
  useGetAppFeedsQuery,
  useEditAppFeedMutation,
  useDeleteAppFeedMutation,
  useCreateNewAppFeedMutation,
  useGetIntegrationsQuery,
  useGetIntegrationTypesQuery,
  useCreateNewAppIntegrationMutation,
} from "../../src/redux/appQuery";

const useFairyTaleClubFeedsCrudHooks = (appId: number) => {
  const { data: feeds, isLoading, error } = useGetAppFeedsQuery(appId);
  const {
    data: integrationTypes,
    isLoading: integrationTypesLoading,
    error: integrationTypeError,
  } = useGetIntegrationTypesQuery(appId);
  const {
    data: integrations,
    isLoading: integrationsLoading,
    error: integrationError,
  } = useGetIntegrationsQuery(appId);
  const [editAppFeed] = useEditAppFeedMutation();
  const [deleteAppFeed] = useDeleteAppFeedMutation();
  const [createNewAppFeed] = useCreateNewAppFeedMutation();
  const [createNewAppIntegration] = useCreateNewAppIntegrationMutation();
  return {
    feeds,
    isLoading,
    error,
    editAppFeed,
    deleteAppFeed,
    createNewAppFeed,
    createNewAppIntegration,
    integrations,
    integrationTypes,
  };
};

export default useFairyTaleClubFeedsCrudHooks;
