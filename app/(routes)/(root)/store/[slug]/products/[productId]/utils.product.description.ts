import { AccountInfo } from '@/core/sdk/account';
import { ProductInfo } from '@/core/sdk/marketplace';

type ShowNotificationFunction = (notification: { title: string; message: string }) => void;

export function handleCallSeller(
  accountInfo: AccountInfo | null,
  productInfo: ProductInfo,
  showNotification: ShowNotificationFunction
) {
  if (!accountInfo) {
    showNotification({
      title: 'Message',
      message: 'Please login to access the seller`s contact information.',
    });
  } else {
    window.location.href = `tel:${productInfo?.vendor.phoneNumber}`;
  }
}
