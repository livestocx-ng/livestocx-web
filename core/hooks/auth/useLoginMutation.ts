import { useMutation } from '@tanstack/react-query';
import { nprogress } from '@mantine/nprogress';
import { authApi } from '@/core/api/sdk';
import { SigninDTO } from '@/core/sdk/auth';
import { useAppContext } from '../../context';

export default function useLoginMutation() {
  const { setAuthToken } = useAppContext();

  return useMutation({
    mutationFn: async (values: SigninDTO) => {
      nprogress.start();

      return await authApi.authControllerSigninDonor({
        ...values,
      });
    },
    onError: () => {
      nprogress.reset();
    },
    onSuccess(values) {
      nprogress.reset();

      console.log('USER-LOGIN-SUCCESS :: ', values);

      setAuthToken(values.data.token);
    },
  });
}
