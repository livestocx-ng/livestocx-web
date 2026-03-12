'use client';
import { useAppContext } from '@/core/context';
import ProductCard from '../cards/product_card';
import { ProductDisplayType } from '@/core/types';
import { useEffect, useRef, useState } from 'react';
import { ProductInfo } from '@/core/sdk/marketplace';
import { productDisplayTypes } from '@/core/utilities';
import { TestimonialInfo } from '@/core/sdk/communication';
import { Box, Button, Flex, Group, Pagination } from '@mantine/core';
import { TestimonialCard } from '@/core/components/cards/testimonial-card';
import { createProductGridItems } from '@/core/middlewares/display-middleware';
import useFetchMarketplaceProductsQuery from '@/core/hooks/marketplace/useFetchMarketplaceProductsQuery';

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

      <Box mt={{ base: 10, sm: 10, md: 10 }}>
        {(() => {
          const gridItems = createProductGridItems(marketplaceProducts, testimonials, 7);
          const rows: React.ReactNode[] = [];
          let productRow: React.ReactNode[] = [];

          gridItems.forEach((item, idx) => {
            if (item.type === 'PRODUCT') {
              productRow.push(<ProductCard key={item.id} product={item.data as ProductInfo} />);
            } else if (item.type === 'TESTIMONIAL') {
              // Flush the current product row if it has items
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

              // Render testimonial as a full-width row
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

          // Flush any remaining products
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
        })()}
      </Box>

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
