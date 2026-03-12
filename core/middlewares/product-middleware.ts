import { ProductInfo } from '../sdk/marketplace';
import { showNotification } from '@mantine/notifications';

export async function CallProductVendorHandler(product: ProductInfo) {
  if (product?.vendor.phoneNumber && product?.vendor.phoneNumber.trim() !== '') {
    // Trigger phone call
    window.open(`tel:${product?.vendor.phoneNumber}`, '_self');
  } else {
    showNotification({
      title: 'Message',
      autoClose: 5000,
      message: 'This seller has no contact phone number.',
    });
  }
}
