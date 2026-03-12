import { useQuery } from '@tanstack/react-query';
import { storeApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';

export default function useFetchStoreProfileQuery(payload: { storeSlug: string }) {
  const { setStoreInfo } = useAppContext();

  return useQuery({
    queryKey: ['fetch-store-profile'],
    queryFn: async () => {
      const response = await storeApi.storeControllerFetchStoreProfile(payload.storeSlug);

      return setStoreInfo(response.data);
    },
  });
}
