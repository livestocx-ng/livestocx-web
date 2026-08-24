import { AccountInfo } from '@/core/sdk/account';
import { ProductInfo, StoreInfo } from '@/core/sdk/marketplace';
import { VendorInfo } from '@/core/sdk/vendor';

type ShowNotificationFunction = (notification: {
  title: string;
  message: string;
  color?: string;
  autoClose?: number | false;
}) => void;

export function handleCallSeller(
  accountInfo: AccountInfo | null,
  productInfo: ProductInfo,
  storeInfo: StoreInfo | null,
  showNotification: ShowNotificationFunction
) {
  if (!accountInfo) {
    showNotification({
      title: 'Message',
      message: 'Please login to access the seller`s contact information.',
    });
  } else if(storeInfo?.hasPremiumSubscription === false) {
    showNotification({
      title: 'Warning',
      color: 'orange',
      autoClose: 4500,
      message: 'This seller is not using premium features, so contact phone number is unavailable.',
    });
  } else {
    window.location.href = `tel:${productInfo?.vendor.phoneNumber}`;
  }
}
