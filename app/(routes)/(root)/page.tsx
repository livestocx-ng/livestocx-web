import { Box, Title } from '@mantine/core';

export default function HomePage() {
  return (
    <Box h="100vh" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Title order={1} c='primary'>Livestocx</Title>
    </Box>
  );
}
