import { useMutation } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';
import { payableApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';
import { ChargeResponse } from '@/core/sdk/vendor';

export default function useInitializePayableProductUploadSubscriptionMutation() {
  const { setPaymentChargeSession } = useAppContext();

  return useMutation({
    mutationFn: async (planId: number) => {
      nprogress.start();

      const { data } =
        await payableApi.payableControllerInitializeProductUploadSubscriptionTransferSession(
          planId
        );

      console.log('[INITIALIZE-PAYABLE-PRODUCT-UPLOAD-SUBSCRIPTION-MUTATION-DATA] :: ', data);

      return data;
    },
    onError: () => {
      nprogress.reset();

      showNotification({
        color: 'red',
        title: 'Message',
        autoClose: 3000,
        message: 'Failed to initialize payable product upload subscription.',
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

      console.log('[INITIALIZE-PAYABLE-PRODUCT-UPLOAD-SUBSCRIPTION-MUTATION-SUCCESS] :: ', _values);

      setPaymentChargeSession(_values);
    },
  });
}
