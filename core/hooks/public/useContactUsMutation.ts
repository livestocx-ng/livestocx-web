import { useMutation } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';
import { supportApi } from '@/core/api/sdk';
import { ContactUsDTO } from '@/core/sdk/account';

export default function useContactUsMutation() {
  return useMutation({
    mutationFn: async (values: ContactUsDTO) => {
      nprogress.start();

      await supportApi.supportControllerContactUs({
        ...values,
      });

      return '';
    },
    onError: () => {
      nprogress.reset();
    },
    onSuccess(_value: string) {
      nprogress.reset();

      showNotification({
        color: 'green',
        title: 'Message',
        autoClose: 4000,
        message: 'Ticket submitted, our support team will reply you shortly.',
      });

      return true;
    },
  });
}
