import { Box } from '@mantine/core';
import AdvertisementBanner from '@/core/components/banner/advertisement_banner';
import HomeHeader from '@/core/components/home/home_header';
import HomeProductsSection from '@/core/components/home/home_products_section';

export default function HomePage() {
  return (
    <Box>
      <HomeHeader />
      <AdvertisementBanner />
      <HomeProductsSection />
    </Box>
  );
}
