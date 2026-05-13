import { BlogInfo } from '../sdk/communication';
import { ProductInfo } from '../sdk/marketplace';
import { VendorInfo } from '../sdk/vendor';
import { BlogItem } from '../types/types';

export function formatProductSlug(product: ProductInfo): string {
  const formattedProductName = product?.name.replace(/,/g, '');

  const formattedProductNameWithoutCommas = formattedProductName?.replace(/\s+/g, '-').toLowerCase();

  const slug = `${formattedProductNameWithoutCommas}_${product?.productId.toLowerCase()}`;

  return slug.toLowerCase() ?? '';
}

export function formatVendorSlug(vendor: VendorInfo): string {
  return vendor?.slug.toLowerCase();
}

export function formatBlogSlug(blog: BlogInfo): string {
  const formattedTitle = blog?.title?.replace(/,/g, '').replace(/\s+/g, '-').toLowerCase() ?? '';
  return `${formattedTitle}_${blog?.id}`.toLowerCase();
}

export function getProductIdFromSlug(slug: string): string {
  return slug.split('_')[1];
}

export function getVendorIdFromSlug(slug: string): string {
  return slug.split('_')[1];
}
