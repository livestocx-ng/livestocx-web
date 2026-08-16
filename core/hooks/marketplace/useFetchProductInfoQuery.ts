import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';
import { ProductDetails, ProductInfo } from '@/core/sdk/marketplace';

export default function useFetchProductInfoQuery(payload: {
  productId: string;
  productInfo?: ProductInfo | null;
}) {
  const { setProductInfo, setProductDetails } = useAppContext();

  const query = useQuery<{
    productInfo: ProductInfo | null;
    productDetails: ProductDetails | null;
  }>({
    queryKey: ['fetch-product-info', payload.productId],
    queryFn: async () => {
      if (!payload.productId) {
        return { productInfo: null, productDetails: null };
      }

      // Concurrently fetch description and product info with individual error resilience
      const [descResult, infoResult] = await Promise.allSettled([
        productApi.marketplaceControllerFetchProductDescription(payload.productId),
        productApi.marketplaceControllerFetchProductInfo(payload.productId),
      ]);

      const productInfo =
        descResult.status === 'fulfilled' ? descResult.value.data : null;
      const productDetails =
        infoResult.status === 'fulfilled' ? infoResult.value.data : null;

      return {
        productInfo,
        productDetails,
      };
    },
    enabled: Boolean(payload.productId),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  useEffect(() => {
    if (query.data?.productInfo) {
      setProductInfo(query.data.productInfo);
    }
    if (query.data?.productDetails) {
      setProductDetails(query.data.productDetails);
    }
  }, [query.data, setProductInfo, setProductDetails]);

  return query;
}

