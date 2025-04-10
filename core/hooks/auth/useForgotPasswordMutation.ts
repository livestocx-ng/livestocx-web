import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';
import { passwordApi } from '@/core/api/sdk';
import { ForgotPasswordDTO } from '@/core/sdk/auth';

export default function useForgotPasswordMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: ForgotPasswordDTO) => {
      nprogress.start();

       await passwordApi.authControllerForgotPassword({
        ...values,
      });

      return values.email;
    },
    onError: () => {
      nprogress.reset();
    },
    onSuccess(email: string) {
      nprogress.reset();

      router.push(`/reset-password-verification?email=${email}`);

      return showNotification({
        color: 'green',
        title: 'Message',
        autoClose: 4000,
        message: 'Success, enter the OTP sent to your email address.',
      });
    },
  });
}
