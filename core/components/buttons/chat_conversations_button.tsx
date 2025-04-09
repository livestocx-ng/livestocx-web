import { IconMessageCircle } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';

export const ChatConversationsButton = ({ isScrolling = true }: { isScrolling: boolean }) => {
  return (
    <ActionIcon
      variant="filled"
      aria-label="Settings"
      radius={100}
      // onClick={handleClick}
      styles={{
        root: {
          backgroundColor: isScrolling ? 'var(--mantine-color-primary-0)' : 'var(--mantine-color-primary-0)',
          '&:hover': {
            backgroundColor: isScrolling ? 'var(--mantine-color-primary-0)' : 'var(--mantine-color-primary-0)',
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
