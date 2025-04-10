import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';
import { passwordApi } from '@/core/api/sdk';
import { ResetPasswordDTO } from '@/core/sdk/auth';

export default function useResetPasswordMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: ResetPasswordDTO) => {
      nprogress.start();

      return await passwordApi.authControllerResetPassword({
        ...values,
      });
    },
    onError: () => {
      nprogress.reset();
    },
    onSuccess(_values: any) {
      nprogress.reset();

      router.push('/signin');

      return showNotification({
        color: 'green',
        title: 'Message',
        autoClose: 4000,
        message: 'Password reset successful.',
      });
    },
  });
}
