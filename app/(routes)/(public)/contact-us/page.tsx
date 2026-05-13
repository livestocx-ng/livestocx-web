'use client';

import React from 'react';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconLocation,
  IconMail,
  IconPhone,
  IconChevronDown
} from '@tabler/icons-react';
import {
  Accordion,
  Box,
  Button,
  Container,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  Badge,
  ThemeIcon,
  SimpleGrid,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import useContactUsMutation from '@/core/hooks/public/useContactUsMutation';
import { ContactUsDTO } from '@/core/sdk/account';
import { platformFaqs } from '@/core/utilities';
import { validateContactForm } from '@/core/validations/public.validations';

const ContactUs = () => {
  const { isPending, mutate } = useContactUsMutation();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const submitHandler = async (payload: ContactUsDTO) => {
    const message = validateContactForm(payload);

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

  const contactInfo = [
    { icon: IconPhone, label: 'Call Us', value: '+234 (0) 806 289 9590', color: 'blue' },
    { icon: IconMail, label: 'Email Support', value: 'support@livestocx.com', color: 'orange' },
    { icon: IconLocation, label: 'Our Office', value: 'Shimex Estate, Lugbe FCT, Nigeria', color: 'teal' },
  ];

  return (
    <Box bg="white" pb={100}>
      {/* 1. HERO SECTION */}
      <Box
        pos="relative"
        pt={{ base: 100, md: 160 }}
        pb={{ base: 80, md: 120 }}
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
              linear-gradient(#ffffff08 1px, transparent 1px),
              linear-gradient(90deg, #ffffff08 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center center',
            pointerEvents: 'none',
          }}
        />

        <Container size="xl" pos="relative">
          <Stack align="center" gap="xl" ta="center">
            <Badge 
              variant="outline" 
              size="lg" 
              radius="sm"
              styles={{
                root: {
                  backgroundColor: '#4ade8015',
                  border: '1px solid #4ade8040',
                  color: '#4ade80',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  letterSpacing: '1px'
                },
              }}
            >
              Get in Touch
            </Badge>
            
            <Title 
              order={1} 
              lh={1.1} 
              c="white"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, maxWidth: 800 }}
            >
              We're Here to Support Your <span style={{ color: '#4ade80' }}>Agricultural Journey</span>
            </Title>
            
            <Text size="xl" c="gray.4" style={{ maxWidth: 600, lineHeight: 1.6 }}>
              Have questions about our platform or need assistance with your livestock trade? Our team is ready to help.
            </Text>
          </Stack>
        </Container>
      </Box>

      <Container size="xl" mt={-60} pos="relative">
        <Grid gutter={40}>
          {/* 2. CONTACT INFO CARDS */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="lg">
              {contactInfo.map((info) => (
                <Paper key={info.label} p="xl" withBorder>
                  <Group align="flex-start">
                    <ThemeIcon size={48} radius="md" variant="light" color={info.color}>
                      <info.icon size={24} />
                    </ThemeIcon>
                    <Box style={{ flex: 1 }}>
                      <Text fw={700} size="lg" mb={4}>{info.label}</Text>
                      <Text c="dimmed" size="md">{info.value}</Text>
                    </Box>
                  </Group>
                </Paper>
              ))}

              {/* <Paper p="xl" radius="md" withBorder shadow="md" bg="primary.9">
                <Text fw={700} c="white" mb="md">Follow Our Community</Text>
                <Group gap="md">
                  {[IconBrandFacebook, IconBrandLinkedin, IconBrandInstagram].map((Icon, i) => (
                    <ThemeIcon key={i} size={40} radius="xl" variant="filled" color="primary.8" style={{ cursor: 'pointer' }}>
                      <Icon size={20} />
                    </ThemeIcon>
                  ))}
                </Group>
              </Paper> */}
            </Stack>
          </Grid.Col>

          {/* 3. CONTACT FORM */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper p={{ base: 'xl', md: 50 }} radius="md" withBorder shadow="xl">
              <Title order={2} mb="xs" style={{ fontSize: rem(32), fontWeight: 800 }}>Send Us a Message</Title>
              <Text c="dimmed" mb={40}>Fields marked with an asterisk (*) are required.</Text>

              <form onSubmit={form.onSubmit(submitHandler)}>
                <Stack gap="xl">
                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
                    <TextInput
                      label="Full Name"
                      placeholder="John Doe"
                      required
                      size="md"
                      {...form.getInputProps('name')}
                    />
                    <TextInput
                      label="Email Address"
                      placeholder="john@example.com"
                      required
                      size="md"
                      {...form.getInputProps('email')}
                    />
                  </SimpleGrid>

                  <TextInput
                    label="Subject"
                    placeholder="How can we help?"
                    required
                    size="md"
                    {...form.getInputProps('subject')}
                  />

                  <Textarea
                    label="Your Message"
                    placeholder="Tell us more about your inquiry..."
                    required
                    minRows={5}
                    size="md"
                    {...form.getInputProps('message')}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    radius="md"
                    loading={isPending}
                    style={{
                      height: rem(54),
                      fontSize: rem(18),
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    }}
                  >
                    Send Message
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Grid.Col>
        </Grid>

        {/* 4. FAQ SECTION */}
        <Box mt={120}>
          <Stack align="center" gap="sm" mb={60} ta="center">
            <Badge variant="filled" color="orange" radius="sm">Support Center</Badge>
            <Title order={2} style={{ fontSize: rem(40), fontWeight: 800 }}>Frequently Asked Questions</Title>
            <Text c="dimmed" size="lg" style={{ maxWidth: 600 }}>
              Quick answers to common questions about the Livestocx platform.
            </Text>
          </Stack>

          <Paper radius="md" withBorder p="md" mx={40}>
            <Accordion 
              variant="separated" 
              chevron={<IconChevronDown size={20} />}
              styles={{
                item: { border: 'none', backgroundColor: 'transparent' },
                control: { padding: rem(20), '&:hover': { backgroundColor: 'var(--mantine-color-gray-0)' } },
                panel: { padding: rem(20), color: 'var(--mantine-color-gray-7)' }
              }}
            >
              {platformFaqs.map((item) => (
                <Accordion.Item key={item.value} value={item.value}>
                  <Accordion.Control>
                    <Text fw={600} size="lg">{item.value}</Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text lh={1.7}>{item.description}</Text>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUs;
