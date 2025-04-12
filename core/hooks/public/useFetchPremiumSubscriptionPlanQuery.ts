import { useQuery } from '@tanstack/react-query';
import { premiumSubscriptionApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';

export default function useFetchPremiumSubscriptionPlanQuery() {
  const { premiumSubscriptionPlans, setPremiumSubscriptionPlans } = useAppContext();

  return useQuery({
    queryKey: ['get-premium-subscription-plans'],
    queryFn: async () => {
      if (premiumSubscriptionPlans?.length > 0) {
        return premiumSubscriptionPlans;
      }

      const response =
        await premiumSubscriptionApi.premiumSubscriptionControllerFetchPremiumSubscriptionPlans();

      const data = response.data;

      setPremiumSubscriptionPlans(data);

      return data;
    },
  });
}
