'use client';

import Link from 'next/link';
import {
  IconHeartbeat,
  IconStethoscope,
  IconClipboardHeart,
} from '@tabler/icons-react';
import { Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import PageShell from '@/core/components/shell/page-shell';

const RECORD_TYPES = [
  {
    href: '/dashboard/records/health',
    title: 'Shots & treatments',
    caption: 'Vaccines, sickness, and medicines — including foot and mouth disease and avian influenza.',
    icon: IconHeartbeat,
  },
  {
    href: '/dashboard/records/veterinary',
    title: 'Vet visits',
    caption: 'Keep a note of when a vet saw your animal and what was done.',
    icon: IconStethoscope,
  },
  {
    href: '/dashboard/records/monitoring',
    title: 'Health checks',
    caption: 'Track how each animal looks and weighs over time.',
    icon: IconClipboardHeart,
  },
];

export default function AnimalRecordsHubPage() {
  return (
    <PageShell
      title="Animal Records"
      caption="Simple notes for animal care, including foot and mouth disease and avian influenza."
    >
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {RECORD_TYPES.map((item) => (
          <Paper
            key={item.href}
            component={Link}
            href={item.href}
            p="lg"
            radius="md"
            withBorder
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Stack gap="sm">
              <ThemeIcon size={42} radius="md" variant="light" color="teal">
                <item.icon size={22} />
              </ThemeIcon>
              <Title order={4}>{item.title}</Title>
              <Text size="sm" c="dimmed">
                {item.caption}
              </Text>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
    </PageShell>
  );
}
