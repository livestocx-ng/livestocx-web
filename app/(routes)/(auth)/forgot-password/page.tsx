'use client';

import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/core/context';
import { ForgotPasswordDTO } from '@/core/sdk/auth';
import { showNotification } from '@mantine/notifications';
import { Box, Button, Paper, Stack, TextInput, Title } from '@mantine/core';
import { validateForgotPasswordForm } from '@/core/validations/auth.validations';
import useForgotPasswordMutation from '@/core/hooks/auth/useForgotPasswordMutation';

const ForgotPassword = () => {
  const router = useRouter();

  const { isPending, mutate } = useForgotPasswordMutation();

  const { authToken } = useAppContext();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
    },
  });

  useEffect(() => {
    if (authToken) {
      router.push('/');
    }
  }, [authToken]);

  const submitHandler = (payload: ForgotPasswordDTO) => {
    const message = validateForgotPasswordForm(payload);

    if (message !== '') {
      showNotification({
        message,
        color: 'red',
        title: 'Error',
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
        Forgot Password
      </Title>
      <Paper
        shadow="lg"
        p={{ base: 'md', sm: 'md', md: 'xl' }}
        w={{ base: '90%', sm: '70%', md: '40%' }}
      >
        <form
          onSubmit={form.onSubmit((values) => {
            submitHandler(values);
          })}
        >
          <Stack gap={10}>
            <TextInput
              size="lg"
              radius="lg"
              withAsterisk
              label="Email"
              styles={{
                label: { fontSize: '16px' },
                root: { fontSize: '14px' },
                input: { fontSize: '14px' },
              }}
              // key={form.key('email')}
              placeholder="tunde@gmail.com"
              {...form.getInputProps('email')}
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

export default ForgotPassword;
