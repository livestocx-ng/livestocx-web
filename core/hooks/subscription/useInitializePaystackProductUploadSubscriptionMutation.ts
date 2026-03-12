import { useMutation } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';
import { paymentApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';
import { ChargeResponse } from '@/core/sdk/vendor';

export default function useInitializePaystackProductUploadSubscriptionMutation() {
  const { setPaymentChargeSession } = useAppContext();

  return useMutation({
    mutationFn: async (planId: number) => {
      nprogress.start();

      const { data } =
        await paymentApi.paymentControllerInitializeProductUploadTransferSession(planId);

      console.log('[INITIALIZE-PAYSTACK-PRODUCT-UPLOAD-SUBSCRIPTION-MUTATION-DATA] :: ', data);

      return data;
    },
    onError: () => {
      nprogress.reset();

      showNotification({
        color: 'red',
        title: 'Message',
        autoClose: 3000,
        message: 'Failed to initialize paystack product upload subscription.',
      });
    },
    onSuccess(_values: ChargeResponse) {
      nprogress.reset();

      showNotification({
        color: 'green',
        title: 'Message',
        autoClose: 5000,
        message: 'Paystack session initialized successfully.',
      });

      console.log(
        '[INITIALIZE-PAYSTACK-PRODUCT-UPLOAD-SUBSCRIPTION-MUTATION-SUCCESS] :: ',
        _values
      );

      setPaymentChargeSession(_values);
    },
  });
}
