'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconChevronLeft,
  IconChevronRight,
  IconMail,
  IconMapPin,
  IconPhone,
} from '@tabler/icons-react';
import { EmblaCarouselType } from 'embla-carousel';
import { motion } from 'framer-motion';
import { shuffle } from 'lodash';
import { Carousel } from '@mantine/carousel';
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
import { navLinks, Sponsors } from '@/core/utilities';

type OfficeLocation = {
  title: string;
  lines: string[];
  phone?: string;
  badge?: string;
};

type FooterNavItem = {
  link: string;
  label: string;
};

const EXPLORE_LINKS: FooterNavItem[] = navLinks
  .filter((item): item is { link: string; label: string } => Boolean(item.link))
  .map((item) => ({ link: item.link, label: item.label }));

const SOLUTION_LINKS: FooterNavItem[] =
  navLinks.find((item) => item.label === 'Solutions' && 'links' in item)?.links ?? [];

const COMPANY_LINKS: FooterNavItem[] = [
  { link: '/about-us', label: 'About Us' },
  { link: '/contact-us', label: 'Contact Us' },
  { link: '#', label: 'FAQs' },
  { link: '/terms-of-service', label: 'Terms of Service' },
  { link: '/privacy-policy', label: 'Privacy Policy' },
];

const ACCOUNT_LINKS: FooterNavItem[] = [
  { link: '/signin', label: 'Login' },
  { link: '/signup', label: 'Register' },
];

function FooterColumnTitle({ children }: { children: ReactNode }) {
  return (
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
      {children}
    </Title>
  );
}

function FooterNavLink({ item }: { item: FooterNavItem }) {
  const isExternal = item.link.startsWith('http');

  if (isExternal) {
    return (
      <Anchor
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        size="sm"
        className="footer-link"
      >
        {item.label}
      </Anchor>
    );
  }

  return (
    <Anchor component={Link} href={item.link} size="sm" className="footer-link">
      {item.label}
    </Anchor>
  );
}

const US_OFFICE: OfficeLocation = {
  title: 'US Office',
  lines: ['Office 118, Woodward Suites,', '10174 Highway 41, Madera CA 93636'],
  phone: '+1 (559) 668 3783',
};

const ABUJA_MAIN_OFFICE: OfficeLocation = {
  title: 'Abuja Office',
  lines: ['Shimex Estate,', 'Lugbe FCT, Nigeria'],
  badge: 'Main Nigerian Office',
};

const BRANCH_OFFICES: OfficeLocation[] = [
  {
    title: 'Asaba Office',
    lines: ['Opposite Infant Jesus,', 'Old Anwai Road, Asaba, Delta State'],
    phone: '+234 810 859 7000',
    badge: 'Branch Office',
  },
  {
    title: 'Bauchi Office',
    lines: ['12 Yakubu Wanka Road,', 'Near Central Market, Bauchi, Bauchi State'],
    phone: '+234 810 859 7000',
    badge: 'Branch Office',
  },
  {
    title: 'Kano Office',
    lines: ['45 Zoo Road,', 'Nassarawa GRA, Kano, Kano State'],
    phone: '+234 810 859 7000',
    badge: 'Branch Office',
  },
  {
    title: 'Jigawa Office',
    lines: ['8 Sani Abacha Way,', 'Dutse, Jigawa State'],
    phone: '+234 810 859 7000',
    badge: 'Branch Office',
  },
  {
    title: 'Sokoto Office',
    lines: ['21 Sultan Abubakar Road,', 'Sokoto, Sokoto State'],
    phone: '+234 810 859 7000',
    badge: 'Branch Office',
  },
  {
    title: 'Katsina Office',
    lines: ['16 IBB Way,', 'Kofar Kaura, Katsina, Katsina State'],
    phone: '+234 810 859 7000',
    badge: 'Branch Office',
  },
  {
    title: 'Gombe Office',
    lines: ['7 Biu Road,', 'Pantami, Gombe, Gombe State'],
    phone: '+234 701 553 8760',
    badge: 'Branch Office',
  },
  {
    title: 'Borno Office',
    lines: ['33 Shehu Laminu Way,', 'Maiduguri, Borno State'],
    phone: '+234 810 859 7000',
    badge: 'Branch Office',
  },
  {
    title: 'Kaduna Office',
    lines: ['58 Ahmadu Bello Way,', 'Kaduna, Kaduna State'],
    phone: '+234 810 859 7000',
    badge: 'Branch Office',
  },
];

function OfficeCard({
  office,
  featured = false,
  compact = false,
}: {
  office: OfficeLocation;
  featured?: boolean;
  compact?: boolean;
}) {
  return (
    <Box
      className={`footer-office-card${compact ? ' compact' : ''}`}
      style={{
        height: '100%',
        minHeight: compact ? undefined : 120,
        borderColor: featured ? 'rgba(238, 113, 41, 0.35)' : undefined,
        background: featured ? 'rgba(238, 113, 41, 0.06)' : undefined,
      }}
    >
      <Flex gap={6} align="start" justify="space-between" mb={compact ? 4 : 8}>
        <Flex gap={6} align="start">
          <IconMapPin size={compact ? 14 : 18} color="#ee7129" style={{ flexShrink: 0 }} />
          <Text
            size="xs"
            fw={800}
            c="white"
            style={{ letterSpacing: '0.8px', fontSize: compact ? 10 : undefined }}
            tt="uppercase"
          >
            {office.title}
          </Text>
        </Flex>
        {office.badge ? (
          <Text
            size="xs"
            fw={700}
            c="#ee7129"
            style={{
              letterSpacing: '0.4px',
              whiteSpace: 'nowrap',
              fontSize: compact ? 9 : undefined,
            }}
            tt="uppercase"
          >
            {office.badge}
          </Text>
        ) : null}
      </Flex>
      <Text
        size={compact ? 'xs' : 'sm'}
        c="gray.3"
        style={{ lineHeight: compact ? 1.4 : 1.5 }}
      >
        {office.lines.map((line, index) => (
          <span key={line}>
            {line}
            {index < office.lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </Text>
      {office.phone ? (
        <Flex gap={6} align="center" mt={compact ? 6 : 10}>
          <IconPhone size={compact ? 12 : 14} color="gray.5" />
          <Text size="xs" c="gray.4" style={{ fontSize: compact ? 11 : undefined }}>
            {office.phone}
          </Text>
        </Flex>
      ) : null}
    </Box>
  );
}

export function Footer() {
  const pathname = usePathname();
  const [cycleKey, setCycleKey] = useState(0);
  const [officeEmbla, setOfficeEmbla] = useState<EmblaCarouselType | null>(null);
  const [isOfficeCarouselPaused, setIsOfficeCarouselPaused] = useState(false);
  // Stable first pass (no shuffle on page visit); reshuffle only after a cycle finishes
  const [shuffledSponsors, setShuffledSponsors] = useState<typeof Sponsors>(() => [
    ...Sponsors,
    ...Sponsors,
  ]);

  const handleMarqueeCycleComplete = () => {
    setShuffledSponsors([...shuffle(Sponsors), ...shuffle(Sponsors)]);
    setCycleKey((key) => key + 1);
  };

  useEffect(() => {
    if (!officeEmbla || isOfficeCarouselPaused) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      officeEmbla.scrollNext();
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, [officeEmbla, isOfficeCarouselPaused]);

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
            border-radius: 10px;
            padding: 16px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }

          .footer-office-card.compact {
            padding: 10px 12px;
          }
          
          .footer-office-card:hover {
            border-color: rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.06);
            transform: translateY(-2px);
            box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
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
          key={cycleKey}
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
            ease: 'linear',
          }}
          onAnimationComplete={handleMarqueeCycleComplete}
        >
          {shuffledSponsors.map((sponsor, index) => (
            <Image
              key={`${cycleKey}-${sponsor.name}-${index}`}
              w={120}
              h={60}
              src={sponsor.image}
              alt={`Livestocx Backed by: ${sponsor.name}`}
              className="sponsor-logo"
              style={{
                objectFit: 'contain',
                marginRight: 40,
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
          <Stack gap={28}>
            {/* Top: brand + nav links */}
            <Grid gutter={{ base: 'xl', sm: 24 }}>
              <Grid.Col span={{ base: 12, md: 4 }}>
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
                      style={{
                        fontFamily: 'var(--mantine-font-family-headings)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      Livestocx
                    </Title>
                  </Flex>
                  <Text size="sm" c="gray.4" style={{ lineHeight: 1.6, maxWidth: 320, fontStyle: 'italic' }}>
                    The leading digital marketplace for livestock, empowering farmers and building
                    climate resilience.
                  </Text>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 6, sm: 3, md: 2 }}>
                <Stack gap="sm">
                  <FooterColumnTitle>Explore</FooterColumnTitle>
                  {EXPLORE_LINKS.map((item) => (
                    <FooterNavLink key={item.label} item={item} />
                  ))}
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 6, sm: 3, md: 2 }}>
                <Stack gap="sm">
                  <FooterColumnTitle>Solutions</FooterColumnTitle>
                  {SOLUTION_LINKS.map((item) => (
                    <FooterNavLink key={item.label} item={item} />
                  ))}
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 6, sm: 3, md: 2 }}>
                <Stack gap="sm">
                  <FooterColumnTitle>Company</FooterColumnTitle>
                  {COMPANY_LINKS.map((item) => (
                    <FooterNavLink key={item.label} item={item} />
                  ))}
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 6, sm: 3, md: 2 }}>
                <Stack gap="sm">
                  <FooterColumnTitle>Account</FooterColumnTitle>
                  {ACCOUNT_LINKS.map((item) => (
                    <FooterNavLink key={item.label} item={item} />
                  ))}
                </Stack>
              </Grid.Col>
            </Grid>

            {/* Compact US + Abuja cards + contact/social beside Nigerian office */}
            <Stack gap="sm" w="100%">
              <Flex
                direction={{ base: 'column', md: 'row' }}
                gap="sm"
                align={{ base: 'stretch', md: 'center' }}
                justify="space-between"
                w="100%"
              >
                <Flex
                  direction={{ base: 'column', sm: 'row' }}
                  gap="sm"
                  align="stretch"
                  style={{ flex: 1 }}
                >
                  <Box style={{ flex: 1, maxWidth: 320 }}>
                    <OfficeCard office={US_OFFICE} compact />
                  </Box>
                  <Box style={{ flex: 1, maxWidth: 320 }}>
                    <OfficeCard office={ABUJA_MAIN_OFFICE} featured compact />
                  </Box>
                </Flex>
                <Stack gap="xs" justify="center" style={{ flexShrink: 0, minWidth: 220 }}>
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
                  <Group gap="sm">
                    <Link
                      href="https://apps.apple.com/ng/app/livestocx/id6738842775?platform=iphone"
                      target="_blank"
                      className="app-store-badge"
                    >
                      <Image
                        src="/icons/icon_appstore_2.svg"
                        alt="App Store"
                        w={110}
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
                        w={110}
                        h="auto"
                        fit="contain"
                      />
                    </Link>
                  </Group>
                </Stack>
              </Flex>

              <Stack gap="xs" w="100%">
                <Text
                  size="xs"
                  fw={700}
                  c="gray.5"
                  style={{ letterSpacing: '0.8px' }}
                  tt="uppercase"
                >
                  Branch Offices
                </Text>
                <Box
                  w="100%"
                  pb={28}
                  onMouseEnter={() => setIsOfficeCarouselPaused(true)}
                  onMouseLeave={() => setIsOfficeCarouselPaused(false)}
                >
                  <Carousel
                    getEmblaApi={setOfficeEmbla}
                    slideSize={{ base: '100%', sm: '50%', md: '33.333%', lg: '25%' }}
                    slideGap="md"
                    align="start"
                    loop
                    withControls
                    withIndicators
                    controlSize={32}
                    nextControlIcon={<IconChevronRight size={16} />}
                    previousControlIcon={<IconChevronLeft size={16} />}
                    styles={{
                      root: { width: '100%' },
                      controls: {
                        top: 'calc(50% - 16px)',
                      },
                      control: {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        color: 'white',
                        boxShadow: 'none',
                        '&:hover': {
                          backgroundColor: '#ee7129',
                          borderColor: '#ee7129',
                          color: 'white',
                        },
                      },
                      indicators: {
                        bottom: -22,
                      },
                      indicator: {
                        width: 8,
                        height: 8,
                        backgroundColor: 'rgba(255, 255, 255, 0.35)',
                        transition: 'width 200ms ease, background-color 200ms ease',
                        '&[data-active]': {
                          width: 18,
                          backgroundColor: '#ee7129',
                        },
                      },
                    }}
                  >
                    {BRANCH_OFFICES.map((office) => (
                      <Carousel.Slide key={office.title}>
                        <OfficeCard office={office} compact />
                      </Carousel.Slide>
                    ))}
                  </Carousel>
                </Box>
              </Stack>
            </Stack>
          </Stack>
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
