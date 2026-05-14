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
  Badge,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import {
  IconMail,
  IconLock,
  IconArrowRight,
  IconShieldCheck,
} from '@tabler/icons-react';
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
    const params = new URLSearchParams(window.location.search);

    if (authToken && params.get('redirect_to') === null) {
      router.push('/');
    } else if (authToken && params.get('redirect_to') !== null) {
      const routePath = '/'.concat(params.get('redirect_to')!);

      return router.push(
        routePath.includes('business') ? '/business?subscription_now=true' : routePath
      );
    }
  }, [authToken]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('redirect_to') !== null) {
      localStorage.setItem('LIVESTOCX_AUTH_REDIRECT', params.get('redirect_to')!);
    }
  }, []);

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


  const handleGoogleSignIn = () => {
    const params = new URLSearchParams(window.location.search);
    const routePath = '/'.concat(params.get('redirect_to') || '');
    signIn('google', {
      callbackUrl: routePath.includes('business')
        ? '/business?subscription_now=true'
        : routePath || '/',
    });
  };

  // ─── Shared Form ─────────────────────────────────────────────────────────────
  const renderForm = (isMobile: boolean) => (
    <form
      onSubmit={form.onSubmit((values) => submitHandler(values))}
      style={{ width: '100%' }}
    >
      <Stack gap={16}>
        {productUploadSubscriptionPlan && (
          <Paper
            p="sm"
            radius="md"
            withBorder
            style={{
              backgroundColor: 'var(--mantine-color-green-0)',
              borderColor: 'var(--mantine-color-green-2)',
            }}
          >
            <Text size="xs" c="green.9" fw={600} ta="center">
              Sellers pay {priceFormatter(productUploadSubscriptionPlan.price)} to start posting!
            </Text>
          </Paper>
        )}

        {/* Email */}
        <Box>
          <Text
            size="xs"
            fw={700}
            tt="uppercase"
            style={{ letterSpacing: '0.08em', color: '#555', marginBottom: 6 }}
          >
            Email Address
          </Text>
          <TextInput
            size="md"
            radius="md"
            placeholder="tunde@gmail.com"
            leftSection={<IconMail size={16} color="#888" />}
            styles={{
              input: {
                backgroundColor: '#F4F4F4',
                border: 'none',
                fontSize: '14px',
                paddingLeft: '42px',
                height: rem(50),
              },
            }}
            {...form.getInputProps('email')}
          />
        </Box>

        {/* Password */}
        <Box>
          <Flex justify="space-between" align="center" mb={6}>
            <Text
              size="xs"
              fw={700}
              tt="uppercase"
              style={{ letterSpacing: '0.08em', color: '#555' }}
            >
              Password
            </Text>
          </Flex>
          <PasswordInput
            size="md"
            radius="md"
            placeholder="••••••••"
            leftSection={<IconLock size={16} color="#888" />}
            styles={{
              input: {
                backgroundColor: '#F4F4F4',
                border: 'none',
                fontSize: '14px',
                height: rem(50),
              },
              innerInput: { paddingLeft: '42px' },
            }}
            {...form.getInputProps('password')}
          />
          <Flex justify={'space-between'} w={'100%'} mt={4}>
            <Box />
            <Link href="/forgot-password" style={{ textDecoration: 'none' }}>
              <Text
                size="xs"
                fw={700}
                tt={isMobile ? 'uppercase' : 'none'}
                style={{ letterSpacing: isMobile ? '0.06em' : 0, color: '#138C48' }}
              >
                Forgot Password?
              </Text>
            </Link>
          </Flex>
        </Box>

        {/* CTA */}
        <Button
          type="submit"
          loading={isPending}
          radius="md"
          h={50}
          mt={4}
          styles={{
            root: {
              background: 'linear-gradient(90deg, #006838 0%, #138C48 100%)',
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '0.01em',
            },
          }}
          rightSection={<IconArrowRight size={18} />}
        >
          Sign In
        </Button>

        {/* Divider */}
        <Flex align="center" gap={10}>
          <Divider style={{ flex: 1 }} />
          <Text size="xs" fw={600} tt="uppercase" style={{ color: '#999', letterSpacing: '0.1em' }}>
            Or
          </Text>
          <Divider style={{ flex: 1 }} />
        </Flex>

        {/* Social buttons */}
        <Button
          h={50}
          radius="xl"
          variant="default"
          onClick={handleGoogleSignIn}
          styles={{
            root: {
              backgroundColor: '#F4F4F4',
              border: 'none',
              fontWeight: 500,
            },
          }}
          leftSection={<Image src="/icons/icon_google.svg" alt="Google" width={20} height={20} />}
        >
          Continue with Google
        </Button>

        {/* Create account */}
        <Flex justify="center" gap={4} mt={4}>
          <Text size="sm" c="dimmed">
            {isMobile ? "Don't have an account?" : 'New to the marketplace?'}
          </Text>
          <Link href="/signup" style={{ textDecoration: 'none' }}>
            <Text size="sm" fw={600} c="#138C48">
              Create an account
            </Text>
          </Link>
        </Flex>

        {currentTestimonial && (
          <Box mt="xl">
            <TestimonialCard testimonial={currentTestimonial} width={'100%'} />
          </Box>
        )}
      </Stack>
    </form>
  );

  return (
    <Box
      style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        backgroundImage: 'repeating-linear-gradient(-45deg, #f8f9fa, #f8f9fa 1px, transparent 1px, transparent 25px)',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* ─── DESKTOP LAYOUT ─────────────────────────────────────────────────── */}
      <Box
        style={{ display: 'none' }}
        className="signin-desktop"
      >
        <style>{`
          :root { --navbar-h: 0px; }
          @media (min-width: 768px) {
            .signin-desktop { display: flex !important; }
            .signin-mobile  { display: none !important; }
          }
          @media (max-width: 767px) {
            .signin-desktop { display: none !important; }
            .signin-mobile  { display: flex !important; }
          }
        `}</style>

        {/* Left Panel */}
        <Box
          style={{
            flex: '0 0 50%',
            position: 'relative',
            minHeight: '100vh',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/images/auth/image_auth_bg_11.jpg"
            alt="Livestocx background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          {/* Dark overlay */}
          {/* <Box
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,104,56,0.85) 100%)',
            }}
          /> */}

          {/* Top copy */}
          <Box style={{ position: 'absolute', top: 80, left: 60, right: 60 }}>
            <Badge
              variant="filled"
              radius="xl"
              mb={16}
              styles={{
                root: {
                  backgroundColor: '#138C48',
                  color: '#fff',
                  fontSize: '11px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                },
              }}
            >
              Agri-Commerce Reimagined
            </Badge>
            <Title
              order={1}
              style={{ color: '#fff', fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.1, fontWeight: 900 }}
            >
              Direct Access.
              <br />
              <Text component="span" c="green.3" inherit>Unmatched Scale.</Text>
            </Title>
            <Text mt={20} size="lg" style={{ color: 'rgba(255,255,255,0.9)', maxWidth: 450, lineHeight: 1.6 }}>
              Join the largest network of verified livestock producers and buyers in Nigeria.
              Modern tools for the modern farmer.
            </Text>

            <Flex gap="xl" mt={40}>
              <Box style={{ borderLeft: '3px solid #138C48', paddingLeft: 16 }}>
                <Text fw={900} size="xl" c="white">10k+</Text>
                <Text c="gray.3" size="xs" tt="uppercase" fw={700}>Active Users</Text>
              </Box>
              <Box style={{ borderLeft: '3px solid #138C48', paddingLeft: 16 }}>
                <Text fw={900} size="xl" c="white">4k+</Text>
                <Text c="gray.3" size="xs" tt="uppercase" fw={700}>Listings</Text>
              </Box>
            </Flex>
          </Box>
        </Box>

        {/* Right Panel */}
        <Flex
          flex={1}
          direction="column"
          justify="center"
          align="center"
          style={{
            padding: '20px',
            minHeight: '100vh',
            backgroundColor: 'transparent',
          }}
        >
          <Box style={{ maxWidth: 540, width: '100%' }}>
            <Title order={2} mb={8} style={{ fontWeight: 800, fontSize: 32, color: '#1a1a1a' }}>
              Welcome Back
            </Title>
            <Text size="sm" c="dimmed" mb={40}>
              Log in to your business hub or customer account.
            </Text>

            {renderForm(false)}
          </Box>
        </Flex>
      </Box>

      {/* ─── MOBILE LAYOUT ──────────────────────────────────────────────────── */}
      <Flex
        className="signin-mobile"
        direction="column"
        align="center"
        justify="center"
        style={{
          minHeight: '100vh',
          // backgroundColor: '#F8F9FA',
          padding: '24px 16px',
        }}
      >
        <Box
          style={{
            // background: '#fff',
            borderRadius: 32,
            padding: '40px 24px',
            width: '100%',
            maxWidth: 420,
            // boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
          }}
        >
          <Title ta="center" order={2} mb={8} style={{ fontWeight: 800, fontSize: 28, color: '#1a1a1a' }}>
            Sign In
          </Title>
          <Text ta="center" size="sm" c="dimmed" mb={32}>
            Access the livestock marketplace.
          </Text>

          {renderForm(true)}
        </Box>
      </Flex>
    </Box>
  );
};

export default Signin;
