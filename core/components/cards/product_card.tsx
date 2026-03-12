'use client';

import Link from 'next/link';
import {
  IconAwardFilled,
  IconHeart,
  IconHeartFilled,
  IconMessages,
  IconPhone,
  IconShare2,
} from '@tabler/icons-react';
import { Box, Flex, Image, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAppContext } from '@/core/context';
import useFetchUserListItemsQuery from '@/core/hooks/account/useFetchUserListItemsQuery';
import useLikeUnlikeProductMutation from '@/core/hooks/account/useLikeUnlikeProductMutation';
import { priceFormatter } from '@/core/middlewares';
import { CallProductVendorHandler } from '@/core/middlewares/product-middleware';
import { AddListItemDTO } from '@/core/sdk/account';
import { ProductInfo } from '@/core/sdk/marketplace';
import ShareProductModal from '../modals/share_product_modal';
import { formatProductSlug } from '@/core/middlewares/slug-formatter';

const ProductCard = ({ product }: { product: ProductInfo }) => {
  const { listItems, setProductInfo } = useAppContext();

  const { mutate } = useLikeUnlikeProductMutation();

  const [isShareProductModalOpen, { open: openShareProductModal, close: closeShareProductModal }] =
    useDisclosure(false);

  return (
    <>
      <ShareProductModal
        productInfo={product}
        isOpen={isShareProductModalOpen}
        closeModal={closeShareProductModal}
      />

      <Box
        h={320}
        style={{
          borderRadius: '10px',
          flexDirection: 'column',
          border: '1px solid #ccc',
          justifyContent: 'space-between',
        }}
        w={{ base: '48%', sm: '48%', md: 180 }}
      >
        <Box w="100%" h={180} style={{ position: 'relative' }}>
          <Box style={{ position: 'relative' }}>
            <Link
              href={`/marketplace/products/${formatProductSlug(product)}`}
              onClick={() => {
                setProductInfo(product);
              }}
            >
              <Image
                src={product.coverPhoto}
                height={180}
                width="100%"
                fit="cover"
                style={{
                  width: '100%',
                  height: '180px',
                  cursor: 'pointer',
                  objectFit: 'cover',
                  borderRadius: '10px 10px 0 0',
                }}
              />
            </Link>
            <Box
              style={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                position: 'absolute',
                borderRadius: '10px 10px 0 0',
                background: 'linear-gradient(to top, #11111160, #11111140)',
                pointerEvents: 'none',
              }}
            />
          </Box>

          {product.isPromotion && (
            <Box
              style={{
                top: 0,
                right: 0,
                padding: '3px',
                position: 'absolute',
                backgroundColor: '#317549',
                borderTopRightRadius: '10px',
                borderBottomLeftRadius: '50px',
              }}
            >
              <IconAwardFilled color="white" size={18} />
            </Box>
          )}
          <Box
            h={25}
            w={25}
            style={{
              right: 5,
              bottom: 5,
              padding: '3px',
              display: 'flex',
              position: 'absolute',
              borderRadius: '100px',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff40',
            }}
          >
            {listItems.some((item) => item.itemId === product.id) ? (
              <IconHeartFilled
                size={18}
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const payload: AddListItemDTO = {
                    itemId: product.id,
                    itemType: 'like',
                    entityType: 'product',
                  };

                  mutate(
                    { payload, name: product.name },
                    {
                      onSuccess(_data: any) {
                        useFetchUserListItemsQuery();
                      },
                    }
                  );
                }}
                color="red"
              />
            ) : (
              <IconHeart
                size={18}
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const payload: AddListItemDTO = {
                    itemId: product.id,
                    itemType: 'like',
                    entityType: 'product',
                  };

                  mutate(
                    { payload, name: product.name },
                    {
                      onSuccess(_data: any) {
                        useFetchUserListItemsQuery();
                      },
                    }
                  );
                }}
                color="white"
              />
            )}
          </Box>
        </Box>

        <Box
          h={140}
          style={{
            display: 'flex',
            //   backgroundColor: 'red',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box px={10} h={100} pt={10}>
            <Flex justify="space-between" align="center">
              <IconPhone
                color="green"
                style={{ cursor: 'pointer' }}
                size={20}
                onClick={() => {
                  CallProductVendorHandler(product);
                }}
              />

              <IconMessages color="green" style={{ cursor: 'pointer' }} size={20} />

              <IconShare2
                color="green"
                style={{ cursor: 'pointer' }}
                size={20}
                onClick={openShareProductModal}
              />
            </Flex>

            <Text
              c="black"
              fz={{ base: 12, sm: 12, md: 15 }}
              fw={600}
              style={{
                WebkitLineClamp: 2,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {product.name}
            </Text>

            <Text c="black" fz={{ base: 12, sm: 12, md: 15 }}>
              {priceFormatter(Number(product.price))}
            </Text>
          </Box>

          <Box style={{ borderTop: '1px solid #ccc' }} h={30}>
            <Flex align="center" gap={2} px={10}>
              <Text c="black" fz={{ base: 10, sm: 10 }}>
                {product.vendor.city.concat(', ')}
              </Text>
              <Text c="black" fz={{ base: 10, sm: 10 }}>
                {product.vendor.state}
              </Text>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductCard;
