import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';
import { passwordApi } from '@/core/api/sdk';
import { ResetPasswordOTPVerificationResponsePayload, ResetPasswordVerificationDTO } from '@/core/sdk/auth';

export default function useResetPasswordVerificationMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: ResetPasswordVerificationDTO) => {
      nprogress.start();

      const response= await passwordApi.authControllerResetPasswordOtpVerification({
        ...values,
      });

      return response.data;
    },
    onError: () => {
      nprogress.reset();
    },
    onSuccess(values: ResetPasswordOTPVerificationResponsePayload) {
      nprogress.reset();

      router.push(`/reset-password?passwordResetToken=${values.passwordResetToken}&accountId=${values.accountId}`);

      return showNotification({
        color: 'green',
        title: 'Message',
        autoClose: 4000,
        message: 'Success, create your new password.',
      });
    },
  });
}
