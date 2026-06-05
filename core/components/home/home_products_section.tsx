'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Group, Pagination, Skeleton } from '@mantine/core';
import { TestimonialCard } from '@/core/components/cards/testimonial-card';
import { useAppContext } from '@/core/context';
import useFetchMarketplaceProductsQuery from '@/core/hooks/marketplace/useFetchMarketplaceProductsQuery';
import { createProductGridItems } from '@/core/middlewares/display-middleware';
import { TestimonialInfo } from '@/core/sdk/communication';
import { ProductInfo } from '@/core/sdk/marketplace';
import { ProductDisplayType } from '@/core/types';
import { productDisplayTypes } from '@/core/utilities';
import ProductCard from '../cards/product_card';

const ProductSkeleton = () => (
  <Box
    h={320}
    style={{
      borderRadius: '10px',
      border: '1px solid #eee',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
    w={{ base: '48%', sm: '48%', md: 180 }}
  >
    <Skeleton height={180} radius="10px 10px 0 0" />
    <Box p={10} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Skeleton height={15} width="40%" />
      <Skeleton height={20} width="80%" />
      <Skeleton height={15} width="60%" />
    </Box>
  </Box>
);

const HomeProductsSection = () => {
  const [activePage, setPage] = useState(1);
  const productsRef = useRef<HTMLDivElement>(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  const [formData, setFormData] = useState<{ productDisplayType: ProductDisplayType }>({
    productDisplayType: 'RECOMMENDED',
  });

  const {
    marketplaceProducts,
    testimonials,
    marketPlaceProductsTotalPages,
  } = useAppContext();

  const { refetch } = useFetchMarketplaceProductsQuery({
    currentPage: activePage,
    displayType: formData.productDisplayType,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (productsRef.current) {
      observer.observe(productsRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (hasBeenVisible) {
      refetch();
    }
  }, [formData.productDisplayType, activePage, hasBeenVisible, refetch]);

  return (
    <Box px={20} py={10} ref={productsRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <Flex gap={10} align="center" style={{ position: 'relative', zIndex: 1 }}>
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

      <Box mt={{ base: 10, sm: 10, md: 10 }}>
        {!hasBeenVisible || !marketplaceProducts || marketplaceProducts.length === 0 ? (
          <Flex wrap="wrap" justify="space-evenly" gap={{ base: 10, sm: 10, md: 15 }} mt={8}>
            {Array.from({ length: 21 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </Flex>
        ) : (
          (() => {
            const gridItems = createProductGridItems(marketplaceProducts, testimonials, 7);
            const rows: React.ReactNode[] = [];
            let productRow: React.ReactNode[] = [];

            gridItems.forEach((item, idx) => {
              if (item.type === 'PRODUCT') {
                productRow.push(<ProductCard key={item.id} product={item.data as ProductInfo} />);
              } else if (item.type === 'TESTIMONIAL') {
                if (productRow.length > 0) {
                  rows.push(
                    <Flex
                      key={`products-row-${idx}`}
                      wrap="wrap"
                      align="center"
                      justify="space-evenly"
                      gap={{ base: 10, sm: 10, md: 15 }}
                      mt={8}
                    >
                      {productRow}
                    </Flex>
                  );
                  productRow = [];
                }

                rows.push(
                  <Box
                    key={`testimonial-row-${item.id}`}
                    w="100%"
                    style={{ display: 'flex', justifyContent: 'center' }}
                    mt={8}
                  >
                    <TestimonialCard testimonial={item.data as TestimonialInfo} />
                  </Box>
                );
              }
            });

            if (productRow.length > 0) {
              rows.push(
                <Flex
                  key="products-row-final"
                  wrap="wrap"
                  align="center"
                  justify="space-evenly"
                  gap={{ base: 10, sm: 10, md: 15 }}
                  mt={8}
                >
                  {productRow}
                </Flex>
              );
            }

            return rows;
          })()
        )}
      </Box>

      <Group justify="center" hidden={marketPlaceProductsTotalPages <= 1}>
        <Pagination
          mt={20}
          fz={14}
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
