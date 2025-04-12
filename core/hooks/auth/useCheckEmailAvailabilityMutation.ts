import { useMutation } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';
import { helperApi } from '@/core/api/sdk';
import { AvailabilityCheckInfo } from '@/core/sdk/auth';

export default function useCheckEmailAvailabilityMutation() {
  return useMutation({
    mutationFn: async (email: string) => {
      nprogress.start();

      const { data } = await helperApi.authHelperControllerCheckEmailAvailability(email);

      return data;
    },
    onError: () => {
      nprogress.reset();
    },
    onSuccess(values: AvailabilityCheckInfo) {
      nprogress.reset();

      if (!values.isAvailable) {
        return showNotification({
          color: 'red',
          title: 'Message',
          autoClose: 5000,
          message: 'Email is already in use by another customer.',
        });
      }
    },
  });
}
