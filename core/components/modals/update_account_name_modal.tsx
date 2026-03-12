'use client';

import { useEffect, useState } from 'react';
import { Button, Modal, Stack, Text, TextInput } from '@mantine/core';
import { useAppContext } from '@/core/context';
import useUpdateAccountNameMutation from '@/core/hooks/account/useUpdateAccountNameMutation';

interface UpdateAccountNameModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const UpdateAccountNameModal = ({ isOpen, closeModal }: UpdateAccountNameModalProps) => {
  const { accountInfo } = useAppContext();

  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
  });

  const { mutate: updateAccountNameMutation, isPending } = useUpdateAccountNameMutation();

  const [lastNameError, setLastNameError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData({
        lastName: accountInfo?.lastName || '',
        firstName: accountInfo?.firstName || '',
      });
    }
  }, [isOpen, accountInfo]);

  const handleSave = async () => {
    if (isPending) {
      return;
    }

    setFirstNameError('');
    setLastNameError('');

    let hasError = false;

    if (!formData.firstName.trim()) {
      setFirstNameError('First name is required');
      hasError = true;
    }

    if (!formData.lastName.trim()) {
      setLastNameError('Last name is required');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    updateAccountNameMutation(
      {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
      },
      {
        onSuccess: () => {
          closeModal();
        },
      }
    );
  };

  return (
    <Modal
      centered
      opened={isOpen}
      title="Update Name"
      onClose={() => {
        console.log('isPending', isPending);
        if (isPending === false) {
          closeModal();
        }
      }}
      overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Update your first and last name below.
        </Text>

        <TextInput
          label="First Name"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          error={firstNameError}
          autoFocus
        />

        <TextInput
          label="Last Name"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          error={lastNameError}
        />

        <Button fullWidth onClick={handleSave} loading={isPending}>
          Save Changes
        </Button>
      </Stack>
    </Modal>
  );
};

export default UpdateAccountNameModal;
