'use client';

import React from 'react';
import Image from 'next/image';
import { platformFeatures, teamMembers } from '@/core/utilities';
import { 
  IconBrandLinkedin, 
  IconTarget, 
  IconEye, 
  IconChevronRight 
} from '@tabler/icons-react';
import { 
  Box, 
  Container, 
  Title, 
  Text, 
  Stack, 
  Grid, 
  Paper, 
  Group, 
  Anchor, 
  Badge, 
  ThemeIcon, 
  Card, 
  SimpleGrid,
  rem
} from '@mantine/core';

const AboutUs = () => {
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
              Our Journey & Purpose
            </Badge>
            
            <Title 
              order={1} 
              lh={1.1} 
              c="white"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, maxWidth: 900 }}
            >
              Revolutionizing <span style={{ color: '#4ade80' }}>Livestock</span> Infrastructure Across Africa
            </Title>
            
            <Text size="xl" c="gray.4" style={{ maxWidth: 750, lineHeight: 1.6 }}>
              Livestocx is an AI-powered marketplace connecting over 50 million small-holder farmers directly to buyers, eliminating middlemen and building a resilient agricultural ecosystem.
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* 2. THE PROBLEM & SOLUTION (NARRATIVE) */}
      <Container size="xl" py={100}>
        <Grid gutter={80} align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="xl">
              <Title order={2} style={{ fontSize: rem(40), fontWeight: 800, lineHeight: 1.2 }}>
                Empowering Farmers, <br />
                <span style={{ color: '#006838' }}>Eliminating Trade Inefficiencies</span>
              </Title>
              <Text size="lg" c="gray.7" lh={1.8}>
                Traditional livestock trade in Nigeria has long been plagued by fragmented markets, excessive transaction costs, and unsustainable logistics. Small-holder farmers often struggle with limited customer reach and losses due to trade inefficiencies.
              </Text>
              <Text size="lg" c="gray.7" lh={1.8}>
                At Livestocx, we provide a centralized, transparent, and efficient digital platform. By leveraging AI and real-time data analytics, we ensure that local livestock farmers can connect with buyers anywhere, conduct secure transactions, and coordinate optimized logistics with unprecedented ease.
              </Text>
              
              <Group gap="sm" mt="md">
                <Badge variant="dot" color="primary" size="lg">Transparent Marketplace</Badge>
                <Badge variant="dot" color="primary" size="lg">AI-Powered Insights</Badge>
                <Badge variant="dot" color="primary" size="lg">Optimized Logistics</Badge>
              </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
             <Paper radius="32px" style={{ overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
               <Image 
                 src="/images/image_about_art_1.png" 
                 alt="Livestock farmers" 
                 width={800} 
                 height={600} 
                 style={{ width: '100%', height: 'auto', display: 'block' }}
               />
             </Paper>
          </Grid.Col>
        </Grid>
      </Container>

      {/* 3. MISSION & VISION (GLASSMORPHIC) */}
      <Box 
        py={120} 
        pos="relative"
        style={{
          backgroundImage: 'linear-gradient(rgba(10, 23, 17, 0.92), rgba(10, 23, 17, 0.92)), url("/images/image_about_art_4.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <Container size="xl">
          <Grid gutter={60}>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper
                p={40}
                radius="24px"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '100%'
                }}
              >
                <Stack gap="xl">
                  <ThemeIcon size={60} radius="xl" variant="filled" color="orange.6">
                    <IconTarget size={32} />
                  </ThemeIcon>
                  <Box>
                    <Title order={3} c="white" mb="md" style={{ fontSize: rem(28) }}>Our Mission</Title>
                    <Text size="lg" c="gray.3" lh={1.8}>
                      To revolutionize the livestock industry across Africa by empowering small-holder farmers. We leverage AI and innovative technologies to provide a transparent, sustainable marketplace that fosters economic growth, environmental responsibility, and community development.
                    </Text>
                  </Box>
                  <Group gap={8} c="orange.4" style={{ cursor: 'default' }}>
                    <Text fw={600}>Innovation First</Text>
                    <IconChevronRight size={16} />
                  </Group>
                </Stack>
              </Paper>
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper
                p={40}
                radius="24px"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '100%'
                }}
              >
                <Stack gap="xl">
                  <ThemeIcon size={60} radius="xl" variant="filled" color="orange.6">
                    <IconEye size={32} />
                  </ThemeIcon>
                  <Box>
                    <Title order={3} c="white" mb="md" style={{ fontSize: rem(28) }}>Our Vision</Title>
                    <Text size="lg" c="gray.3" lh={1.8}>
                      To become the leading livestock marketplace across Africa, facilitating 10 million monthly trades for 50 million farmers within the next decade. We aim to transform livelihoods and build a resilient agricultural ecosystem continent-wide.
                    </Text>
                  </Box>
                  <Group gap={8} c="orange.4" style={{ cursor: 'default' }}>
                    <Text fw={600}>Scaling Impact</Text>
                    <IconChevronRight size={16} />
                  </Group>
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* 4. KEY FEATURES SECTION */}
      <Box py={100} bg="#f8fdfa">
        <Container size="xl">
          <Stack align="center" gap="sm" mb={80} ta="center">
            <Badge variant="filled" color="primary" radius="sm">Our Strengths</Badge>
            <Title order={2} style={{ fontSize: rem(40), fontWeight: 800 }}>Purpose-Built Features</Title>
            <Text c="dimmed" size="lg" style={{ maxWidth: 650, lineHeight: 1.6 }}>
              Strategic modules designed to optimize the livestock agricultural value chain and maximize farmer profitability.
            </Text>
          </Stack>
          
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={40}>
            {platformFeatures.map((feature) => (
              <Card 
                key={feature.title} 
                p={40} 
                radius="20px" 
                withBorder 
                shadow="xs"
                styles={{
                  root: {
                    backgroundColor: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                      borderColor: 'var(--mantine-color-primary-3)'
                    }
                  }
                }}
              >
                <Group align="center" mb="xl">
                  <ThemeIcon size={56} radius="lg" variant="light" color="primary">
                    <feature.icon size={32} />
                  </ThemeIcon>
                  <Title order={4} c="primary.9" style={{ fontSize: rem(22) }}>{feature.title}</Title>
                </Group>
                <Text size="lg" c="gray.7" lh={1.8}>
                  {feature.description}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* 5. TEAM SECTION */}
      <Container size="xl" py={120}>
        <Stack align="center" gap="sm" mb={80} ta="center">
          <Badge variant="filled" color="primary" radius="sm">The Innovators</Badge>
          <Title order={2} style={{ fontSize: rem(40), fontWeight: 800 }}>Meet the Team</Title>
          <Text c="dimmed" size="lg" style={{ maxWidth: 650, lineHeight: 1.6 }}>
            A dedicated team of experts in sales, agriculture, technology, and design working together to redefine livestock trade.
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
          {teamMembers.map((member) => (
            <Paper 
              key={member.name} 
              p={30} 
              radius="24px" 
              withBorder 
              shadow="md"
              style={{
                backgroundColor: 'white',
                borderColor: '#f1f3f5'
              }}
            >
              <Grid gutter="xl" align="center">
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Box 
                    pos="relative" 
                    w={160} 
                    h={160} 
                    mx="auto"
                    style={{
                      borderRadius: '100%',
                      overflow: 'hidden',
                      border: '6px solid #f8f9fa',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                    }}
                  >
                    <Image
                      alt={member.name}
                      src={member.image}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 8 }}>
                  <Stack gap={8}>
                    <Group justify="space-between" align="center">
                      <Title order={4} c="primary.9" style={{ fontSize: rem(20) }}>{member.name}</Title>
                      <Anchor href={member.linkedin} target="_blank" rel="noopener">
                        <ThemeIcon size={32} radius="xl" variant="light" color="blue">
                          <IconBrandLinkedin size={20} />
                        </ThemeIcon>
                      </Anchor>
                    </Group>
                    <Text fw={700} size="sm" color="orange.7" tt="uppercase">
                      {member.role}
                    </Text>
                    <Text size="md" c="gray.7" mt="sm" lh={1.6}>
                      {member.bio}
                    </Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default AboutUs;
