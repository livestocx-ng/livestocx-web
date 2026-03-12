import { useMutation } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';
import { vendorProductApi } from '@/core/api/sdk';
import { UpdateProductDto, VendorProductInfo } from '@/core/sdk/vendor';
import { useAppContext } from '../../context';

export default function useUpdateProductMutation() {
  const { vendorProducts, setVendorProducts } = useAppContext();

  return useMutation({
    mutationFn: async (payload: {
      productId: number;
      values: UpdateProductDto;
      closeModal: () => void;
    }) => {
      nprogress.start();

      const { data } = await vendorProductApi.vendorProductControllerUpdateProduct(
        payload.productId,
        {
          ...payload.values,
        }
      );

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
        message: 'Product updated successfully.',
      });

      console.log('[UPDATED-PRODUCT-MUTATION] :: ', result.data);

      setVendorProducts(
        vendorProducts.map((product) => (product.id === result.data.id ? result.data : product))
      );

      result.closeModal();
    },
  });
}
