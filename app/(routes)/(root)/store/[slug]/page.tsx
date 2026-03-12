'use client';

import React, { useEffect } from 'react';
import { IconMessage, IconPhone, IconShare } from '@tabler/icons-react';
import { Box, Button, Flex, Group, Image, Stack, Text } from '@mantine/core';
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

  const { storeInfo, accountInfo, storeProducts, storeProductsCurrentPage } = useAppContext();

  const { refetch } = useFetchStoreProfileQuery({
    storeSlug: slug,
  });

  const { refetch: refetchStoreProducts } = useFetchStoreProductsQuery({
    storeId: storeInfo?.id ? parseInt(storeInfo.id, 10) : 0,
    currentPage: storeProductsCurrentPage,
  });

  useEffect(() => {
    if (storeInfo === null) {
      refetch();
    }
  }, [storeInfo, slug]);

  useEffect(() => {
    if (storeInfo?.id === null) {
      refetchStoreProducts();
    }
  }, [storeInfo]);

  return (
    <Box>
      <StoreProfileHeader />

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
            }}
          >
            <Image
              src={storeInfo?.avatar}
              alt="Store Logo"
              w={100}
              h={100}
              fit="contain"
              fallbackSrc="/icons/logo.svg"
            />
          </Box>

          {/* Right Section - Store Info & Actions */}
          <Box flex={1}>
            <Stack gap={20}>
              {/* Store Name & Location */}
              <Stack gap={8}>
                {/* <Title order={1} fw={700} c="dark" fz={{ base: 28, sm: 32, md: 36 }}>
                  {storeInfo?.name || 'Farmers Choice'}
                </Title> */}
                <Text fz={16} c="dimmed">
                  {storeInfo?.city}, {storeInfo?.state}
                </Text>
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
                    if (accountInfo?.email === '') {
                      showNotification({
                        title: 'Message',
                        message: 'Please login to access the seller`s contact information.',
                      });
                    } else {
                      window.location.href = `tel:${storeInfo?.phoneNumber}`;
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
      {storeProducts && storeProducts.length > 0 && (
        <Box
          px={{ base: 10, sm: 10, md: 10 }}
          pb={40}
          style={{
            filter: storeInfo?.isAccountDisabled ? 'blur(8px)' : 'none',
            pointerEvents: storeInfo?.isAccountDisabled ? 'none' : 'auto',
          }}
        >
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
        </Box>
      )}
    </Box>
  );
};

export default StoreProfilePage;
