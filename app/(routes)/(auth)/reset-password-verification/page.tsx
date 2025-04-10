'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Button, Flex, Paper, PinInput, Stack, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useAppContext } from '@/core/context';
import useResetPasswordVerificationMutation from '@/core/hooks/auth/useResetPasswordVerificationMutation';
import { ResetPasswordVerificationDTO } from '@/core/sdk/auth';
import { validateResetPasswordVerificationForm } from '@/core/validations/auth.validations';

const ResetPasswordVerification = () => {
  const router = useRouter();
  const params = useSearchParams();

  const { isPending, mutate } = useResetPasswordVerificationMutation();

  const { authToken } = useAppContext();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      otp: '',
      email: '',
    },
  });

  useEffect(() => {
    if (authToken) {
      router.push('/');
    }
  }, [authToken]);

  useEffect(() => {
    if (params?.has('email')) {
      const email = params.get('email');

      if (email) {
        form.setFieldValue('email', email);
      }
    }
  }, []);

  const submitHandler = (payload: ResetPasswordVerificationDTO) => {
    const message = validateResetPasswordVerificationForm(payload);

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
        OTP Verification
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
            <Flex justify="center" align="center">
              <PinInput
                size="lg"
                gap={10}
                type={/^[0-9]*$/}
                inputType="tel"
                inputMode="numeric"
                styles={{
                  root: { fontSize: '20px' },
                  input: { fontSize: '20px' },
                }}
                {...form.getInputProps('otp')}
              />
            </Flex>

            <Button radius="lg" h={50} variant="filled" mt={10} type="submit" loading={isPending}>
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default ResetPasswordVerification;
