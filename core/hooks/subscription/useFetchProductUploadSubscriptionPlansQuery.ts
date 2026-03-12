import { useQuery } from '@tanstack/react-query';
import { productUploadSubscriptionApi } from '@/core/api/sdk';
import { useAppContext } from '../../context';

export default function useFetchProductUploadSubscriptionPlansQuery() {
  const { authToken, setProductUploadSubscriptionPlans } = useAppContext();

  return useQuery({
    queryKey: ['fetch-product-upload-subscription-plans'],
    queryFn: async () => {
      if (!authToken) {
        return;
      }

      const { data } =
        await productUploadSubscriptionApi.productUploadSubscriptionControllerFetchProductUploadSubscriptionPlans();

      setProductUploadSubscriptionPlans(data);

      return data;
    },
    enabled: !!authToken,
  });
}
