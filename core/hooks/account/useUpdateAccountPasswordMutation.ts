import { useMutation } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';
import { meApi } from '@/core/api/sdk';
import { UpdateAccountPasswordDTO } from '@/core/sdk/account';

export default function useUpdateAccountPasswordMutation() {
  return useMutation({
    mutationFn: async (values: UpdateAccountPasswordDTO) => {
      nprogress.start();

      await meApi.accountControllerUpdateAccountPassword(values);
    },
    onError: () => {
      nprogress.reset();
    },
    onSuccess() {
      nprogress.reset();

      return showNotification({
        color: 'green',
        title: 'Message',
        message: `Account password updated successfully.`,
      });
    },
  });
}
