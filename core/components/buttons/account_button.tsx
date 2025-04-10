import { useRouter } from 'next/navigation';
import {
  IconBell,
  IconChartAreaLine,
  IconLogout,
  IconMessages,
  IconPackage,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';
import { ActionIcon, Menu } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useAppContext } from '@/core/context';

export const AccountButton = ({ isScrolling }: { isScrolling: boolean }) => {
  const router = useRouter();

  const { authToken, setAuthToken } = useAppContext();

  const handleClick = () => {
    if (!authToken) {
      router.push('/signin');
    }
  };

  const handleLogout = () => {
    setAuthToken('');

    router.push('/');

    return showNotification({
      color: 'green',
      autoClose: 3000,
      title: 'Message',
      message: 'Logged out successfully',
    });
  };

  if (!authToken) {
    return (
      <ActionIcon
        variant="filled"
        aria-label="Settings"
        radius={100}
        onClick={handleClick}
        styles={{
          root: {
            backgroundColor: isScrolling
              ? 'var(--mantine-color-primary-0)'
              : 'var(--mantine-color-primary-0)',
            '&:hover': {
              backgroundColor: isScrolling
                ? 'var(--mantine-color-primary-0)'
                : 'var(--mantine-color-primary-0)',
            },
          },
        }}
      >
        <IconUser
          stroke={1.5}
          style={{
            width: '70%',
            height: '70%',
            color: isScrolling ? 'white' : 'white',
          }}
        />
      </ActionIcon>
    );
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon
          variant="filled"
          aria-label="Settings"
          radius={100}
          styles={{
            root: {
              backgroundColor: isScrolling
                ? 'var(--mantine-color-primary-0)'
                : 'var(--mantine-color-primary-0)',
              '&:hover': {
                backgroundColor: isScrolling
                  ? 'var(--mantine-color-primary-0)'
                  : 'var(--mantine-color-primary-0)',
              },
            },
          }}
        >
          <IconUser
            stroke={1.5}
            style={{
              width: '70%',
              height: '70%',
              color: isScrolling ? 'white' : 'white',
            }}
          />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Navigation</Menu.Label>
        <Menu.Item leftSection={<IconUser size={14} />}>Account</Menu.Item>
        <Menu.Item leftSection={<IconUsers size={14} />}>Referrals</Menu.Item>
        <Menu.Item leftSection={<IconMessages size={14} />}>Messages</Menu.Item>
        <Menu.Item leftSection={<IconPackage size={14} />}>Products</Menu.Item>
        <Menu.Item leftSection={<IconChartAreaLine size={14} />}>Promotions</Menu.Item>
        <Menu.Item leftSection={<IconBell size={14} />}>Notifications</Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item color="red" onClick={handleLogout} leftSection={<IconLogout size={14} />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
