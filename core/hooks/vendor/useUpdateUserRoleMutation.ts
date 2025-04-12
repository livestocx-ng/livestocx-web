import { useMutation } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';
import { vendorProfileApi } from '@/core/api/sdk';
import { UpdateUserRoleResponse, UpdateVendorProfileDto } from '@/core/sdk/vendor';
import { useAppContext } from '../../context';

export default function useUpdateUserRoleMutation() {
  const { setAccountInfo, setVendorInfo } = useAppContext();

  return useMutation({
    mutationFn: async (values: UpdateVendorProfileDto) => {
      nprogress.start();

      const { data } = await vendorProfileApi.vendorProfileControllerUpdateUserRole({
        ...values,
      });

      return data;
    },
    onError: () => {
      nprogress.reset();
    },
    onSuccess(values: UpdateUserRoleResponse) {
      nprogress.reset();

      showNotification({
        color: 'green',
        title: 'Message',
        autoClose: 4500,
        message: 'User role updated successfully.',
      });

      setVendorInfo(values.vendorInfo);
      setAccountInfo(values.accountInfo);
    },
  });
}
