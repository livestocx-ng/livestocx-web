import { useQuery } from '@tanstack/react-query';
import { userListApi } from '@/core/api/sdk';
import { useAppContext } from '../../context';

export default function useFetchUserListItemsQuery() {
  const { authToken, setListItems } = useAppContext();

  return useQuery({
    queryKey: ['fetch-user-list-items'],
    queryFn: async () => {
      if (!authToken) {
        return;
      }

      const { data } = await userListApi.listItemControllerGetUserList();

      setListItems(data);

      return data;
    },
    enabled: !!authToken,
  });
}
