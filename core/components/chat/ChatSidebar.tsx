'use client';

import { IconMessageCircle, IconSearch, IconX } from '@tabler/icons-react';
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Center,
  Flex,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { ChatConversationInfo, ChatConversationUserInfo } from '@/core/sdk/communication';

interface ChatSidebarProps {
  conversations: ChatConversationInfo[];
  selectedConversation: ChatConversationInfo | null;
  searchQuery: string;
  isMobile: boolean;
  currentUserId?: string;
  onSearchChange: (query: string) => void;
  onSelectConversation: (conversation: ChatConversationInfo) => void;
  onClose: () => void;
}

export const ChatSidebar = ({
  conversations,
  selectedConversation,
  searchQuery,
  isMobile,
  currentUserId,
  onSearchChange,
  onSelectConversation,
  onClose,
}: ChatSidebarProps) => {
  const getOtherUser = (conversation: ChatConversationInfo): ChatConversationUserInfo => {
    return conversation.user1.id === currentUserId ? conversation.user2 : conversation.user1;
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString();
    } catch {
      return '';
    }
  };

  return (
    <Stack gap={0} h="100%">
      {/* Sidebar Header */}
      <Box p="md" style={{ borderBottom: '1px solid #e9ecef', backgroundColor: 'white' }}>
        <Flex justify="space-between" align="center" mb="md">
          <Text fw={600} size="lg">
            Messages
          </Text>
          {isMobile && (
            <ActionIcon variant="subtle" onClick={onClose}>
              <IconX size={18} />
            </ActionIcon>
          )}
        </Flex>
        <TextInput
          placeholder="Search conversations..."
          leftSection={<IconSearch size={16} />}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          size="sm"
          radius="md"
        />
      </Box>

      {/* Conversations List */}
      <ScrollArea h="calc(100% - 100px)" style={{ flex: 1 }}>
        {conversations.length === 0 ? (
          <Center h="100%" p="xl">
            <Stack align="center" gap="md">
              <IconMessageCircle size={48} color="#adb5bd" />
              <Text c="dimmed" size="sm" ta="center">
                {searchQuery ? 'No conversations found' : 'No conversations yet'}
              </Text>
            </Stack>
          </Center>
        ) : (
          <Stack gap={0}>
            {conversations.map((conversation) => {
              const otherUser = getOtherUser(conversation);
              const isSelected = selectedConversation?.id === conversation.id;

              return (
                <Paper
                  key={conversation.id}
                  p="md"
                  style={{
                    cursor: 'pointer',
                    backgroundColor: isSelected ? '#e7f5ff' : 'white',
                    borderLeft: isSelected ? '3px solid #228be6' : '3px solid transparent',
                    borderBottom: '1px solid #e9ecef',
                    transition: 'background-color 0.2s',
                  }}
                  onClick={() => onSelectConversation(conversation)}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'white';
                    }
                  }}
                >
                  <Flex gap="md" align="flex-start">
                    <Avatar
                      src={otherUser.avatar}
                      alt={otherUser.name || 'User'}
                      radius="xl"
                      size="md"
                    />
                    <Box style={{ flex: 1, minWidth: 0 }}>
                      <Flex justify="space-between" align="flex-start" mb={4}>
                        <Text fw={500} size="sm" truncate>
                          {otherUser.name || 'Unknown User'}
                        </Text>
                        {conversation.lastConversationTimestamp && (
                          <Text size="xs" c="dimmed">
                            {formatTimestamp(conversation.lastConversationTimestamp)}
                          </Text>
                        )}
                      </Flex>
                      <Flex justify="space-between" align="center" gap="xs">
                        <Text size="xs" c="dimmed" truncate style={{ flex: 1 }}>
                          {conversation.lastConversationMessage || 'No messages yet'}
                        </Text>
                        {conversation.unreadMessagesCount > 0 && (
                          <Badge size="sm" variant="filled" color="blue" style={{ flexShrink: 0 }}>
                            {conversation.unreadMessagesCount}
                          </Badge>
                        )}
                      </Flex>
                    </Box>
                  </Flex>
                </Paper>
              );
            })}
          </Stack>
        )}
      </ScrollArea>
    </Stack>
  );
};

export default ChatSidebar;



