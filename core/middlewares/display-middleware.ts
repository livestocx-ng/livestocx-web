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

  while (productIndex < products.length) {
    const remainingProducts = products.length - productIndex;
    const batchSize = Math.min(interval, remainingProducts);

    // Push next batch of products
    for (let i = 0; i < batchSize; i++) {
      const product = products[productIndex++];
      gridItems.push({
        type: 'PRODUCT',
        id: product.id,
        data: product,
      });
    }

    // Add a testimonial *only if* there are more products left afterward
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

