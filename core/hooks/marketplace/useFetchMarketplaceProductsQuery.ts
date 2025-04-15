import { useQuery } from '@tanstack/react-query';
import { marketplaceApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';
import { ProductDisplayType } from '@/core/types';

export default function useFetchMarketplaceProductsQuery(payload: {
  currentPage: number;
  displayType: ProductDisplayType;
}) {
  const {
    setMarketPlaceProducts,
    setMarketPlaceProductsTotalPages,
    setMarketPlaceProductsCurrentPage,
    setMarketPlaceProductsHasNextPage,
  } = useAppContext();

  return useQuery({
    queryKey: ['fetch-marketplace-products'],
    queryFn: async () => {
      const pageSize = 20;

      if (payload.displayType === 'RECOMMENDED') {
        const response = await marketplaceApi.marketplaceControllerFetchRecommendedProducts(
          payload.currentPage,
          pageSize
        );

        console.log('[TOTAl--PAGES] :: ', response.data.totalPages);

        setMarketPlaceProductsCurrentPage(
          payload.currentPage < response.data.totalPages
            ? payload.currentPage + 1
            : payload.currentPage
        );
        setMarketPlaceProductsTotalPages(response.data.totalPages);
        setMarketPlaceProductsHasNextPage(response.data.totalPages <= payload.currentPage);

        setMarketPlaceProducts(response.data.products);
      } else if (payload.displayType === 'POPULAR') {
        const response = await marketplaceApi.marketplaceControllerFetchPopularProducts(
          payload.currentPage,
          pageSize
        );

        setMarketPlaceProductsCurrentPage(
          payload.currentPage < response.data.totalPages
            ? payload.currentPage + 1
            : payload.currentPage
        );
        setMarketPlaceProductsTotalPages(response.data.totalPages);
        setMarketPlaceProductsHasNextPage(response.data.totalPages <= payload.currentPage);

        setMarketPlaceProducts(response.data.products);
      } else if (payload.displayType === 'NEAR_YOU') {
        const response = await marketplaceApi.marketplaceControllerFetchProductsNearUser(
          payload.currentPage,
          pageSize
        );

        setMarketPlaceProductsCurrentPage(
          payload.currentPage < response.data.totalPages
            ? payload.currentPage + 1
            : payload.currentPage
        );
        setMarketPlaceProductsTotalPages(response.data.totalPages);
        setMarketPlaceProductsHasNextPage(response.data.totalPages <= payload.currentPage);

        setMarketPlaceProducts(response.data.products);
      }
    },
  });
}
