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
  PinInput,
  Title,
  Badge,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import {
  IconArrowRight,
  IconChevronLeft,
} from '@tabler/icons-react';
import { TestimonialCard } from '@/core/components/cards/testimonial-card';
import { useAppContext } from '@/core/context';
import useResetPasswordVerificationMutation from '@/core/hooks/auth/useResetPasswordVerificationMutation';
import useFetchTestimonialsQuery from '@/core/hooks/public/useFetchTestimonialsQuery';
import { ResetPasswordVerificationDTO } from '@/core/sdk/auth';
import { TestimonialInfo } from '@/core/sdk/communication';
import { validateResetPasswordVerificationForm } from '@/core/validations/auth.validations';

const ResetPasswordVerification = () => {
  useFetchTestimonialsQuery();
  const router = useRouter();

  const { isPending, mutate } = useResetPasswordVerificationMutation();
  const { authToken, testimonials } = useAppContext();

  const [confirmPassword, _setConfirmPassword] = useState<string>(''); // Not used here but keeping for consistency if needed
  const [_currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentTestimonial, setCurrentTestimonial] = useState<TestimonialInfo | null>(null);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      otp: '',
      email: '',
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
      <Stack gap={24}>
        <Box>
          <Text
            size="xs"
            fw={700}
            tt="uppercase"
            ta="center"
            style={{ letterSpacing: '0.08em', color: '#555', marginBottom: 16 }}
          >
            Enter Verification Code
          </Text>
          <Flex justify="center" align="center">
            <PinInput
              length={6}
              size="lg"
              gap={12}
              type={/^[0-9]*$/}
              inputType="tel"
              inputMode="numeric"
              styles={{
                input: {
                  backgroundColor: '#F4F4F4',
                  border: 'none',
                  fontSize: '24px',
                  fontWeight: 700,
                  height: rem(60),
                  width: rem(45),
                },
              }}
              {...form.getInputProps('otp')}
            />
          </Flex>
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
          Verify Code
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
      <Box style={{ display: 'none' }} className="verify-desktop">
        <style>{`
          :root { --navbar-h: 0px; }
          @media (min-width: 768px) {
            .verify-desktop { display: flex !important; }
            .verify-mobile  { display: none !important; }
          }
          @media (max-width: 767px) {
            .verify-desktop { display: none !important; }
            .verify-mobile  { display: flex !important; }
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
            src="/images/auth/image_auth_bg_55.jpg"
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
              Security Check
            </Badge>
            <Title
              order={1}
              style={{ color: '#fff', fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.1, fontWeight: 900 }}
            >
              Verify your Identity.
              <br />
              <Text component="span" c="green.3" inherit>Secure access.</Text>
            </Title>
            <Text mt={20} size="lg" style={{ color: 'rgba(255,255,255,0.9)', maxWidth: 450, lineHeight: 1.6 }}>
              We've sent a 6-digit verification code to your email. Please enter it below to proceed with your password reset.
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
              OTP Verification
            </Title>
            <Text size="sm" c="dimmed" mb={40}>
              Enter the verification code sent to your email.
            </Text>
            {renderForm(false)}
          </Box>
        </Flex>
      </Box>

      {/* ─── MOBILE LAYOUT ──────────────────────────────────────────────────── */}
      <Flex
        className="verify-mobile"
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
            OTP Verification
          </Title>
          <Text ta="center" size="sm" c="dimmed" mb={32}>
            Enter the 6-digit code sent to your email.
          </Text>
          {renderForm(true)}
        </Box>
      </Flex>
    </Box>
  );
};

export default ResetPasswordVerification;
