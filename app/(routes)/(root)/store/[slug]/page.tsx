'use client';

import React from 'react';
import { IconMessage, IconPhone, IconShare } from '@tabler/icons-react';
import { Box, Button, Flex, Group, Image, Skeleton, Stack, Text, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import StoreProductCard from '@/core/components/cards/store_product_card';
import StoreProfileHeader from '@/core/components/headers/store_profile_header';
import { useAppContext } from '@/core/context';
import useFetchStoreProductsQuery from '@/core/hooks/store/useFetchStoreProductsQuery';
import useFetchStoreProfileQuery from '@/core/hooks/store/useFetchStoreProfileQuery';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const StoreProfilePage = ({ params }: PageProps) => {
  const { slug } = React.use(params);

  const {
    storeInfo: contextStoreInfo,
    accountInfo,
    storeProducts: contextStoreProducts,
    storeProductsCurrentPage,
  } = useAppContext();

  const { data: storeProfileData, isLoading: isProfileLoading } = useFetchStoreProfileQuery({
    storeSlug: slug,
  });

  const isMatchingStore = Boolean(
    contextStoreInfo &&
      (contextStoreInfo.slug?.toLowerCase() === slug.toLowerCase() ||
        contextStoreInfo.id === slug)
  );

  const storeInfo = storeProfileData || (isMatchingStore ? contextStoreInfo : null);
  const storeId = storeInfo?.id ? parseInt(storeInfo.id, 10) : 0;

  const { data: productsData, isLoading: isProductsLoading } = useFetchStoreProductsQuery({
    storeId,
    currentPage: storeProductsCurrentPage || 1,
  });

  const storeProducts = productsData?.products || (isMatchingStore ? contextStoreProducts : []);
  const isProductsLoadingState =
    (isProfileLoading || isProductsLoading) && (!storeProducts || storeProducts.length === 0);

  return (
    <Box>
      <StoreProfileHeader storeInfo={storeInfo} />

      {/* Store Profile Section */}
      <Box px={{ base: 20, sm: 20, md: 20 }} py={30}>
        <Flex
          gap={30}
          direction={{ base: 'column', sm: 'column', md: 'row' }}
          align={{ base: 'center', sm: 'center', md: 'flex-start' }}
        >
          {/* Left Card - Store Logo/Info */}
          <Box
            w={120}
            h={120}
            style={{
              borderRadius: '8px',
              border: '2px solid #e9ecef',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f8f9fa',
              overflow: 'hidden',
            }}
          >
            {isProfileLoading && !storeInfo ? (
              <Skeleton height={120} width={120} />
            ) : (
              <Image
                src={storeInfo?.avatar}
                alt="Store Logo"
                w={100}
                h={100}
                fit="contain"
                fallbackSrc="/icons/logo.svg"
              />
            )}
          </Box>

          {/* Right Section - Store Info & Actions */}
          <Box flex={1}>
            <Stack gap={20}>
              {/* Store Name & Location */}
              <Stack gap={8}>
                {isProfileLoading && !storeInfo ? (
                  <>
                    <Skeleton height={28} width={200} />
                    <Skeleton height={18} width={140} />
                  </>
                ) : (
                  <>
                    <Title order={2} fw={700} c="dark" fz={{ base: 24, sm: 28, md: 32 }}>
                      {storeInfo?.name || 'Store'}
                    </Title>
                    <Text fz={16} c="dimmed">
                      {[storeInfo?.city, storeInfo?.state].filter(Boolean).join(', ')}
                    </Text>
                  </>
                )}
              </Stack>

              {/* Action Buttons */}
              <Group gap={15} mt={10}>
                <Button color="dark" leftSection={<IconMessage size={18} />} size="md" radius="md">
                  Chat Seller
                </Button>

                <Button
                  color="dark"
                  leftSection={<IconPhone size={18} />}
                  size="md"
                  radius="md"
                  onClick={() => {
                    if (!accountInfo) {
                      showNotification({
                        title: 'Message',
                        message: 'Please login to access the seller`s contact information.',
                      });
                    } else if (storeInfo?.phoneNumber) {
                      window.location.href = `tel:${storeInfo.phoneNumber}`;
                    }
                  }}
                >
                  Call Seller
                </Button>

                <Button color="green" leftSection={<IconShare size={18} />} size="md" radius="md">
                  Share
                </Button>
              </Group>
            </Stack>
          </Box>
        </Flex>
      </Box>

      {/* Store Products Section */}
      <Box
        px={{ base: 10, sm: 10, md: 20 }}
        pb={40}
        style={{
          filter: storeInfo?.isAccountDisabled ? 'blur(8px)' : 'none',
          pointerEvents: storeInfo?.isAccountDisabled ? 'none' : 'auto',
        }}
      >
        {isProductsLoadingState ? (
          <Flex
            wrap="wrap"
            align="center"
            justify="space-evenly"
            gap={{ base: 15, sm: 15, md: 10 }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <Box
                key={i}
                w={{ base: '48%', sm: '48%', md: 180 }}
                h={320}
                style={{
                  borderRadius: '10px',
                  border: '1px solid #eee',
                  overflow: 'hidden',
                }}
              >
                <Skeleton height={180} />
                <Stack p={10} gap={8}>
                  <Skeleton height={16} width="80%" />
                  <Skeleton height={14} width="50%" />
                  <Skeleton height={12} width="40%" />
                </Stack>
              </Box>
            ))}
          </Flex>
        ) : storeProducts && storeProducts.length > 0 ? (
          <Flex
            wrap="wrap"
            align="center"
            justify="space-evenly"
            gap={{ base: 15, sm: 15, md: 10 }}
          >
            {storeProducts.map((product) => (
              <StoreProductCard key={product.id} storeSlug={slug} product={product} />
            ))}
          </Flex>
        ) : (
          <Box py={40} style={{ textAlign: 'center' }}>
            <Text c="dimmed" size="lg">
              No products found in this store.
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default StoreProfilePage;

