'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconChevronDown } from '@tabler/icons-react';
import {
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Image,
  Menu,
  NavLink,
  rem,
  Stack,
  Title,
} from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import { useAppContext } from '@/core/context';
import useFetchAccountInfoQuery from '@/core/hooks/account/useFetchAccountInfoQuery';
import useFetchUserListItemsQuery from '@/core/hooks/account/useFetchUserListItemsQuery';
import useInitializeAuthTokenQuery from '@/core/hooks/auth/useInitializeAuthTokenQuery';
import useFetchVendorInfoQuery from '@/core/hooks/vendor/useFetchVendorInfoQuery';
import { navLinks } from '@/core/utilities';
import { AccountButton } from '../buttons/account_button';
import { ChatConversationsButton } from '../buttons/chat_conversations_button';
import UpdateBusinessProfileDrawer from '../drawers/update_business_profile_drawer';
import UpdateUserRoleDrawer from '../drawers/update_user_role_drawer';
import classes from './navbar.module.css';

export function Navbar() {
  const pathname = usePathname();

  const { refetch: refetchVendorInfo } = useFetchVendorInfoQuery();
  const { refetch: refetchAccountInfo } = useFetchAccountInfoQuery();
  const { refetch: refetchUserListItems } = useFetchUserListItemsQuery();
  const { refetch: reInitializeAuthToken } = useInitializeAuthTokenQuery();

  const [scroll] = useWindowScroll();

  const { authToken, accountInfo, vendorInfo } = useAppContext();

  const [opened, { toggle }] = useDisclosure(false);

  const [
    isUpdateUserRoleDrawerOpen,
    { open: openUpdateUserRoleDrawer, close: closeUpdateUserRoleDrawer },
  ] = useDisclosure(false);

  const [
    isUpdateBusinessProfileDrawerOpen,
    { open: openUpdateBusinessProfileDrawer, close: closeUpdateBusinessProfileDrawer },
  ] = useDisclosure(false);

  const isLinkActive = (link?: string) =>
    !!link && !link.startsWith('http') && (pathname === link || pathname.startsWith(`${link}/`));

  useEffect(() => {
    refetchVendorInfo();
    refetchAccountInfo();
    refetchUserListItems();
    reInitializeAuthToken();
  }, [authToken]);

  return (
    <>
      <UpdateUserRoleDrawer
        isOpen={isUpdateUserRoleDrawerOpen}
        closeDrawer={closeUpdateUserRoleDrawer}
      />

      <UpdateBusinessProfileDrawer
        isOpen={isUpdateBusinessProfileDrawerOpen}
        closeDrawer={closeUpdateBusinessProfileDrawer}
      />

      <Box
        component="header"
        className={classes.header}
        style={{
          transition: 'background-color 0.3s ease',
          backdropFilter: scroll.y > 0 ? 'blur(5px)' : 'none',
          WebkitBackdropFilter: scroll.y > 0 ? 'blur(5px)' : 'none',
          display: pathname.includes('dashboard') ? 'none' : 'block',
          backgroundColor: scroll.y > 0 ? '#ffffff80' : '#ffffff00',
          borderBottom: scroll.y > 0 ? '1px solid var(--mantine-color-gray-3)' : '',
        }}
      >
        <Container size="xxl" px={20} py={10}>
          <Group justify="space-betwee" gap={4} align="center">
            {/* Left section: Logo */}
            <Group style={{ flex: 1 }} justify="flex-start">
              <Link
                href="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <Image
                  w={30}
                  h="auto"
                  alt="lvx"
                  src="/icons/icon_clif.jpg"
                  style={{ border: '1px solid #11111120', borderRadius: '10px' }}
                />
                <Title
                  order={6}
                  style={{
                    fontFamily: 'var(--mantine-font-family-headings)',
                    letterSpacing: '0.05em',
                  }}
                >
                  Livestocx
                </Title>
              </Link>
            </Group>

            {/* Center section: Navigation */}
            <Group gap={5} visibleFrom="md" justify="center">
              {navLinks.map((link) => {
                const isActive = link.links
                  ? link.links.some((item) => isLinkActive(item.link))
                  : isLinkActive(link.link);

                const commonStyle = {
                  display: 'block',
                  lineHeight: 1,
                  padding: `${rem(8)} ${rem(12)}`,
                  borderRadius: 'var(--mantine-radius-xl)',
                  textDecoration: 'none',
                  color: isActive ? 'var(--mantine-color-green-8)' : 'var(--mantine-color-black)',
                  backgroundColor: isActive ? 'var(--mantine-color-green-0)' : 'transparent',
                  fontSize: 'var(--mantine-font-size-sm)',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'background-color 150ms ease',
                } as const;

                if (link.links) {
                  return (
                    <Menu
                      key={link.label}
                      trigger="hover"
                      transitionProps={{ exitDuration: 0 }}
                      withinPortal
                    >
                      <Menu.Target>
                        <a href="#" style={commonStyle} onClick={(event) => event.preventDefault()}>
                          <Group gap={5}>
                            {link.label}
                            <IconChevronDown size={14} />
                          </Group>
                        </a>
                      </Menu.Target>
                      <Menu.Dropdown>
                        {link.links.map((item) => (
                          <Menu.Item
                            key={item.label}
                            component={(item.link.startsWith('http') ? 'a' : Link) as any}
                            href={item.link}
                            target={item.link.startsWith('http') ? '_blank' : undefined}
                            style={
                              isLinkActive(item.link)
                                ? {
                                    color: 'var(--mantine-color-green-8)',
                                    backgroundColor: 'var(--mantine-color-green-0)',
                                    fontWeight: 600,
                                  }
                                : undefined
                            }
                          >
                            {item.label}
                          </Menu.Item>
                        ))}
                      </Menu.Dropdown>
                    </Menu>
                  );
                }

                if (link.link?.startsWith('http')) {
                  return (
                    <a key={link.label} href={link.link} style={commonStyle}>
                      {link.label}
                    </a>
                  );
                }

                return (
                  <Link key={link.label} href={link.link as string} style={commonStyle}>
                    {link.label}
                  </Link>
                );
              })}
            </Group>

            {/* Right section: Account and Sell button */}
            <Group style={{ flex: 1 }} justify="flex-end">
              {/* <ChatConversationsButton isScrolling={scroll.y > 0} /> */}
              <AccountButton isScrolling={scroll.y > 0} />
              <Button
                variant="filled"
                color="orange"
                radius="xl"
                size="xs"
                component={Link}
                href="/dashboard/products"
                onClick={() => {
                  if (accountInfo?.role === 'CUSTOMER') {
                    return openUpdateUserRoleDrawer();
                  } else if (vendorInfo?.isUpdated === false) {
                    return openUpdateBusinessProfileDrawer();
                  }
                }}
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
            {navLinks.map((link) => {
              const isActive = link.links
                ? link.links.some((item) => isLinkActive(item.link))
                : isLinkActive(link.link);

              const commonStyle = {
                display: 'block',
                lineHeight: 1,
                padding: `${rem(8)} ${rem(12)}`,
                borderRadius: 'var(--mantine-radius-sm)',
                textDecoration: 'none',
                color: isActive ? 'var(--mantine-color-green-8)' : 'var(--mantine-color-black)',
                backgroundColor: isActive ? 'var(--mantine-color-green-0)' : 'transparent',
                fontSize: 'var(--mantine-font-size-sm)',
                fontWeight: isActive ? 600 : 500,
                transition: 'background-color 150ms ease',
              } as const;

              if (link.links) {
                return (
                  <NavLink
                    key={link.label}
                    label={link.label}
                    defaultOpened={isActive}
                    styles={{
                      label: {
                        fontWeight: isActive ? 600 : 500,
                        fontSize: 'var(--mantine-font-size-sm)',
                        color: isActive
                          ? 'var(--mantine-color-green-8)'
                          : 'var(--mantine-color-black)',
                      },
                    }}
                  >
                    {link.links.map((item) => (
                      <NavLink
                        key={item.label}
                        component={(item.link.startsWith('http') ? 'a' : Link) as any}
                        href={item.link}
                        label={item.label}
                        onClick={toggle}
                        active={isLinkActive(item.link)}
                        color="green"
                        target={item.link.startsWith('http') ? '_blank' : undefined}
                        styles={{
                          label: {
                            fontSize: 'var(--mantine-font-size-sm)',
                            color: isLinkActive(item.link)
                              ? 'var(--mantine-color-green-8)'
                              : 'var(--mantine-color-gray-7)',
                          },
                        }}
                      />
                    ))}
                  </NavLink>
                );
              }

              if (link.link?.startsWith('http')) {
                return (
                  <a key={link.label} href={link.link} style={commonStyle} onClick={toggle}>
                    {link.label}
                  </a>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.link as string}
                  style={commonStyle}
                  onClick={toggle}
                >
                  {link.label}
                </Link>
              );
            })}
          </Stack>
        </Drawer>
      </Box>
    </>
  );
}
