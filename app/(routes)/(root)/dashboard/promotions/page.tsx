import { Box, Container, Title } from '@mantine/core';

export default function PromotionsPage() {
  return (
    <Container size="xl" py="xl">
      <Box>
        <Title order={2} mb="md">
          Promotions
        </Title>
        <Box>Manage your promotions here.</Box>
      </Box>
    </Container>
  );
}
