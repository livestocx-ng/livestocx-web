'use client';

import { useEffect, useState } from 'react';
import { Button, Modal, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { useAppContext } from '@/core/context';
import useUpdateAccountPhoneMutation from '@/core/hooks/account/useUpdateAccountPhoneMutation';

interface UpdateAccountPhoneNumberModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const UpdateAccountPhoneNumberModal = ({
  isOpen,
  closeModal,
}: UpdateAccountPhoneNumberModalProps) => {
  const [formData, setFormData] = useState({
    newPhone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { accountInfo } = useAppContext();

  const { mutate: updateAccountPhoneMutation, isPending } = useUpdateAccountPhoneMutation();

  useEffect(() => {
    if (isOpen) {
      setFormData({
        password: '',
        newPhone: accountInfo?.phoneNumber || '',
      });

      setError('');
      setPasswordError('');
    }
  }, [isOpen, accountInfo]);

  const handleSave = async () => {
    setError('');
    setPasswordError('');

    let hasError = false;

    if (!formData.newPhone.trim()) {
      setError('Phone number is required');
      hasError = true;
    } else {
      // Basic phone validation
      const phoneRegex = /^[+]?[\d\s-]{10,}$/;
      if (!phoneRegex.test(formData.newPhone.trim())) {
        setError('Please enter a valid phone number');
        hasError = true;
      }
    }

    if (!formData.password.trim()) {
      setPasswordError('Password is required to confirm this change');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    updateAccountPhoneMutation(
      {
        newPhone: formData.newPhone,
        password: formData.password,
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
      onClose={() => {
        if (isPending === false) {
          closeModal();
        }
      }}
      title="Update Phone Number"
      overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Enter your new phone number and confirm with your password.
        </Text>

        <TextInput
          label="Phone Number"
          placeholder="Enter your phone number"
          value={formData.newPhone}
          onChange={(e) => setFormData({ ...formData, newPhone: e.target.value })}
          error={error}
          type="tel"
          autoFocus
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password to confirm"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={passwordError}
        />

        <Button fullWidth onClick={handleSave} loading={isPending}>
          Save Changes
        </Button>
      </Stack>
    </Modal>
  );
};

export default UpdateAccountPhoneNumberModal;
