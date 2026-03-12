import { useQuery } from '@tanstack/react-query';
import { vendorProductApi } from '@/core/api/sdk';
import { useAppContext } from '../../context';

export default function useFetchVendorProductsQuery(payload: {
  currentPage: number;
}) {
  const { authToken, setVendorProducts } = useAppContext();

  return useQuery({
    queryKey: ['fetch-vendor-products'],
    queryFn: async () => {
      if (!authToken) {
        return;
      }

      const { data } = await vendorProductApi.vendorProductControllerFetchProducts(payload.currentPage, 20);

      setVendorProducts(data.products);

      return data.products;
    },
    enabled: !!authToken,
  });
}
