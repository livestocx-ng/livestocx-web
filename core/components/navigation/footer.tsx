'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
  IconMapPin,
  IconPhone,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { shuffle } from 'lodash';
import {
  Anchor,
  Box,
  Container,
  Flex,
  Grid,
  Group,
  Image,
  rem,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Sponsors } from '@/core/utilities';

export function Footer() {
  const pathname = usePathname();
  const [shuffledSponsors, setShuffledSponsors] = useState<typeof Sponsors>([]);

  // Safe client-side shuffling to avoid Next.js hydration mismatch issues
  useEffect(() => {
    if (Sponsors.length <= 1) {
      setShuffledSponsors([...Sponsors, ...Sponsors]);
      return;
    }

    let list1 = shuffle(Sponsors);
    let list2 = shuffle(Sponsors);

    let attempts = 0;
    // Ensure the boundary elements and the ends of the concatenated list do not match
    while (attempts < 100) {
      list1 = shuffle(Sponsors);
      list2 = shuffle(Sponsors);

      const boundaryMatch = list1[list1.length - 1].image === list2[0].image;
      const endStartMatch = list1[0].image === list2[list2.length - 1].image;

      if (!boundaryMatch && !endStartMatch) {
        break;
      }
      attempts++;
    }

    setShuffledSponsors([...list1, ...list2]);
  }, []);

  return (
    <Box style={{ display: pathname.includes('dashboard') ? 'none' : 'block' }}>
      {/* CSS Styles injection for premium micro-interactions */}
      <style>
        {`
          .sponsor-logo {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .sponsor-logo:hover {
            transform: scale(1.05);
          }
          
          .footer-link {
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            font-size: var(--mantine-font-size-sm);
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            display: inline-block;
            width: fit-content;
          }
          
          .footer-link:hover {
            color: var(--mantine-color-white) !important;
            transform: translateX(4px);
          }
          
          .footer-office-card {
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(255, 255, 255, 0.03);
            border-radius: 12px;
            padding: 16px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }
          
          .footer-office-card:hover {
            border-color: rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.06);
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
          }
          
          .social-icon-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: var(--mantine-color-white);
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .social-icon-btn:hover {
            background: #ee7129;
            border-color: #ee7129;
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 6px 16px rgba(238, 113, 41, 0.4);
            color: var(--mantine-color-white) !important;
          }
          
          .app-store-badge {
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            display: inline-block;
            width: fit-content;
          }
          
          .app-store-badge:hover {
            transform: scale(1.04) translateY(-1px);
            filter: brightness(1.08);
          }
        `}
      </style>

      {/* Sponsors/Backed-by Section with horizontal edge fade-mask */}
      <Box
        mt={60}
        mb={20}
        style={{
          overflow: 'hidden',
          width: '100%',
          position: 'relative',
        }}
      >
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 50,
            width: 'max-content',
            paddingBottom: 15,
          }}
          animate={{
            x: [0, -1200],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          }}
        >
          {shuffledSponsors.length > 0
            ? shuffledSponsors.map((sponsor, index) => (
                <Image
                  key={`${sponsor.name}-${index}`}
                  w={100}
                  h={50}
                  src={sponsor.image}
                  alt={`Livestocx Backed by: ${sponsor.name}`}
                  className="sponsor-logo"
                  style={{
                    objectFit: 'contain',
                    borderRadius: '6px',
                  }}
                />
              ))
            : // Fallback content during server render / hydration to ensure layout stability
              Sponsors.map((sponsor, index) => (
                <Image
                  key={`${sponsor.name}-fallback-${index}`}
                  w={100}
                  h={50}
                  src={sponsor.image}
                  alt={`Livestocx Backed by: ${sponsor.name}`}
                  className="sponsor-logo"
                  style={{
                    objectFit: 'contain',
                    borderRadius: '6px',
                  }}
                />
              ))}
        </motion.div>
      </Box>

      {/* Footer Body with rich deep forest-green gradient and subtle ambient mesh glow */}
      <Box
        style={{
          background: 'linear-gradient(180deg, #013f24 0%, #002213 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
        py={{ base: 'xl', sm: 40 }}
      >
        {/* Subtle Ambient Radial Highlight */}
        <Box
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
            background: 'radial-gradient(circle, rgba(238, 113, 41, 0.03) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <Container size="xxl">
          <Grid gutter={{ base: 'xl', sm: 30 }} justify="space-between">
            {/* Left Section - Company Info and Address Cards */}
            <Grid.Col span={{ base: 12, lg: 7 }} mb={{ base: 'lg', lg: 0 }}>
              <Stack gap="lg">
                {/* Brand Identity Header */}
                <Stack gap="xs">
                  <Flex align="center" gap="sm">
                    <Box
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        padding: 6,
                        borderRadius: 12,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      <Image
                        w={32}
                        h={32}
                        alt="lvx logo"
                        src="/icons/icon_clif.jpg"
                        style={{ borderRadius: '6px', objectFit: 'cover' }}
                      />
                    </Box>
                    <Title
                      order={3}
                      c="white"
                      style={{ fontFamily: 'Gotham, sans-serif', letterSpacing: '-0.02em' }}
                    >
                      Livestocx
                    </Title>
                  </Flex>
                  <Text size="sm" c="gray.4" style={{ maxWidth: 480, lineHeight: 1.6 }}>
                    The leading digital marketplace for livestock, empowering farmers and building
                    climate resilience.
                  </Text>
                </Stack>

                {/* Office Location Glass Cards */}
                <Flex
                  direction={{ base: 'column', md: 'row' }}
                  gap="md"
                  justify="space-between"
                  align="stretch"
                  w="100%"
                >
                  <Box className="footer-office-card" style={{ flex: 1 }}>
                    <Flex gap="xs" align="start" mb={8}>
                      <IconMapPin size={18} color="#ee7129" style={{ flexShrink: 0 }} />
                      <Text
                        size="xs"
                        fw={800}
                        c="white"
                        style={{ letterSpacing: '0.8px' }}
                        tt="uppercase"
                      >
                        US Office
                      </Text>
                    </Flex>
                    <Text size="sm" c="gray.3" style={{ lineHeight: 1.5 }}>
                      1680 East Barstow Avenue,
                      <br />
                      Fresno California, United States
                    </Text>
                    <Flex gap="xs" align="start" mt={10}>
                      <IconPhone size={14} color="gray.5" />
                      <Text size="xs" c="gray.4">
                        +1 (559) 668 3783
                      </Text>
                    </Flex>
                  </Box>

                  <Box className="footer-office-card" style={{ flex: 1 }}>
                    <Flex gap="xs" align="start" mb={8}>
                      <IconMapPin size={18} color="#ee7129" style={{ flexShrink: 0 }} />
                      <Text
                        size="xs"
                        fw={800}
                        c="white"
                        style={{ letterSpacing: '0.8px' }}
                        tt="uppercase"
                      >
                        Abuja Office
                      </Text>
                    </Flex>
                    <Text size="sm" c="gray.3" style={{ lineHeight: 1.5 }}>
                      Shimex Estate,
                      <br />
                      Lugbe FCT, Nigeria
                    </Text>
                  </Box>

                  <Box className="footer-office-card" style={{ flex: 1 }}>
                    <Flex gap="xs" align="start" mb={8}>
                      <IconMapPin size={18} color="#ee7129" style={{ flexShrink: 0 }} />
                      <Text
                        size="xs"
                        fw={800}
                        c="white"
                        style={{ letterSpacing: '0.8px' }}
                        tt="uppercase"
                      >
                        Asaba Office
                      </Text>
                    </Flex>
                    <Text size="sm" c="gray.3" style={{ lineHeight: 1.5 }}>
                      Opposite Infant Jesus,
                      <br />
                      Old Anwai Road, Asaba, Delta State
                    </Text>
                    <Flex gap="xs" align="start" mt={10}>
                      <IconPhone size={14} color="gray.5" />
                      <Text size="xs" c="gray.4">
                        +234 813 254 9273
                      </Text>
                    </Flex>
                  </Box>
                </Flex>

                <Flex gap="xs" align="center">
                  <IconMail size={16} color="gray.4" />
                  <Anchor
                    href="mailto:support@livestocx.com"
                    size="sm"
                    c="gray.3"
                    className="footer-link"
                  >
                    support@livestocx.com
                  </Anchor>
                </Flex>
              </Stack>
            </Grid.Col>

            {/* Right Section - Navigation Links & Social Media */}
            <Grid.Col span={{ base: 12, lg: 5 }}>
              <Grid gutter="xl">
                {/* Helps Column */}
                <Grid.Col span={{ base: 6, sm: 4 }}>
                  <Stack gap="sm">
                    <Title
                      order={6}
                      c="white"
                      style={{
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        fontSize: rem(12),
                        fontWeight: 700,
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        paddingBottom: 8,
                        marginBottom: 4,
                      }}
                    >
                      Helps
                    </Title>
                    <Anchor href="/about-us" size="sm" className="footer-link">
                      About Us
                    </Anchor>
                    <Anchor href="/contact-us" size="sm" className="footer-link">
                      Contact Us
                    </Anchor>
                    <Anchor href="#" size="sm" className="footer-link">
                      FAQs
                    </Anchor>
                    <Anchor href="/terms-of-service" size="sm" className="footer-link">
                      Terms of Service
                    </Anchor>
                    <Anchor href="/privacy-policy" size="sm" className="footer-link">
                      Privacy Policy
                    </Anchor>
                  </Stack>
                </Grid.Col>

                {/* Other Column */}
                <Grid.Col span={{ base: 6, sm: 4 }}>
                  <Stack gap="sm">
                    <Title
                      order={6}
                      c="white"
                      style={{
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        fontSize: rem(12),
                        fontWeight: 700,
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        paddingBottom: 8,
                        marginBottom: 4,
                      }}
                    >
                      Other
                    </Title>
                    <Anchor href="/signin" size="sm" className="footer-link">
                      Login
                    </Anchor>
                    <Anchor href="/signup" size="sm" className="footer-link">
                      Register
                    </Anchor>
                  </Stack>
                </Grid.Col>

                {/* Socials & Downloads Column */}
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Stack gap="md">
                    <Title
                      order={6}
                      c="white"
                      style={{
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        fontSize: rem(12),
                        fontWeight: 700,
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        paddingBottom: 8,
                        marginBottom: 4,
                      }}
                    >
                      Follow Us
                    </Title>
                    <Group gap="xs">
                      <a
                        href="https://www.facebook.com/livestocx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon-btn"
                        aria-label="Facebook"
                      >
                        <IconBrandFacebook size={20} stroke={1.5} />
                      </a>
                      <a
                        href="https://ng.linkedin.com/company/livestocxltd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon-btn"
                        aria-label="LinkedIn"
                      >
                        <IconBrandLinkedin size={20} stroke={1.5} />
                      </a>
                      <a
                        href="https://instagram.com/livestocx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon-btn"
                        aria-label="Instagram"
                      >
                        <IconBrandInstagram size={20} stroke={1.5} />
                      </a>
                    </Group>

                    <Stack gap="xs" mt="sm">
                      <Text
                        size="xs"
                        fw={600}
                        c="gray.4"
                        style={{ letterSpacing: '0.5px' }}
                        tt="uppercase"
                      >
                        Get the App
                      </Text>
                      <Link
                        href="https://apps.apple.com/ng/app/livestocx/id6738842775?platform=iphone"
                        target="_blank"
                        className="app-store-badge"
                      >
                        <Image
                          src="/icons/icon_appstore_2.svg"
                          alt="App Store"
                          w={125}
                          h="auto"
                          fit="contain"
                        />
                      </Link>
                      <Link
                        target="_blank"
                        href="https://play.google.com/store/apps/details?id=com.livestocx.livestocx_mobile"
                        className="app-store-badge"
                      >
                        <Image
                          src="/icons/icon_playstore_2.svg"
                          alt="Google Play"
                          w={125}
                          h="auto"
                          fit="contain"
                        />
                      </Link>
                    </Stack>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </Container>

        {/* Bottom copyright segment */}
        <Box mt={40} pt="md" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <Container size="xxl">
            <Text size="xs" ta="center" c="gray.5" style={{ letterSpacing: '0.2px' }}>
              Powered by Livestocx Inc © {new Date().getFullYear()}. All Rights Reserved.
            </Text>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
