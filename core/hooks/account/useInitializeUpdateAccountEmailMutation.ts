import { useMutation } from '@tanstack/react-query';
import { nprogress } from '@mantine/nprogress';
import { manageContactInfoApi } from '@/core/api/sdk';
import { UpdateAccountEmailDTO } from '@/core/sdk/account';

export default function useInitializeUpdateAccountEmailMutation() {
  return useMutation({
    mutationFn: async (values: UpdateAccountEmailDTO) => {
      nprogress.start();

      await manageContactInfoApi.accountControllerUpdateAccountEmail(values);

      return values.newEmail;
    },
    onError: () => {
      nprogress.reset();
    },
    onSuccess(newEmail: string) {
      nprogress.reset();

      return newEmail;
    },
  });
}
