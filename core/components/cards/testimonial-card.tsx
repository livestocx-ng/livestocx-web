import { IconStarFilled } from '@tabler/icons-react';
import { Avatar, Box, Group, Stack, Text } from '@mantine/core';
import { TestimonialInfo } from '@/core/sdk/communication';

export function TestimonialCard({ testimonial }: { testimonial: TestimonialInfo }) {
  return (
    <Box
      p="md"
      mx="auto"
      h='160px'
      style={{
        borderRadius: '10px',
        border: '1px solid #ccc',
      }}
      mb={{ base: 'md', md: 0 }}
      w={{ base: '100%', sm: '100%', md: '350px' }}
    >
      <Stack gap="md">
        <Group align="center" gap="sm">
          <Avatar
            src={testimonial.avatarUrl}
            alt={testimonial.author}
            size={50}
            radius="xl"
            styles={{
              root: {
                border: '1px solid var(--mantine-color-gray-4)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              },
            }}
          />

          <Box>
            <Text size="sm" fw={500} c="primary">
              {testimonial.author}
            </Text>

            <Group gap={2}>
              {[1, 2, 3, 4, 5].map((item) => (
                <IconStarFilled
                  key={item}
                  size={15}
                  style={{ color: 'var(--mantine-color-orange-5)' }}
                />
              ))}
            </Group>
          </Box>
        </Group>

        <Text size="sm" ta="center" lh={1.5}>
          {testimonial.testimonial}
        </Text>
      </Stack>
    </Box>
  );
}
