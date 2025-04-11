import { meApi } from '@/core/api/sdk';
import { useAppContext } from '../../context';
import { useQuery } from '@tanstack/react-query';

export default function useFetchAccountInfoQuery() {
  const { authToken, setAccountInfo } = useAppContext();

  return useQuery({
    queryKey: ['initialize-account-info'],
    queryFn: async () => {
      const { data } = await meApi.accountControllerGetDetailedAccountInfo();

      setAccountInfo(data);

      return data;
    },
    enabled: !!authToken,
  });
}
