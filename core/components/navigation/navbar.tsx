'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Box, Burger, Button, Container, Drawer, Group, Image, rem, Stack } from '@mantine/core';
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
          backgroundColor: scroll.y > 0 ? '#ffffff80' : '#ffffff00',
          borderBottom: scroll.y > 0 ? '1px solid var(--mantine-color-gray-3)' : '',
        }}
      >
        <Container size="xxl" py={5}>
          <Group justify="space-between" align="center">
            {/* Left section: Logo and Navigation */}
            <Group>
              <Link href="/">
                <Image
                  w={30}
                  h="auto"
                  alt="lvx"
                  src="/icons/icon_clif.jpg"
                  style={{ border: '1px solid #11111120', borderRadius: '10px' }}
                />
              </Link>

              {/* Desktop navigation */}
              <Group gap={40} visibleFrom="xs">
                {navLinks.map((link) => (
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
                // component={Link}
                // href="/sell"
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
            {navLinks.map((link) => (
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
    </>
  );
}
