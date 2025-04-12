import { IconCheck } from '@tabler/icons-react';
import { priceFormatter } from '@/core/middlewares';
import { PremiumSubscriptionPlanDescription } from '@/core/sdk/vendor';
import { Button, Card, Divider, Flex, Group, Stack, Text, ThemeIcon } from '@mantine/core';

function PremiumSubscriptionPlanCard({ plan, handleSubmit }: {handleSubmit:()=>void, plan: PremiumSubscriptionPlanDescription }) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      w={{ base: '100%', sm: '100%', md: '25%' }}
      style={(theme) => ({
        backgroundColor: theme.white,
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
      })}
    >
      <Text size="xl" fw={700} mb={5}>
        {plan.title}
      </Text>

      <Group align="flex-end" mb={10}>
        <Text size="xl" fw={700} fz={{ fontSize: 28 }}>
          {priceFormatter(plan.price)}
        </Text>
        <Text color="dimmed" size="sm">
          / year
        </Text>
      </Group>

      <Text color="dimmed" mb={5}>
        {plan.description}
      </Text>

      <Divider my="sm" />

      <Text color="dimmed" my={5}>
        Features
      </Text>

      <Stack mb={30}>
        {plan.info.map((feature, index) => (
          <Flex align="center" key={index} gap={5}>
            <ThemeIcon color="indigo" variant="light" radius="xl" size={24}>
              <IconCheck size={12} />
            </ThemeIcon>
            <Text fz={14}>{feature.title}</Text>
          </Flex>
        ))}
      </Stack>

      <Button
        fullWidth
        color="indigo"
        radius="md"
        size="md"
        onClick={() => {
          handleSubmit();
        }}
      >
        Subscribe Now
      </Button>
    </Card>
  );
}

export default PremiumSubscriptionPlanCard;
