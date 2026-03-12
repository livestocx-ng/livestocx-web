/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import {
  IconAwardFilled,
  IconChevronLeft,
  IconChevronRight,
  IconHeart,
  IconHeartFilled,
  IconShare2,
} from '@tabler/icons-react';
import ReactPlayer from 'react-player';
import { Carousel } from '@mantine/carousel';
import { Box, Image, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAppContext } from '@/core/context';
import useFetchUserListItemsQuery from '@/core/hooks/account/useFetchUserListItemsQuery';
import useLikeUnlikeProductMutation from '@/core/hooks/account/useLikeUnlikeProductMutation';
import { AddListItemDTO, MediaInfo, ProductInfo } from '@/core/sdk/marketplace';
import ShareProductModal from '../modals/share_product_modal';

interface ProductMediaSliderProps {
  productInfo: ProductInfo;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Less than a minute
  if (diffInSeconds < 60) {
    return 'Just now';
  }

  // Less than an hour
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  // Less than a day
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }

  // Less than a week
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }

  // Less than a month
  if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }

  // Less than a year
  if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }

  // More than a year
  const years = Math.floor(diffInSeconds / 31536000);
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
};

const ProductMediaSlider = ({ productInfo }: ProductMediaSliderProps) => {
  const { listItems } = useAppContext();

  const { mutate } = useLikeUnlikeProductMutation();

  const [activeSlide, setActiveSlide] = useState(0);
  const [isShareProductModalOpen, { open: openShareProductModal, close: closeShareProductModal }] =
    useDisclosure(false);

  const isVideo = (url: string) => {
    return (
      url?.match(/\.(mp4|webm|ogg)$/i) || url?.includes('youtube.com') || url?.includes('vimeo.com')
    );
  };

  const allMedia = (productInfo?.media || []).map((m) => m.mediaUrl);

  return (
    <>
      <ShareProductModal
        productInfo={productInfo}
        isOpen={isShareProductModalOpen}
        closeModal={closeShareProductModal}
      />
      <Box style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Carousel
          withIndicators
          height={500}
          slideSize="100%"
          slideGap="md"
          controlSize={40}
          onSlideChange={setActiveSlide}
          nextControlIcon={<IconChevronRight size={16} color="black" />}
          previousControlIcon={<IconChevronLeft size={16} color="black" />}
          withControls
          styles={{
            control: {
              backgroundColor: '#ffffff',
              '&:hover': {
                backgroundColor: '#ffffff',
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
                backgroundColor: '#ffffff',
              },
            },
          }}
        >
          {allMedia.map((item, index) => (
            <Carousel.Slide key={index}>
              {isVideo(item) ? (
                <Box h={500} style={{ position: 'relative' }}>
                  <ReactPlayer
                    url={item}
                    width="100%"
                    height="100%"
                    controls
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
              ) : (
                <Image
                  src={item}
                  height={500}
                  style={{
                    width: '100%',
                    objectFit: 'cover',
                  }}
                  alt={`Product media ${index + 1}`}
                />
              )}
            </Carousel.Slide>
          ))}
        </Carousel>

        {productInfo?.isPromotion && (
          <Box
            style={{
              top: 0,
              right: 0,
              padding: '3px',
              position: 'absolute',
              backgroundColor: '#317549',
              borderTopRightRadius: '10px',
              borderBottomLeftRadius: '50px',
              zIndex: 2,
            }}
          >
            <IconAwardFilled color="white" size={18} />
          </Box>
        )}

        <Box
          px={4}
          style={{
            top: 0,
            left: 0,
            padding: '3px',
            display: 'flex',
            position: 'absolute',
            borderTopRightRadius: '100px',
            borderBottomRightRadius: '100px',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#ffffff40',
          }}
        >
          <Text size="sm" c="white">
            {formatDate(productInfo?.createdAt)}
          </Text>
        </Box>

        <Box
          style={{
            right: 5,
            bottom: 5,
            padding: '3px',
            display: 'flex',
            position: 'absolute',
            borderRadius: '100px',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#ffffff40',
          }}
        >
          <Box
            h={25}
            w={25}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {listItems.some((item) => item.itemId === productInfo?.id) ? (
              <IconHeartFilled
                size={18}
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const payload: AddListItemDTO = {
                    itemId: productInfo?.id,
                    itemType: 'like',
                    entityType: 'product',
                  };

                  mutate(
                    { payload, name: productInfo?.name },
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
                    itemId: productInfo?.id,
                    itemType: 'like',
                    entityType: 'product',
                  };

                  mutate(
                    { payload, name: productInfo?.name },
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

          <IconShare2
            size={20}
            color="white"
            style={{ cursor: 'pointer' }}
            onClick={openShareProductModal}
          />
        </Box>
      </Box>
    </>
  );
};

export default ProductMediaSlider;
