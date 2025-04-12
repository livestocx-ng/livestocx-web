'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { TestimonialCard } from '@/core/components/cards/testimonial-card';
import { useAppContext } from '@/core/context';
import useLoginMutation from '@/core/hooks/auth/useLoginMutation';
import useFetchProductUploadSubscriptionPlanQuery from '@/core/hooks/public/useFetchProductUploadSubscriptionPlanQuery';
import useFetchTestimonialsQuery from '@/core/hooks/public/useFetchTestimonialsQuery';
import { priceFormatter } from '@/core/middlewares';
import { SigninDTO } from '@/core/sdk/auth';
import { TestimonialInfo } from '@/core/sdk/communication';
import { validateSignInForm } from '@/core/validations/auth.validations';

const Signin = () => {
  useFetchTestimonialsQuery();
  useFetchProductUploadSubscriptionPlanQuery();

  const router = useRouter();

  const params = new URLSearchParams(window.location.search);

  const { isPending, mutate } = useLoginMutation();

  const { authToken, testimonials, productUploadSubscriptionPlan } = useAppContext();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
  });

  const [_currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentTestimonial, setCurrentTestimonial] = useState<TestimonialInfo | null>(null);

  const shuffleTestimonials = () => {
    if (testimonials.length === 0) {
      setCurrentTestimonial(null);
      return;
    }

    if (!currentTestimonial) {
      setCurrentTestimonial(testimonials[0]);
    }

    return setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % testimonials.length;
        setCurrentTestimonial(testimonials[nextIndex]);
        return nextIndex;
      });
    }, 7000);
  };

  useEffect(() => {
    const intervalId = shuffleTestimonials();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [testimonials]);

  useEffect(() => {
    if (authToken && params.get('redirect_to') === null) {
      router.push('/');
    } else if (authToken && params.get('redirect_to') !== null) {
      const routePath = '/'.concat(params.get('redirect_to')!);

      return router.push(
        routePath.includes('business') ? '/business?subscription_now=true' : routePath
      );
    }
  }, [authToken, params]);

  useEffect(() => {
    if (params.get('redirect_to') !== null) {
      localStorage.setItem('LIVESTOCX_AUTH_REDIRECT', params.get('redirect_to')!);
    }
  }, [params]);

  const submitHandler = (payload: SigninDTO) => {
    const message = validateSignInForm(payload);

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
        Sign In
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
              <Title order={5} style={{ textAlign: 'center' }}>
                Sellers pay{' '}
                {productUploadSubscriptionPlan &&
                  priceFormatter(productUploadSubscriptionPlan.price)}{' '}
                to start posting!
              </Title>
            </Flex>
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
            <PasswordInput
              size="lg"
              radius="lg"
              withAsterisk
              label="Password"
              placeholder="********"
              styles={{
                label: { fontSize: '16px' },
                root: { fontSize: '14px' },
                input: { fontSize: '14px' },
              }}
              // key={form.key('password')}
              {...form.getInputProps('password')}
            />
            <Flex justify="end">
              <Link href="/forgot-password" style={{ textDecoration: 'none' }}>
                <Text size="sm" c="black">
                  Forgot password?
                </Text>
              </Link>
            </Flex>

            <Button radius="lg" h={50} variant="filled" mt={10} type="submit" loading={isPending}>
              Submit
            </Button>

            <Flex align="center" justify="space-between">
              <Divider w="45%" /> <Text>Or</Text> <Divider w="45%" />
            </Flex>

            <Button
              h={50}
              radius="lg"
              onClick={() => {
                const routePath = '/'.concat(params.get('redirect_to')!);

                signIn('google', {
                  callbackUrl: routePath.includes('business')
                    ? '/business?subscription_now=true'
                    : routePath,
                });
              }}
              variant="default"
              leftSection={<Image src="/icons/icon_google.svg" alt="" width={25} height={25} />}
            >
              Continue with Google
            </Button>

            {currentTestimonial && <TestimonialCard testimonial={currentTestimonial} />}
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Signin;
