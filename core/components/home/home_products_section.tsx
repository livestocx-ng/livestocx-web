'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Flex, Group, Pagination, Skeleton, Text, Title, UnstyledButton } from '@mantine/core';
import { TestimonialCard } from '@/core/components/cards/testimonial-card';
import { useAppContext } from '@/core/context';
import useFetchMarketplaceProductsQuery from '@/core/hooks/marketplace/useFetchMarketplaceProductsQuery';
import { createProductGridItems } from '@/core/middlewares/display-middleware';
import { TestimonialInfo } from '@/core/sdk/communication';
import { ProductInfo } from '@/core/sdk/marketplace';
import { HomeIntent, ProductDisplayType } from '@/core/types';
import { homeIntents, productSortFilters } from '@/core/utilities';
import ProductCard from '../cards/product_card';

const ProductSkeleton = () => (
  <Box
    bg="white"
    h={320}
    w={{ base: '48%', sm: '48%', md: 180 }}
    style={{
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
      overflow: 'hidden',
    }}
  >
    <Skeleton height={180} radius={0} />
    <Box p={10} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Skeleton height={14} width="90%" />
      <Skeleton height={16} width="50%" />
      <Skeleton height={18} width="70%" />
      <Skeleton height={12} width="60%" />
    </Box>
  </Box>
);

const HomeProductsSection = () => {
  const router = useRouter();
  const [activePage, setPage] = useState(1);
  const [activeIntent] = useState<HomeIntent>('BUY');
  const productsRef = useRef<HTMLDivElement>(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  const [formData, setFormData] = useState<{ productDisplayType: ProductDisplayType }>({
    productDisplayType: 'RECOMMENDED',
  });

  const { authToken, marketplaceProducts, testimonials, marketPlaceProductsTotalPages } =
    useAppContext();

  const { refetch } = useFetchMarketplaceProductsQuery({
    currentPage: activePage,
    displayType: formData.productDisplayType,
  });

  const activeSortFilter =
    productSortFilters.find((filter) => filter.value === formData.productDisplayType) ??
    productSortFilters[0];

  const handleIntentClick = (intent: HomeIntent) => {
    if (intent === 'BUY') {
      return;
    }

    if (intent === 'SELL') {
      router.push(authToken ? '/dashboard/products' : '/signup');
      return;
    }

    if (intent === 'VET') {
      router.push('/veterinary-response');
      return;
    }

    window.open('https://climateresilience.livestocx.com', '_blank');
  };

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
    <Box
      px={{ base: 14, sm: 16, md: 20 }}
      py={{ base: 16, sm: 20, md: 24 }}
      ref={productsRef}
      style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#faf9f7' }}
    >
      {/* <Flex gap="sm" wrap="wrap" align="stretch" style={{ position: 'relative', zIndex: 1 }}>
        {homeIntents.map((intent) => {
          const IntentIcon = intent.icon;
          const isActive = intent.value === activeIntent;

          return (
            <UnstyledButton
              key={intent.value}
              onClick={() => handleIntentClick(intent.value)}
              style={{
                flex: '1 1 140px',
                minWidth: 140,
                padding: '12px 16px',
                borderRadius: 12,
                border: isActive ? '2px solid #006838' : '1px solid var(--mantine-color-gray-3)',
                backgroundColor: isActive ? '#00683810' : 'white',
                boxShadow: isActive ? 'none' : '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              <Flex direction="column" align="center" gap={6}>
                <IntentIcon size={20} color={isActive ? '#006838' : '#666'} />
                <Text size="sm" fw={600} c={isActive ? 'primary.9' : 'dark.6'} ta="center">
                  {intent.title}
                </Text>
              </Flex>
            </UnstyledButton>
          );
        })}
      </Flex> */}

      <Box style={{ position: 'relative', zIndex: 1 }}>
        <Title
          order={3}
          fz={{ base: 18, sm: 20, md: 22 }}
          mb="xs"
          style={{
            fontFamily: 'var(--mantine-font-family-headings)',
            fontWeight: 700,
          }}
        >
          {activeSortFilter.sectionHeading}
        </Title>

        <Group gap="md" mb="md">
          {productSortFilters.map((filter) => {
            const isActive = formData.productDisplayType === filter.value;

            return (
              <UnstyledButton
                key={filter.value}
                onClick={() => {
                  setFormData({ productDisplayType: filter.value });
                  setPage(1);
                }}
              >
                <Text
                  fz={{ base: 12, md: 14 }}
                  fw={isActive ? 700 : 500}
                  c={isActive ? 'primary.9' : 'dimmed'}
                  style={{
                    borderBottom: isActive ? '2px solid #006838' : '2px solid transparent',
                    paddingBottom: 4,
                  }}
                >
                  {filter.title}
                </Text>
              </UnstyledButton>
            );
          })}
        </Group>

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
          color="primary"
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
