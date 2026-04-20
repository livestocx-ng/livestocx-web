'use client';

import { IconChevronRight } from '@tabler/icons-react';
import { Box, Flex, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAppContext } from '@/core/context';
import UpdateEmailModal from '../modals/update_email_modal';
import UpdatePasswordModal from '../modals/update_password_modal';
import UpdateAccountNameModal from '../modals/update_account_name_modal';
import UpdateAccountPhoneNumberModal from '../modals/update_account_phone_number_modal';

interface ProfileFieldProps {
  label: string;
  value: string;
  onClick: () => void;
}

const ProfileField = ({ label, value, onClick }: ProfileFieldProps) => {
  return (
    <Box
      p="md"
      style={{
        borderBottom: '1px solid #e9ecef',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f8f9fa';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <Flex justify="space-between" align="center" gap="md">
        <Box style={{ flex: 1 }}>
          <Text size="sm" c="dimmed" mb={4}>
            {label}
          </Text>
          <Text fw={500}>
            {value || (
              <Text span c="dimmed">
                Not set
              </Text>
            )}
          </Text>
        </Box>
        <IconChevronRight size={20} color="#868e96" />
      </Flex>
    </Box>
  );
};

const PasswordField = ({ onClick }: { onClick: () => void }) => {
  return (
    <Box
      p="md"
      style={{
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f8f9fa';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <Flex justify="space-between" align="center" gap="md">
        <Box style={{ flex: 1 }}>
          <Text size="sm" c="dimmed" mb={4}>
            Password
          </Text>
          <Text fw={500}>••••••••</Text>
        </Box>
        <IconChevronRight size={20} color="#868e96" />
      </Flex>
    </Box>
  );
};

export const ProfileSettings = () => {
  const { accountInfo } = useAppContext();

  const [isNameModalOpen, { open: openNameModal, close: closeNameModal }] = useDisclosure(false);
  const [isPhoneModalOpen, { open: openPhoneModal, close: closePhoneModal }] = useDisclosure(false);
  const [isEmailModalOpen, { open: openEmailModal, close: closeEmailModal }] = useDisclosure(false);
  const [isPasswordModalOpen, { open: openPasswordModal, close: closePasswordModal }] =
    useDisclosure(false);


  const fullName = [accountInfo?.firstName, accountInfo?.lastName].filter(Boolean).join(' ');

  return (
    <>
      {/* Modals */}
      <UpdateAccountNameModal
        isOpen={isNameModalOpen}
        closeModal={closeNameModal}
      />
      <UpdateAccountPhoneNumberModal
        isOpen={isPhoneModalOpen}
        closeModal={closePhoneModal}
      />
      <UpdateEmailModal
        isOpen={isEmailModalOpen}
        closeModal={closeEmailModal}
      />
      <UpdatePasswordModal
        isOpen={isPasswordModalOpen}
        closeModal={closePasswordModal}
      />

      {/* Profile Fields */}
      <Stack gap={0}>
        <Box p="md" style={{ borderBottom: '1px solid #e9ecef' }}>
          <Title order={4}>Profile Information</Title>
          <Text size="sm" c="dimmed">
            Update your personal information
          </Text>
        </Box>

        <ProfileField label="Name" value={fullName} onClick={openNameModal} />

        <ProfileField
          label="Phone Number"
          value={accountInfo?.phoneNumber || ''}
          onClick={openPhoneModal}
        />

        <ProfileField
          label="Email Address"
          value={accountInfo?.email || ''}
          onClick={openEmailModal}
        />

        <PasswordField onClick={openPasswordModal} />
      </Stack>
    </>
  );
};

export default ProfileSettings;
