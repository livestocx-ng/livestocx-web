'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  IconSettings as AccountSetting01Icon,
  IconX,
  IconLogout as Logout01Icon,
  IconMenu2 as Menu01Icon,
  IconUser as UserIcon,
} from '@tabler/icons-react';
import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Container,
  Divider,
  Drawer,
  Flex,
  Group,
  Image,
  Menu,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import DashboardLogoSvg from '/icons/icon_clif.jpg';
import DashboardSideNavigation from '@/core/components/navigation/dashboard_side_navigation';
import { useAppContext } from '@/core/context';

export default function DashboardShellHeader() {
  const { accountInfo, setAccountInfo, setAuthToken } = useAppContext();

  const router = useRouter();

  const handleLogout = () => {
    setAuthToken('');
    setAccountInfo(null);
    router.push('/signin');
  };

  return (
    <AppShell.Header>
      <Container size="xl" py="sm" fluid h="100%">
        <Stack h="100%" justify="center">
          <Group justify="space-between">
            <Group>
              <Box hiddenFrom="sm">
                <MobileNavigationDrawer />
              </Box>
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
            </Group>
            <Flex align="center" gap="xl">
              <Menu>
                <Menu.Target>
                  <Group gap="sm" style={{ cursor: 'pointer' }}>
                    <Avatar size="sm" color="blue" variant="filled" src={accountInfo?.avatar}>
                      {accountInfo?.firstName ? accountInfo?.firstName.charAt(0).toUpperCase() : ''}
                    </Avatar>

                    <Box visibleFrom="sm">
                      <Text>
                        {accountInfo?.firstName} {accountInfo?.lastName}
                      </Text>
                    </Box>
                  </Group>
                </Menu.Target>
                <Menu.Dropdown w={180}>
                  <Group gap="sm" px="xs" align="center">
                    <Box>
                      <Text size="sm">
                        {accountInfo?.firstName} {accountInfo?.lastName}
                      </Text>
                      <Text size="xs" c="dimmed" style={{ marginTop: -8 }}>
                        {accountInfo?.email}
                      </Text>
                    </Box>
                  </Group>
                  <Menu.Divider />
                  <Menu.Item
                    leftSection={<UserIcon size={18} />}
                    onClick={() => {
                      router.push('/dashboard/settings?tabId=account-settings');
                    }}
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<AccountSetting01Icon size={18} />}
                    onClick={() => {
                      router.push('/dashboard/settings?tabId=business-settings');
                    }}
                  >
                    Settings
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    onClick={handleLogout}
                    leftSection={<Logout01Icon size={18} />}
                  >
                    Log Out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Flex>
          </Group>
        </Stack>
      </Container>
    </AppShell.Header>
  );
}

export function MobileNavigationDrawer() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        position="left"
        onClose={close}
        withCloseButton={false}
        size="70%"
        p={0}
        styles={{ body: { padding: 0 } }}
      >
        <Group p="sm">
          <ActionIcon size="lg" color="dark" onClick={close} variant="subtle">
            <IconX />
          </ActionIcon>
          {/* <img src={LogoTextOnlyPrimary} height={30} /> */}
        </Group>
        <Divider />
        <DashboardSideNavigation />
      </Drawer>
      <ActionIcon variant="default" size="lg" onClick={open}>
        <Menu01Icon />
      </ActionIcon>
    </>
  );
}
