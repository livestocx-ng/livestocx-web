'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IconBuildingStore, IconMessage, IconPhone } from '@tabler/icons-react';
import { Box, Button, Divider, Flex, List, Skeleton, Stack, Text, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import ProductCard from '@/core/components/cards/product_card';
import ProductDescriptionHeader from '@/core/components/headers/product_description_header';
import ProductMediaSlider from '@/core/components/sliders/product_media_slider';
import { useAppContext } from '@/core/context';
import useFetchProductInfoQuery from '@/core/hooks/marketplace/useFetchProductInfoQuery';
import useLogUserCallProductVendorMutation from '@/core/hooks/marketplace/useLogUserCallProductVendorMutation';
import useLogUserChatProductVendorMutation from '@/core/hooks/marketplace/useLogUserChatProductVendorMutation';
import { priceFormatter } from '@/core/middlewares';
import { formatProductSlug } from '@/core/middlewares/slug-formatter';
import { handleCallSeller, handleChatSeller } from './utils.product.description';

interface PageProps {
  params: Promise<{
    productId: string;
  }>;
}

const ProductDescriptionPage = ({ params }: PageProps) => {
  const router = useRouter();

  const { productId } = React.use(params);

  const {
    accountInfo,
    productInfo: contextProductInfo,
    productDetails: contextProductDetails,
  } = useAppContext();

  const { data, isLoading } = useFetchProductInfoQuery({
    productId,
  });

  const { mutate: logUserCallProductVendorMutation } = useLogUserCallProductVendorMutation();
  const { mutate: logUserChatProductVendorMutation } = useLogUserChatProductVendorMutation();

  const isMatchingContextProduct = Boolean(
    contextProductInfo &&
      (contextProductInfo.id === productId ||
        contextProductInfo.productId === productId ||
        formatProductSlug(contextProductInfo) === productId ||
        productId.endsWith(`_${contextProductInfo.productId?.toLowerCase()}`))
  );

  const productInfo = data?.productInfo || (isMatchingContextProduct ? contextProductInfo : null);
  const productDetails = data?.productDetails || contextProductDetails;
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
                      if (productInfo?.vendor?.slug) {
                        router.push(`/store/${productInfo.vendor.slug}`);
                      }
                    }}
                  >
                    Visit Store
                  </Button>
                </Stack>
                <Divider my="xs" />
                <Stack
                  gap={6}
                  mt={10}
                  mb={10}
                  style={{
                    // display:
                    //   productInfo?.vendor?.isProductUploadSubscriptionActive === true
                    //     ? 'block'
                    //     : 'none',
                  }}
                >
                  <Title order={5}>Contact</Title>
                  <Flex gap={10} mt={10}>
                    <Button
                      fullWidth
                      style={{ backgroundColor: '#111111' }}
                      leftSection={<IconPhone size={16} />}
                      onClick={() =>
                        productInfo &&
                        handleCallSeller(
                          accountInfo,
                          productInfo,
                          showNotification,
                          logUserCallProductVendorMutation
                        )
                      }
                    >
                      Call Seller
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

      {/* Related Products Section */}
      {productDetails?.relatedProducts && productDetails.relatedProducts.length > 0 && (
        <Box mt={10} mb={40} px={{ base: 10, sm: 10, md: 20 }}>
          <Title order={3} mb={10} c="black">
            Related Products
          </Title>
          <Flex
            wrap="wrap"
            align="center"
            justify="space-evenly"
            gap={{ base: 10, sm: 10, md: 15 }}
            mt={{ base: 10, sm: 10, md: 10 }}
          >
            {productDetails.relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default ProductDescriptionPage;

