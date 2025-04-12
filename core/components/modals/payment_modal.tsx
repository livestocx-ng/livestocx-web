import { useEffect, useState } from 'react';
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
  Loader,
  Modal,
  Select,
  Text,
  Title,
} from '@mantine/core';
import { useAppContext } from '@/core/context';
import useFetchPaymentMethodsQuery from '@/core/hooks/payments/useFetchPaymentMethodsQuery';
import useInitializePremiumSubscriptionPaymentMutation from '@/core/hooks/payments/useInitializePremiumSubscriptionPaymentMutation';
import useVerifyPaymentSessionMutation from '@/core/hooks/payments/useVerifyPaymentSessionMutation';
import { priceFormatter } from '@/core/middlewares';
import { PaymentMethodGatewayEnum, VerifyPaymentSessionResponse } from '@/core/sdk/vendor';

const PaymentModal = ({
  title,
  isOpen,
  closeModal,
  subscriptionType,
}: {
  title: string;
  isOpen: boolean;
  closeModal: () => void;
  subscriptionType: string;
}) => {
  useFetchPaymentMethodsQuery();

  const { mutate, isPending } = useInitializePremiumSubscriptionPaymentMutation();
  const { mutate: verifyPaymentSessionMutation, isPending: isVerifyPaymentSessionPending } =
    useVerifyPaymentSessionMutation();

  const { currentSubscriptionPlanId, chargeResponse, setChargeResponse, paymentMethods } =
    useAppContext();

  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodGatewayEnum | null>(null);

  useEffect(() => {
    setChargeResponse(null);
  }, []);

  useEffect(() => {
    let interval: any;

    if (chargeResponse?.status) {
      interval = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(interval);
            setChargeResponse(null);
            closeModal();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [chargeResponse]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <Modal
      size="lg"
      centered
      title={title}
      opened={isOpen}
      onClose={() => {
        setChargeResponse(null);

        closeModal();
      }}
      overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
    >
      {!chargeResponse?.status && (
        <>
          {!isPending ? (
            <Select
              size="lg"
              radius="lg"
              withAsterisk
              label="Payment method"
              placeholder="Choose payment method"
              styles={{
                label: { fontSize: '16px' },
                root: { fontSize: '14px' },
                input: { fontSize: '14px' },
              }}
              data={paymentMethods.map((item) => item.title)}
              onChange={(value) => {
                const paymentGateWay = paymentMethods.find((item) => item.title === value)
                  ?.gateway as PaymentMethodGatewayEnum;

                setPaymentMethod(paymentGateWay);

                mutate({
                  paymentGateWay: paymentGateWay!,
                  planId: currentSubscriptionPlanId,
                });
              }}
            />
          ) : (
            <Flex justify="center" py={20}>
              <Loader color="black" />
            </Flex>
          )}
        </>
      )}

      {chargeResponse?.status && (
        <Box mx="auto">
          <Text size="md" mb="sm">
            Transfer{' '}
            <Text span fw={700}>
              {priceFormatter(chargeResponse?.data.amount)}
            </Text>{' '}
            to the account number below for your {subscriptionType}.
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
                <Title order={3} mb="sm">
                  {chargeResponse.data.account_number}
                </Title>
              </Box>

              <CopyButton value={chargeResponse.data.account_number}>
                {({ copied, copy }) => (
                  <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                    {copied ? <IconCheck size={20} /> : <IconCopy size={20} />}
                  </ActionIcon>
                )}
              </CopyButton>
            </Flex>
            <Divider my="sm" />

            <Text>
              <b>Bank:</b> {chargeResponse.data.bank.name}
            </Text>
            <Text>
              <b>Account Name:</b> {chargeResponse.data.account_name}
            </Text>
            <Text>
              <b>Amount:</b> {priceFormatter(chargeResponse?.data.amount)}
            </Text>
          </Card>

          <Button
            h={50}
            mt={40}
            w="100%"
            bg="black"
            radius="lg"
            variant="filled"
            onClick={() => {
              verifyPaymentSessionMutation(
                {
                  paymentGateWay: paymentMethod!,
                  reference: chargeResponse.data.reference,
                },
                {
                  onSuccess: (data: VerifyPaymentSessionResponse) => {
                    if (data.status) {
                      closeModal();
                    }
                  },
                }
              );
            }}
            loading={isVerifyPaymentSessionPending}
          >
            I have made this transfer
          </Button>
        </Box>
      )}
    </Modal>
  );
};

export default PaymentModal;
