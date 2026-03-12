'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  ChatConversationArea,
  ChatSidebar,
  MOCK_CURRENT_USER_ID,
  mockConversations,
  mockMessages,
} from '@/core/components/chat';
import { useAppContext } from '@/core/context';
import { ChatConversationInfo, ChatMessageInfo } from '@/core/sdk/communication';

export default function MessagesPage() {
  const { accountInfo } = useAppContext();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<ChatConversationInfo | null>(
    null
  );
  const [showSidebar, setShowSidebar] = useState(true);

  // Use mock data for now - replace with actual API calls
  const conversations = mockConversations;
  const currentUserId = accountInfo?.id || MOCK_CURRENT_USER_ID;

  // Get messages for selected conversation
  const messages: ChatMessageInfo[] = selectedConversation
    ? mockMessages[selectedConversation.id] || []
    : [];

  // Filter conversations based on search query
  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) {
      return conversations;
    }

    const query = searchQuery.toLowerCase();
    return conversations.filter((conv) => {
      const otherUser = conv.user1.id === currentUserId ? conv.user2 : conv.user1;
      const name = otherUser.name?.toLowerCase() || '';
      const lastMessage = conv.lastConversationMessage?.toLowerCase() || '';
      return name.includes(query) || lastMessage.includes(query);
    });
  }, [conversations, searchQuery, currentUserId]);

  // Handle screen size changes
  useEffect(() => {
    if (isMobile) {
      // On mobile, show sidebar if no conversation is selected
      setShowSidebar(!selectedConversation);
    } else {
      // On desktop, always show sidebar
      setShowSidebar(true);
    }
  }, [isMobile, selectedConversation]);

  const handleSelectConversation = (conversation: ChatConversationInfo) => {
    setSelectedConversation(conversation);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleBackToSidebar = () => {
    setShowSidebar(true);
    if (isMobile) {
      setSelectedConversation(null);
    }
  };

  const handleCloseSidebar = () => {
    if (selectedConversation) {
      setShowSidebar(false);
    }
  };

  return (
    <Box style={{ height: 'calc(100vh - 120px)', display: 'flex', position: 'relative' }}>
      {/* Sidebar */}
      {showSidebar && (
        <Box
          style={{
            width: isMobile ? '100%' : '400px',
            display: 'block',
            borderRight: '1px solid #e9ecef',
            backgroundColor: '#f8f9fa',
            flexShrink: 0,
            position: isMobile ? 'absolute' : 'relative',
            height: '100%',
            maxWidth: isMobile ? '100%' : '400px',
            zIndex: isMobile ? 100 : 'auto',
            left: 0,
            top: 0,
          }}
        >
          <ChatSidebar
            conversations={filteredConversations}
            selectedConversation={selectedConversation}
            searchQuery={searchQuery}
            isMobile={!!isMobile}
            currentUserId={currentUserId}
            onSearchChange={setSearchQuery}
            onSelectConversation={handleSelectConversation}
            onClose={handleCloseSidebar}
          />
        </Box>
      )}

      {/* Chat Area */}
      <Box
        style={{
          flex: 1,
          display: isMobile && showSidebar ? 'none' : 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          position: 'relative',
        }}
      >
        <ChatConversationArea
          conversation={selectedConversation}
          messages={messages}
          isMobile={!!isMobile}
          currentUserId={currentUserId}
          onBackToSidebar={handleBackToSidebar}
        />
      </Box>
    </Box>
  );
}
