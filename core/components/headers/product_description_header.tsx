'use client';

import React from 'react';
import { Box, Stack, Title } from '@mantine/core';
import { useAppContext } from '@/core/context';

const ProductDescriptionHeader = () => {
  const { productInfo } = useAppContext();

  return (
    <Box w="100%" style={{ backgroundColor: '#111111' }}>
      <Stack px={20} py={{ base: 20, sm: 20, md: 40 }} gap={10} w="100%" align="center">
        <Title order={3} c="white">
          {productInfo?.name}
        </Title>
      </Stack>
    </Box>
  );
};

export default ProductDescriptionHeader;
