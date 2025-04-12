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
} from '@mantine/core';
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

  return (
    <Box
      py={{ base: 100, sm: 100, md: 100 }}
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
        Sign Up
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
            <Tabs
              defaultValue="CUSTOMER"
              onChange={(value: string | null) => {
                form.setFieldValue('role', value!);

                setFormData({ ...formData, isSeller: value === 'FARMER' });
              }}
            >
              <Tabs.List grow justify="center">
                <Tabs.Tab value="CUSTOMER" color="teal">
                  Customer
                </Tabs.Tab>
                <Tabs.Tab value="FARMER" color="blue">
                  Farmer
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>

            <Stack gap={10}>
              <Flex
                gap={10}
                direction={{ base: 'column', sm: 'column', md: 'row' }}
                justify={{ base: 'start', sm: 'start', md: 'space-between' }}
              >
                <TextInput
                  size="lg"
                  radius="lg"
                  withAsterisk
                  label="First name"
                  styles={{
                    label: { fontSize: '16px' },
                    root: { fontSize: '14px' },
                    input: { fontSize: '14px' },
                  }}
                  placeholder="Kunle"
                  {...form.getInputProps('firstName')}
                  w={{ base: '100%', sm: '100%', md: '48%' }}
                />
                <TextInput
                  size="lg"
                  radius="lg"
                  withAsterisk
                  label="Last name"
                  styles={{
                    label: { fontSize: '16px' },
                    root: { fontSize: '14px' },
                    input: { fontSize: '14px' },
                  }}
                  placeholder="Abiola"
                  {...form.getInputProps('lastName')}
                  w={{ base: '100%', sm: '100%', md: '48%' }}
                />
              </Flex>
              {formData.isSeller && (
                <Flex
                  gap={10}
                  direction={{ base: 'column', sm: 'column', md: 'row' }}
                  justify={{ base: 'start', sm: 'start', md: 'space-between' }}
                >
                  <TextInput
                    size="lg"
                    radius="lg"
                    withAsterisk
                    label="Business name"
                    styles={{
                      label: { fontSize: '16px' },
                      root: { fontSize: '14px' },
                      input: { fontSize: '14px' },
                    }}
                    placeholder="Bola's Farm"
                    {...form.getInputProps('businessName')}
                    w={{ base: '100%', sm: '100%', md: '48%' }}
                  />
                  <TextInput
                    size="lg"
                    radius="lg"
                    withAsterisk
                    label="Business address"
                    styles={{
                      label: { fontSize: '16px' },
                      root: { fontSize: '14px' },
                      input: { fontSize: '14px' },
                    }}
                    placeholder="Address"
                    {...form.getInputProps('businessAddress')}
                    w={{ base: '100%', sm: '100%', md: '48%' }}
                  />
                </Flex>
              )}
              <Flex
                gap={10}
                direction={{ base: 'column', sm: 'column', md: 'row' }}
                justify={{ base: 'start', sm: 'start', md: 'space-between' }}
              >
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
                  placeholder="tunde@gmail.com"
                  {...form.getInputProps('email')}
                  w={{ base: '100%', sm: '100%', md: '48%' }}
                />
                <NumberInput
                  size="lg"
                  radius="lg"
                  withAsterisk
                  label="Phone"
                  maxLength={10}
                  inputMode="tel"
                  allowNegative={false}
                  placeholder="9029389499"
                  styles={{
                    label: { fontSize: '16px' },
                    root: { fontSize: '14px' },
                    input: { fontSize: '14px' },
                  }}
                  w={{ base: '100%', sm: '100%', md: '48%' }}
                  onChange={(value: string | number) => {
                    form.setFieldValue('phone', '+234'.concat(value!.toString()));
                  }}
                />
              </Flex>
              <Flex
                gap={10}
                direction={{ base: 'column', sm: 'column', md: 'row' }}
                justify={{ base: 'start', sm: 'start', md: 'space-between' }}
              >
                <Select
                  size="lg"
                  radius="lg"
                  withAsterisk
                  label="State"
                  placeholder="Abia"
                  styles={{
                    label: { fontSize: '16px' },
                    root: { fontSize: '14px' },
                    input: { fontSize: '14px' },
                  }}
                  w={{ base: '100%', sm: '100%', md: '48%' }}
                  onChange={(value) => {
                    form.setFieldValue('state', value!);

                    const values = availableStates.find((item) => item.state === value)?.lgas;

                    setFormData({ ...formData, availableLgas: values! });

                    if (form.values.city !== '') {
                      form.setFieldValue('city', '');
                    }
                  }}
                  data={availableStates.map((item) => item.state)}
                />
                <Select
                  size="lg"
                  radius="lg"
                  withAsterisk
                  label="City"
                  placeholder="Ikeja"
                  {...form.getInputProps('city')}
                  data={formData.availableLgas}
                  styles={{
                    label: { fontSize: '16px' },
                    root: { fontSize: '14px' },
                    input: { fontSize: '14px' },
                  }}
                  w={{ base: '100%', sm: '100%', md: '48%' }}
                />
              </Flex>
              <Flex
                gap={10}
                direction={{ base: 'column', sm: 'column', md: 'row' }}
                justify={{ base: 'start', sm: 'start', md: 'space-between' }}
              >
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
                  {...form.getInputProps('password')}
                  w={{ base: '100%', sm: '100%', md: '48%' }}
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
                  w={{ base: '100%', sm: '100%', md: '48%' }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                />
              </Flex>
              <TextInput
                size="lg"
                radius="lg"
                label="Referral code"
                styles={{
                  label: { fontSize: '16px' },
                  root: { fontSize: '14px' },
                  input: { fontSize: '14px' },
                }}
                placeholder="Referral code(optional)"
                {...form.getInputProps('referralCode')}
              />

              <Button
                radius="lg"
                h={50}
                variant="filled"
                mt={10}
                type="submit"
                loading={isPending || isCheckEmailAvailabilityPending}
              >
                Create Account
              </Button>
            </Stack>

            {currentTestimonial && <TestimonialCard testimonial={currentTestimonial} />}
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;
