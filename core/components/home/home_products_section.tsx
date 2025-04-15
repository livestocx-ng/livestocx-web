'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Button, Center, Flex, Group, Pagination, Text } from '@mantine/core';
import { TestimonialCard } from '@/core/components/cards/testimonial-card';
import { useAppContext } from '@/core/context';
import useFetchMarketplaceProductsQuery from '@/core/hooks/marketplace/useFetchMarketplaceProductsQuery';
import { createProductGridItems } from '@/core/middlewares/display-middleware';
import { TestimonialInfo } from '@/core/sdk/communication';
import { ProductInfo } from '@/core/sdk/marketplace';
import { ProductDisplayType } from '@/core/types';
import { productDisplayTypes } from '@/core/utilities';
import ProductCard from '../cards/product_card';

const HomeProductsSection = () => {
  const [activePage, setPage] = useState(1);

  const productsRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<{ productDisplayType: ProductDisplayType }>({
    productDisplayType: 'RECOMMENDED',
  });

  const {
    marketplaceProducts,
    testimonials,
    // marketPlaceProductsCurrentPage,
    marketPlaceProductsTotalPages,
  } = useAppContext();

  const { refetch } = useFetchMarketplaceProductsQuery({
    currentPage: activePage,
    displayType: formData.productDisplayType,
  });

  useEffect(() => {
    refetch();
  }, [formData.productDisplayType, activePage]);

  return (
    <Box px={20} py={10} ref={productsRef}>
      <Flex gap={10} align="center">
        {productDisplayTypes.map((item) => (
          <Button
            fz={12}
            radius="md"
            key={item.value}
            h={{ base: 30, sm: 30, md: 30 }}
            onClick={() => {
              setFormData({ ...formData, productDisplayType: item.value });
            }}
            style={{
              backgroundColor: formData.productDisplayType === item.value ? `black` : '',
              border:
                formData.productDisplayType === item.value ? '1px solid black' : '1px solid green',
            }}
            variant={formData.productDisplayType === item.value ? 'filled' : 'outline'}
          >
            {item.title}
          </Button>
        ))}
      </Flex>

      <Flex
        wrap="wrap"
        align="center"
        justify="space-evenly"
        gap={{ base: 10, sm: 10, md: 15 }}
        mt={{ base: 10, sm: 10, md: 10 }}
      >
        {createProductGridItems(marketplaceProducts, testimonials, 4).map((item) =>
          item.type === 'PRODUCT' ? (
            <ProductCard key={item.data.createdAt} product={item.data as ProductInfo} />
          ) : (
            <TestimonialCard testimonial={item.data as TestimonialInfo} key={item.data.createdAt} />
          )
        )}
      </Flex>

      <Group justify="center" hidden={marketPlaceProductsTotalPages <= 1}>
        <Pagination
          mt={20}
          fz={14}
          // size={24}
          color="black"
          style={{
            fontSize: '12px',
          }}
          value={activePage}
          onChange={(value: number) => {
            setPage(value);

            setTimeout(() => {
              productsRef?.current?.scrollIntoView({
                behavior: 'smooth',
              });
            }, 2500);
          }}
          total={marketPlaceProductsTotalPages}
        />
      </Group>
    </Box>
  );
};

export default HomeProductsSection;
