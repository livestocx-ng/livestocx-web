'use client';

import {
  IconClipboardCheck,
  IconMessages,
  IconSearch,
  IconTruckDelivery,
} from '@tabler/icons-react';
import {
  Badge,
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  rem,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { howItWorksSteps } from '@/core/utilities';

const stepIcons = [IconSearch, IconMessages, IconClipboardCheck, IconTruckDelivery];

const HomeHowItWorks = () => {
  const isMdUp = useMediaQuery('(min-width: 62em)');

  return (
    <Box bg="white" py={{ base: 40, md: 56 }}>
      <Container size="xl" px={20}>
        <Stack gap="xl" align="center">
          <Stack gap="sm" align="center" ta="center" maw={640}>
            <Badge variant="light" color="primary" size="lg" radius="sm">
              How it works
            </Badge>
            <Title
              order={2}
              style={{
                fontFamily: 'var(--mantine-font-family-headings)',
                fontSize: rem(32),
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              How a deal works on Livestocx
            </Title>
            <Text c="dimmed" size="md" lh={1.6}>
              From discovery to delivery — a straightforward path for buying and selling livestock.
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg" w="100%">
            {howItWorksSteps.map((step, index) => {
              const StepIcon = stepIcons[index];

              return (
                <Stack
                  key={step.step}
                  gap="sm"
                  align={isMdUp ? 'flex-start' : 'center'}
                  ta={isMdUp ? 'left' : 'center'}
                  p="md"
                  style={{
                    borderRadius: rem(12),
                    border: '1px solid var(--mantine-color-gray-2)',
                  }}
                >
                  <ThemeIcon size={44} radius="md" color="primary" variant="light">
                    <StepIcon size={22} />
                  </ThemeIcon>
                  <Text size="xs" c="primary" fw={700}>
                    Step {step.step}
                  </Text>
                  <Text fw={600} size="md" c="dark.8">
                    {step.title}
                  </Text>
                  <Text size="sm" c="dimmed" lh={1.5}>
                    {step.description}
                  </Text>
                </Stack>
              );
            })}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomeHowItWorks;
