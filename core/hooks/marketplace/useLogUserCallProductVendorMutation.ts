import { useMutation } from '@tanstack/react-query';
import { nprogress } from '@mantine/nprogress';
import { productApi } from '@/core/api/sdk';

export default function useLogUserCallProductVendorMutation() {
  return useMutation({
    mutationFn: async (productId: number) => {
      nprogress.start();

      const { data } = await productApi.marketplaceControllerRegisterCallSeller(productId);

      console.log('[LOG-USER-CALL-PRODUCT-VENDOR-MUTATION-DATA] :: ', data);

      return null;
    },
    onError: () => {},
    onSuccess(_values: any) {
      console.log('[LOG-USER-CALL-PRODUCT-VENDOR-MUTATION-SUCCESS] :: ', _values);
    },
  });
}
