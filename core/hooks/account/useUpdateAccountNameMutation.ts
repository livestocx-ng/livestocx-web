import { useMutation } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';
import { manageContactInfoApi } from '@/core/api/sdk';
import { AccountInfo, UpdateAccountNameDTO } from '@/core/sdk/account';
import { useAppContext } from '../../context';

export default function useUpdateAccountNameMutation() {
  const { setAccountInfo } = useAppContext();

  return useMutation({
    mutationFn: async (values: UpdateAccountNameDTO) => {
      nprogress.start();

      const { data } = await manageContactInfoApi.accountControllerUpdateAccountName(values);

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
        message: `Account name updated successfully.`,
      });

      return setAccountInfo(payload!);
    },
  });
}
