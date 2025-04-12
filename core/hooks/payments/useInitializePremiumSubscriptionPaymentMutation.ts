import { useMutation } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';
import { payableApi, paymentApi } from '@/core/api/sdk';
import { ChargeResponse, PaymentMethodGatewayEnum } from '@/core/sdk/vendor';
import { useAppContext } from '../../context';

export default function useInitializePremiumSubscriptionPaymentMutation() {
  const { setChargeResponse } = useAppContext();

  return useMutation({
    mutationFn: async (payload: { paymentGateWay: PaymentMethodGatewayEnum; planId: number }) => {
      nprogress.start();

      if (payload.paymentGateWay === PaymentMethodGatewayEnum.Buypower) {
        const { data } =
          await payableApi.payableControllerInitializePremiumSubscriptionTransferSession(
            payload.planId
          );

        return data;
      }

      const { data } =
        await paymentApi.paymentControllerInitializePremiumSubscriptionTransferSession(
          payload.planId
        );

      return data;
    },
    onError: () => {
      nprogress.reset();
    },
    onSuccess(values: ChargeResponse) {
      nprogress.reset();

      showNotification({
        color: 'green',
        title: 'Message',
        autoClose: 3000,
        message: 'Payment session initialized.',
      });

      setChargeResponse(values);
    },
  });
}
