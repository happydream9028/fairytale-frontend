import {
  useCreateNewAppMutation,
  useDeleteAppMutation,
  useEditAppMutation,
  useGetAppsQuery,
} from "../../src/redux/appQuery";

const useFairyTaleClubAppsCrudHooks = () => {
  const { data: apps, isLoading, error } = useGetAppsQuery({});
  const [editApp] = useEditAppMutation();
  const [deleteApp] = useDeleteAppMutation();
  const [createNewApp] = useCreateNewAppMutation();
  return {
    apps,
    isLoading,
    error,
    editApp,
    deleteApp,
    createNewApp,
  };
};

export default useFairyTaleClubAppsCrudHooks;
