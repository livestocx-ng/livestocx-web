'use client';
import StoreLinksToggle from '@/public/icons/storeLinksToggle';
import { Box, Container, Image, Stack, Text, Title, Grid, ThemeIcon, Badge } from '@mantine/core';
import { IconActivity, IconVaccine, IconDeviceMobile } from '@tabler/icons-react';

const VeterinaryResponsePage = () => {
    return (
        <main>
            {/* Distinct Asymmetrical Hero Section */}
            <Box bg="primary.9" py={{ base: 60, md: 100 }} style={{ position: 'relative', overflow: 'hidden' }}>
                <Container size="lg" style={{ position: 'relative', zIndex: 2 }}>
                    <Grid align="center" gutter={60}>
                        <Grid.Col span={{ base: 12, md: 7 }}>
                            <Badge variant="light" color="white" size="lg" mb="lg">
                                Rapid. Coordinated. Data-Informed.
                            </Badge>
                            <Title order={1} size={54} c="white" mb="md" fw={900} lh={1.2}>
                                Veterinary Response Systems
                            </Title>
                            <Text size="xl" c="gray.3" lh={1.6} mb="xl" style={{ maxWidth: 600 }}>
                                A new paradigm in rural veterinary service delivery. Connecting farmers directly with a network of mobile veterinary professionals for real-time triage and emergency response.
                            </Text>
                            <Box bg="white" p="xs" style={{ display: 'inline-block', borderRadius: '12px' }}>
                                <StoreLinksToggle />
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 5 }}>
                            <Image
                                src="/climate/sick-goat.jpg"
                                radius="lg"
                                alt="Emergency Vet Response"
                                style={{
                                    boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
                                    transform: 'rotate(3deg)',
                                    border: '4px solid white'
                                }}
                            />
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            {/* The Problem & Solution Statement */}
            <Container size="lg" py={80}>
                <Title order={2} ta="center" c="primary.9" mb="xl">Bridging the Gap in Pastoral Regions</Title>
                <Text size="lg" ta="center" c="dimmed" style={{ maxWidth: 800, margin: '0 auto' }} lh={1.8}>
                    In many rural areas, the absence of reliable veterinary services means even minor health problems can escalate into devastating outbreaks. Farmers face long wait times, high costs, and limited access to qualified veterinarians.
                </Text>
                <Text size="lg" ta="center" c="dimmed" style={{ maxWidth: 800, margin: '0 auto' }} lh={1.8} mt="md">
                    Our robust Veterinary Response System categorizes urgency and routes requests via GPS to the nearest available vet. By the time help arrives, initial diagnostics are already in place.
                </Text>
            </Container>

            {/* Alternating Feature Layout */}
            <Box bg="gray.0" py={80}>
                <Container size="lg">
                    <Stack gap={80}>
                        {/* Feature 1: Disease Tracking */}
                        <Grid align="center" gutter={50}>
                            <Grid.Col span={{ base: 12, md: 5 }}>
                                <ThemeIcon size={80} radius="xl" variant="light" color="primary.9">
                                    <IconActivity size={40} />
                                </ThemeIcon>
                                <Title order={3} size="h2" mt="lg" mb="sm" c="primary.9">Real-Time Disease Tracking</Title>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 7 }}>
                                <Text size="md" c="dimmed" lh={1.8}>
                                    Every report of animal illness or death is logged into a centralized dashboard monitored by veterinarians, epidemiologists, and government health agencies. This data is used to generate dynamic heatmaps, track emerging hotspots, and identify abnormal disease clusters before they spiral out of control.
                                </Text>
                                <Text size="md" c="dimmed" lh={1.8} mt="sm">
                                    Importantly, the system works offline as well—allowing farmers to submit data even in areas without network coverage. This early intelligence is vital for stopping contagious diseases like anthrax, brucellosis, or foot-and-mouth disease from spreading.
                                </Text>
                            </Grid.Col>
                        </Grid>

                        {/* Feature 2: Vaccination Campaigns */}
                        <Grid align="center" gutter={50}>
                            <Grid.Col span={{ base: 12, md: 7 }} order={{ base: 2, md: 1 }}>
                                <Text size="md" c="dimmed" lh={1.8}>
                                    Livestock vaccination, though highly cost-effective, is often poorly organized in rural areas. Livestocx addresses these gaps by using its platform to pre-register animals, send automated reminders, and coordinate with certified veterinary officers for on-site administration.
                                </Text>
                                <Text size="md" c="dimmed" lh={1.8} mt="sm">
                                    Each vaccination event is digitally logged, creating a verified immunization history for every animal—increasing their market value by proving disease-free status. We even track nomadic populations to ensure traveling herds are not excluded.
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 5 }} order={{ base: 1, md: 2 }}>
                                <ThemeIcon size={80} radius="xl" variant="light" color="primary.9">
                                    <IconVaccine size={40} />
                                </ThemeIcon>
                                <Title order={3} size="h2" mt="lg" mb="sm" c="primary.9">Streamlined Vaccination Campaigns</Title>
                            </Grid.Col>
                        </Grid>

                        {/* Feature 3: Remote Consultation */}
                        <Grid align="center" gutter={50}>
                            <Grid.Col span={{ base: 12, md: 5 }}>
                                <ThemeIcon size={80} radius="xl" variant="light" color="primary.9">
                                    <IconDeviceMobile size={40} />
                                </ThemeIcon>
                                <Title order={3} size="h2" mt="lg" mb="sm" c="primary.9">Remote Consultation Layer</Title>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 7 }}>
                                <Text size="md" c="dimmed" lh={1.8}>
                                    Not every animal illness requires a physical visit, and not every farmer can afford one. That’s why the platform offers a digital helpline staffed by veterinary professionals. Farmers can initiate a consultation via chat, audio, or short video clips.
                                </Text>
                                <Text size="md" c="dimmed" lh={1.8} mt="sm">
                                    This supports emergency interventions—such as what to do if an animal is choking, miscarrying, or suffering from poisoning—before a vet can arrive. The system ensures that veterinary support is not a privilege for the few but a right accessible to all.
                                </Text>
                            </Grid.Col>
                        </Grid>
                    </Stack>
                </Container>
            </Box>

            {/* Footer CTA */}
            <Container size="lg" py={80} ta="center">
                <Title order={2} c="primary.9" mb="sm">Ready to protect your herd?</Title>
                <Text c="dimmed" mb="xl">Download the app today and get rapid veterinary assistance.</Text>
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <StoreLinksToggle />
                </Box>
            </Container>
        </main>
    );
};

export default VeterinaryResponsePage;
