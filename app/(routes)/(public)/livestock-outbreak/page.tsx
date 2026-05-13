'use client';
import { Box, Container, Image, Stack, Text, Title, Grid, Card, ThemeIcon, SimpleGrid, Badge, Group } from '@mantine/core';
import { IconBrain, IconUsersGroup, IconWorld, IconCheck } from '@tabler/icons-react';
import StoreLinksToggle from '@/public/icons/storeLinksToggle';

const LivestockOutbreakPage = () => {
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
                        Early Detection for Livestock Outbreaks
                    </Title>
                    <Text size="xl" c="white" opacity={0.9} style={{ maxWidth: 800, margin: '0 auto' }} lh={1.6}>
                        A mobile-first solution helping farmers identify animal health threats before they become widespread. Transforming everyday monitoring into a powerful early warning mechanism.
                    </Text>
                </Container>
            </Box>

            {/* Introduction Section */}
            <Container size="lg" py={80}>
                <Grid gutter={60} align="center">
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Title order={2} mb="lg" c="primary.9" fw={700}>
                            Proactive Daily Monitoring
                        </Title>
                        <Text size="md" c="dimmed" lh={1.8} mb="md">
                            Disease outbreaks can cripple livestock-dependent communities in a matter of days. The economic impact of losing even a portion of a herd cascades into food insecurity and lost income.
                        </Text>
                        <Text size="md" c="dimmed" lh={1.8} mb="xl">
                            At the core of our system is a digital tool that allows farmers to log daily observations—eating habits, energy levels, milk output, mobility, and temperature. When the system detects unusual patterns, it flags the animal for further observation or intervention.
                        </Text>
                        
                        <Stack gap="sm">
                            <Group gap="sm" wrap="nowrap">
                                <ThemeIcon color="primary.9" variant="light" radius="xl" size="sm"><IconCheck size={14} /></ThemeIcon>
                                <Text size="sm" fw={500}>Lightweight and intuitive interface</Text>
                            </Group>
                            <Group gap="sm" wrap="nowrap">
                                <ThemeIcon color="primary.9" variant="light" radius="xl" size="sm"><IconCheck size={14} /></ThemeIcon>
                                <Text size="sm" fw={500}>Prevents widespread transmission</Text>
                            </Group>
                            <Group gap="sm" wrap="nowrap">
                                <ThemeIcon color="primary.9" variant="light" radius="xl" size="sm"><IconCheck size={14} /></ThemeIcon>
                                <Text size="sm" fw={500}>Usable regardless of technical skill</Text>
                            </Group>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Box style={{ position: 'relative' }}>
                            <Image
                                src="/climate/chicken-flu.jpeg"
                                radius="lg"
                                style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                                alt="Livestocx - Early Detection for Livestock Outbreaks"
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
                                <Title order={3} c="primary.9" mb={5}>Real-Time</Title>
                                <Text size="sm" c="dimmed" fw={500}>Surveillance</Text>
                            </Box>
                        </Box>
                    </Grid.Col>
                </Grid>
            </Container>

            {/* Core Features Section */}
            <Box bg="gray.0" py={80}>
                <Container size="lg">
                    <Stack align="center" mb={50}>
                        <Badge variant="light" color="primary.9">System Capabilities</Badge>
                        <Title order={2} ta="center" c="primary.9" fw={700}>
                            Data-Backed, Community Enabled
                        </Title>
                        <Text c="dimmed" ta="center" style={{ maxWidth: 700 }}>
                            By bridging the gap between grassroots observations and institutional action, Livestocx builds a more responsive and integrated livestock health ecosystem.
                        </Text>
                    </Stack>

                    <SimpleGrid cols={{ base: 1, md: 3 }} spacing={30}>
                        <Card shadow="sm" padding="xl" radius="lg" withBorder>
                            <ThemeIcon size={60} radius="md" color="primary.9" variant="light" mb="xl">
                                <IconBrain size={30} />
                            </ThemeIcon>
                            <Title order={3} size="h4" mb="sm" fw={600}>AI-Driven Diagnostics</Title>
                            <Text size="sm" c="dimmed" lh={1.7}>
                                Using machine learning models, the platform matches reported symptoms with likely conditions. If multiple herders report similar symptoms, it correlates cases across space and time to generate potential outbreak alerts, reducing the time between symptom onset and containment.
                            </Text>
                        </Card>

                        <Card shadow="sm" padding="xl" radius="lg" withBorder>
                            <ThemeIcon size={60} radius="md" color="primary.9" variant="light" mb="xl">
                                <IconUsersGroup size={30} />
                            </ThemeIcon>
                            <Title order={3} size="h4" mb="sm" fw={600}>Participatory Design</Title>
                            <Text size="sm" c="dimmed" lh={1.7}>
                                Empowers farmers to serve as the first line of defense with easy-to-use symptom checkers, multilingual support, and voice-assisted logging. Community health clusters enable farmers to share reports, validate suspicions, and coordinate responses through peer-to-peer verification.
                            </Text>
                        </Card>

                        <Card shadow="sm" padding="xl" radius="lg" withBorder>
                            <ThemeIcon size={60} radius="md" color="primary.9" variant="light" mb="xl">
                                <IconWorld size={30} />
                            </ThemeIcon>
                            <Title order={3} size="h4" mb="sm" fw={600}>National Disease Control</Title>
                            <Text size="sm" c="dimmed" lh={1.7}>
                                Outbreak data contributes to national and continental efforts. Reports are anonymized, encrypted, and aggregated into regional dashboards. This near real-time overview helps inform vaccine stockpiling, emergency funding, and long-term policy development.
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
                        <Title order={2} ta="center" c="white" fw={700}>Join the Surveillance Network</Title>
                        <Text c="white" opacity={0.9} ta="center" style={{ maxWidth: 600 }} mb="md" size="lg">
                            Early detection is no longer optional—it is the frontline defense for rural resilience. Download the app today.
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

export default LivestockOutbreakPage;
