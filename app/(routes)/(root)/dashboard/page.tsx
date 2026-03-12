import { Box, Title } from '@mantine/core';

export default function DashboardPage() {
  return (
      <Box>
        <Title order={2} >
          Dashboard
        </Title>
        <Box>
          Welcome to your dashboard. Use the sidebar navigation to access different sections.
        </Box>
      </Box>
  );
}
