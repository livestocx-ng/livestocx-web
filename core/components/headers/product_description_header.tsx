import React from 'react';
import { IconBuildingStore, IconChevronRight } from '@tabler/icons-react';
import {
  Anchor,
  Badge,
  Box,
  Breadcrumbs,
  Container,
  Group,
  rem,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useAppContext } from '@/core/context';
import { priceFormatter } from '@/core/middlewares';
import { ProductInfo } from '@/core/sdk/marketplace';

interface ProductDescriptionHeaderProps {
  productInfo?: ProductInfo | null;
  isLoading?: boolean;
}

const ProductDescriptionHeader = ({
  productInfo: propProductInfo,
  isLoading,
}: ProductDescriptionHeaderProps = {}) => {
  const { productInfo: contextProductInfo } = useAppContext();
  const productInfo = propProductInfo !== undefined ? propProductInfo : contextProductInfo;

  const items = [
    { title: 'Marketplace', href: '/', icon: <IconBuildingStore size={16} stroke={1.8} /> },
    { title: 'Products', href: '#', icon: null },
    // { title: productInfo?.name || 'Product Details', href: '#', icon: null },
  ].map((item, index) => (
    <Anchor
      href={item.href}
      key={index}
      size="sm"
      c="white"
      fw={500}
      underline="never"
      style={{
        opacity: index === 1 ? 1 : 0.7,
        display: 'inline-flex',
        alignItems: 'center',
        gap: rem(6),
        textDecoration: 'none',
        // lineHeight: 1,
        transition: 'opacity 0.2s ease',
      }}
    >
      {item.icon && (
        <Box
          component="span"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
            transform: 'translateY(1px)',
          }}
        >
          {item.icon}
        </Box>
      )}
      <Text component="span" size="sm" fw={500} c="inherit" style={{ lineHeight: 1 }}>
        {item.title}
      </Text>
    </Anchor>
  ));

  return (
    <Box
      w="100%"
      style={{
        backgroundColor: '#0A1711',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
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
            separator={
              <Box
                component="span"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'translateY(1px)',
                }}
              >
                <IconChevronRight size={14} color="rgba(255,255,255,0.4)" stroke={2} />
              </Box>
            }
            styles={{
              root: { alignItems: 'center' },
              separator: {
                display: 'inline-flex',
                alignItems: 'center',
                marginLeft: rem(8),
                marginRight: rem(8),
              },
              breadcrumb: {
                display: 'inline-flex',
                alignItems: 'center',
              },
            }}
          >
            {items}
          </Breadcrumbs>

          <Group justify="space-between" align="flex-end" wrap="wrap">
            <Stack gap={rem(8)} style={{ flex: 1, minWidth: 200 }}>
              {isLoading && !productInfo ? (
                <>
                  <Skeleton height={20} width={120} radius="sm" />
                  <Skeleton height={36} width="60%" radius="sm" />
                </>
              ) : (
                <>
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
                    {(productInfo?.vendor?.state || productInfo?.vendor?.city) && (
                      <Text
                        size="xs"
                        c="dimmed"
                        fw={700}
                        tt="uppercase"
                        style={{ letterSpacing: '0.1em' }}
                      >
                        {[productInfo?.vendor?.state, productInfo?.vendor?.city]
                          .filter(Boolean)
                          .join(' • ')}
                      </Text>
                    )}
                  </Group>
                  <Title
                    order={1}
                    c="white"
                    style={{
                      fontSize: `clamp(${rem(28)}, 5vw, ${rem(42)})`,
                      fontWeight: 900,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                      textShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    }}
                  >
                    {productInfo?.name || 'Product Details'}
                  </Title>
                </>
              )}
            </Stack>

            <Stack gap={rem(4)} align="flex-end">
              <Text
                size="xs"
                c="white"
                opacity={0.6}
                fw={700}
                tt="uppercase"
                style={{ letterSpacing: '0.05em' }}
              >
                Starting Price
              </Text>
              {isLoading && !productInfo ? (
                <Skeleton height={32} width={100} radius="sm" />
              ) : (
                <Text
                  size={rem(32)}
                  fw={900}
                  c="primary.4"
                  style={{
                    lineHeight: 1,
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  {priceFormatter(Number(productInfo?.price || 0))}
                </Text>
              )}
            </Stack>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
};

export default ProductDescriptionHeader;

