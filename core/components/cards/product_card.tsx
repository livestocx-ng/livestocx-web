'use client';

import Link from 'next/link';
import {
  IconAwardFilled,
  IconDotsVertical,
  IconHeart,
  IconHeartFilled,
  IconMessages,
  IconPhone,
  IconShare2,
} from '@tabler/icons-react';
import { ActionIcon, Badge, Box, Group, Image, Menu, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAppContext } from '@/core/context';
import useFetchUserListItemsQuery from '@/core/hooks/account/useFetchUserListItemsQuery';
import useLikeUnlikeProductMutation from '@/core/hooks/account/useLikeUnlikeProductMutation';
import { priceFormatter } from '@/core/middlewares';
import { CallProductVendorHandler } from '@/core/middlewares/product-middleware';
import { formatProductSlug } from '@/core/middlewares/slug-formatter';
import { AddListItemDTO } from '@/core/sdk/account';
import { ProductInfo } from '@/core/sdk/marketplace';
import { formatProductCategory } from '@/core/utilities';
import ShareProductModal from '../modals/share_product_modal';

const ProductCard = ({ product }: { product: ProductInfo }) => {
  const { listItems, setProductInfo } = useAppContext();
  const { mutate } = useLikeUnlikeProductMutation();
  const [isShareProductModalOpen, { open: openShareProductModal, close: closeShareProductModal }] =
    useDisclosure(false);

  const isLiked = listItems.some((item) => item.itemId === product.id);

  const toggleLike = () => {
    const payload: AddListItemDTO = {
      itemId: product.id,
      itemType: 'like',
      entityType: 'product',
    };

    mutate(
      { payload, name: product.name },
      {
        onSuccess() {
          useFetchUserListItemsQuery();
        },
      }
    );
  };

  return (
    <>
      <ShareProductModal
        productInfo={product}
        isOpen={isShareProductModalOpen}
        closeModal={closeShareProductModal}
      />

      <Box
        bg="white"
        h={320}
        w={{ base: '48%', sm: '48%', md: 180 }}
        style={{
          display: 'flex',
          borderRadius: '12px',
          flexDirection: 'column',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
        }}
      >
        <Box w="100%" h={180} style={{ position: 'relative', flexShrink: 0 }}>
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
              loading="lazy"
              style={{
                width: '100%',
                height: '180px',
                cursor: 'pointer',
                objectFit: 'cover',
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
              background: 'linear-gradient(to top, rgba(17,17,17,0.35), rgba(17,17,17,0.05))',
              pointerEvents: 'none',
            }}
          />

          <Badge
            size="sm"
            variant="filled"
            color="primary"
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              zIndex: 2,
              textTransform: 'none',
            }}
          >
            {formatProductCategory(product.category)}
          </Badge>

          <Menu position="bottom-end" withinPortal>
            <Menu.Target>
              <ActionIcon
                variant="filled"
                size="sm"
                radius="xl"
                aria-label="Product actions"
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  color: '#006838',
                }}
              >
                <IconDotsVertical size={14} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconPhone size={16} />}
                onClick={() => CallProductVendorHandler(product)}
              >
                Call seller
              </Menu.Item>
              <Menu.Item leftSection={<IconMessages size={16} />}>Message seller</Menu.Item>
              <Menu.Item leftSection={<IconShare2 size={16} />} onClick={openShareProductModal}>
                Share listing
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <ActionIcon
            variant="filled"
            size="sm"
            radius="xl"
            aria-label={isLiked ? 'Unlike product' : 'Like product'}
            onClick={toggleLike}
            style={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              zIndex: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
            }}
          >
            {isLiked ? (
              <IconHeartFilled size={16} color="red" />
            ) : (
              <IconHeart size={16} color="#666" />
            )}
          </ActionIcon>

          {product.isPromotion && (
            <Box
              style={{
                bottom: 8,
                left: 8,
                padding: '4px 6px',
                position: 'absolute',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#317549',
                borderRadius: '100px',
              }}
            >
              <IconAwardFilled color="white" size={16} />
            </Box>
          )}
        </Box>

        <Link
          style={{
            textDecoration: 'none',
          }}
          onClick={() => {
            setProductInfo(product);
          }}
          href={`/marketplace/products/${formatProductSlug(product)}`}
        >
          <Box
            px={10}
            py={10}
            h={140}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <Box style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0 }}>
              <Text
                c="dark.8"
                fz={{ base: 12, md: 14 }}
                fw={600}
                lh={1.1}
                style={{
                  fontFamily: 'var(--mantine-font-family-headings)',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  wordBreak: 'break-word',
                }}
              >
                {product.name}
              </Text>

              <Text c="dark.9" fz={{ base: 14, md: 15 }} fw={700}>
                {priceFormatter(Number(product.price))}
              </Text>

              <Group gap={3} wrap="nowrap">
                <Badge
                  size="xs"
                  variant="light"
                  color="gray"
                  styles={{
                    root: {
                      textTransform: 'none',
                      flexShrink: 0,
                      paddingInline: 5,
                      height: 16,
                      fontSize: 8,
                      maxWidth: '100%',
                      border: '0px',
                    },
                    label: {
                      overflow: 'visible',
                      whiteSpace: 'nowrap',
                      fontSize: 8,
                      lineHeight: 1,
                    },
                  }}
                >
                  {product.isNegotiable ? 'Negotiable' : 'Non-Negotiable'}
                </Badge>
                <Badge
                  size="xs"
                  variant="light"
                  color={product.inStock ? 'lime' : 'orange'}
                  styles={{
                    root: {
                      textTransform: 'none',
                      flexShrink: 0,
                      paddingInline: 5,
                      height: 16,
                      fontSize: 8,
                      maxWidth: '100%',
                      border: '0px',
                    },
                    label: {
                      overflow: 'visible',
                      whiteSpace: 'nowrap',
                      fontSize: 8,
                      lineHeight: 1,
                    },
                  }}
                >
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </Badge>
              </Group>
            </Box>

            <Text c="gray.8" fz={11} truncate="end">
              {product.vendor.city}, {product.vendor.state}
            </Text>
          </Box>
        </Link>
      </Box>
    </>
  );
};

export default ProductCard;
