import React from 'react';
import {
  IconChevronLeft,
  IconChevronRight,
  IconEye,
  IconHeart,
  IconTrendingUp,
} from '@tabler/icons-react';
import ReactPlayer from 'react-player';
import { Carousel } from '@mantine/carousel';
import {
  Badge,
  Box,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Modal,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { priceFormatter } from '@/core/middlewares';
import { VendorProductInfo } from '@/core/sdk/vendor';

interface ProductMediaGalleryProps {
  productInfo: VendorProductInfo;
}

const ProductMediaGallery = ({ productInfo }: ProductMediaGalleryProps) => {
  // Collect all media items: cover photo, video URL, and media array
  const allMediaItems: Array<{ url: string; type: 'IMAGE' | 'VIDEO' | 'PDF' }> = [];

  // Add cover photo as first item if it exists
  if (productInfo.coverPhoto) {
    allMediaItems.push({ url: productInfo.coverPhoto, type: 'IMAGE' });
  }

  // Add video URL if it exists
  if (productInfo.videoUrl) {
    allMediaItems.push({ url: productInfo.videoUrl, type: 'VIDEO' });
  }

  // Add all media items
  if (productInfo.media && productInfo.media.length > 0) {
    productInfo.media.forEach((media) => {
      // Avoid duplicates if cover photo or video URL is already in media array
      if (media.mediaUrl !== productInfo.coverPhoto && media.mediaUrl !== productInfo.videoUrl) {
        allMediaItems.push({
          url: media.mediaUrl,
          type: media.mediaType,
        });
      }
    });
  }

  // If no media, return null
  if (allMediaItems.length === 0) {
    return null;
  }

  const isVideo = (url: string, type: string) => {
    return (
      type === 'VIDEO' ||
      url?.match(/\.(mp4|webm|ogg)$/i) ||
      url?.includes('youtube.com') ||
      url?.includes('youtu.be') ||
      url?.includes('vimeo.com')
    );
  };

  return (
    <Box style={{ position: 'relative', width: '100%' }}>
      <Carousel
        withIndicators
        height={300}
        slideSize="100%"
        slideGap="md"
        controlSize={40}
        nextControlIcon={<IconChevronRight size={16} color="black" />}
        previousControlIcon={<IconChevronLeft size={16} color="black" />}
        withControls={allMediaItems.length > 1}
        styles={{
          control: {
            backgroundColor: '#ffffff',
            border: '1px solid #dee2e6',
            '&:hover': {
              backgroundColor: '#f8f9fa',
            },
          },
          indicators: {
            bottom: 10,
          },
          indicator: {
            width: 10,
            height: 10,
            border: '1px solid black',
            backgroundColor: '#ffffff',
            '&[data-active]': {
              backgroundColor: '#000000',
            },
          },
        }}
      >
        {allMediaItems.map((item, index) => (
          <Carousel.Slide key={index}>
            {isVideo(item.url, item.type) ? (
              <Box h={400} style={{ position: 'relative', backgroundColor: '#000' }}>
                <ReactPlayer
                  url={item.url}
                  width="100%"
                  height="100%"
                  controls
                  style={{ objectFit: 'contain' }}
                />
              </Box>
            ) : (
              <Image
                src={item.url}
                height={300}
                radius="md"
                fit="contain"
                style={{
                  width: '100%',
                  objectFit: 'contain',
                }}
                alt={`Product media ${index + 1}`}
              />
            )}
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
};

const ProductInfoModal = ({
  isOpen,
  closeModal,
  productInfo,
}: {
  isOpen: boolean;
  closeModal: () => void;
  productInfo: VendorProductInfo | null;
}) => {
  if (!productInfo) {
    return null;
  }

  return (
    <Modal
      size="xl"
      centered
      opened={isOpen}
      title="Product Information"
      onClose={closeModal}
      overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
    >
      <Stack gap="md">
        {/* Product Media Gallery */}
        <ProductMediaGallery productInfo={productInfo} />

        {/* Product Name and Category */}
        <Flex justify="space-between">
          <Title order={2}>
            {productInfo.name}
          </Title>
          <Badge variant="light" color="blue" size="lg">
            {productInfo.category}
          </Badge>
          {productInfo.isFlagged && (
            <Badge variant="light" color="red" size="lg">
              Flagged
            </Badge>
          )}
        </Flex>

        <Divider />

        {/* Pricing Information */}
        <Flex gap="md" justify="space-between">
          <Stack gap={4} style={{ flex: 1 }}>
            <Text size="sm" c="dimmed">
              Price
            </Text>
            <Text size="xl" fw={700}>
              {priceFormatter(productInfo.price)}
            </Text>
          </Stack>
          <Stack gap={4} style={{ flex: 1 }}>
            <Text size="sm" c="dimmed">
              Discount Price
            </Text>
            <Text size="xl" fw={700} c="green">
              {priceFormatter(productInfo.discountPrice)}
            </Text>
          </Stack>
        </Flex>

        <Divider />

        {/* Status Information */}
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Group gap="xs">
              <Text size="sm" c="dimmed">
                Stock Status:
              </Text>
              <Badge color={productInfo.inStock ? 'green' : 'red'} variant="light">
                {productInfo.inStock ? 'In Stock' : 'Out of Stock'}
              </Badge>
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Group gap="xs">
              <Text size="sm" c="dimmed">
                Negotiable:
              </Text>
              <Badge color={productInfo.isNegotiable ? 'blue' : 'gray'} variant="light">
                {productInfo.isNegotiable ? 'Yes' : 'No'}
              </Badge>
            </Group>
          </Grid.Col>
        </Grid>

        <Divider />

        {/* Description */}
        {productInfo.description && (
          <Box>
            <Text size="sm" c="dimmed" mb="xs">
              Description
            </Text>
            <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>
              {productInfo.description}
            </Text>
          </Box>
        )}

        <Divider />

        {/* Statistics */}
        <Grid>
          <Grid.Col span={{ base: 4, sm: 4 }}>
            <Flex align="center" gap="xs">
              <IconEye size={18} color="gray" />
              <Stack gap={2}>
                <Text size="xs" c="dimmed">
                  Views
                </Text>
                <Text size="md" fw={600}>
                  {productInfo.viewCount.toLocaleString()}
                </Text>
              </Stack>
            </Flex>
          </Grid.Col>
          <Grid.Col span={{ base: 4, sm: 4 }}>
            <Flex align="center" gap="xs">
              <IconHeart size={18} color="gray" />
              <Stack gap={2}>
                <Text size="xs" c="dimmed">
                  Likes
                </Text>
                <Text size="md" fw={600}>
                  {productInfo.likeCount.toLocaleString()}
                </Text>
              </Stack>
            </Flex>
          </Grid.Col>
          <Grid.Col span={{ base: 4, sm: 4 }}>
            <Flex align="center" gap="xs">
              <IconTrendingUp size={18} color="gray" />
              <Stack gap={2}>
                <Text size="xs" c="dimmed">
                  Impressions
                </Text>
                <Text size="md" fw={600}>
                  {productInfo.impressionCount}
                </Text>
              </Stack>
            </Flex>
          </Grid.Col>
        </Grid>
      </Stack>
    </Modal>
  );
};

export default ProductInfoModal;
