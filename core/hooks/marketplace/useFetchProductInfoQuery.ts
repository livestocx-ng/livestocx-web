import { useQuery } from '@tanstack/react-query';
import { productApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';
import { ProductInfo } from '@/core/sdk/marketplace';

export default function useFetchProductInfoQuery(payload: {
  productId: string;
  productInfo: ProductInfo | null;
}) {
  const { setProductInfo, setProductDetails } = useAppContext();

  return useQuery({
    queryKey: ['fetch-product-info'],
    queryFn: async () => {
      if (payload.productInfo !== null) {
        return null;
      }

      // Use Promise.all to make both API calls concurrently
      const [response, response2] = await Promise.all([
        productApi.marketplaceControllerFetchProductDescription(payload.productId),
        productApi.marketplaceControllerFetchProductInfo(payload.productId),
      ]);

      // console.log(`[PRODUCT-DETAILS] :: ${response2.data.moreProducts}`);

      setProductDetails(response2.data);

      return setProductInfo(response.data);
    },
  });
}
