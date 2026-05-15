'use client';

import React, { useEffect, useState, Suspense, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  Box, Container, Title, Text, Flex, Loader, Pagination, Center, Grid,
  Paper, TextInput, Select, Button, Stack, Group, Drawer
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconSearch } from '@tabler/icons-react';
import { useAppContext } from '@/core/context';
import useFetchMarketplaceProductsQuery from '@/core/hooks/marketplace/useSearchMarketplaceProductsQuery';
import ProductCard from '@/core/components/cards/product_card';
import { ProductInfo } from '@/core/sdk/marketplace';
import { VendorProductInfoCategoryEnum } from '@/core/sdk/vendor';
import useFetchAvailableStatesQuery from '@/core/hooks/public/useFetchAvailableStatesQuery';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // 1. Derive all active state strictly from URL searchParams (Single Source of Truth)
  const activeQuery = searchParams.get('query') || '';
  const activeState = searchParams.get('state') || '';
  const activeCity = searchParams.get('city') || '';
  const activeCategory = searchParams.get('category') || '';
  const activeInStock = searchParams.get('inStock') || 'Any';
  const activeIsNegotiable = searchParams.get('isNegotiable') || 'Any';
  const activePage = Number(searchParams.get('page') || '1');

  // 2. Local state specifically for the sidebar inputs before clicking "Apply"
  const [localFilters, setLocalFilters] = useState({
    query: activeQuery,
    state: activeState,
    city: activeCity,
    category: activeCategory,
    inStock: activeInStock,
    isNegotiable: activeIsNegotiable,
  });

  // Keep local filters in sync if URL changes externally (e.g. browser back button)
  useEffect(() => {
    setLocalFilters({
      query: activeQuery,
      state: activeState,
      city: activeCity,
      category: activeCategory,
      inStock: activeInStock,
      isNegotiable: activeIsNegotiable,
    });
  }, [activeQuery, activeState, activeCity, activeCategory, activeInStock, activeIsNegotiable]);

  const {
    authToken,
    marketplaceProducts,
    marketPlaceProductsTotalPages,
  } = useAppContext();

  useEffect(() => {
    if (!authToken) {
      const currentPath = window.location.pathname + window.location.search;
      // The signin page expects redirect_to without the leading slash based on its current implementation
      const redirectTo = currentPath.startsWith('/') ? currentPath.slice(1) : currentPath;
      router.push(`/signin?redirect_to=${encodeURIComponent(redirectTo)}`);
    }
  }, [authToken, router]);

  const getBooleanFilter = (val: string) => {
    if (val === 'Yes') return true;
    if (val === 'No') return false;
    return undefined;
  };

  const { data: availableStates } = useFetchAvailableStatesQuery();

  const stateOptions = availableStates?.map(s => ({ value: s.state, label: s.state })) || [];
  const selectedStateObj = availableStates?.find(s => s.state === localFilters.state);
  const cityOptions = selectedStateObj?.lgas?.map(lga => ({ value: lga, label: lga })) || [];

  const categoryOptions = useMemo(
    () =>
      Object.values(VendorProductInfoCategoryEnum).map((value) => ({
        value,
        label: value
          .replace(/_/g, ' ')
          .toLowerCase()
          .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase()),
      })),
    []
  );

  // 3. Trigger search based purely on active URL parameters
  const { isFetching } = useFetchMarketplaceProductsQuery({
    page: activePage,
    pageSize: 24,
    query: activeQuery,
    state: activeState,
    city: activeCity,
    category: activeCategory,
    inStock: getBooleanFilter(activeInStock),
    isNegotiable: getBooleanFilter(activeIsNegotiable),
  });

  // Helper to update URL params
  const pushParams = (filters: typeof localFilters, newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (filters.query) params.set('query', filters.query); else params.delete('query');
    if (filters.state) params.set('state', filters.state); else params.delete('state');
    if (filters.city) params.set('city', filters.city); else params.delete('city');
    if (filters.category) params.set('category', filters.category); else params.delete('category');
    
    if (filters.inStock && filters.inStock !== 'Any') params.set('inStock', filters.inStock); 
    else params.delete('inStock');
    
    if (filters.isNegotiable && filters.isNegotiable !== 'Any') params.set('isNegotiable', filters.isNegotiable); 
    else params.delete('isNegotiable');
    
    if (newPage > 1) params.set('page', newPage.toString()); 
    else params.delete('page');

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleApplyFilters = () => {
    pushParams(localFilters, 1); // Reset to page 1 on new filter apply
    close(); // Close mobile drawer if it's open
  };

  const handlePageChange = (value: number) => {
    pushParams(
      { query: activeQuery, state: activeState, city: activeCity, category: activeCategory, inStock: activeInStock, isNegotiable: activeIsNegotiable }, 
      value
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [opened, { open, close }] = useDisclosure(false);

  const renderFilters = () => (
    <Stack gap="sm">
      <TextInput
        label="Search Query"
        placeholder="e.g. cattle"
        value={localFilters.query}
        onChange={(e) => setLocalFilters({ ...localFilters, query: e.currentTarget.value })}
        // styles={{ label: { fontWeight: 600 } }}
      />

      <Select
        label="Category"
        placeholder="Select category"
        data={categoryOptions}
        searchable
        clearable
        value={localFilters.category || null}
        onChange={(val) => setLocalFilters({ ...localFilters, category: val || '' })}
        // styles={{ label: { fontWeight: 600 } }}
      />

      <Select
        label="State"
        placeholder="Select a state"
        data={stateOptions}
        searchable
        clearable
        value={localFilters.state || null}
        onChange={(val) => setLocalFilters({ ...localFilters, state: val || '', city: '' })}
        // styles={{ label: { fontWeight: 600 } }}
      />

      <Select
        label="City"
        placeholder={localFilters.state ? "Select a city" : "Select state first"}
        data={cityOptions}
        searchable
        clearable
        disabled={!localFilters.state || cityOptions.length === 0}
        value={localFilters.city || null}
        onChange={(val) => setLocalFilters({ ...localFilters, city: val || '' })}
        // styles={{ label: { fontWeight: 600 } }}
      />

      <Select
        label="In Stock"
        data={['Any', 'Yes', 'No']}
        value={localFilters.inStock}
        onChange={(val) => setLocalFilters({ ...localFilters, inStock: val || 'Any' })}
        // styles={{ label: { fontWeight: 600 } }}
      />

      <Select
        label="Is Negotiable"
        data={['Any', 'Yes', 'No']}
        value={localFilters.isNegotiable}
        onChange={(val) => setLocalFilters({ ...localFilters, isNegotiable: val || 'Any' })}
        // styles={{ label: { fontWeight: 600 } }}
      />

      <Button 
        mt="md" 
        fullWidth 
        color="primary.9" 
        onClick={handleApplyFilters}
        leftSection={<IconSearch size={16} />}
      >
        Apply Filters
      </Button>
    </Stack>
  );

  return (
    <>
      <Drawer 
        opened={opened} 
        onClose={close} 
        title={<Title order={4}>Filters</Title>} 
        position="bottom" 
        size="80%"
        padding="md"
        styles={{ title: { fontWeight: 700 } }}
      >
        {renderFilters()}
      </Drawer>

      <Box py={40} bg="gray.0" style={{ minHeight: '70vh', position: 'relative' }}>
      {/* Grid Background with Bottom Fade */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(#e5e7eb 1px, transparent 1px),
            linear-gradient(90deg, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center top',
          pointerEvents: 'none',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          zIndex: 0,
        }}
      />
      
      <Box px={20} style={{ position: 'relative', zIndex: 1 }}>
        <Grid gutter={20}>
          {/* Sidebar Filters */}
          <Grid.Col span={{ base: 12, md: 2 }} visibleFrom="md">
            <Paper p="md" radius="md" withBorder shadow="sm">
              <Group gap={8} mb="md">
                <IconFilter size={20} />
                <Title order={4}>Filters</Title>
              </Group>
              {renderFilters()}
            </Paper>
          </Grid.Col>

          {/* Search Results */}
          <Grid.Col span={{ base: 12, md: 10 }}>
            <Group justify="space-between" align="flex-start" mb="xl">
              <Box>
                <Title order={2} mb="xs" c="primary.9">Search Results</Title>
                <Text c="dimmed">
                  {activeQuery ? `Showing results for "${activeQuery}"` : 'Please enter search criteria'}
                </Text>
              </Box>

              <Button 
                hiddenFrom="md" 
                // variant="light" 
                color="black" 
                onClick={open} 
                leftSection={<IconFilter size={16} />}
              >
                Filters
              </Button>
            </Group>

            {isFetching && marketplaceProducts.length === 0 ? (
              <Center py={60}>
                <Loader color="primary.9" />
              </Center>
            ) : (
              <>
                {marketplaceProducts.length === 0 && (activeQuery || activeCategory || activeState) && !isFetching ? (
                  <Center py={80} style={{ flexDirection: 'column' }}>
                    <Title order={3} c="dimmed" mb="sm">No results found</Title>
                    <Text size="md" c="dimmed">We couldn't find any products matching your filters.</Text>
                  </Center>
                ) : (
                  <>
                    <Flex
                      wrap="wrap"
                      align="flex-start"
                      justify={{ base: 'center', sm: 'flex-start' }}
                      gap={{ base: 10, sm: 10, md: 15 }}
                      style={{ 
                        filter: !authToken ? 'blur(8px)' : 'none',
                        pointerEvents: !authToken ? 'none' : 'auto',
                        transition: 'filter 0.3s ease'
                      }}
                    >
                      {marketplaceProducts.map((item) => (
                        <ProductCard key={item.id} product={item as ProductInfo} />
                      ))}
                    </Flex>

                    <Center mt={50} hidden={marketPlaceProductsTotalPages <= 1}>
                      <Pagination
                        value={activePage}
                        onChange={handlePageChange}
                        total={marketPlaceProductsTotalPages}
                        color="primary.9"
                      />
                    </Center>
                  </>
                )}
              </>
            )}
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
    </>
  );
};

export default function SearchPage() {
  return (
    <main>
      <Suspense fallback={<Center py={100}><Loader color="primary.9" /></Center>}>
        <SearchResults />
      </Suspense>
    </main>
  );
}
