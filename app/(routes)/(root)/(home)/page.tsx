import { Box } from '@mantine/core';
import AdvertisementBanner from '@/core/components/banner/advertisement_banner';
import HomeHeader from '@/core/components/home/home_header';
import HomeHowItWorks from '@/core/components/home/home_how_it_works';
import HomeProductsSection from '@/core/components/home/home_products_section';

export default function HomePage() {
  return (
    <Box>
      <HomeHeader />
      {/* <HomeHowItWorks /> */}
      <AdvertisementBanner />
      <HomeProductsSection />
    </Box>
  );
}
