import { ActionIcon } from '@mantine/core';
import { useAppContext } from '@/core/context';
import { IconMessageCircle } from '@tabler/icons-react';

export const ChatConversationsButton = ({ isScrolling = true }: { isScrolling: boolean }) => {
  const { authToken } = useAppContext();

  return (
    <ActionIcon
      radius={100}
      variant="filled"
      aria-label="Settings"
      style={{
        display: authToken?.length <= 0 ? 'none' : 'block',
      }}
      styles={{
        root: {
          backgroundColor: isScrolling
            ? 'var(--mantine-color-primary-0)'
            : 'var(--mantine-color-primary-0)',
          '&:hover': {
            backgroundColor: isScrolling
              ? 'var(--mantine-color-primary-0)'
              : 'var(--mantine-color-primary-0)',
          },
        },
      }}
    >
      <IconMessageCircle
        stroke={1.5}
        style={{
          width: '70%',
          height: '70%',
          color: isScrolling ? 'white' : 'white',
        }}
      />
    </ActionIcon>
  );
};
