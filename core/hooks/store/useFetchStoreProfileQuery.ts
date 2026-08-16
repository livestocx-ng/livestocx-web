import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { storeApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';
import { StoreInfo } from '@/core/sdk/marketplace';

export default function useFetchStoreProfileQuery(payload: { storeSlug: string }) {
  const { setStoreInfo } = useAppContext();

  const query = useQuery<StoreInfo | null>({
    queryKey: ['fetch-store-profile', payload.storeSlug],
    queryFn: async () => {
      if (!payload.storeSlug) return null;
      const response = await storeApi.storeControllerFetchStoreProfile(payload.storeSlug);
      return response.data;
    },
    enabled: Boolean(payload.storeSlug),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    if (query.data) {
      setStoreInfo(query.data);
    }
  }, [query.data, setStoreInfo]);

  return query;
}

