import { AccountInfo } from '@/core/sdk/account';
import { ProductInfo } from '@/core/sdk/marketplace';

type ShowNotificationFunction = (notification: {
  title: string;
  message: string;
  color?: string;
  autoClose?: number | false;
}) => void;

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
  } else if (productInfo?.vendor?.isProductUploadSubscriptionActive === false) {
    showNotification({
      title: 'Warning',
      color: 'orange',
      autoClose: 4500,
      message: 'This seller is not using premium features, so contact phone number is unavailable.',
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
