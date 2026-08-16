'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@mantine/notifications';
import { IconBuildingStore, IconMessage, IconPhone } from '@tabler/icons-react';
import { Box, Button, Divider, Flex, List, Skeleton, Stack, Text, Title } from '@mantine/core';
import ProductDescriptionHeader from '@/core/components/headers/product_description_header';
import ProductMediaSlider from '@/core/components/sliders/product_media_slider';
import { useAppContext } from '@/core/context';
import useFetchProductInfoQuery from '@/core/hooks/marketplace/useFetchProductInfoQuery';
import { priceFormatter } from '@/core/middlewares';
import { formatProductSlug } from '@/core/middlewares/slug-formatter';
import { handleCallSeller } from './utils.product.description';

interface PageProps {
  params: Promise<{
    slug: string;
    productId: string;
  }>;
}

const StoreProfileProductDescriptionPage = ({ params }: PageProps) => {
  const router = useRouter();

  const { slug, productId } = React.use(params);

  const { accountInfo, productInfo: contextProductInfo } = useAppContext();

  const { data, isLoading } = useFetchProductInfoQuery({
    productId,
  });

  const isMatchingContextProduct = Boolean(
    contextProductInfo &&
      (contextProductInfo.id === productId ||
        contextProductInfo.productId === productId ||
        formatProductSlug(contextProductInfo) === productId ||
        productId.endsWith(`_${contextProductInfo.productId?.toLowerCase()}`))
  );

  const productInfo = data?.productInfo || (isMatchingContextProduct ? contextProductInfo : null);
  const loading = isLoading && !productInfo;

  return (
    <Box>
      <ProductDescriptionHeader productInfo={productInfo} isLoading={loading} />
      <Flex w="100%" gap={{ base: 0, sm: 0, md: 20 }}>
        <Flex w="100%" direction={{ base: 'column', sm: 'column', md: 'row' }}>
          <Box w={{ sm: '100%', md: '80%' }} h="500px">
            {loading ? (
              <Skeleton height={500} radius="md" />
            ) : (
              <ProductMediaSlider productInfo={productInfo} />
            )}
          </Box>

          <Stack w={{ sm: '80%', md: '80%' }} px={{ base: 10, sm: 10, md: 20 }} mt={20} pb={40}>
            {loading ? (
              <Box
                w="100%"
                style={{ border: '1px solid #d5d5d5', borderRadius: '10px', padding: '16px' }}
              >
                <Skeleton height={28} width="70%" mb="md" />
                <Divider my="sm" />
                <Skeleton height={16} width="30%" mb="xs" />
                <Skeleton height={24} width="50%" mb="md" />
                <Divider my="sm" />
                <Skeleton height={16} width="40%" mb="xs" />
                <Skeleton height={60} width="100%" mb="md" />
                <Divider my="sm" />
                <Skeleton height={40} width="100%" mb="sm" />
                <Skeleton height={40} width="100%" />
              </Box>
            ) : (
              <Box
                w="100%"
                style={{ border: '1px solid #d5d5d5', borderRadius: '10px', padding: '10px' }}
              >
                <Title order={4}>{productInfo?.name}</Title>
                <Divider my="xs" />
                <Stack gap={0} mb={10}>
                  <Title order={6} c="dimmed">
                    Price
                  </Title>
                  {productInfo?.discountPrice &&
                  Number(productInfo.discountPrice) > 0 &&
                  Number(productInfo.discountPrice) !== Number(productInfo.price) ? (
                    <Flex gap={10} align="center">
                      <Title order={5} c="green">
                        {priceFormatter(Number(productInfo.discountPrice))}
                      </Title>
                      <Text td="line-through" c="dimmed" size="sm">
                        {priceFormatter(Number(productInfo.price))}
                      </Text>
                    </Flex>
                  ) : (
                    <Title order={5}>
                      {priceFormatter(Number(productInfo?.price || 0))}
                    </Title>
                  )}
                </Stack>
                <Divider my="xs" />
                <Stack gap={0} mb={10}>
                  <Title order={6}>Description</Title>
                  <Text>{productInfo?.description || 'No description provided.'}</Text>
                </Stack>
                <Divider my="xs" />
                <Stack gap={6} mt={10} mb={10}>
                  <Title order={5}>Seller</Title>
                  <Text>Business Name: {productInfo?.vendor?.name || 'N/A'}</Text>
                </Stack>

                <Divider my="xs" />
                <Stack gap={6} mt={10} mb={10}>
                  <Title order={5}>Location</Title>
                  <Text>
                    Address: {productInfo?.vendor?.address || productInfo?.vendor?.formattedAddress || 'N/A'}
                  </Text>
                  <Flex justify="space-between">
                    <Text>State: {productInfo?.vendor?.state || 'N/A'}</Text>
                    <Text>City: {productInfo?.vendor?.city || 'N/A'}</Text>
                  </Flex>
                </Stack>

                <Divider my="xs" />
                <Stack gap={6} mt={10} mb={10}>
                  <Title order={5}>Store</Title>

                  <Button
                    fullWidth
                    style={{ backgroundColor: '#111111' }}
                    leftSection={<IconBuildingStore size={16} />}
                    onClick={() => {
                      const vendorSlug = productInfo?.vendor?.slug || slug;
                      if (vendorSlug) {
                        router.push(`/store/${vendorSlug}`);
                      }
                    }}
                  >
                    Visit Store
                  </Button>
                </Stack>
                <Divider my="xs" />
                <Stack gap={6} mt={10} mb={10}>
                  <Title order={5}>Contact</Title>
                  <Flex gap={10} mt={10}>
                    <Button
                      fullWidth
                      style={{ backgroundColor: '#111111' }}
                      leftSection={<IconPhone size={16} />}
                      onClick={() =>
                        productInfo && handleCallSeller(accountInfo, productInfo, showNotification)
                      }
                    >
                      Call Seller
                    </Button>

                    <Button
                      fullWidth
                      style={{ backgroundColor: '#111111' }}
                      leftSection={<IconMessage size={16} />}
                      onClick={() => {
                        /* Add chat functionality */
                      }}
                    >
                      Chat Seller
                    </Button>
                  </Flex>
                </Stack>
              </Box>
            )}

            <Box
              w="100%"
              style={{ border: '1px solid #d5d5d5', borderRadius: '10px', padding: '10px' }}
            >
              <Stack pr={15}>
                <Title order={5} c="red">
                  Safety Tips
                </Title>
                <List c="red">
                  <List.Item>
                    If you wish to meet a seller, meet in a place where there are other people
                    around and where you can easily leave if you feel uncomfortable.
                  </List.Item>
                  <List.Item>Be wary of sellers who ask for money upfront.</List.Item>
                  <List.Item>
                    Make sure the goods are what you expected and that they are in satisfactory
                    condition before you pay anything.
                  </List.Item>
                  <List.Item>
                    Review any paperwork carefully and don't pay until you are satisfied.
                  </List.Item>
                </List>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default StoreProfileProductDescriptionPage;

