'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Flex,
  NumberInput,
  Paper,
  PasswordInput,
  Select,
  Stack,
  Tabs,
  TextInput,
  Title,
  Badge,
  rem,
  Divider,
  Text,
  Image,
} from '@mantine/core';
import {
  IconMail,
  IconLock,
  IconArrowRight,
  IconShieldCheck,
  IconUser,
  IconPhone,
  IconMapPin,
  IconBriefcase,
  IconAward,
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { TestimonialCard } from '@/core/components/cards/testimonial-card';
import { useAppContext } from '@/core/context';
import useCheckEmailAvailabilityMutation from '@/core/hooks/auth/useCheckEmailAvailabilityMutation';
import useSignupMutation from '@/core/hooks/auth/useSignupMutation';
import useFetchAvailableStatesQuery from '@/core/hooks/public/useFetchAvailableStatesQuery';
import useFetchProductUploadSubscriptionPlanQuery from '@/core/hooks/public/useFetchProductUploadSubscriptionPlanQuery';
import useFetchTestimonialsQuery from '@/core/hooks/public/useFetchTestimonialsQuery';
import { priceFormatter } from '@/core/middlewares';
import { AvailabilityCheckInfo, CreateAccountDTO } from '@/core/sdk/auth';
import { TestimonialInfo } from '@/core/sdk/communication';
import { validateSignUpForm } from '@/core/validations/auth.validations';
import Link from 'next/link';

const Signup = () => {
  useFetchTestimonialsQuery();
  useFetchAvailableStatesQuery();
  useFetchProductUploadSubscriptionPlanQuery();

  const router = useRouter();

  const { isPending, mutate } = useSignupMutation();
  const { isPending: isCheckEmailAvailabilityPending, mutate: checkEmailAvailabilityMutation } =
    useCheckEmailAvailabilityMutation();

  const [formData, setFormData] = useState<{
    isSeller: boolean;
    availableLgas: string[];
    confirmPassword: string;
  }>({
    isSeller: false,
    availableLgas: [],
    confirmPassword: '',
  });

  const { availableStates, authToken, testimonials, productUploadSubscriptionPlan } =
    useAppContext();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      referralCode: '',
      role: '',
      state: '',
      city: '',
      businessName: '',
      referral_source: '',
      businessAddress: '',
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
    form.setFieldValue('role', 'CUSTOMER');
  }, []);

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

  const submitHandler = async (payload: CreateAccountDTO) => {
    const message = validateSignUpForm(payload, formData.confirmPassword);

    if (message !== '') {
      showNotification({
        message,
        color: 'red',
        title: 'Message',
        autoClose: 3000,
      });

      return;
    }

    checkEmailAvailabilityMutation(payload.email, {
      onSuccess: (data: AvailabilityCheckInfo) => {
        if (data.isAvailable) {
          mutate(payload);
        }
      },
    });
  };

  // ─── Shared Form ─────────────────────────────────────────────────────────────
  const renderForm = (isMobile: boolean) => (
    <form
      onSubmit={form.onSubmit((values) => {
        submitHandler(values);
      })}
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

        <Tabs
          defaultValue="CUSTOMER"
          onChange={(value: string | null) => {
            form.setFieldValue('role', value!);
            setFormData({ ...formData, isSeller: value === 'FARMER' });
          }}
          styles={{
            root: { marginBottom: 10 },
            list: { borderBottom: '2px solid #f1f3f5' },
            tab: { fontWeight: 600, padding: '12px 16px' }
          }}
        >
          <Tabs.List grow>
            <Tabs.Tab value="CUSTOMER" color="green" leftSection={<IconUser size={16} />}>
              Customer
            </Tabs.Tab>
            <Tabs.Tab value="FARMER" color="blue" leftSection={<IconBriefcase size={16} />}>
              Farmer
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <Flex gap={12} direction={{ base: 'column', sm: 'row' }}>
          <Box style={{ flex: 1 }}>
            <Text size="xs" fw={700} tt="uppercase" mb={6} style={{ letterSpacing: '0.08em', color: '#555' }}>First Name</Text>
            <TextInput
              size="md"
              radius="md"
              placeholder="Kunle"
              leftSection={<IconUser size={16} color="#888" />}
              styles={{ input: { backgroundColor: '#F4F4F4', border: 'none', height: rem(50) } }}
              {...form.getInputProps('firstName')}
            />
          </Box>
          <Box style={{ flex: 1 }}>
            <Text size="xs" fw={700} tt="uppercase" mb={6} style={{ letterSpacing: '0.08em', color: '#555' }}>Last Name</Text>
            <TextInput
              size="md"
              radius="md"
              placeholder="Abiola"
              leftSection={<IconUser size={16} color="#888" />}
              styles={{ input: { backgroundColor: '#F4F4F4', border: 'none', height: rem(50) } }}
              {...form.getInputProps('lastName')}
            />
          </Box>
        </Flex>

        {formData.isSeller && (
          <Flex gap={12} direction={{ base: 'column', sm: 'row' }}>
            <Box style={{ flex: 1 }}>
              <Text size="xs" fw={700} tt="uppercase" mb={6} style={{ letterSpacing: '0.08em', color: '#555' }}>Business Name</Text>
              <TextInput
                size="md"
                radius="md"
                placeholder="Bola's Farm"
                leftSection={<IconAward size={16} color="#888" />}
                styles={{ input: { backgroundColor: '#F4F4F4', border: 'none', height: rem(50) } }}
                {...form.getInputProps('businessName')}
              />
            </Box>
            <Box style={{ flex: 1 }}>
              <Text size="xs" fw={700} tt="uppercase" mb={6} style={{ letterSpacing: '0.08em', color: '#555' }}>Business Address</Text>
              <TextInput
                size="md"
                radius="md"
                placeholder="Address"
                leftSection={<IconMapPin size={16} color="#888" />}
                styles={{ input: { backgroundColor: '#F4F4F4', border: 'none', height: rem(50) } }}
                {...form.getInputProps('businessAddress')}
              />
            </Box>
          </Flex>
        )}

        <Flex gap={12} direction={{ base: 'column', sm: 'row' }}>
          <Box style={{ flex: 1 }}>
            <Text size="xs" fw={700} tt="uppercase" mb={6} style={{ letterSpacing: '0.08em', color: '#555' }}>Email</Text>
            <TextInput
              size="md"
              radius="md"
              placeholder="tunde@gmail.com"
              leftSection={<IconMail size={16} color="#888" />}
              styles={{ input: { backgroundColor: '#F4F4F4', border: 'none', height: rem(50) } }}
              {...form.getInputProps('email')}
            />
          </Box>
          <Box style={{ flex: 1 }}>
            <Text size="xs" fw={700} tt="uppercase" mb={6} style={{ letterSpacing: '0.08em', color: '#555' }}>Phone</Text>
            <NumberInput
              size="md"
              radius="md"
              maxLength={10}
              placeholder="9029389499"
              leftSection={<IconPhone size={16} color="#888" />}
              styles={{ input: { backgroundColor: '#F4F4F4', border: 'none', height: rem(50), paddingLeft: 46 } }}
              allowNegative={false}
              onChange={(value) => form.setFieldValue('phone', '+234'.concat(value!.toString()))}
            />
          </Box>
        </Flex>

        <Flex gap={12} direction={{ base: 'column', sm: 'row' }}>
          <Box style={{ flex: 1 }}>
            <Text size="xs" fw={700} tt="uppercase" mb={6} style={{ letterSpacing: '0.08em', color: '#555' }}>State</Text>
            <Select
              size="md"
              radius="md"
              placeholder="Select State"
              leftSection={<IconMapPin size={16} color="#888" />}
              styles={{ input: { backgroundColor: '#F4F4F4', border: 'none', height: rem(50) } }}
              data={availableStates.map((item) => item.state)}
              onChange={(value) => {
                form.setFieldValue('state', value!);
                const values = availableStates.find((item) => item.state === value)?.lgas;
                setFormData({ ...formData, availableLgas: values || [] });
                form.setFieldValue('city', '');
              }}
            />
          </Box>
          <Box style={{ flex: 1 }}>
            <Text size="xs" fw={700} tt="uppercase" mb={6} style={{ letterSpacing: '0.08em', color: '#555' }}>City</Text>
            <Select
              size="md"
              radius="md"
              placeholder="Select City"
              leftSection={<IconMapPin size={16} color="#888" />}
              styles={{ input: { backgroundColor: '#F4F4F4', border: 'none', height: rem(50) } }}
              data={formData.availableLgas}
              {...form.getInputProps('city')}
            />
          </Box>
        </Flex>

        <Flex gap={12} direction={{ base: 'column', sm: 'row' }}>
          <Box style={{ flex: 1 }}>
            <Text size="xs" fw={700} tt="uppercase" mb={6} style={{ letterSpacing: '0.08em', color: '#555' }}>Password</Text>
            <PasswordInput
              size="md"
              radius="md"
              placeholder="••••••••"
              leftSection={<IconLock size={16} color="#888" />}
              styles={{ input: { backgroundColor: '#F4F4F4', border: 'none', height: rem(50) }, innerInput: { paddingLeft: 46 } }}
              {...form.getInputProps('password')}
            />
          </Box>
          <Box style={{ flex: 1 }}>
            <Text size="xs" fw={700} tt="uppercase" mb={6} style={{ letterSpacing: '0.08em', color: '#555' }}>Confirm Password</Text>
            <PasswordInput
              size="md"
              radius="md"
              placeholder="••••••••"
              leftSection={<IconLock size={16} color="#888" />}
              styles={{ input: { backgroundColor: '#F4F4F4', border: 'none', height: rem(50) }, innerInput: { paddingLeft: 46 } }}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </Box>
        </Flex>

        <Box>
          <Text size="xs" fw={700} tt="uppercase" mb={6} style={{ letterSpacing: '0.08em', color: '#555' }}>Referral Code (Optional)</Text>
          <TextInput
            size="md"
            radius="md"
            placeholder="Enter code"
            leftSection={<IconAward size={16} color="#888" />}
            styles={{ input: { backgroundColor: '#F4F4F4', border: 'none', height: rem(50) } }}
            {...form.getInputProps('referralCode')}
          />
        </Box>

        <Button
          type="submit"
          loading={isPending || isCheckEmailAvailabilityPending}
          radius="md"
          h={55}
          mt={10}
          styles={{
            root: {
              background: 'linear-gradient(90deg, #006838 0%, #138C48 100%)',
              fontSize: '16px',
              fontWeight: 700,
            },
          }}
          rightSection={<IconArrowRight size={18} />}
          fullWidth
        >
          Create Account
        </Button>

        <Flex justify="center" gap={4} mt={10}>
          <Text size="sm" c="dimmed">Already have an account?</Text>
          <Link href="/signin" style={{ textDecoration: 'none' }}>
            <Text size="sm" fw={700} c="#138C48">Sign In</Text>
          </Link>
        </Flex>

        {isMobile && currentTestimonial && (
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
      <Box style={{ display: 'none' }} className="signup-desktop">
        <style>{`
          :root { --navbar-h: 0px; }
          @media (min-width: 768px) {
            .signup-desktop { display: flex !important; }
            .signup-mobile  { display: none !important; }
          }
          @media (max-width: 767px) {
            .signup-desktop { display: none !important; }
            .signup-mobile  { display: flex !important; }
          }
        `}</style>

        {/* Left Panel */}
        <Box
          style={{
            flex: '0 0 45%',
            position: 'relative',
            minHeight: '100vh',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/images/auth/image_auth_bg_22.jpg"
            alt="Livestocx signup"
            // fill
            style={{ objectFit: 'cover' }}
          />
          {/* <Box
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,104,56,0.85) 100%)',
            }}
          /> */}

          <Box style={{ position: 'absolute', top: 80, left: 60, right: 60 }}>
            {currentTestimonial && (
              <Box mb={40}>
                <TestimonialCard testimonial={currentTestimonial} width="100%" backgroundColor="#ffffff" />
              </Box>
            )}
            <Badge variant="filled" radius="xl" mb={16} styles={{ root: { backgroundColor: '#138C48' } }}>
              Start your journey
            </Badge>
            <Title order={1} style={{ color: '#fff', fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: 1.1, fontWeight: 900 }}>
              Join the Ecosystem.
              <br />
              <Text component="span" c="green.3" inherit>Scale your Business.</Text>
            </Title>
            <Text mt={20} size="lg" style={{ color: 'rgba(255,255,255,0.9)', maxWidth: 450 }}>
              Create an account today and connect with thousands of verified partners across the livestock value chain.
            </Text>

          </Box>
        </Box>

        {/* Right Panel */}
        <Flex
          flex={1}
          direction="column"
          justify="center"
          align="center"
          style={{ padding: '40px 60px', minHeight: '100vh' }}
        >
          <Box style={{ maxWidth: 640, width: '100%' }}>
            <Title order={2} mb={8} style={{ fontWeight: 800, fontSize: 32 }}>Create Account</Title>
            <Text size="sm" c="dimmed" mb={32}>Join the future of agri-commerce.</Text>
            {renderForm(false)}
          </Box>
        </Flex>
      </Box>

      {/* ─── MOBILE LAYOUT ──────────────────────────────────────────────────── */}
      <Flex
        className="signup-mobile"
        direction="column"
        align="center"
        justify="center"
        style={{
          minHeight: '100vh', 
          padding: '24px 16px'
          // backgroundColor: '#F8F9FA',
        }}
      >
        <Box
          style={{
            // background: '#fff',
            borderRadius: 32,
            padding: '32px 24px',
            width: '100%',
            maxWidth: 480,
            // boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
          }}
        >
          <Title ta="center" order={2} mb={8} style={{ fontWeight: 800, fontSize: 26 }}>Sign Up</Title>
          <Text ta="center" size="sm" c="dimmed" mb={24}>Access the livestock marketplace.</Text>
          {renderForm(true)}

        </Box>
      </Flex>
    </Box>
  );
};

export default Signup;
