'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Stack, 
  Text, 
  Title, 
  Paper, 
  Badge, 
  Divider, 
  Anchor,
  rem 
} from '@mantine/core';

const TermsOfService = () => {
  return (
    <Box bg="gray.0" pb={100}>
      {/* 1. HERO SECTION */}
      <Box
        pos="relative"
        pt={{ base: 100, md: 140 }}
        pb={{ base: 60, md: 100 }}
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

        <Container size="lg" pos="relative">
          <Stack align="center" gap="md" ta="center">
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
                },
              }}
            >
              Legal Agreement
            </Badge>
            
            <Title 
              order={1} 
              c="white"
              style={{ fontSize: rem(48), fontWeight: 800 }}
            >
              Terms of Service
            </Title>
            
            <Text c="gray.4" fw={500}>
              Last Updated: 15th May, 2024
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* 2. CONTENT SECTION */}
      <Container size="md" mt={-40} pos="relative">
        <Paper p={{ base: 24, md: 50 }} radius={0} shadow="lg" withBorder>
          <Stack gap={40}>
            <Box>
              <Text fz="md" lh={1.8} c="gray.8">
                These terms and conditions (“Agreement”) outline the fundamental terms and regulations
                governing your utilization of the <strong>livestocx.com.ng</strong>, <strong>livestocx.com</strong> website (“Website” or
                “Service”) and any associated products and services which includes, but not limited to
                <strong>Livestocx App</strong> (“Services”). This Agreement establishes a legally binding relationship
                between you (“User”, “you”, or “your”) and the operator of this Website (“Operator”,
                “we”, “us”, or “our”).
              </Text>
              <Text fz="md" lh={1.8} c="gray.8" mt="md">
                Should you be entering into this agreement on behalf of a
                business or other legal entity, you confirm that you possess the authorization to
                legally bind said entity to this agreement. If you lack the necessary authority
                or disagree with the stipulations of this agreement, you must decline acceptance and
                refrain from accessing or using the Website and Services. By accessing and
                employing the Website and Services, you acknowledge that you have read, understood,
                and consented to abide by the conditions of this Agreement.
              </Text>
            </Box>

            <Divider variant="dashed" />

            {/* Section 1 */}
            <Box>
              <Title order={3} mb="lg" c="primary.9">1. Privacy and Data Protection</Title>
              <Text fz="md" lh={1.8}>
                We are committed to protecting your privacy and handling your personal information in accordance with our Privacy Policy. By using the website, you consent to the collection, use, and disclosure of your data as described in the Privacy Policy.
              </Text>
            </Box>

            {/* Section 2 */}
            <Box>
              <Title order={3} mb="lg" c="primary.9">2. Intellectual Property Rights</Title>
              <Text fz="md" lh={1.8}>
                “Intellectual Property Rights” encompass all current and future entitlements granted through legal statutes, common law, or equity, pertaining to copyrights and related rights, trademarks, designs, patents, inventions, goodwill, and the ability to take legal action against passing off. This Agreement does not transfer any intellectual property owned by the Operator or third parties to you. The rights, titles, and interests in such property will exclusively remain with the Operator. The trademarks, service marks, graphics, and logos used in conjunction with the Website and Services are trademarks or registered trademarks of the Operator or its licensors.
              </Text>
            </Box>

            {/* Section 3 */}
            <Box>
              <Title order={3} mb="lg" c="primary.9">3. Limitation of Liability</Title>
              <Text fz="md" lh={1.8}>
                Livestocx Agritech Solutions LTD shall not be held liable for any damages, injuries, or losses arising from your use of the Website or Services, or reliance on any information provided through the Website or Services. To the broadest extent allowed by the law applicable, under no circumstances shall Livestocx Agritech Solutions LTD, along with its affiliates, directors, officers, employees, agents, or licensors, be held accountable for any consequential, indirect, incidental, punitive, special, or cover damages regardless of the cause.
              </Text>
            </Box>

            {/* Section 4 */}
            <Box>
              <Title order={3} mb="lg" c="primary.9">4. Modification and Termination</Title>
              <Text fz="md" lh={1.8}>
                Livestocx Agritech Solutions LTD reserves the right to modify, suspend, or terminate the Website or Services at any time, with or without notice. We may also update these Terms to reflect any changes in our services or legal requirements.
              </Text>
            </Box>

            {/* Section 5 */}
            <Box>
              <Title order={3} mb="lg" c="primary.9">5. User-Generated Material</Title>
              <Text fz="md" lh={1.8}>
                We do not possess any data, information, or materials (collectively referred to as “Content”) that you provide while utilizing the Service. The accuracy, quality, integrity, legality, reliability, appropriateness, and ownership or rights to use all submitted Content rest solely with you. By using our Website or Services, you grant us the permission to access, copy, distribute, store, transmit, reformat, display, and perform the Content associated with your user account, strictly for the purpose of delivering value to you.
              </Text>
            </Box>

            {/* Section 6 */}
            <Box>
              <Title order={3} mb="lg" c="primary.9">6. Indemnity</Title>
              <Text fz="md" lh={1.8}>
                You agree to indemnify and hold Livestocx Agritech Solutions LTD and its affiliates, directors, officers, employees, agents, and licensors harmless from and against any liabilities, losses, costs, or damages including reasonable attorney’s fees spent in connection with or arising from any third-party allegations, claims, disputes, or demands asserted against any of them as a result of or relating to your Content and use of the Website or willful misconduct.
              </Text>
            </Box>

            {/* Section 7 */}
            <Box>
              <Title order={3} mb="lg" c="primary.9">7. Governing Law and Jurisdiction</Title>
              <Text fz="md" lh={1.8}>
                These Terms are governed by and construed in accordance with the laws of Nigeria. Any dispute arising from or relating to these Terms shall be subject to the exclusive jurisdiction of the Nigerian courts.
              </Text>
            </Box>

            <Divider />

            <Box ta="center" pt="md">
              <Text fw={600}>
                Please read these Terms carefully before using the Website. By using the Website, you signify your acceptance of these Terms.
              </Text>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default TermsOfService;
