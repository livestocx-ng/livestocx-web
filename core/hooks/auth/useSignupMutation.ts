import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';
import { authApi } from '@/core/api/sdk';
import { CreateAccountDTO, SignupResponsePayload } from '@/core/sdk/auth';

export default function useSignupMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: CreateAccountDTO) => {
      nprogress.start();

      const { data } = await authApi.authControllerSignUp({
        ...values,
      });

      return { data, email: values.email };
    },
    onError: () => {
      nprogress.reset();
    },
    onSuccess(values: { email: string; data: SignupResponsePayload }) {
      nprogress.reset();

      router.push(
        `/signup-verification?email=${values.email}&hash=${values.data.signupVerificationHash}`
      );

      return showNotification({
        color: 'green',
        title: 'Message',
        autoClose: 5000,
        message: 'Success, enter the OTP sent to your email to complete your registration.',
      });
    },
  });
}
