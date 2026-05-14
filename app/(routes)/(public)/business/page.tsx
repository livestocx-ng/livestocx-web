'use client';

// import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  IconChartBar, 
  IconCheck, 
  IconDeviceLaptop, 
  IconGift, 
  IconX, 
  IconArrowRight, 
  IconBuildingSkyscraper, 
  IconShieldCheck, 
  IconTrophy 
} from '@tabler/icons-react';
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
  Badge,
  Grid,
  rem,
  SimpleGrid,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { motion } from 'framer-motion';
import PremiumSubscriptionPlanCard from '@/core/components/cards/premium_subscription_plan_card';
import UpdateBusinessProfileDrawer from '@/core/components/drawers/update_business_profile_drawer';
import PaymentModal from '@/core/components/modals/payment_modal';
import { useAppContext } from '@/core/context';
import useFetchPaymentMethodsQuery from '@/core/hooks/payments/useFetchPaymentMethodsQuery';
import useFetchPremiumSubscriptionPlanQuery from '@/core/hooks/public/useFetchPremiumSubscriptionPlanQuery';
import useFetchVendorInfoQuery from '@/core/hooks/vendor/useFetchVendorInfoQuery';
import { AccountInfoRoleEnum } from '@/core/sdk/account';
import { appFeatures } from '@/core/utilities';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' }
} as const;

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
} as const;

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
    <Box bg="white" style={{ overflow: 'hidden' }}>
      <PaymentModal
        title="Payment"
        isOpen={isPaymentModalOpen}
        closeModal={closePaymentModal}
        subscriptionType="premium subscription payment"
      />
      <UpdateBusinessProfileDrawer isOpen={opened} closeDrawer={closeUpdateBusinessProfileDrawer} />

      {/* 1. HERO SECTION */}
      <Box
        pos="relative"
        pt={{ base: 120, md: 180 }}
        pb={{ base: 80, md: 140 }}
        style={{
          backgroundColor: '#0A1711',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Grid Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(#ffffff05 1px, transparent 1px),
              linear-gradient(90deg, #ffffff05 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center center',
            pointerEvents: 'none',
          }}
        />
        
        {/* Decorative Blur */}
        <div 
          style={{
            position: 'absolute',
            top: '10%',
            right: '-10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(0, 104, 56, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none'
          }}
        />

        <Container size="xl" pos="relative">
          <Grid gutter={50} align="center">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Stack gap="xl">
                  <Group gap="xs">
                    <ThemeIcon variant="light" color="green" size="md">
                      <IconBuildingSkyscraper size={18} />
                    </ThemeIcon>
                    <Text c="green.4" fw={700} tt="uppercase" lts={1} size="xs">
                      Enterprise Solutions
                    </Text>
                  </Group>
                  
                  <Title 
                    order={1} 
                    c="white" 
                    lh={1.1}
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800 }}
                  >
                    Livestocx for <span style={{ color: '#4ade80' }}>Businesses</span>
                  </Title>
                  
                  <Text size="xl" c="gray.4" lh={1.6} style={{ maxWidth: 500 }}>
                    Expand your business reach. Sell to thousands on our Marketplace and showcase your
                    products with our custom website and catalog built for you.
                  </Text>

                  <Group gap="md">
                    <Button
                      size="xl"
                      radius="md"
                      bg="#006838"
                      rightSection={<IconArrowRight size={20} />}
                      onClick={() => {
                        subscriptionPlansRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      styles={{
                        root: {
                          height: rem(60),
                          paddingLeft: rem(35),
                          paddingRight: rem(35),
                          fontSize: rem(18),
                          fontWeight: 600,
                          '&:hover': {
                            backgroundColor: '#004d2a !important'
                          }
                        }
                      }}
                    >
                      Get Started
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="xl"
                      radius="md"
                      c="white"
                      style={{ 
                        borderColor: 'rgba(255,255,255,0.2)',
                        height: rem(60)
                      }}
                      styles={{
                        root: {
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.05) !important'
                          }
                        }
                      }}
                    >
                      Learn More
                    </Button>
                  </Group>
                </Stack>
              </motion.div>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <Box 
                  style={{ 
                    position: 'relative',
                    borderRadius: '32px',
                    overflow: 'hidden',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <Image
                    src="/images/enterprise/business_header_1.png"
                    alt="Livestocx - Business"
                    fit="cover"
                    w="100%"
                    h="auto"
                  />
                  <Box 
                    pos="absolute" 
                    bottom={0} 
                    left={0} 
                    right={0} 
                    p="xl"
                    style={{ 
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                      color: 'white'
                    }}
                  >
                    <Group gap="xs">
                      <Badge color="green" variant="filled">Premium Seller</Badge>
                      <Text size="sm" fw={500}>Verified Business Account</Text>
                    </Group>
                  </Box>
                </Box>
              </motion.div>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* 2. FEATURES GRID SECTION */}
      <Box py={120} bg="#f8fdfa">
        <Container size="lg">
          <motion.div {...fadeInUp}>
            <Stack align="center" gap="md" mb={80} ta="center">
              <Badge variant="outline" color="green" size="lg" radius="sm">Benefits</Badge>
              <Title order={2} style={{ fontSize: rem(42), fontWeight: 800 }}>What You Get</Title>
              <Text c="dimmed" size="lg" style={{ maxWidth: 600 }}>
                Unlock exclusive tools and features designed to help your livestock business thrive in the digital age.
              </Text>
            </Stack>
          </motion.div>

          <Grid gutter={60} align="center">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Paper radius="32px" style={{ overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
                  <Image
                    src="/images/animals/chicken_1.jpg"
                    alt="Chickens on a farm"
                    w="100%"
                    h="auto"
                  />
                </Paper>
              </motion.div>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <Stack gap="xl">
                  {[
                    { icon: IconShieldCheck, title: 'Become Verified', text: 'Gain trust with our official verification badge on your profile.' },
                    { icon: IconDeviceLaptop, title: 'Digital Storefront', text: 'Get a professional mini-website/online store for your business.' },
                    { icon: IconGift, title: 'Monthly Promotion', text: 'One free monthly product promotion to boost your visibility.' },
                    { icon: IconChartBar, title: 'Advanced Analytics', text: 'Access detailed insights and sales features to grow your business.' },
                  ].map((item, idx) => (
                    <motion.div key={idx} variants={fadeInUp}>
                      <Group gap="lg" align="flex-start">
                        <ThemeIcon color="green.7" size={50} radius="xl" variant="light">
                          <item.icon size={26} />
                        </ThemeIcon>
                        <Box style={{ flex: 1 }}>
                          <Text fw={700} size="lg" mb={4}>{item.title}</Text>
                          <Text c="gray.6" size="md">{item.text}</Text>
                        </Box>
                      </Group>
                    </motion.div>
                  ))}

                  <motion.div variants={fadeInUp}>
                    <Paper 
                      p="xl" 
                      radius="24px" 
                      withBorder 
                      mt="xl"
                      style={{ 
                        backgroundColor: 'white',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                        borderLeft: '4px solid #006838'
                      }}
                    >
                      <Stack gap="md">
                        <Group>
                          <Avatar
                            size="lg"
                            alt="Company logo"
                            src="/images/avatar/vendor_1.jpg"
                            style={{ border: '2px solid #f1f3f5' }}
                          />
                          <Box>
                            <Text fw={700} size="md">Grace Horizon Foods Limited</Text>
                            <Group gap={4}>
                              {[...Array(5)].map((_, i) => (
                                <IconTrophy key={i} size={14} color="#fab005" fill="#fab005" />
                              ))}
                            </Group>
                          </Box>
                        </Group>
                        <Text fz={15} c="gray.7" style={{ fontStyle: 'italic', lineHeight: 1.6 }}>
                          "Thanks to Livestocx, my poultry business now has a professional online
                          presence. The platform's features are top-notch, and the ease of setting up a
                          custom store has saved me so much time."
                        </Text>
                      </Stack>
                    </Paper>
                  </motion.div>
                </Stack>
              </motion.div>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* 3. COMPARISON SECTION */}
      <Box py={120}>
        <Container size="lg">
          <motion.div {...fadeInUp}>
            <Stack align="center" gap="md" mb={80} ta="center">
              <Badge variant="filled" color="blue" size="lg" radius="sm">Value Comparison</Badge>
              <Title order={2} style={{ fontSize: rem(38), fontWeight: 800 }}>Why Choose Us?</Title>
              <Text c="dimmed" size="lg" style={{ maxWidth: 650 }}>
                See how Livestocx compares to building and maintaining your own custom business infrastructure.
              </Text>
            </Stack>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Paper radius="32px" withBorder style={{ overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.08)' }}>
              <ScrollArea>
                <Table 
                  verticalSpacing="lg" 
                  horizontalSpacing="xl" 
                  highlightOnHover
                  style={{ minWidth: 800 }}
                >
                  <Table.Thead bg="gray.0">
                    <Table.Tr>
                      <Table.Th style={{ width: 40 }}></Table.Th>
                      <Table.Th><Text fw={700} c="gray.7">Feature</Text></Table.Th>
                      <Table.Th><Text fw={700} c="gray.7">Custom Website</Text></Table.Th>
                      <Table.Th bg="green.0"><Text fw={700} c="green.9">Livestocx Platform</Text></Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {appFeatures.map((element, index) => (
                      <Table.Tr key={element.feature}>
                        <Table.Td>
                          <ThemeIcon variant="light" color="gray" size="sm" radius="xl">
                            <Text size="xs" fw={700}>{index + 1}</Text>
                          </ThemeIcon>
                        </Table.Td>
                        <Table.Td>
                          <Text fw={600} size="sm">{element.feature}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Flex align="center" gap={10}>
                            <IconX color="#fa5252" size={18} stroke={3} /> 
                            <Text size="sm" c="gray.7">{element.custom.text}</Text>
                          </Flex>
                        </Table.Td>
                        <Table.Td bg="green.0">
                          <Flex align="center" gap={10}>
                            <ThemeIcon color="green" size="sm" radius="xl">
                              <IconCheck size={12} stroke={4} />
                            </ThemeIcon>
                            <Text size="sm" fw={600} c="green.9">{element.livestocx.text}</Text>
                          </Flex>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            </Paper>
          </motion.div>
        </Container>
      </Box>

      {/* 4. PRICING SECTION */}
      <Box 
        py={120} 
        bg="#0A1711" 
        pos="relative"
        style={{
          borderTopLeftRadius: rem(80),
          borderTopRightRadius: rem(80),
        }}
      >
        <Container size="xl">
          <motion.div {...fadeInUp}>
            <Stack align="center" gap="md" mb={80} ta="center">
              <Badge variant="outline" color="green.4" size="lg" radius="sm">Pricing</Badge>
              <Title order={2} c="white" style={{ fontSize: rem(42), fontWeight: 800 }}>Choose Your Plan</Title>
              <Text c="gray.4" size="lg" style={{ maxWidth: 600 }}>
                Simple, transparent pricing to help you scale your operations. No hidden fees.
              </Text>
            </Stack>
          </motion.div>

          <Flex 
            justify="center" 
            align="stretch" 
            gap={40} 
            direction={{ base: 'column', md: 'row' }}
            ref={subscriptionPlansRef}
          >
            {premiumSubscriptionPlans.map((plan, idx) => (
              <motion.div 
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', margin: '0 auto' }}
              >
                <PremiumSubscriptionPlanCard
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
              </motion.div>
            ))}
          </Flex>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Stack align="center" mt={80}>
              <Text c="gray.5" size="sm">Need a custom enterprise solution?</Text>
              <Button 
                variant="subtle" 
                color="green.4" 
                rightSection={<IconArrowRight size={16} />}
                onClick={() => router.push('/contact-us')}
              >
                Contact our sales team
              </Button>
            </Stack>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Business;
