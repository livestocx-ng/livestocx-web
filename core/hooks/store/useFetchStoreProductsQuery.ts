import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { storeApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';
import { ProductsResponse } from '@/core/sdk/marketplace';

export default function useFetchStoreProductsQuery(payload: {
  storeId: number;
  currentPage: number;
}) {
  const {
    setStoreProducts,
    setStoreProductsTotalPages,
    setStoreProductsHasNextPage,
  } = useAppContext();

  const query = useQuery<ProductsResponse | null>({
    queryKey: ['fetch-store-profile-products', payload.storeId, payload.currentPage],
    queryFn: async () => {
      if (!payload.storeId || payload.storeId <= 0) return null;
      const pageSize = 20;

      const response = await storeApi.storeControllerFetchStoreProducts(
        payload.currentPage || 1,
        payload.storeId,
        pageSize
      );

      return response.data;
    },
    enabled: Boolean(payload.storeId && payload.storeId > 0),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    if (query.data) {
      setStoreProducts(query.data.products || []);
      setStoreProductsTotalPages(query.data.totalPages || 1);
      setStoreProductsHasNextPage(
        (query.data.totalPages || 1) > (payload.currentPage || 1)
      );
    }
  }, [
    query.data,
    payload.currentPage,
    setStoreProducts,
    setStoreProductsTotalPages,
    setStoreProductsHasNextPage,
  ]);

  return query;
}

