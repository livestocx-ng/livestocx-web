import { TestimonialInfo } from '../sdk/communication';
import { ProductInfo } from '../sdk/marketplace';
import { GridItem } from '../types';

export function createProductGridItems(
  products: ProductInfo[],
  testimonials: TestimonialInfo[],
  interval: number
): GridItem[] {
  const gridItems: GridItem[] = [];
  let productIndex = 0;
  let testimonialIndex = 0;

  // Process products and insert testimonials between product groups
  while (productIndex < products.length) {
    const remainingProducts = products.length - productIndex;
    const batchSize = Math.min(interval, remainingProducts);

    // Add a batch of products (these will form a row)
    for (let i = 0; i < batchSize; i++) {
      if (productIndex < products.length) {
        const product = products[productIndex++];
        gridItems.push({
          type: 'PRODUCT',
          id: product.id,
          data: product,
        });
      }
    }

    // Insert a testimonial between product groups (only if more products remain)
    // This ensures testimonials appear as full-width breaks between product rows
    if (productIndex < products.length && testimonialIndex < testimonials.length) {
      const testimonial = testimonials[testimonialIndex++];
      gridItems.push({
        type: 'TESTIMONIAL',
        id: testimonial.id,
        data: testimonial,
      });
    }
  }

  return gridItems;
}
