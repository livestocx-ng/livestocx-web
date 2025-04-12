'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Paper, PasswordInput, Stack, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useAppContext } from '@/core/context';
import useResetPasswordMutation from '@/core/hooks/auth/useResetPasswordMutation';
import { ResetPasswordDTO } from '@/core/sdk/auth';
import { validateResetPasswordForm } from '@/core/validations/auth.validations';

const ResetPassword = () => {
  const router = useRouter();
  // const params = useSearchParams();

  const { authToken } = useAppContext();

  const { isPending, mutate } = useResetPasswordMutation();

  const params = new URLSearchParams(window.location.search);

  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      accountId: '',
      newPassword: '',
      passwordResetToken: '',
    },
  });

  useEffect(() => {
    if (authToken) {
      router.push('/');
    }
  }, [authToken]);

  useEffect(() => {
    if (params?.has('passwordResetToken')) {
      const accountId = params.get('accountId');
      const passwordResetToken = params.get('passwordResetToken');

      if (accountId) {
        form.setFieldValue('accountId', accountId);
      }

      if (passwordResetToken) {
        form.setFieldValue('passwordResetToken', passwordResetToken);
      }
    }
  }, [params]);

  const submitHandler = (payload: ResetPasswordDTO) => {
    const message = validateResetPasswordForm(payload, confirmPassword);

    if (message !== '') {
      showNotification({
        message,
        color: 'red',
        title: 'Message',
        autoClose: 3000,
      });
      return;
    }

    mutate(payload);
  };

  return (
    <Box
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        background:
          'linear-gradient(180deg, var(--mantine-color-gray-1) 30%, var(--mantine-color-gray-1) 5%)',
      }}
    >
      <Title order={3} mb={40}>
        Reset Password
      </Title>
      <Paper
        shadow="lg"
        p={{ base: 'md', sm: 'md', md: 'xl' }}
        w={{ base: '90%', sm: '70%', md: '30%' }}
      >
        <form
          onSubmit={form.onSubmit((values) => {
            submitHandler(values);
          })}
        >
          <Stack gap={10}>
            <PasswordInput
              size="lg"
              radius="lg"
              withAsterisk
              label="New Password"
              placeholder="********"
              styles={{
                label: { fontSize: '16px' },
                root: { fontSize: '14px' },
                input: { fontSize: '14px' },
              }}
              {...form.getInputProps('newPassword')}
            />
            <PasswordInput
              size="lg"
              radius="lg"
              withAsterisk
              placeholder="********"
              label="Confirm Password"
              styles={{
                root: { fontSize: '14px' },
                label: { fontSize: '16px' },
                input: { fontSize: '14px' },
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />

            <Button radius="lg" h={50} variant="filled" mt={10} type="submit" loading={isPending}>
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
