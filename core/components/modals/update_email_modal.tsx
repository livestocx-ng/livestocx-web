'use client';

import { useEffect, useState } from 'react';
import { Button, Center, Modal, PinInput, Stack, Text, TextInput } from '@mantine/core';
import { useAppContext } from '@/core/context';
import useInitializeUpdateAccountEmailMutation from '@/core/hooks/account/useInitializeUpdateAccountEmailMutation';
import useVerifyNewAccountEmailMutation from '@/core/hooks/account/useUpdateAccountEmailMutation';

interface UpdateEmailModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const UpdateEmailModal = ({ isOpen, closeModal }: UpdateEmailModalProps) => {
  const { accountInfo } = useAppContext();

  const [formData, setFormData] = useState({
    otp: '',
    email: '',
    isOtpSent: false,
  });

  const { mutate: initializeUpdateAccountEmailMutation, isPending: isInitializing } =
    useInitializeUpdateAccountEmailMutation();
  const { mutate: verifyNewAccountEmailMutation, isPending } = useVerifyNewAccountEmailMutation();

  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData({
        otp: '',
        isOtpSent: false,
        email: accountInfo?.email || '',
      });
      setError('');
    }
  }, [isOpen, accountInfo]);

  const handleSave = async () => {
    setError('');

    if (!formData.email.trim()) {
      setError('Email address is required');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      return setError('Please enter a valid email address');
    }

    initializeUpdateAccountEmailMutation(
      {
        newEmail: formData.email.trim(),
      },
      {
        onSuccess: () => {
          setFormData({ ...formData, isOtpSent: true });
        },
      }
    );
  };

  const handleVerifyOtp = async () => {
    setError('');

    if (formData.otp.length !== 4) {
      setError('Please enter the complete 4-digit OTP');
      return;
    }

    verifyNewAccountEmailMutation(
      {
        otp: formData.otp.trim(),
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
      opened={isOpen}
      onClose={closeModal}
      title="Update Email Address"
      centered
      overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
    >
      <Stack gap="md">
        {!formData.isOtpSent && (
          <>
            <Text size="sm" c="dimmed">
              Enter your new email address below.
            </Text>

            <TextInput
              // label="Email Address"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={!formData.isOtpSent ? error : undefined}
              type="email"
              autoFocus
              disabled={formData.isOtpSent}
            />
          </>
        )}

        {formData.isOtpSent ? (
          <>
            <Stack gap="xs">
              <Text size="sm" fw={500}>
                Enter OTP
              </Text>
              <Center>
                <PinInput
                  length={4}
                  type="number"
                  value={formData.otp}
                  onChange={(value) => setFormData({ ...formData, otp: value })}
                  error={!!error}
                  size="lg"
                  oneTimeCode
                />
              </Center>
              {error && (
                <Text size="xs" c="red" ta="center">
                  {error}
                </Text>
              )}
              <Text size="xs" c="dimmed" ta="center">
                Enter the 4-digit code sent to your email
              </Text>
            </Stack>

            <Button
              fullWidth
              onClick={handleVerifyOtp}
              loading={isPending}
              disabled={formData.otp.length !== 4}
            >
              Verify & Save
            </Button>
          </>
        ) : (
          <Button fullWidth onClick={handleSave} loading={isInitializing}>
            Send OTP
          </Button>
        )}
      </Stack>
    </Modal>
  );
};

export default UpdateEmailModal;
