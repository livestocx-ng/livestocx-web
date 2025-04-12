import { useMutation } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';
import { payableApi, paymentApi } from '@/core/api/sdk';
import { PaymentMethodGatewayEnum, VerifyPaymentSessionResponse } from '@/core/sdk/vendor';

export default function useVerifyPaymentSessionMutation() {
  return useMutation({
    mutationFn: async (payload: {
      reference: string;
      paymentGateWay: PaymentMethodGatewayEnum;
    }) => {
      nprogress.start();

      if (payload.paymentGateWay === PaymentMethodGatewayEnum.Buypower) {
        const { data } = await payableApi.payableControllerVerifyPaymentSession(payload.reference);

        return data;
      }

      const { data } = await paymentApi.paymentControllerVerifyBankPaymentTransfer(
        payload.reference
      );

      return data;
    },
    onError: () => {
      nprogress.reset();
    },
    onSuccess(values: VerifyPaymentSessionResponse) {
      nprogress.reset();

      if (values.status) {
        showNotification({
          color: 'green',
          title: 'Message',
          autoClose: 4500,
          message:
            'Payment successful, we will notify you when the service paid for has been activated!.',
        });
      } else {
        showNotification({
          color: 'red',
          title: 'Message',
          autoClose: 4500,
          message:
            'Payment transaction not verified, please ensure you have made this transfer before you verifying.',
        });
      }
    },
  });
}
