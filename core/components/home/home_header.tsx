'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  IconBuildingCommunity,
  IconExternalLink,
  IconMapPin,
  IconSearch,
} from '@tabler/icons-react';
import {
  Box,
  Button,
  Flex,
  Grid,
  Group,
  Image,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useAppContext } from '@/core/context';
import useFetchAvailableStatesQuery from '@/core/hooks/public/useFetchAvailableStatesQuery';

const HomeHeader = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const { data: fetchedStates } = useFetchAvailableStatesQuery();
  const { availableStates: contextStates } = useAppContext();
  const statesList = fetchedStates || contextStates || [];

  const stateOptions = useMemo(() => {
    if (!statesList || !Array.isArray(statesList)) {
      return [];
    }

    return statesList.map((item) => ({
      value: item.state,
      label: item.state,
    }));
  }, [statesList]);

  const cityOptions = useMemo(() => {
    if (!selectedState || !statesList || !Array.isArray(statesList)) {
      return [];
    }

    const stateObj = statesList.find(
      (item) => item.state?.toLowerCase() === selectedState?.toLowerCase()
    );

    if (!stateObj || !stateObj.lgas) {
      return [];
    }

    return stateObj.lgas.map((lga) => ({
      value: lga,
      label: lga,
    }));
  }, [selectedState, statesList]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNavigating(true);

    const params = new URLSearchParams();

    if (searchInput.trim()) {
      params.set('query', searchInput.trim());
    }
    if (selectedState) {
      params.set('state', selectedState);
    }
    if (selectedCity) {
      params.set('city', selectedCity);
    }

    const queryString = params.toString();
    router.push(queryString ? `/search?${queryString}` : '/search');
  };

  const desktopInputStyles = {
    input: {
      height: '46px',
      fontSize: '14px',
      fontWeight: 500,
      color: '#111827',
      paddingLeft: '36px',
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
      '&::placeholder': {
        color: '#6b7280',
        fontWeight: 400,
      },
    },
    section: {
      pointerEvents: 'none' as const,
    },
  };

  const desktopSelectStyles = {
    input: {
      height: '46px',
      fontSize: '14px',
      fontWeight: 500,
      color: '#111827',
      paddingLeft: '34px',
      paddingRight: '28px',
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
      cursor: 'pointer',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      '&::placeholder': {
        color: '#6b7280',
        fontWeight: 400,
      },
      '&:disabled': {
        backgroundColor: 'transparent',
        color: '#9ca3af',
        opacity: 0.6,
        cursor: 'not-allowed',
      },
    },
    section: {
      pointerEvents: 'none' as const,
    },
  };

  const mobileInputStyles = {
    input: {
      borderRadius: '12px',
      backgroundColor: '#f9fafb',
      border: '1px solid #e5e7eb',
      fontSize: '14px',
      color: '#111827',
      '&:focus': {
        borderColor: '#006838',
        backgroundColor: '#ffffff',
      },
    },
  };

  const mobileSelectStyles = {
    input: {
      borderRadius: '12px',
      backgroundColor: '#f9fafb',
      border: '1px solid #e5e7eb',
      fontSize: '13px',
      color: '#111827',
      '&:focus': {
        borderColor: '#006838',
        backgroundColor: '#ffffff',
      },
      '&:disabled': {
        backgroundColor: '#f3f4f6',
        color: '#9ca3af',
        opacity: 0.7,
      },
    },
  };

  return (
    <Box
      w="100%"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #317549 0%, #1e4d30 80%, #255a38 100%)',
      }}
    >
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          
          @keyframes glowPulse {
            0% { box-shadow: 0 0 5px rgba(238, 113, 41, 0.4); }
            50% { box-shadow: 0 0 20px rgba(238, 113, 41, 0.6); }
            100% { box-shadow: 0 0 5px rgba(238, 113, 41, 0.4); }
          }

          .app-badge:hover {
            transform: translateY(-2px);
            filter: brightness(1.1);
            transition: all 0.2s ease;
          }

          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .animated-border-wrapper {
            position: relative;
            padding: 2px;
            border-radius: 20px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          @media (min-width: 992px) {
            .animated-border-wrapper {
              border-radius: 100px;
            }
          }

          .animated-border-wrapper:hover {
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.22);
          }

          .animated-border-wrapper::before {
            content: '';
            position: absolute;
            width: 200%;
            height: 400%;
            background: conic-gradient(
              from 0deg,
              transparent 0%,
              transparent 40%,
              #4ade80 50%,
              transparent 60%,
              transparent 100%
            );
            animation: rotate 4s linear infinite;
          }

          .animated-border-wrapper::after {
            content: '';
            position: absolute;
            inset: 2px;
            background: #ffffff;
            border-radius: inherit;
            z-index: 0;
          }
        `}
      </style>

      <Stack
        px={20}
        py={{ base: 20, sm: 20, md: 40 }}
        gap={15}
        w="100%"
        align="center"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Title
          order={3}
          c="white"
          style={{
            fontFamily: 'var(--mantine-font-family-headings)',
            letterSpacing: '-0.02em',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Best Deals. Everything Animals
        </Title>

        <Flex w="100%" justify="center" align="center" px={{ base: 16, md: 32 }}>
          <Button
            type="button"
            onClick={() => {
              window.open('https://climateresilience.livestocx.com', '_blank');
            }}
            c="white"
            radius="xl"
            px="xl"
            py="md"
            variant="filled"
            styles={{
              root: {
                background: 'linear-gradient(90deg, #ee7129 0%, #f9c416 50%, #ee7129 100%)',
                backgroundSize: '200% auto',
                animation: 'shimmer 3s infinite linear, glowPulse 3s infinite ease-in-out',
                height: 'auto',
                border: 'none',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              },
              inner: {
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              },
            }}
          >
            <Box style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 15 }}>Climate Resilience AI</span>
                <IconExternalLink size={18} />
              </Box>
            </Box>
          </Button>
        </Flex>

        <Flex gap="md">
          <Link
            target="_blank"
            href="https://apps.apple.com/ng/app/livestocx/id6738842775"
            className="app-badge"
          >
            <Image src="/icons/icon_appstore.svg" alt="App Store" w={120} fit="contain" />
          </Link>
          <Link
            target="_blank"
            href="https://play.google.com/store/details?id=com.livestocx.livestocx_mobile"
            className="app-badge"
          >
            <Image src="/icons/icon_playstore.svg" alt="Google Play" w={120} fit="contain" />
          </Link>
        </Flex>

        {/* Embedded Search Form */}
        <form style={{ width: '100%' }} onSubmit={handleSearchSubmit}>
          <Flex w="100%" justify="center">
            <Box
              className="animated-border-wrapper"
              w={{ base: '100%', sm: '100%', md: '88%', lg: '78%' }}
              style={{ maxWidth: 960 }}
            >
              {/* Desktop Layout */}
              <Box
                visibleFrom="md"
                w="100%"
                p="4px 6px 4px 16px"
                style={{ position: 'relative', zIndex: 1 }}
              >
                <Flex align="center" justify="space-between" w="100%" gap={6}>
                  {/* Keyword Input */}
                  <Box style={{ flex: 1.8, minWidth: 0 }}>
                    <TextInput
                      placeholder="What are you looking for?"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.currentTarget.value)}
                      leftSection={<IconSearch size={18} color="#006838" stroke={2} />}
                      leftSectionPointerEvents="none"
                      variant="unstyled"
                      styles={desktopInputStyles}
                    />
                  </Box>

                  {/* Vertical Divider */}
                  <Box
                    style={{
                      width: '1px',
                      height: '28px',
                      backgroundColor: '#e5e7eb',
                      flexShrink: 0,
                    }}
                  />

                  {/* State Dropdown */}
                  <Box style={{ flex: 1.1, minWidth: 0 }}>
                    <Select
                      placeholder="State"
                      data={stateOptions}
                      value={selectedState}
                      onChange={(val) => {
                        setSelectedState(val);
                        setSelectedCity(null);
                      }}
                      searchable
                      clearable
                      leftSection={<IconMapPin size={16} color="#006838" stroke={2} />}
                      leftSectionPointerEvents="none"
                      variant="unstyled"
                      styles={desktopSelectStyles}
                      comboboxProps={{
                        withinPortal: true,
                        transitionProps: { transition: 'fade-down', duration: 150 },
                        shadow: 'lg',
                        radius: 'md',
                        zIndex: 1000,
                      }}
                    />
                  </Box>

                  {/* Vertical Divider */}
                  <Box
                    style={{
                      width: '1px',
                      height: '28px',
                      backgroundColor: '#e5e7eb',
                      flexShrink: 0,
                    }}
                  />

                  {/* City/Town Dropdown */}
                  <Box style={{ flex: 1.1, minWidth: 0 }}>
                    <Select
                      placeholder={selectedState ? 'City / Town' : 'City / Town'}
                      data={cityOptions}
                      value={selectedCity}
                      onChange={(val) => setSelectedCity(val)}
                      searchable
                      clearable
                      disabled={!selectedState || cityOptions.length === 0}
                      leftSection={
                        <IconBuildingCommunity
                          size={16}
                          color={selectedState ? '#006838' : '#9ca3af'}
                          stroke={2}
                        />
                      }
                      leftSectionPointerEvents="none"
                      variant="unstyled"
                      styles={desktopSelectStyles}
                      comboboxProps={{
                        withinPortal: true,
                        transitionProps: { transition: 'fade-down', duration: 150 },
                        shadow: 'lg',
                        radius: 'md',
                        zIndex: 1000,
                      }}
                    />
                  </Box>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    loading={isNavigating}
                    h={44}
                    px={22}
                    radius="xl"
                    style={{
                      backgroundColor: '#006838',
                      flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(0,104,56,0.25)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Group gap={6} wrap="nowrap">
                      <IconSearch size={16} color="white" stroke={2.5} />
                      <Text fw={600} size="sm" c="white">
                        Search
                      </Text>
                    </Group>
                  </Button>
                </Flex>
              </Box>

              {/* Mobile Layout */}
              <Box hiddenFrom="md" w="100%" p={12} style={{ position: 'relative', zIndex: 1 }}>
                <Stack gap={10} w="100%">
                  {/* Keyword Input */}
                  <TextInput
                    size="md"
                    placeholder="What are you looking for?"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.currentTarget.value)}
                    leftSection={<IconSearch size={18} color="#006838" stroke={2} />}
                    leftSectionPointerEvents="none"
                    styles={mobileInputStyles}
                  />

                  {/* State and City row */}
                  <Grid gutter={8}>
                    <Grid.Col span={6}>
                      <Select
                        size="sm"
                        placeholder="State"
                        data={stateOptions}
                        value={selectedState}
                        onChange={(val) => {
                          setSelectedState(val);
                          setSelectedCity(null);
                        }}
                        searchable
                        clearable
                        leftSection={<IconMapPin size={15} color="#006838" stroke={2} />}
                        leftSectionPointerEvents="none"
                        styles={mobileSelectStyles}
                        comboboxProps={{
                          withinPortal: true,
                          transitionProps: { transition: 'fade-down', duration: 150 },
                          shadow: 'lg',
                          radius: 'md',
                          zIndex: 1000,
                        }}
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Select
                        size="sm"
                        placeholder={selectedState ? 'City / Town' : 'City / Town'}
                        data={cityOptions}
                        value={selectedCity}
                        onChange={(val) => setSelectedCity(val)}
                        searchable
                        clearable
                        disabled={!selectedState || cityOptions.length === 0}
                        leftSection={
                          <IconBuildingCommunity
                            size={15}
                            color={selectedState ? '#006838' : '#9ca3af'}
                            stroke={2}
                          />
                        }
                        leftSectionPointerEvents="none"
                        styles={mobileSelectStyles}
                        comboboxProps={{
                          withinPortal: true,
                          transitionProps: { transition: 'fade-down', duration: 150 },
                          shadow: 'lg',
                          radius: 'md',
                          zIndex: 1000,
                        }}
                      />
                    </Grid.Col>
                  </Grid>

                  {/* Full-width Search Button on mobile */}
                  <Button
                    type="submit"
                    loading={isNavigating}
                    fullWidth
                    h={44}
                    radius="xl"
                    style={{
                      backgroundColor: '#006838',
                      boxShadow: '0 2px 8px rgba(0,104,56,0.25)',
                    }}
                  >
                    <Group gap={8} justify="center">
                      <IconSearch size={16} color="white" stroke={2.5} />
                      <Text fw={600} size="sm" c="white">
                        Search Marketplace
                      </Text>
                    </Group>
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Flex>
        </form>
      </Stack>
    </Box>
  );
};

export default HomeHeader;
