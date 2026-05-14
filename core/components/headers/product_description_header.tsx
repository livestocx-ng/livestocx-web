import React from 'react';
import { Box, Container, Breadcrumbs, Anchor, Title, rem } from '@mantine/core';
import { useAppContext } from '@/core/context';

const ProductDescriptionHeader = () => {
  const { productInfo } = useAppContext();

  const items = [
    { title: 'Marketplace', href: '/marketplace' },
    { title: 'Products', href: '/marketplace' },
    { title: productInfo?.name || 'Product Details', href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index} size="xs" c="gray.5" fw={500}>
      {item.title}
    </Anchor>
  ));

  return (
    <Box
      w="100%"
      style={{
        backgroundColor: '#0A1711',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      <Container size="xl" py={{ base: 24, md: 32 }}>
        <Breadcrumbs mb="xs">{items}</Breadcrumbs>
        <Title order={1} c="white" style={{ fontSize: rem(28), fontWeight: 700 }}>
          {productInfo?.name}
        </Title>
      </Container>
    </Box>
  );
};

export default ProductDescriptionHeader;
