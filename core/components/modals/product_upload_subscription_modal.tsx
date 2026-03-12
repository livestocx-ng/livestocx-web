'use client';

import React, { useEffect, useState } from 'react';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Center,
  CopyButton,
  Divider,
  Flex,
  Group,
  Loader,
  Modal,
  Radio,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import { useAppContext } from '@/core/context';
import useFetchAccountInfoQuery from '@/core/hooks/account/useFetchAccountInfoQuery';
import useFetchPaymentMethodsQuery from '@/core/hooks/payments/useFetchPaymentMethodsQuery';
import useVerifyPaymentSessionMutation from '@/core/hooks/payments/useVerifyPaymentSessionMutation';
import useInitializePayableProductUploadSubscriptionMutation from '@/core/hooks/subscription/useInitializePayableProductUploadSubscriptionMutation';
import useInitializePaystackProductUploadSubscriptionMutation from '@/core/hooks/subscription/useInitializePaystackProductUploadSubscriptionMutation';
import { priceFormatter } from '@/core/middlewares';
import {
  PaymentMethodGatewayEnum,
  ProductUploadSubscriptionPlanInfo,
  VerifyPaymentSessionResponse,
} from '@/core/sdk/vendor';

interface ProductUploadSubscriptionModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ProductUploadSubscriptionModal = ({
  isOpen,
  closeModal,
}: ProductUploadSubscriptionModalProps) => {
  const {
    paymentMethods,
    productUploadSubscriptionPlans,
    setPaymentChargeSession,
    paymentChargeSession,
  } = useAppContext();
  useFetchPaymentMethodsQuery();

  const [selectedPlan, setSelectedPlan] = useState<ProductUploadSubscriptionPlanInfo | null>(null);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const { refetch: refetchAccountInfo } = useFetchAccountInfoQuery();

  const { mutate: verifyPaymentSessionMutation, isPending: isVerifyPaymentSessionPending } =
    useVerifyPaymentSessionMutation();

  const {
    mutate: initializePaystackProductUploadSubscriptionMutation,
    isPending: isInitializePaystackProductUploadSubscriptionPending,
  } = useInitializePaystackProductUploadSubscriptionMutation();
  const {
    mutate: initializePayableProductUploadSubscriptionMutation,
    isPending: isInitializePayableProductUploadSubscriptionPending,
  } = useInitializePayableProductUploadSubscriptionMutation();

  const isInitializingPayment =
    isInitializePaystackProductUploadSubscriptionPending ||
    isInitializePayableProductUploadSubscriptionPending;

  const handleContinue = () => {
    if (selectedPlan) {
      setShowPaymentMethods(true);
    }
  };

  const handlePaymentMethodSelect = (value: string | null) => {
    setSelectedPaymentMethod(value);
    if (value) {
      initializePayment(value);
    }
  };

  const initializePayment = (paymentMethodTitle: string) => {
    if (!selectedPlan) {
      return;
    }

    const paymentMethod = paymentMethods.find((item) => item.title === paymentMethodTitle);
    const paymentGateway = paymentMethod?.gateway as PaymentMethodGatewayEnum;

    if (paymentGateway === PaymentMethodGatewayEnum.Paystack) {
      initializePaystackProductUploadSubscriptionMutation(Number(selectedPlan.id));
    } else {
      initializePayableProductUploadSubscriptionMutation(Number(selectedPlan.id));
    }
  };

  const handleClose = () => {
    closeModal();
    setSelectedPlan(null);
    setShowPaymentMethods(false);
    setPaymentChargeSession(null);
    setSelectedPaymentMethod(null);
  };

  useEffect(() => {
    return () => {
      setPaymentChargeSession(null);
    };
  }, []);

  // Timer for session expiration
  useEffect(() => {
    if (!paymentChargeSession?.data?.account_expires_at) {
      return;
    }

    const calculateTimeLeft = () => {
      const expiresAt = new Date(paymentChargeSession.data.account_expires_at).getTime();
      const now = new Date().getTime();
      const difference = Math.max(0, Math.floor((expiresAt - now) / 1000));
      return difference;
    };

    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        setPaymentChargeSession(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [paymentChargeSession, setPaymentChargeSession]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <Modal
      size="xl"
      centered
      opened={isOpen}
      title="Select Subscription Plan"
      onClose={handleClose}
      overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
    >
      {!showPaymentMethods ? (
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            Choose a subscription plan to upload products
          </Text>

          {productUploadSubscriptionPlans.length === 0 ? (
            <Text c="dimmed" ta="center" py="xl">
              No subscription plans available
            </Text>
          ) : (
            <Radio.Group
              value={selectedPlan?.id || ''}
              onChange={(value) => {
                const plan = productUploadSubscriptionPlans.find((p) => p.id === value);
                setSelectedPlan(plan || null);
              }}
            >
              <Stack gap="md">
                {productUploadSubscriptionPlans.map((plan) => (
                  <Card
                    key={plan.id}
                    p="md"
                    withBorder
                    radius="md"
                    style={{
                      cursor: 'pointer',
                      border:
                        selectedPlan?.id === plan.id ? '2px solid #228be6' : '1px solid #dee2e6',
                      backgroundColor: selectedPlan?.id === plan.id ? '#e7f5ff' : 'transparent',
                    }}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    <Group justify="space-between" align="flex-start">
                      <Flex direction="column" gap={4}>
                        <Radio value={plan.id} label={plan.title} />
                        <Text size="sm" c="dimmed" mt={4}>
                          {plan.description}
                        </Text>
                      </Flex>
                      <Text size="sm" fw={700}>
                        {priceFormatter(plan.price)}
                      </Text>
                    </Group>
                  </Card>
                ))}
              </Stack>
            </Radio.Group>
          )}

          {selectedPlan && (
            <Button fullWidth mt="md" size="lg" onClick={handleContinue} disabled={!selectedPlan}>
              Continue
            </Button>
          )}
        </Stack>
      ) : (
        <Stack gap="md">
          <Button
            variant="subtle"
            onClick={() => {
              setSelectedPlan(null);
              setShowPaymentMethods(false);
              setPaymentChargeSession(null);
              setSelectedPaymentMethod(null);
            }}
            style={{ alignSelf: 'flex-start' }}
          >
            ← Back to Plans
          </Button>

          {!paymentChargeSession && (
            <>
              <Text size="sm" c="dimmed">
                Select a payment method for{' '}
                <Text span fw={600}>
                  {selectedPlan?.title}
                </Text>
              </Text>

              {isInitializingPayment ? (
                <Flex justify="center" py="xl">
                  <Loader size="lg" />
                </Flex>
              ) : (
                <Select
                  size="lg"
                  radius="md"
                  withAsterisk
                  label="Payment method"
                  placeholder="Choose payment method"
                  data={paymentMethods.map((item) => item.title)}
                  value={selectedPaymentMethod}
                  onChange={handlePaymentMethodSelect}
                />
              )}
            </>
          )}

          {selectedPaymentMethod &&
            !isInitializingPayment &&
            paymentChargeSession?.status &&
            paymentChargeSession?.data && (
              <Box mx="auto">
                <Text size="md" mb="sm">
                  Transfer{' '}
                  <Text span fw={700}>
                    {priceFormatter(paymentChargeSession.data.amount)}
                  </Text>{' '}
                  to the account number below for your product upload subscription.
                </Text>

                <Center>
                  <Text c="red" fw={600} mb="sm">
                    This session expires in {minutes}:{seconds}
                  </Text>
                </Center>

                <Card
                  p="lg"
                  withBorder
                  radius="md"
                  style={{
                    borderSpacing: 10,
                    border: '2px dashed #ccc',
                    backgroundColor: '#7878781f',
                  }}
                >
                  <Flex align="center" justify="space-between" w="100%">
                    <Box mb="xs">
                      <Text fw={500}>Account Number</Text>
                      <Text size="sm" mb="sm">
                        {paymentChargeSession.data.account_number}
                      </Text>
                    </Box>

                    <CopyButton value={paymentChargeSession.data.account_number}>
                      {({ copied, copy }) => (
                        <ActionIcon
                          color={copied ? 'teal' : 'gray'}
                          variant="subtle"
                          onClick={copy}
                        >
                          {copied ? <IconCheck size={20} /> : <IconCopy size={20} />}
                        </ActionIcon>
                      )}
                    </CopyButton>
                  </Flex>
                  <Divider my="sm" />

                  <Text>
                    <b>Bank:</b> {paymentChargeSession.data.bank.name}
                  </Text>
                  <Text>
                    <b>Account Name:</b> {paymentChargeSession.data.account_name}
                  </Text>
                  <Text>
                    <b>Amount:</b> {priceFormatter(paymentChargeSession.data.amount)}
                  </Text>
                </Card>

                <Button
                  h={50}
                  mt={40}
                  w="100%"
                  bg="black"
                  radius="lg"
                  variant="filled"
                  loading={isVerifyPaymentSessionPending}
                  onClick={() => {
                    // TODO: Implement payment verification
                    // eslint-disable-next-line no-console
                    verifyPaymentSessionMutation(
                      {
                        reference: paymentChargeSession.data.reference,
                        paymentGateWay: selectedPaymentMethod as PaymentMethodGatewayEnum,
                      },
                      {
                        onSuccess: (data: VerifyPaymentSessionResponse) => {
                          if (data.status) {
                            handleClose();

                            refetchAccountInfo();
                          }
                        },
                      }
                    );
                  }}
                >
                  I have made this transfer
                </Button>
              </Box>
            )}
        </Stack>
      )}
    </Modal>
  );
};

export default ProductUploadSubscriptionModal;
