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
  List, 
  ThemeIcon,
  Anchor,
  Grid,
  Group,
  rem 
} from '@mantine/core';
import { IconShieldCheck, IconMail, IconGavel } from '@tabler/icons-react';

const PrivacyPolicy = () => {
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
              Legal Document
            </Badge>
            
            <Title 
              order={1} 
              c="white"
              style={{ fontSize: rem(48), fontWeight: 800 }}
            >
              Privacy Policy
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
                This Privacy Policy (“Policy”) outlines how Livestock Agritech Solutions LTD (“we,”
                “us,” or “our”) collects, uses, discloses, and protects personal data in accordance with
                the provisions of <strong>The Nigeria Data Protection Act 2023 (“Act”)</strong>. This Policy describes
                the type of data we may collect from you (“you”, “user”, “your”) on the <strong>livestocx.com.ng</strong>
                or <strong>livestocx.com</strong> (“Website”) and the <strong>Livestocx App</strong> (“App”). Please read this Policy
                carefully to understand our practices regarding your personal data and how we will treat it.
              </Text>
            </Box>

            <Divider variant="dashed" />

            {/* Section 1 */}
            <Box>
              <Title order={3} mb="lg" c="primary.9">1. Definitions</Title>
              <Stack gap="md">
                <Text fz="md" lh={1.6}>
                  <Text span fw={700}>1.1. “Personal data”</Text> refers to any information relating to an identified or identifiable natural person (“data subject”) as defined in the Act.
                </Text>
                <Text fz="md" lh={1.6}>
                  <Text span fw={700}>1.2. “Data controller”</Text> refers to Livestocx Agritech Solutions LTD, the entity that determines the purposes and means of processing personal data.
                </Text>
                <Text fz="md" lh={1.6}>
                  <Text span fw={700}>1.3. “Data processor”</Text> refers to any entity that processes personal data on behalf of Livestocx Agritech Solutions LTD.
                </Text>
                <Text fz="md" lh={1.6}>
                  <Text span fw={700}>1.4. “Processing”</Text> refers to any operation or set of operations performed on personal data, such as collection, recording, organization, storage, adaptation, retrieval, consultation, use, disclosure, erasure, or destruction.
                </Text>
              </Stack>
            </Box>

            {/* Section 2 */}
            <Box>
              <Title order={3} mb="lg" c="primary.9">2. Principles of Personal Data Processing</Title>
              <Text mb="md" fz="md" lh={1.6}>
                2.1 We are committed to processing personal data in accordance with the principles set forth in the Act. Personal data will be:
              </Text>
              <List spacing="sm" size="md" center 
              // icon={
              //   <ThemeIcon color="primary" size={20} radius="xl">
              //     <IconShieldCheck size={12} />
              //   </ThemeIcon>
              // }
              >
                <List.Item>Processed in a fair, lawful, and transparent manner.</List.Item>
                <List.Item>Collected for specified, explicit, and legitimate purposes.</List.Item>
                <List.Item>Adequate, relevant, and limited to what is necessary.</List.Item>
                <List.Item>Retained for no longer than necessary.</List.Item>
                <List.Item>Accurate, complete, and kept up to date.</List.Item>
                <List.Item>Processed in a manner that ensures appropriate security.</List.Item>
              </List>
            </Box>

            {/* Section 3 */}
            <Box>
              <Title order={3} mb="lg" c="primary.9">3. Lawful Basis for Processing</Title>
              <Text mb="md" fz="md" lh={1.6}>
                3.1 We process personal data only when we have a lawful basis:
              </Text>
              <Stack gap="sm">
                {[
                  { title: "Consent", text: "When the data subject has given and not withdrawn consent." },
                  { title: "Contractual necessity", text: "When processing is necessary for the performance of a contract." },
                  { title: "Legal obligation", text: "Compliance with a legal obligation to which we are subject." },
                  { title: "Vital interests", text: "To protect the vital interests of the data subject or another person." },
                  { title: "Public interest", text: "For tasks carried out in the public interest." },
                  { title: "Legitimate interests", text: "For our legitimate interests or those of a third party." }
                ].map((item, idx) => (
                  <Text key={idx} fz="md" lh={1.6}>
                    <Text span fw={700}>3.1.{idx + 1}. {item.title}:</Text> {item.text}
                  </Text>
                ))}
              </Stack>
            </Box>

            {/* Section 4 */}
            <Box>
              <Title order={3} mb="lg" c="primary.9">4. Data Subject Rights</Title>
              <Stack gap="sm">
                {[
                  "Right to information", "Right of access", "Right to rectification", 
                  "Right to erasure", "Right to restriction of processing", 
                  "Right to data portability", "Right to object", 
                  "Right not to be subject to automated decision-making"
                ].map((right, idx) => (
                  <Text key={idx} fz="md" lh={1.6}>
                    <Text span fw={700}>4.1.{idx + 1}. {right}:</Text> As provided by the Act.
                  </Text>
                ))}
              </Stack>
            </Box>

            {/* Section 5 & 6 */}
            <Box>
              <Title order={3} mb="lg" c="primary.9">5. Data Security</Title>
              <Text fz="md" lh={1.8}>
                5.1 We implement appropriate technical and organizational measures to ensure security and confidentiality. This includes encryption, cookies for analytics, and browser session monitoring to improve performance. We encourage you not to share passwords.
              </Text>
            </Box>

            <Box>
              <Title order={3} mb="lg" c="primary.9">6. Sharing and Disclosure</Title>
              <Text fz="md" lh={1.8}>
                6.1 We may share data with service providers, business partners, or due to legal requirements and business transfers. While we use reasonable efforts to secure your information, the Internet and mobile apps are not 100% secure.
              </Text>
            </Box>

            {/* Sections 7, 8, 9 */}
            <Box>
              <Title order={3} mb="lg" c="primary.9">7. International Data Transfers</Title>
              <Text fz="md" lh={1.8}>
                7.1 If we transfer personal data to a country outside the jurisdiction of the Act, we
                will ensure that appropriate safeguards are in place to protect the personal data, such
                as using standard contractual clauses approved by the relevant authorities.
              </Text>
            </Box>

            <Box>
              <Title order={3} mb="lg" c="primary.9">8. Children’s Privacy</Title>
              <Text fz="md" lh={1.8}>
                8.1 Our services are not directed at individuals under the age of 18. We do not
                knowingly collect or process personal data from children without the consent of their
                parents or legal guardians, except as permitted by applicable law.
              </Text>
            </Box>

            <Box>
              <Title order={3} mb="lg" c="primary.9">9. Data Retention</Title>
              <Text fz="md" lh={1.8}>
                9.1 We will retain personal data for as long as necessary to fulfil the purposes for
                which it was collected unless a longer retention period is required or permitted by law.
                We will securely dispose of personal data when it is no longer needed, in which beyond
                the time necessary, Livestock Agritech Solutions LTD will keep anonymised copies of all
                information for research and historical purposes.
              </Text>
            </Box>

            {/* Section 10 */}
            <Box>
              <Title order={3} mb="lg" c="primary.9">10. Google API Service Compliance</Title>
              <Stack gap="md">
                <Text fz="md" lh={1.8}>
                  Livestock Agritech Solutions LTD complies with the Google API Service: User Data
                  Policy regarding the access, use, storage, and sharing of Google user data.
                </Text>
                <Text fz="md" lh={1.8}>
                  <Text span fw={700}>10.1 Information Collection and Use:</Text> When you use our application through Google
                  OAuth, we collect basic profile information (Name, email address, and profile picture) with your
                  explicit consent.
                </Text>
                <Text fz="md" lh={1.8}>
                  <Text span fw={700}>10.2 Purpose of Data Collection:</Text> We use the collected information to authenticate and identify users, provide personalized services, and improve our application's performance and user experience.
                </Text>
                <Text fz="md" lh={1.8}>
                  <Text span fw={700}>10.3 Data Sharing and Disclosure:</Text> We do not share your Google account information with
                  third parties, except as necessary to comply with legal obligations or to protect the security and integrity of our services.
                </Text>
                <Text fz="md" lh={1.8}>
                  <Text span fw={700}>10.4 Data Security:</Text> We implement industry-standard security measures to protect your data
                  against unauthorized access, alteration, disclosure, or destruction. This includes encryption, access controls, and regular security audits.
                </Text>
                <Text fz="md" lh={1.8}>
                  <Text span fw={700}>10.5 User Rights:</Text> You have the right to access, update, or delete your information.
                </Text>
              </Stack>
            </Box>

            {/* Section 11 */}
            <Box>
              <Title order={3} mb="lg" c="primary.9">11. Changes to this Privacy Policy</Title>
              <Text fz="md" lh={1.8}>
                11.1 We may update this Privacy Policy occasionally to reflect changes in our practices
                or legal obligations. We will provide notice of any material changes by posting the
                updated Policy on our Website and App or by other appropriate means.
              </Text>
            </Box>

            {/* Section 12 */}
            <Box>
              <Title order={3} mb="lg" c="primary.9">12. Contact Us</Title>
              <Text fz="md" lh={1.8}>
                12.1 If you have any questions, concerns, or requests regarding this Privacy Policy or
                our data practices, please contact us at <Anchor href="mailto:info@livestocx.com" fw={700} c="primary.9">info@livestocx.com</Anchor>.
              </Text>
            </Box>

            {/* Section 13 */}
            <Box>
              <Title order={3} mb="lg" c="primary.9">13. Governing Law</Title>
              <Text fz="md" lh={1.8}>
                13.1 This Privacy Policy shall be governed by and construed in accordance with the laws
                of Nigeria. Any disputes arising out of or relating to this Policy shall be resolved in
                the courts of Nigeria.
              </Text>
            </Box>

            <Box ta="center" pt="xl">
              <Text fz="sm" c="dimmed">
                Please review this policy periodically. By continuing to use our services, you consent to the processing of your data as described.
              </Text>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
