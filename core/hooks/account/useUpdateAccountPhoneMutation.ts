import { useMutation } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';
import { manageContactInfoApi } from '@/core/api/sdk';
import { AccountInfo, UpdateAccountPhoneDTO } from '@/core/sdk/account';
import { useAppContext } from '../../context';

export default function useUpdateAccountPhoneMutation() {
  const { setAccountInfo } = useAppContext();

  return useMutation({
    mutationFn: async (values: UpdateAccountPhoneDTO) => {
      nprogress.start();

      const { data } = await manageContactInfoApi.accountControllerUpdateAccountPhone(values);

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
        message: `Account phone number updated successfully.`,
      });

      return setAccountInfo(payload!);
    },
  });
}
