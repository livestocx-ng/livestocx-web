'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HugeiconsProps } from 'hugeicons-react';
import { Group, Paper, Text, useMantineTheme } from '@mantine/core';

export default function DashboardNavigationLink({
  Icon,
  label,
  rightIcon,
  path,
}: {
  Icon: React.FC<HugeiconsProps>;
  label: string;
  rightIcon?: React.ReactNode;
  path: string;
}) {
  const theme = useMantineTheme();
  const pathname = usePathname();

  // Special case for Customer Support
  const isCustomerSupport = label === 'Customer support';

  // Handle exact match for dashboard path
  const isActive = isCustomerSupport
    ? false
    : path === '/dashboard'
      ? pathname === path || pathname === '/dashboard'
      : pathname.startsWith(path);

  return (
    <Link href={path} style={{ color: 'inherit', textDecoration: 'none' }}>
      <Paper bg={isActive ? theme.colors.gray[1] : undefined} radius="sm" py="xs" px="xs">
        <Group>
          <Icon color={isActive ? theme.colors.gray[9] : undefined} />
          <Text flex={1} fw={isActive ? 'bold' : undefined}>
            {label}
          </Text>
          {rightIcon}
        </Group>
      </Paper>
    </Link>
  );
}
