'use client';

import { Box, Container, Image, Stack, Text, Title, Grid, Card, ThemeIcon, SimpleGrid, Badge, Group } from '@mantine/core';
import { IconStethoscope, IconLeaf, IconChartBar, IconCheck } from '@tabler/icons-react';
import StoreLinksToggle from '@/public/icons/storeLinksToggle';

const DigitalAdvisorPage = () => {
    return (
        <main>
            {/* Hero Section */}
            <Box
                style={{
                    background: 'linear-gradient(135deg, #006838 0%, #004a28 100%)',
                    padding: '80px 0',
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                <Container size="lg">
                    <Badge size="lg" variant="white" color="primary" mb="xl">
                        Livestocx Platform
                    </Badge>
                    <Title order={1} size={48} c="white" mb="md" fw={800}>
                        Digital Advisory for Animal Health
                    </Title>
                    <Text size="xl" c="white" opacity={0.9} style={{ maxWidth: 800, margin: '0 auto' }} lh={1.6}>
                        Combining veterinary knowledge, climate insights, nutritional advice, and market access strategies into a single, user-friendly interface for modern livestock management.
                    </Text>
                </Container>
            </Box>

            {/* Introduction Section */}
            <Container size="lg" py={80}>
                <Grid gutter={60} align="center">
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Title order={2} mb="lg" c="primary.9" fw={700}>
                            Empowering Rural Economies
                        </Title>
                        <Text size="md" c="dimmed" lh={1.8} mb="md">
                            Livestock health is not just a biological concern—it is the lifeblood of rural economies and food systems. In Africa, smallholder farmers often lack consistent access to veterinary services and scientific guidance, making them vulnerable to preventable animal health issues.
                        </Text>
                        <Text size="md" c="dimmed" lh={1.8} mb="xl">
                            Recognizing this, Livestocx provides localized and timely guidance. Whether a herder in the Sahel managing cattle or a poultry farmer in Eastern Nigeria, the platform adapts its recommendations based on location, species, age, health history, and season.
                        </Text>
                        
                        <Stack gap="sm">
                            <Group gap="sm" wrap="nowrap">
                                <ThemeIcon color="primary.9" variant="light" radius="xl" size="sm"><IconCheck size={14} /></ThemeIcon>
                                <Text size="sm" fw={500}>Culturally relevant, simplified advice</Text>
                            </Group>
                            <Group gap="sm" wrap="nowrap">
                                <ThemeIcon color="primary.9" variant="light" radius="xl" size="sm"><IconCheck size={14} /></ThemeIcon>
                                <Text size="sm" fw={500}>Delivered via App, USSD, or SMS</Text>
                            </Group>
                            <Group gap="sm" wrap="nowrap">
                                <ThemeIcon color="primary.9" variant="light" radius="xl" size="sm"><IconCheck size={14} /></ThemeIcon>
                                <Text size="sm" fw={500}>Eliminates trial and error in livestock care</Text>
                            </Group>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Box style={{ position: 'relative' }}>
                            <Image
                                src="/climate/livestock-health.jpg"
                                radius="lg"
                                style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                                alt="Livestocx - Digital Advisor"
                            />
                            <Box 
                                style={{ 
                                    position: 'absolute', 
                                    bottom: -20, 
                                    left: -20, 
                                    background: 'white', 
                                    padding: '20px', 
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                }}
                            >
                                <Title order={3} c="primary.9" mb={5}>100%</Title>
                                <Text size="sm" c="dimmed" fw={500}>Expert-Backed</Text>
                            </Box>
                        </Box>
                    </Grid.Col>
                </Grid>
            </Container>

            {/* Core Features Section */}
            <Box bg="gray.0" py={80}>
                <Container size="lg">
                    <Stack align="center" mb={50}>
                        <Badge variant="light" color="primary.9">Our Ecosystem</Badge>
                        <Title order={2} ta="center" c="primary.9" fw={700}>
                            A Holistic Support System
                        </Title>
                        <Text c="dimmed" ta="center" style={{ maxWidth: 700 }}>
                            We bring together health, nutrition, and market knowledge to create long-term impact on the agricultural economy.
                        </Text>
                    </Stack>

                    <SimpleGrid cols={{ base: 1, md: 3 }} spacing={30}>
                        <Card shadow="sm" padding="xl" radius="lg" withBorder>
                            <ThemeIcon size={60} radius="md" color="primary.9" variant="light" mb="xl">
                                <IconStethoscope size={30} />
                            </ThemeIcon>
                            <Title order={3} size="h4" mb="sm" fw={600}>Disease Identification</Title>
                            <Text size="sm" c="dimmed" lh={1.7}>
                                Describe symptoms and instantly receive possible diagnoses and recommended first actions. The platform uses AI-powered logic trees and allows farmers to send images or voice recordings for veterinary review. We also send proactive health alerts for vaccinations and deworming.
                            </Text>
                        </Card>

                        <Card shadow="sm" padding="xl" radius="lg" withBorder>
                            <ThemeIcon size={60} radius="md" color="primary.9" variant="light" mb="xl">
                                <IconLeaf size={30} />
                            </ThemeIcon>
                            <Title order={3} size="h4" mb="sm" fw={600}>Feed Management</Title>
                            <Text size="sm" c="dimmed" lh={1.7}>
                                Analyze local data to recommend optimized feeding strategies based on regional climate, forage types, and seasonal trends. Consistent nutritional guidance results in healthier animals, better reproductive cycles, and sustainable resource usage per cost spent.
                            </Text>
                        </Card>

                        <Card shadow="sm" padding="xl" radius="lg" withBorder>
                            <ThemeIcon size={60} radius="md" color="primary.9" variant="light" mb="xl">
                                <IconChartBar size={30} />
                            </ThemeIcon>
                            <Title order={3} size="h4" mb="sm" fw={600}>Market Access</Title>
                            <Text size="sm" c="dimmed" lh={1.7}>
                                Receive regular updates on livestock prices, demand trends, and buyer opportunities. Our built-in digital marketplace connects verified sellers directly with trusted buyers, reducing dependency on middlemen and improving income security.
                            </Text>
                        </Card>
                    </SimpleGrid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Container size="lg" py={80}>
                <Card 
                    radius="xl" 
                    p={{ base: 'xl', md: 60 }} 
                    style={{ 
                        background: 'linear-gradient(135deg, #006838 0%, #004a28 100%)',
                        color: 'white'
                    }}
                >
                    <Stack align="center" gap="lg">
                        <Title order={2} ta="center" c="white" fw={700}>Ready to step into the future of farming?</Title>
                        <Text c="white" opacity={0.9} ta="center" style={{ maxWidth: 600 }} mb="md" size="lg">
                            Get started today with the Livestocx Digital Advisory Platform and transform your livestock management.
                        </Text>
                        <Box 
                            style={{ 
                                backgroundColor: 'white', 
                                padding: '15px 30px', 
                                borderRadius: '16px',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                            }}
                        >
                            <StoreLinksToggle />
                        </Box>
                    </Stack>
                </Card>
            </Container>
        </main>
    );
};

export default DigitalAdvisorPage;
