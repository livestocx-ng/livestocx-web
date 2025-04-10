'use client';

import Link from 'next/link';
import { Box, Burger, Button, Container, Drawer, Group, Image, rem, Stack } from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import { AccountButton } from '../buttons/account_button';
import { ChatConversationsButton } from '../buttons/chat_conversations_button';
import classes from './navbar.module.css';

const links = [
  { link: '/', label: 'Home' },
  { link: '/business', label: 'Business' },
  { link: '/about-us', label: 'About Us' },
  { link: '/contact-us', label: 'Contact Us' },
];

export function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const [scroll] = useWindowScroll();

  return (
    <Box
      component="header"
      className={classes.header}
      style={{
        transition: 'background-color 0.3s ease',
        borderBottom: scroll.y > 0 ? '1px solid var(--mantine-color-gray-3)' : '',
        backdropFilter: scroll.y > 0 ? 'blur(5px)' : 'none',
        backgroundColor: scroll.y > 0 ? '#ffffff60' : '#ffffff00',
        WebkitBackdropFilter: scroll.y > 0 ? 'blur(5px)' : 'none',
      }}
    >
      <Container size="xxl" py={5}>
        <Group justify="space-between" align="center">
          {/* Left section: Logo and Navigation */}
          <Group>
            <Image src="/icons/logo.svg" alt="lvx" w={30} h="auto" />

            {/* Desktop navigation */}
            <Group gap={40} visibleFrom="xs">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.link}
                  style={{
                    display: 'block',
                    lineHeight: 1,
                    padding: `${rem(8)} ${rem(12)}`,
                    borderRadius: 'var(--mantine-radius-sm)',
                    textDecoration: 'none',
                    color:
                      scroll.y > 0 ? 'var(--mantine-color-black)' : 'var(--mantine-color-black)',
                    fontSize: 'var(--mantine-font-size-sm)',
                    fontWeight: 500,
                    transition: 'background-color 150ms ease',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Group>
          </Group>

          {/* Right section: Account and Sell button */}
          <Group>
            <ChatConversationsButton isScrolling={scroll.y > 0} />
            <AccountButton isScrolling={scroll.y > 0} />
            <Button
              variant="filled"
              color="orange"
              radius="xl"
              size="xs"
              component={Link}
              href="/sell"
            >
              Sell
            </Button>
            {/* Mobile burger menu */}
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="xs"
              size="sm"
              color={scroll.y > 0 ? 'black' : 'black'}
            />
          </Group>
        </Group>
      </Container>

      {/* Mobile drawer */}
      <Drawer
        opened={opened}
        onClose={toggle}
        size="100%"
        padding="md"
        hiddenFrom="xs"
        zIndex={1000000}
      >
        <Stack>
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.link}
              style={{
                display: 'block',
                lineHeight: 1,
                padding: `${rem(8)} ${rem(12)}`,
                borderRadius: 'var(--mantine-radius-sm)',
                textDecoration: 'none',
                color: 'var(--mantine-color-black)',
                fontSize: 'var(--mantine-font-size-sm)',
                fontWeight: 500,
                transition: 'background-color 150ms ease',
              }}
              onClick={toggle}
            >
              {link.label}
            </Link>
          ))}
        </Stack>
      </Drawer>
    </Box>
  );
}
