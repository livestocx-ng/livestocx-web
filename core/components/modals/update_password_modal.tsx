'use client';

import { useState } from 'react';
import { Button, Modal, PasswordInput, Stack, Text } from '@mantine/core';
import useUpdateAccountPasswordMutation from '@/core/hooks/account/useUpdateAccountPasswordMutation';

interface UpdatePasswordModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const UpdatePasswordModal = ({ isOpen, closeModal }: UpdatePasswordModalProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { mutate, isPending } = useUpdateAccountPasswordMutation();

  const handleSave = async () => {
    setError('');

    if (!currentPassword) {
      setError('Current password is required');
      return;
    }

    if (!newPassword) {
      setError('New password is required');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    mutate(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          closeModal();
        },
      }
    );
  };

  return (
    <Modal
      opened={isOpen}
      onClose={() => {
        if (isPending === false) {
          useUpdateAccountPasswordMutation();
        }
      }}
      title="Update Password"
      centered
      overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Enter your current password and choose a new password.
        </Text>

        <PasswordInput
          label="Current Password"
          placeholder="Enter your current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          autoFocus
        />

        <PasswordInput
          label="New Password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          description="Must be at least 8 characters"
        />

        <PasswordInput
          label="Confirm New Password"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={error}
        />

        <Button fullWidth onClick={handleSave} loading={isPending}>
          Update Password
        </Button>
      </Stack>
    </Modal>
  );
};

export default UpdatePasswordModal;
