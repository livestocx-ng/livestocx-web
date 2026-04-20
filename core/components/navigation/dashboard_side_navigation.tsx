'use client';

import {
  IconMessage as Message01Icon,
  IconSpeakerphone as PromotionIcon,
  IconPackage as PackageAddIcon,
  IconSettings as AccountSetting01Icon,
} from '@tabler/icons-react';
import { Divider, Stack } from '@mantine/core';
import DashboardNavigationLink from './dashboard-navigation-link';

export default function DashboardSideNavigation() {
  return (
    <>
      <Stack gap={0} h="100%">
        {/* <Box>
          <Divider />
        </Box> */}
        <Stack p="md" gap={15} flex={1}>
          {/* <Text size="sm" c="dimmed" mb="sm">
            OPERATIONS
          </Text> */}

          <DashboardNavigationLink
            Icon={PackageAddIcon}
            label="Products"
            path="/dashboard/products"
          />
          <DashboardNavigationLink
            Icon={PromotionIcon}
            label="Promotions"
            path="/dashboard/promotions"
          />
          <DashboardNavigationLink
            Icon={Message01Icon}
            label="Messages"
            path="/dashboard/messages"
          />

          <DashboardNavigationLink
            Icon={AccountSetting01Icon}
            label="Settings"
            path="/dashboard/settings"
          />
        </Stack>
        <Divider />
      </Stack>
    </>
  );
}
