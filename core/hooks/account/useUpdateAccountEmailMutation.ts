import { useMutation } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';
import { manageContactInfoApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';
import { AccountInfo, VerifyNewAccountEmailDTO } from '@/core/sdk/account';

export default function useVerifyNewAccountEmailMutation() {
  const { setAccountInfo } = useAppContext();

  return useMutation({
    mutationFn: async (values: VerifyNewAccountEmailDTO) => {
      nprogress.start();

      const { data } = await manageContactInfoApi.accountControllerVerifyNewAccountEmail(values);

      return data;
    },
    onError: () => {
      nprogress.reset();
    },
    onSuccess(payload: AccountInfo) {
      nprogress.reset();

      showNotification({
        color: 'green',
        title: 'Message',
        message: `Account email verified successfully.`,
      });

      setAccountInfo(payload);

      return payload;
    },
  });
}
