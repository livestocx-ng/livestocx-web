'use client';

// import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { IconChartBar, IconCheck, IconDeviceLaptop, IconGift, IconX } from '@tabler/icons-react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import PremiumSubscriptionPlanCard from '@/core/components/cards/premium_subscription_plan_card';
import UpdateBusinessProfileDrawer from '@/core/components/drawers/update_business_profile_drawer';
import PaymentModal from '@/core/components/modals/payment_modal';
import { useAppContext } from '@/core/context';
import useFetchPaymentMethodsQuery from '@/core/hooks/payments/useFetchPaymentMethodsQuery';
import useFetchPremiumSubscriptionPlanQuery from '@/core/hooks/public/useFetchPremiumSubscriptionPlanQuery';
import useFetchVendorInfoQuery from '@/core/hooks/vendor/useFetchVendorInfoQuery';
import { AccountInfoRoleEnum } from '@/core/sdk/account';
import { appFeatures } from '@/core/utilities';

const Business = () => {
  useFetchVendorInfoQuery();
  useFetchPaymentMethodsQuery();
  useFetchPremiumSubscriptionPlanQuery();

  const router = useRouter();

  const {
    authToken,
    vendorInfo,
    accountInfo,
    setChargeResponse,
    premiumSubscriptionPlans,
    setCurrentSubscriptionPlanId,
  } = useAppContext();

  const [isPaymentModalOpen, { open: openPaymentModal, close: closePaymentModal }] =
    useDisclosure(false);

  const [
    opened,
    { open: openUpdateBusinessProfileDrawer, close: closeUpdateBusinessProfileDrawer },
  ] = useDisclosure(false);

  const subscriptionPlansRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('subscription_now')! === 'true' && subscriptionPlansRef !== null) {
      subscriptionPlansRef.current!.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [subscriptionPlansRef]);

  return (
    <>
      <PaymentModal
        title="Payment"
        isOpen={isPaymentModalOpen}
        closeModal={closePaymentModal}
        subscriptionType="premium subscription payment"
      />
      <UpdateBusinessProfileDrawer isOpen={opened} closeDrawer={closeUpdateBusinessProfileDrawer} />
      <Box
        py={{ base: 50, sm: 50, md: 50 }}
        style={{
          display: 'flex',
          minHeight: '100vh',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(to right, #00683860, #00683810',
        }}
      >
        <Stack gap={50}>
          <Flex
            align="center"
            justify="space-between"
            px={20}
            w="100%"
            direction={{ base: 'column', md: 'row' }}
            gap={20}
          >
            <Box w={{ base: '100%', md: '50%' }}>
              <Stack
                // spacing="sm"
                // align={{ base: 'center', md: 'flex-start' }}
                ta={{ base: 'center', md: 'left' }}
              >
                <Title order={3}>Livestocx for Businesses</Title>
                <Text fz={{ base: 14, sm: 14, md: 16 }}>
                  Expand your business reach. Sell to thousands on our Marketplace and showcase your
                  products with our custom website and catalog built for you.
                </Text>

                <Button
                  radius="md"
                  h={50}
                  variant="filled"
                  mt={10}
                  c="white"
                  bg="blue"
                  w={200}
                  onClick={async () => {
                    if (subscriptionPlansRef.current) {
                      subscriptionPlansRef.current.scrollIntoView({
                        behavior: 'smooth',
                      });
                    }

                    // if (user) {
                    //   handlePremiumSubscriptionInquiry();
                    // }
                  }}
                  mx={{ base: 'auto', sm: 'auto', md: 0 }}
                >
                  Get Started
                </Button>
              </Stack>
            </Box>

            <Box w={{ base: '100%', md: '50%' }}>
              <Image
                src="/images/enterprise/business_header_1.png"
                alt="Livestocx - Business"
                fit="cover"
                width="100%"
                height="auto"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Box>
          </Flex>

          <Container size="lg" py="xl">
            <Title order={3} ta="center" mb="xl">
              What you get
            </Title>

            <Flex direction={{ base: 'column', md: 'row' }} align="stretch" gap="xl">
              <Box style={{ flex: 1 }}>
                <Image
                  src="/images/animals/chicken_1.jpg"
                  alt="Chickens on a farm"
                  radius="md"
                  style={{ width: '100%', height: 'auto' }}
                />
              </Box>

              <Box style={{ flex: 1 }}>
                <Stack>
                  <Flex align="center" gap={10}>
                    <ThemeIcon color="green" size="md" radius="xl">
                      <IconCheck size={16} />
                    </ThemeIcon>
                    <Text fz={14}>Become verified</Text>
                  </Flex>

                  <Flex align="center" gap={10}>
                    <ThemeIcon color="green" size="md" radius="xl">
                      <IconDeviceLaptop size={16} />
                    </ThemeIcon>
                    <Text fz={14}>
                      Have a mini-website/online store for your business that you can share with
                      your customers.
                    </Text>
                  </Flex>

                  <Flex align="center" gap={10}>
                    <ThemeIcon color="green" size="md" radius="xl">
                      <IconGift size={16} />
                    </ThemeIcon>
                    <Text fz={14}>Get one free monthly product promotion</Text>
                  </Flex>

                  <Flex align="center" gap={10}>
                    <ThemeIcon color="green" size="md" radius="xl">
                      <IconChartBar size={16} />
                    </ThemeIcon>
                    <Text fz={14}>Have access to analytics and sales features.</Text>
                  </Flex>

                  <Paper p="md" radius="md" withBorder>
                    <Group>
                      <Avatar
                        fz="lg"
                        alt="Company logo"
                        src="/images/avatar/vendor_1.jpg"
                        style={{
                          borderRadius: '50%',
                          border: '1px solid #11111110',
                        }}
                      />
                      <Text fw={600} size="sm">
                        Grace Horizon Foods Limited
                      </Text>
                    </Group>
                    <Text fz={14}>
                      Thanks to Livestocx, my poultry business now has a professional online
                      presence. The platform's features are top-notch, and the ease of setting up a
                      custom store has saved me so much time. Sales have never been better!
                    </Text>
                  </Paper>
                </Stack>
              </Box>
            </Flex>
          </Container>

          <Container>
            <ScrollArea w={{ base: 350, sm: 350, md: 800 }}>
              <Table style={{ minWidth: 150 }} w={800}>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>{}</Table.Th>
                    <Table.Th>Feature</Table.Th>
                    <Table.Th>Custom Business Website</Table.Th>
                    <Table.Th>Livestocx Platform</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {appFeatures.map((element, index) => (
                    <Table.Tr key={element.feature}>
                      <Table.Td>{index + 1}</Table.Td>
                      <Table.Td>{element.feature}</Table.Td>
                      <Table.Td>
                        {' '}
                        <Flex align="center" gap={5}>
                          <IconX color="red" size={12} /> <Text>{element.custom.text}</Text>
                        </Flex>{' '}
                      </Table.Td>
                      <Table.Td>
                        <Flex align="center" gap={5}>
                          <IconCheck color="green" size={12} />{' '}
                          <Text>{element.livestocx.text}</Text>
                        </Flex>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>
          </Container>

          <Flex justify="center" align="center" px={20} ref={subscriptionPlansRef}>
            {premiumSubscriptionPlans.map((plan) => (
              <PremiumSubscriptionPlanCard
                key={plan.id}
                plan={plan}
                handleSubmit={() => {
                  if (!authToken) {
                    return router.push(`/signin?redirect_to=business`);
                  } else if (accountInfo?.role !== AccountInfoRoleEnum.Farmer) {
                    return showNotification({
                      color: 'red',
                      title: 'Message',
                      autoClose: 5000,
                      message: 'Only sellers are allowed to this service.',
                    });
                  } else if (vendorInfo?.isUpdated === false) {
                    return openUpdateBusinessProfileDrawer();
                  }

                  openPaymentModal();

                  setChargeResponse(null);

                  setCurrentSubscriptionPlanId(Number(plan.id!));
                }}
              />
            ))}
          </Flex>
        </Stack>
      </Box>
    </>
  );
};

export default Business;
