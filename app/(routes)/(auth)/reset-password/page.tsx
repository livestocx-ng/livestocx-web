'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  PasswordInput,
  Title,
  Badge,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import {
  IconLock,
  IconArrowRight,
  IconChevronLeft,
} from '@tabler/icons-react';
import { TestimonialCard } from '@/core/components/cards/testimonial-card';
import { useAppContext } from '@/core/context';
import useResetPasswordMutation from '@/core/hooks/auth/useResetPasswordMutation';
import useFetchTestimonialsQuery from '@/core/hooks/public/useFetchTestimonialsQuery';
import { ResetPasswordDTO } from '@/core/sdk/auth';
import { TestimonialInfo } from '@/core/sdk/communication';
import { validateResetPasswordForm } from '@/core/validations/auth.validations';

const ResetPassword = () => {
  useFetchTestimonialsQuery();
  const router = useRouter();

  const { authToken, testimonials } = useAppContext();
  const { isPending, mutate } = useResetPasswordMutation();

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [_currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentTestimonial, setCurrentTestimonial] = useState<TestimonialInfo | null>(null);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      accountId: '',
      newPassword: '',
      passwordResetToken: '',
    },
  });

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
      if (intervalId) clearInterval(intervalId);
    };
  }, [testimonials]);

  useEffect(() => {
    if (authToken) {
      router.push('/');
    }
  }, [authToken]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

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
  }, []);

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

  const renderForm = (isMobile: boolean) => (
    <form
      onSubmit={form.onSubmit((values) => submitHandler(values))}
      style={{ width: '100%' }}
    >
      <Stack gap={20}>
        <Box>
          <Text
            size="xs"
            fw={700}
            tt="uppercase"
            style={{ letterSpacing: '0.08em', color: '#555', marginBottom: 6 }}
          >
            New Password
          </Text>
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
            {...form.getInputProps('newPassword')}
          />
        </Box>

        <Box>
          <Text
            size="xs"
            fw={700}
            tt="uppercase"
            style={{ letterSpacing: '0.08em', color: '#555', marginBottom: 6 }}
          >
            Confirm Password
          </Text>
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
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Box>

        <Button
          type="submit"
          loading={isPending}
          radius="md"
          h={50}
          styles={{
            root: {
              background: 'linear-gradient(90deg, #006838 0%, #138C48 100%)',
              fontSize: '15px',
              fontWeight: 600,
            },
          }}
          rightSection={<IconArrowRight size={18} />}
          fullWidth
        >
          Save Password
        </Button>

        <Flex justify="center" gap={4}>
          <Link href="/signin" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            <IconChevronLeft size={16} color="#138C48" />
            <Text size="sm" fw={600} c="#138C48">
              Back to Sign In
            </Text>
          </Link>
        </Flex>

        {currentTestimonial && (
          <Box mt="xl">
            <TestimonialCard testimonial={currentTestimonial} width="100%" />
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
      <Box style={{ display: 'none' }} className="reset-desktop">
        <style>{`
          :root { --navbar-h: 0px; }
          @media (min-width: 768px) {
            .reset-desktop { display: flex !important; }
            .reset-mobile  { display: none !important; }
          }
          @media (max-width: 767px) {
            .reset-desktop { display: none !important; }
            .reset-mobile  { display: flex !important; }
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
            src="/images/auth/image_auth_bg_44.jpg"
            alt="Livestocx background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <Box style={{ position: 'absolute', top: 80, left: 60, right: 60 }}>
            <Badge
              variant="filled"
              radius="xl"
              mb={16}
              styles={{
                root: { backgroundColor: '#138C48', color: '#fff', fontSize: '11px' },
              }}
            >
              Account Security
            </Badge>
            <Title
              order={1}
              style={{ color: '#fff', fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.1, fontWeight: 900 }}
            >
              Secure your Account.
              <br />
              <Text component="span" c="green.3" inherit>Update Password.</Text>
            </Title>
            <Text mt={20} size="lg" style={{ color: 'rgba(255,255,255,0.9)', maxWidth: 450, lineHeight: 1.6 }}>
              Choose a strong password to protect your access to the Livestocx marketplace and ecosystem.
            </Text>
          </Box>
        </Box>

        {/* Right Panel */}
        <Flex
          flex={1}
          direction="column"
          justify="center"
          align="center"
          style={{ padding: '20px', minHeight: '100vh', backgroundColor: 'transparent' }}
        >
          <Box style={{ maxWidth: 480, width: '100%' }}>
            <Title order={2} mb={8} style={{ fontWeight: 800, fontSize: 32, color: '#1a1a1a' }}>
              Reset Password
            </Title>
            <Text size="sm" c="dimmed" mb={40}>
              Choose a secure password for your account.
            </Text>
            {renderForm(false)}
          </Box>
        </Flex>
      </Box>

      {/* ─── MOBILE LAYOUT ──────────────────────────────────────────────────── */}
      <Flex
        className="reset-mobile"
        direction="column"
        align="center"
        justify="center"
        style={{ minHeight: '100vh', padding: '24px 16px' }}
      >
        <Box
          style={{
            borderRadius: 32,
            padding: '40px 24px',
            width: '100%',
            maxWidth: 420,
            // boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
            // background: '#fff',
          }}
        >
          <Title ta="center" order={2} mb={8} style={{ fontWeight: 800, fontSize: 28, color: '#1a1a1a' }}>
            Reset Password
          </Title>
          <Text ta="center" size="sm" c="dimmed" mb={32}>
            Set your new secure password below.
          </Text>
          {renderForm(true)}
        </Box>
      </Flex>
    </Box>
  );
};

export default ResetPassword;
