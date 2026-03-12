'use client';

import { useState } from 'react';
import { IconBuilding, IconSettings, IconUser } from '@tabler/icons-react';
import { Box, Paper, rem, Tabs, Text, Title } from '@mantine/core';
import { ProfileSettings } from '@/core/components/settings';
import PageShell from '@/core/components/shell/page-shell';

type SettingsTab = 'profile' | 'business' | 'settings';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  return (
    <PageShell title="Settings">
      <Paper p={{ base: 0, sm: 'md' }} style={{ overflowX: 'auto' }}>
        <Tabs
          value={activeTab}
          onChange={(value) => setActiveTab(value as SettingsTab)}
          variant="default"
          styles={{
            tab: {
              padding: `${rem(12)} ${rem(20)}`,
              fontWeight: 500,
              color: '#868e96',
              '&[dataActive]': {
                color: '#228be6',
                borderColor: '#228be6',
              },
            },
            tabLabel: {
              fontSize: rem(14),
            },
          }}
        >
          <Tabs.List style={{ borderBottom: '1px solid #e9ecef' }}>
            <Tabs.Tab value="profile" leftSection={<IconUser size={18} stroke={1.5} />}>
              Profile
            </Tabs.Tab>
            <Tabs.Tab value="business" leftSection={<IconBuilding size={18} stroke={1.5} />}>
              Business Profile
            </Tabs.Tab>
            <Tabs.Tab value="settings" leftSection={<IconSettings size={18} stroke={1.5} />}>
              Settings
            </Tabs.Tab>
          </Tabs.List>

          <Box py="md">
            <Tabs.Panel value="profile">
              <ProfileSettings />
            </Tabs.Panel>

            <Tabs.Panel value="business">
              <Text>Business tab content</Text>
            </Tabs.Panel>

            <Tabs.Panel value="settings">
              <Title order={3} mb="md">
                Settings
              </Title>
              <Text c="dimmed">Configure your app preferences and notifications here.</Text>
            </Tabs.Panel>
          </Box>
        </Tabs>
      </Paper>
    </PageShell>
  );
}
