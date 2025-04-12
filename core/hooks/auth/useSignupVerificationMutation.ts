import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';
import { authApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';
import { CompleteSignupVerificationDTO, SignupVerificationResponsePayload } from '@/core/sdk/auth';

export default function useSignupVerificationMutation() {
  const router = useRouter();

  const { setAuthToken } = useAppContext();

  return useMutation({
    mutationFn: async (values: CompleteSignupVerificationDTO) => {
      nprogress.start();

      const { data } = await authApi.authControllerSignupCompleteVerification({
        ...values,
      });

      return data;
    },
    onError: () => {
      nprogress.reset();
    },
    onSuccess(data: SignupVerificationResponsePayload) {
      nprogress.reset();

      router.push(`/`);

      setAuthToken(data.token);

      return showNotification({
        color: 'green',
        title: 'Message',
        autoClose: 5000,
        message: 'Account created successfully.',
      });
    },
  });
}
