import { useQuery } from '@tanstack/react-query';
import { marketplaceApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';

export default function useFetchMarketplaceProductsQuery(payload: {
  page: number;
  pageSize: number;
  query?: string;
  state?: string;
  city?: string;
  category?: string;
  inStock?: boolean;
  isNegotiable?: boolean;
  latitude?: number;
  longitude?: number;
}) {
  const {
    setMarketPlaceProducts,
    setMarketPlaceProductsTotalPages,
    setMarketPlaceProductsHasNextPage,
  } = useAppContext();

  return useQuery({
    queryKey: [
      'fetch-marketplace-products',
      payload.page,
      payload.pageSize,
      payload.query,
      payload.state,
      payload.city,
      payload.category,
      payload.inStock,
      payload.isNegotiable,
    ],
    queryFn: async () => {
      const response = await marketplaceApi.marketplaceControllerFetchSearchFeed(
        payload.page,
        payload.pageSize,
        payload.query,
        payload.state,
        payload.city,
        payload.category,
        payload.inStock,
        payload.isNegotiable,
        payload.latitude,
        payload.longitude
      );

      const { products, totalPages, hasNextPage } = response.data;

      setMarketPlaceProducts(products);
      setMarketPlaceProductsTotalPages(totalPages);
      setMarketPlaceProductsHasNextPage(hasNextPage);

      return response.data;
    },
  });
}
