import { AccountInfo } from '@/core/sdk/account';
import { ProductInfo } from '@/core/sdk/marketplace';

type ShowNotificationFunction = (notification: { title: string; message: string }) => void;

export function handleCallSeller(
  accountInfo: AccountInfo | null,
  productInfo: ProductInfo,
  showNotification: ShowNotificationFunction,
  logUserCallProductVendorMutation: (productId: number) => void
) {
  if (!accountInfo) {
    showNotification({
      title: 'Message',
      message: 'Please login to access the seller`s contact information.',
    });
  } else {
    window.location.href = `tel:${productInfo?.vendor.phoneNumber}`;
  
    logUserCallProductVendorMutation(Number(productInfo.id));
  }
}

export function handleChatSeller(
  accountInfo: AccountInfo | null,
  productInfo: ProductInfo,
  showNotification: ShowNotificationFunction,
  logUserChatProductVendorMutation: (productId: number) => void
) {
  if (!accountInfo) {
    showNotification({
      title: 'Message',
      message: 'Please login to chat with the seller.',
    });
  } else {
    logUserChatProductVendorMutation(Number(productInfo.id));
  }
}
