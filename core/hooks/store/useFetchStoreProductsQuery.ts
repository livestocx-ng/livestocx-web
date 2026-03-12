import { useQuery } from '@tanstack/react-query';
import { storeApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';

export default function useFetchStoreProductsQuery(payload: {
  storeId: number;
  currentPage: number;
}) {
  const {
    setStoreProducts,
    setStoreProductsTotalPages,
    setStoreProductsCurrentPage,
    setStoreProductsHasNextPage,
  } = useAppContext();

  return useQuery({
    queryKey: ['fetch-store-profile-products'],
    queryFn: async () => {
      try {
        const pageSize = 20;

        const response = await storeApi.storeControllerFetchStoreProducts(
          payload.currentPage,
          payload.storeId,
          pageSize
        );

        console.log('[TOTAl--PAGES] :: ', response.data.totalPages);

        setStoreProductsCurrentPage(
          payload.currentPage < response.data.totalPages
            ? payload.currentPage + 1
            : payload.currentPage
        );
        setStoreProductsTotalPages(response.data.totalPages);
        setStoreProductsHasNextPage(response.data.totalPages <= payload.currentPage);

        setStoreProducts(response.data.products);
      } catch (error) {
        console.log(`[FETCH-STORE-PRODUCTS-ERROR] :: ${error}`);
      }
    },
  });
}
