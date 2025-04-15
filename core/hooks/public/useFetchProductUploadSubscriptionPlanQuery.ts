import { useQuery } from '@tanstack/react-query';
import { productUploadSubscriptionApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';

export default function useFetchProductUploadSubscriptionPlanQuery() {
  const { productUploadSubscriptionPlan, setProductUploadSubscriptionPlan } = useAppContext();

  return useQuery({
    queryKey: ['get-product-upload-subscription-plan'],
    queryFn: async () => {
      if (productUploadSubscriptionPlan) {
        return productUploadSubscriptionPlan;
      }

      const response =
        await productUploadSubscriptionApi.productUploadSubscriptionControllerFetchProductUploadSubscriptionPlan();

      const data = response.data || productUploadSubscriptionPlan;
      setProductUploadSubscriptionPlan(data);

      return data;
    },
  });
}
