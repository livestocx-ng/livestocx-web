import React from 'react';
import { Box, Container, Breadcrumbs, Anchor, Title, rem, Text, Badge, Group, Stack } from '@mantine/core';
import { IconChevronRight, IconBuildingStore } from '@tabler/icons-react';
import { useAppContext } from '@/core/context';
import { priceFormatter } from '@/core/middlewares';

const ProductDescriptionHeader = () => {
  const { productInfo } = useAppContext();

  const items = [
    { title: 'Marketplace', href: '/marketplace', icon: <IconBuildingStore size={rem(14)} /> },
    { title: 'Products', href: '/marketplace', icon: null },
    // { title: productInfo?.name || 'Product Details', href: '#', icon: null },
  ].map((item, index) => (
    <Anchor 
      href={item.href} 
      key={index} 
      size="sm" 
      c="white" 
      fw={500} 
      style={{ 
        opacity: index === 2 ? 1 : 0.6,
        display: 'flex',
        alignItems: 'center',
        gap: rem(4),
        textDecoration: 'none',
        transition: 'opacity 0.2s ease'
      }}
    >
      {item.icon}
      {item.title}
    </Anchor>
  ));

  return (
    <Box
      w="100%"
      style={{
        backgroundColor: '#0A1711',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}
    >
      {/* Mesh Gradient Background */}
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          background: `
            radial-gradient(at 0% 0%, #317549 0, transparent 50%),
            radial-gradient(at 100% 0%, #1e4d30 0, transparent 50%),
            radial-gradient(at 50% 100%, #255a38 0, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Grid Pattern */}
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(#ffffff05 1px, transparent 1px),
            linear-gradient(90deg, #ffffff05 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          pointerEvents: 'none',
        }}
      />

      {/* Noise Texture */}
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }}
      />

      <Container size="xl" py={{ base: 32, md: 48 }} style={{ position: 'relative', zIndex: 1 }}>
        <Stack gap="xl">
          <Breadcrumbs 
            separator={<IconChevronRight size={rem(14)} color="rgba(255,255,255,0.4)" />}
            styles={{
              separator: { marginLeft: rem(8), marginRight: rem(8) }
            }}
          >
            {items}
          </Breadcrumbs>
          
          <Group justify="space-between" align="flex-end" wrap="wrap">
            <Stack gap={rem(8)}>
              <Group gap="xs">
                 {productInfo?.category && (
                    <Badge 
                      variant="filled" 
                      color="primary.9" 
                      size="sm" 
                      radius="sm"
                      style={{ textTransform: 'capitalize' }}
                    >
                      {productInfo.category.toLowerCase().replace(/_/g, ' ')}
                    </Badge>
                 )}
                 <Text size="xs" c="dimmed" fw={700} tt="uppercase" style={{ letterSpacing: '0.1em' }}>
                    {productInfo?.vendor?.state} • {productInfo?.vendor?.city}
                 </Text>
              </Group>
              <Title 
                order={1} 
                c="white" 
                style={{ 
                  fontSize: `clamp(${rem(28)}, 5vw, ${rem(42)})`, 
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  textShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              >
                {productInfo?.name}
              </Title>
            </Stack>

            <Stack gap={rem(4)} align="flex-end">
                <Text size="xs" c="white" opacity={0.6} fw={700} tt="uppercase" style={{ letterSpacing: '0.05em' }}>
                  Starting Price
                </Text>
                <Text 
                  size={rem(32)} 
                  fw={900} 
                  c="primary.4" 
                  style={{ 
                    lineHeight: 1,
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                   {priceFormatter(Number(productInfo?.price || 0))}
                </Text>
            </Stack>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
};

export default ProductDescriptionHeader;
