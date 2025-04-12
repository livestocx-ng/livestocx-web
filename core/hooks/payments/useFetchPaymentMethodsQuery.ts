import { useQuery } from '@tanstack/react-query';
import { paymentApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';

export default function useFetchPaymentMethodsQuery() {
  const { paymentMethods, setPaymentMethods } = useAppContext();

  return useQuery({
    queryKey: ['get-payment-methods'],
    queryFn: async () => {
      if (paymentMethods?.length > 0) {
        return paymentMethods;
      }

      const response = await paymentApi.paymentControllerFetchPaymentMethods();

      const data = response.data;

      setPaymentMethods(data);

      return data;
    },
  });
}
