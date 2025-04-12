'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Flex, Paper, PinInput, Stack, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import useSignupVerificationMutation from '@/core/hooks/auth/useSignupVerificationMutation';
import { CompleteSignupVerificationDTO } from '@/core/sdk/auth';

const SignupVerification = () => {
  const { mutate, isPending } = useSignupVerificationMutation();

  const [email, setEmail] = useState<string>('');

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      otp: '',
      signupVerificationHash: '',
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('hash') !== null) {
      setEmail(params.get('email')!);

      form.setFieldValue('signupVerificationHash', params.get('hash')!);
    }
  }, []);

  const submitHandler = async (values: CompleteSignupVerificationDTO) => {
    if (values.otp === '') {
      showNotification({
        color: 'red',
        title: 'Message',
        autoClose: 3000,
        message: 'OTP is required.',
      });

      return;
    }

    mutate(values);
  };
  return (
    <>
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
          Email Verification
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
              <Flex direction="column" align="center" justify="center">
                <Text ta="center">
                  Please enter the OTP(One time password) sent to {email} email.
                </Text>
              </Flex>
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

              <Button radius="lg" h={50} variant="filled" mt={40} type="submit" loading={isPending}>
                Submit
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default SignupVerification;
