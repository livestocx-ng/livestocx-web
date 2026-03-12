import { useMutation } from '@tanstack/react-query';
import { nprogress } from '@mantine/nprogress';
import { productApi } from '@/core/api/sdk';

export default function useLogUserChatProductVendorMutation() {
  return useMutation({
    mutationFn: async (productId: number) => {
      nprogress.start();

      const { data } = await productApi.marketplaceControllerRegisterContactSeller(productId);

      console.log('[LOG-USER-CHAT-PRODUCT-VENDOR-MUTATION-DATA] :: ', data);

      return null;
    },
    onError: () => {},
    onSuccess(_values: any) {
      console.log('[LOG-USER-CHAT-PRODUCT-VENDOR-MUTATION-SUCCESS] :: ', _values);
    },
  });
}
