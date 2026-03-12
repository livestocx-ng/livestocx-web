'use client';

import { IconArrowLeft, IconMessageCircle, IconSend } from '@tabler/icons-react';
import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Flex,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { ChatConversationInfo, ChatConversationUserInfo, ChatMessageInfo } from '@/core/sdk/communication';

interface ChatConversationAreaProps {
  conversation: ChatConversationInfo | null;
  messages: ChatMessageInfo[];
  isMobile: boolean;
  currentUserId?: string;
  onBackToSidebar: () => void;
}

export const ChatConversationArea = ({
  conversation,
  messages,
  isMobile,
  currentUserId,
  onBackToSidebar,
}: ChatConversationAreaProps) => {
  const getOtherUser = (conv: ChatConversationInfo): ChatConversationUserInfo => {
    return conv.user1.id === currentUserId ? conv.user2 : conv.user1;
  };

  const formatMessageTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  if (!conversation) {
    return (
      <Center h="100%">
        <Stack align="center" gap="md">
          <IconMessageCircle size={80} color="#adb5bd" />
          <Text size="lg" fw={500} c="dimmed">
            Select a conversation to start chatting
          </Text>
          <Text size="sm" c="dimmed" ta="center" maw={400}>
            Choose a conversation from the sidebar to view and send messages
          </Text>
        </Stack>
      </Center>
    );
  }

  const otherUser = getOtherUser(conversation);

  return (
    <Box h="100%" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Chat Header */}
      <Paper
        p="md"
        style={{
          borderBottom: '1px solid #e9ecef',
          backgroundColor: 'white',
        }}
      >
        <Flex justify="space-between" align="center">
          <Flex gap="md" align="center">
            {isMobile && (
              <ActionIcon variant="subtle" onClick={onBackToSidebar}>
                <IconArrowLeft size={18} />
              </ActionIcon>
            )}
            <Avatar src={otherUser.avatar} alt={otherUser.name || 'User'} radius="xl" />
            <Box>
              <Text fw={500}>{otherUser.name || 'Unknown User'}</Text>
              <Text size="xs" c="dimmed">
                {otherUser.email}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Paper>

      {/* Messages Area */}
      <ScrollArea style={{ flex: 1 }} p="md">
        {messages.length === 0 ? (
          <Center h="100%">
            <Stack align="center" gap="md">
              <IconMessageCircle size={64} color="#adb5bd" />
              <Text c="dimmed" size="sm" ta="center">
                No messages yet. Start a conversation!
              </Text>
            </Stack>
          </Center>
        ) : (
          <Stack gap="sm">
            {messages.map((message) => {
              const isOwnMessage = message.sender === currentUserId;

              return (
                <Flex
                  key={message.id}
                  justify={isOwnMessage ? 'flex-end' : 'flex-start'}
                  style={{ width: '100%' }}
                >
                  <Box
                    style={{
                      maxWidth: '70%',
                      padding: '10px 14px',
                      borderRadius: isOwnMessage ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      backgroundColor: isOwnMessage ? '#228be6' : '#f1f3f4',
                      color: isOwnMessage ? 'white' : 'inherit',
                    }}
                  >
                    <Text size="sm">{message.content}</Text>
                    <Text
                      size="xs"
                      c={isOwnMessage ? 'rgba(255,255,255,0.7)' : 'dimmed'}
                      ta="right"
                      mt={4}
                    >
                      {formatMessageTime(message.timestamp)}
                    </Text>
                  </Box>
                </Flex>
              );
            })}
          </Stack>
        )}
      </ScrollArea>

      {/* Message Input Area */}
      <Paper
        p="md"
        style={{
          borderTop: '1px solid #e9ecef',
          backgroundColor: 'white',
        }}
      >
        <Flex gap="sm" align="center">
          <TextInput
            placeholder="Type a message..."
            radius="xl"
            style={{ flex: 1 }}
          />
          <ActionIcon size="lg" variant="filled" radius="xl">
            <IconSend size={18} />
          </ActionIcon>
        </Flex>
      </Paper>
    </Box>
  );
};

export default ChatConversationArea;



