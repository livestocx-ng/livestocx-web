'use client';

import React from 'react';
import { Box, Stack, Title } from '@mantine/core';
import { useAppContext } from '@/core/context';

const StoreProfileHeader = () => {
  const { storeInfo } = useAppContext();

  return (
    <Box
      w="100%"
      h={200}
      style={{
        backgroundImage: 'url(/images/store/store_banner.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {/* Black Gradient Overlay */}
      <Box
        w="100%"
        h="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))',
          zIndex: 1,
        }}
      />

      {/* Content with z-index above overlay */}
      <Stack
        px={20}
        py={{ base: 20, sm: 20, md: 40 }}
        gap={10}
        w="100%"
        h="100%"
        justify="center"
        align="center"
        style={{ position: 'relative', zIndex: 2 }}
      >
        <Title order={2} c="white">
          {storeInfo !== null ? storeInfo?.name : 'Store'}
        </Title>
      </Stack>
    </Box>
  );
};

export default StoreProfileHeader;
