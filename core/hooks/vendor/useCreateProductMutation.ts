import { useAppContext } from '../../context';
import { nprogress } from '@mantine/nprogress';
import { vendorProductApi } from '@/core/api/sdk';
import { useMutation } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { CreateProductDto, VendorProductInfo } from '@/core/sdk/vendor';

export default function useCreateProductMutation() {
  const { vendorProducts, setVendorProducts } = useAppContext();

  return useMutation({
    mutationFn: async (payload: { values: CreateProductDto; closeModal: () => void }) => {
      nprogress.start();

      const { data } = await vendorProductApi.vendorProductControllerCreateProduct(payload.values);

      return { data, closeModal: payload.closeModal };
    },
    onError: () => {
      nprogress.reset();
    },
    onSuccess(result: { data: VendorProductInfo; closeModal: () => void }) {
      nprogress.reset();

      showNotification({
        color: 'green',
        title: 'Message',
        autoClose: 3000,
        message: 'Product created successfully.',
      });

      console.log('[CREATE-PRODUCT-MUTATION-SUCCESSFUL] :: ', result.data);

      setVendorProducts([result.data, ...vendorProducts]);

      result.closeModal();
    },
  });
}
