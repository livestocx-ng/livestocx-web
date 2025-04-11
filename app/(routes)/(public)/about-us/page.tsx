'use client';

import Image from 'next/image';
import { platformFeatures, teamMembers } from '@/core/utilities';
import { IconBrandLinkedin, IconWallet } from '@tabler/icons-react';
import { Anchor, Box, Card, Flex, Group, Paper, Stack, Text, Title } from '@mantine/core';

const AboutUs = () => {
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
        About Us
      </Title>
      <Stack gap={50}>
        <Box px={20}>
          <Text fz={{ base: 14, sm: 14, md: 16 }}>
            Livestocx is an AI-powered livestock marketplace connecting small-holder livestock
            farmers directly to sellers, evading middlemen and managing all their logistics while
            reducing trade inefficiencies, low customer reach, unsustainable transport services, and
            hence losses. Our platform provides a centralized, transparent, and efficient
            marketplace where local livestock farmers connect with buyers from anywhere around
            Nigeria, carry out transactions, and coordinate logistics.
          </Text>
        </Box>
        <Flex
          w="100%"
          py={30}
          gap={50}
          direction={{ base: 'column', sm: 'column', md: 'row' }}
          justify="center"
          align="center"
          style={{ backgroundColor: '#D0F8E6' }}
        >
          <Paper
            c="white"
            shadow="lg"
            radius={20}
            w={{ base: 300, sm: 300, md: 350 }}
            h={230}
            p={20}
            style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}
          >
            <IconWallet color="black" />
            <Title order={4} c="black">
              Earn money in a few clicks
            </Title>
            <Text c="black" fz={14}>
              Our platform provides a centralized, transparent, and efficient marketplace where
              local livestock farmers connect with buyers from anywhere around Nigeria, carry out
              transactions, and coordinate logistics.
            </Text>
          </Paper>

          <Image
            width={250}
            height={200}
            src="/images/image_about_art_1.png"
            alt=""
            objectFit="cover"
          />
        </Flex>

        <Box>
          <Flex justify="center" direction="column" align="center" w="100%" mb={20} px={20}>
            <Title order={3}>Key Features</Title>
            <Text fz={16} c="black" ta="center">
              We have the following key features to support local, small-holder livestock keepers
            </Text>
          </Flex>

          <Box>
            <Flex
              wrap="wrap"
              gap="lg"
              justify="center"
              // align="stretch"
              px="md"
              py="xl"
            >
              {/* <Grid > */}
              {platformFeatures.map((feature) => (
                // <Grid.Col key={feature.title} span={{ base: 12, sm: 6 }}>
                <Card
                  shadow="sm"
                  radius="md"
                  padding="lg"
                  withBorder
                  key={feature.title}
                  w={{ base: '100%', sm: '100%', md: 500 }}
                >
                  <Group align="flex-start" mb="md">
                    <feature.icon size={32} color="orange" />
                  </Group>
                  <Title order={4} c="primary" mb={10}>
                    {feature.title}
                  </Title>
                  <Text size="sm" c="black" lh={2}>
                    {feature.description}
                  </Text>
                </Card>
                // </Grid.Col>
              ))}
              {/* </Grid> */}
            </Flex>
          </Box>
        </Box>

        <Box>
          <Flex
            py={30}
            gap={50}
            // px={20}
            direction={{ base: 'column', sm: 'column', md: 'row' }}
            justify="center"
            align="center"
            style={{ backgroundColor: '#0EBE52' }}
          >
            <Text c="black" fz={{ base: 14, sm: 14, md: 16 }} pl={20}>
              Our platform provides a centralized, transparent, and efficient marketplace where
              local livestock farmers connect with buyers from anywhere around Nigeria, carry out
              transactions, and coordinate logistics.
            </Text>

            <Image
              width={350}
              height={250}
              src="/images/image_about_art_3.svg"
              alt=""
              style={{ paddingRight: '20px' }}
              objectFit="cover"
            />
          </Flex>

          <Box
            py={30}
            w="100%"
            px={{ base: 20, sm: 20, md: 100 }}
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage: 'url("/images/image_about_art_4.png")', // Replace with actual path
            }}
          >
            <Flex justify="space-between">
              <Stack gap="xl" w="100%">
                <Paper
                  p={{ base: 20, sm: 20, md: 'lg' }}
                  radius="md"
                  w={{ base: '100%', sm: '100%', md: '50%' }}
                  style={{
                    backdropFilter: 'blur(8px)', // <-- adds the blur effect
                    WebkitBackdropFilter: 'blur(8px)', // for Safari support
                    border: `1px solid primary`,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <Title order={4} c="orange" mb="sm">
                    Our Vision
                  </Title>
                  <Text c="white" size="sm">
                    Our grand vision for Livestocx is to become the go-to livestock marketplace
                    across Africa, transforming the livestock industry by connecting over 50 million
                    small-holder farmers directly to sellers. In 5–10 years, we aim to have expanded
                    our reach continent-wide, facilitating 10 million monthly sustainable and
                    efficient livestock trade while significantly impacting the livelihoods of
                    farmers.
                  </Text>
                </Paper>

                <Paper
                  radius="md"
                  p={{ base: 20, sm: 20, md: 'lg' }}
                  w={{ base: '100%', sm: '100%', md: '50%' }}
                  style={{
                    backdropFilter: 'blur(8px)', // <-- adds the blur effect
                    WebkitBackdropFilter: 'blur(8px)', // for Safari support
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    border: `1px solid primary`,
                  }}
                >
                  <Title order={4} c="orange" mb="sm">
                    Our Mission
                  </Title>
                  <Text c="white" size="sm">
                    We are on a mission to revolutionize the livestock industry across Africa. Our
                    mission is to empower small-holder farmers by connecting them directly to
                    sellers, eliminating inefficiencies and middlemen. We leverage AI and innovative
                    technologies to provide a transparent and sustainable marketplace, fostering
                    economic growth, environmental responsibility, and community development.
                    Through our commitment to inclusivity and customer-centric practices, we aim to
                    create a lasting positive impact and contribute to the establishment of a more
                    resilient and prosperous agricultural ecosystem in Africa.
                  </Text>
                </Paper>
              </Stack>
            </Flex>
          </Box>
        </Box>

        <Box py={30}>
          <Title order={2} mb="xl" ta="center">
            Meet the Team
          </Title>
          <Flex
            wrap="wrap"
            gap="lg"
            justify="center"
            // align="stretch"
            px="md"
            py="xl"
          >
            {teamMembers.map((member) => (
              <Card
                withBorder
                shadow="lg"
                radius="md"
                padding="lg"
                key={member.name}
                w={{ base: '100%', sm: '100%', md: 500 }}
              >
                <Flex direction={{ base: 'column', sm: 'row' }} justify="space-between" gap="lg">
                  <Image
                    alt={member.name}
                    src={member.image}
                    width={150}
                    height={150}
                    objectFit="cover"
                  />
                  <Stack gap="xs">
                    <Title order={5} c="primary">
                      {member.name}
                    </Title>
                    <Text fw={500}>{member.role}</Text>
                    <Text size="sm" c="dimmed">
                      {member.bio}
                    </Text>
                    <Anchor href={member.linkedin} target="_blank" rel="noopener">
                      <IconBrandLinkedin color="primary" />
                    </Anchor>
                  </Stack>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
};

export default AboutUs;
