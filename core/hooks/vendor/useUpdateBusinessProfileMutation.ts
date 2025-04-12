import { useMutation } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';
import { vendorProfileApi } from '@/core/api/sdk';
import { UpdateVendorProfileDto, VendorInfo } from '@/core/sdk/vendor';
import { useAppContext } from '../../context';

export default function useUpdateBusinessProfileMutation() {
  const { setVendorInfo } = useAppContext();

  return useMutation({
    mutationFn: async (values: UpdateVendorProfileDto) => {
      nprogress.start();

      const { data } = await vendorProfileApi.vendorProfileControllerUpdateVendorProfile({
        ...values,
      });

      return data;
    },
    onError: () => {
      nprogress.reset();
    },
    onSuccess(values: VendorInfo) {
      nprogress.reset();

      showNotification({
        color: 'green',
        title: 'Message',
        autoClose: 3000,
        message: 'Business profile, updated successfully.',
      });

      setVendorInfo(values);
    },
  });
}
