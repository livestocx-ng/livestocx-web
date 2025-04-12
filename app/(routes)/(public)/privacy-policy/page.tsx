'use client';

import { Box, Stack, Text, Title } from '@mantine/core';

const PrivacyPolicy = () => {
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
        Privacy Policy
      </Title>
      <Stack gap={40}>
        <Box px={20}>
          <Title order={5}>Last Updated on: 15th May, 2024. </Title>
          <Text fz={{ base: 14, sm: 14, md: 16 }}>
            This Privacy Policy (“Policy”) outlines how Livestock Agritech Solutions LTD (“we,”
            “us,” or “our”) collects, uses, discloses, and protects personal data in accordance with
            the provisions of The Nigeria Data Protection Act 2023 (“Act”). This Policy describes
            the type of data we may collect from you (“you”, “user”, “your”) on the livestocx.com.ng
            or livestocx.com (“Website”) and the Livestocx App (“App”). Please read this Policy
            carefully to understand our practices regarding your personal data and how we will treat
            it.
          </Text>
        </Box>
        <Stack px={20} gap={10}>
          <Title order={5}>1. More Definitions</Title>
          <Text fz={{ base: 14, sm: 14, md: 16 }}>
            1.1. “Personal data” refers to any information relating to an identified or identifiable
            natural person (“data subject”) as defined in the Act.
          </Text>
          <Text fz={{ base: 14, sm: 14, md: 16 }}>
            1.2. “Data controller” refers to Livestocx Agritech Solutions LTD, the entity that
            determines the purposes and means of processing personal data.
          </Text>
          <Text fz={{ base: 14, sm: 14, md: 16 }}>
            1.3. “Data processor” refers to any entity that processes personal data on behalf of
            Livestocx Agritech Solutions LTD.
          </Text>
          <Text fz={{ base: 14, sm: 14, md: 16 }}>
            1.4. “Processing” refers to any operation or set of operations performed on personal
            data, such as collection, recording, organization, storage, adaptation, retrieval,
            consultation, use, disclosure, erasure, or destruction.
          </Text>
        </Stack>
        <Stack px={20} gap={10}>
          <Title order={5}>2. Principles of Personal Data Processing</Title>
          <Text fz={{ base: 14, sm: 14, md: 16 }}>
            2.1 We are committed to processing personal data in accordance with the principles set
            forth in the Act. Personal data will be:
          </Text>
          <Stack px={10} gap={10}>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              2.1.1. Processed in a fair, lawful, and transparent manner.
            </Text>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              2.1.2. Collected for specified, explicit, and legitimate purposes and not further
              processed in a way incompatible with those purposes.
            </Text>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              2.1.3. Adequate, relevant, and limited to what is necessary for the purposes for which
              it was collected.
            </Text>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              2.1.4. Retained for no longer than necessary to achieve the lawful bases for which it
              was collected.
            </Text>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              2.1.5. Accurate, complete, and kept up to date as necessary.
            </Text>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              2.1.6. Processed in a manner that ensures appropriate security and protection against
              unauthorized or unlawful processing, access, loss, destruction, damage, or any form of
              data breach.
            </Text>
          </Stack>
        </Stack>
        <Stack px={20} gap={10}>
          <Title order={5}>3. Lawful Basis for Personal Data Processing:</Title>
          <Text fz={{ base: 14, sm: 14, md: 16 }}>
            3.1 We will process personal data only when we have a lawful basis for doing so, as
            defined in the Act. The lawful bases for processing personal data include:
          </Text>
          <Stack px={10} gap={10}>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              3.1.1. Consent: When the data subject has given and not withdrawn consent for the
              specific purpose or purposes of the processing.
            </Text>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              3.1.2. Contractual necessity: When processing is necessary for the performance of a
              contract to which the data subject is a party or for taking steps at the data
              subject’s request prior to entering into a contract.
            </Text>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              3.1.3. Legal obligation: When processing is necessary for compliance with a legal
              obligation to which Livestocx Agritech Solutions LTD is subject.
            </Text>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              3.1.4. Vital interests: When processing is necessary to protect the vital interests of
              the data subject or another person.
            </Text>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              3.1.5. Public interest: When processing is necessary for the performance of a task
              carried out in the public interest or in the exercise of official authority vested in
              Livestock Agritech Solutions LTD or a third party to whom the data is disclosed.
            </Text>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              3.1.6. Legitimate interests: When processing is necessary for Livestocx Agritech
              Solutions LTD’s legitimate interests or the legitimate interests of a third party,
              except where such interests are overridden by the rights and freedoms of the data
              subject.
            </Text>
          </Stack>
        </Stack>
        <Stack px={20} gap={10}>
          <Title order={5}>4. Data Subject Rights.</Title>
          <Text fz={{ base: 14, sm: 14, md: 16 }}>
            4.1 We respect and uphold the rights of data subjects as provided by the Act. These
            rights include:
          </Text>
          <Stack px={10} gap={10}>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              4.1.1. Right to information: The right to be informed about the processing of personal
              data, including the purposes, recipients, retention periods, and rights of the data
              subject.
            </Text>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              4.1.2. Right of access: The right to obtain confirmation of whether Livestock Agritech
              Solutions LTD processes personal data and, if so, access to that data and related
              information.
            </Text>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              4.1.3.Right to rectification: The right to request the correction of inaccurate or
              incomplete personal data.
            </Text>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              4.1.4. Right to erasure: The right to request the erasure of personal data under
              certain circumstances, such as when the data is no longer necessary for the purposes
              it was collected or if the data subject withdraws consent.
            </Text>

            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              4.1.5. Right to restriction of processing: The right to request the restriction of
              processing under certain circumstances, such as when the accuracy of the personal data
              is contested or when the processing is unlawful.
            </Text>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              4.1.6. Right to data portability: The right to receive personal data in a structured,
              commonly used, and machine-readable format and transmit it to another data controller,
              where technically feasible.
            </Text>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              4.1.7. Right to object: The right to object to the processing of personal data based
              on legitimate interests or for direct marketing purposes.
            </Text>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              4.1.8. Right not to be subject to automated decision-making: The right not to be
              subject to a decision based solely on automated processing, including profiling, that
              produces legal effects or significantly affects the data subject.
            </Text>
          </Stack>
        </Stack>
        <Stack px={20} gap={10}>
          <Title order={5}>5. Data Security.</Title>
          <Text fz={{ base: 14, sm: 14, md: 16 }}>
            5.1 We implement appropriate technical and organizational measures to ensure the
            security and confidentiality of personal data, protecting it against unauthorized or
            unlawful processing, access, loss, destruction, damage, or any form of data breach. We
            may automatically collect certain information about you as you use the Website and App,
            including, without limitation, through cookies on the Website and App. This may include
            information about your device (such as your Unique Device Identifier), your location,
            your Internet usage, and how you interact with the Website and App. This may include
            information about the way you use the Website and App, and the parts of it you use. Our
            analytics partners use browser cookies to generate statistics about visitors to
            websites, such as the number of page views or times of peak traffic.
          </Text>
        </Stack>
        <Stack px={20} gap={10}>
          <Title order={5}>6. Sharing and Disclosure of Personal Data</Title>
          <Text fz={{ base: 14, sm: 14, md: 16 }}>
            6.1 We may share personal data with third parties only in accordance with the Act, such
            as:
          </Text>
          <Stack px={10} gap={10}>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              6.1.1. Service providers and business partners: We may engage third-party service
              providers and business partners who assist us in providing our services, subject to
              appropriate data processing agreements.
            </Text>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              6.1.2. Legal requirements: We may disclose personal data if required to do so by law,
              regulation, legal process, or governmental request.
            </Text>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              6.1.3.Business transfers: In the event of a merger, acquisition, or transfer of our
              assets, personal data may be transferred to the acquiring entity.
            </Text>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              6.1.4. We use reasonable efforts to secure your information and to attempt to prevent
              the loss, misuse, and alteration of the information that we obtain from you. However,
              the Internet and mobile apps are not 100% secure. We cannot promise that your use of
              our Website and App will be 100% safe. We are not responsible to our users or to any
              third party for any such loss, misuse, or alteration of data, except to the extent
              required by the Privacy Shield Principles or applicable law. We encourage you to use
              caution when using apps and the Internet. This includes not sharing your passwords.
            </Text>
          </Stack>
        </Stack>
        <Stack px={20} gap={10}>
          <Title order={5}>7. International Data Transfers</Title>
          <Text fz={{ base: 14, sm: 14, md: 16 }}>
            7.1 If we transfer personal data to a country outside the jurisdiction of the Act, we
            will ensure that appropriate safeguards are in place to protect the personal data, such
            as using standard contractual clauses approved by the relevant authorities.
          </Text>
        </Stack>
        <Stack px={20} gap={10}>
          <Title order={5}>8. Children’s Privacy</Title>
          <Text fz={{ base: 14, sm: 14, md: 16 }}>
            8.1 Our services are not directed at individuals under the age of 18. We do not
            knowingly collect or process personal data from children without the consent of their
            parents or legal guardians, except as permitted by applicable law.
          </Text>
        </Stack>
        <Stack px={20} gap={10}>
          <Title order={5}>9. Data Retention</Title>
          <Text fz={{ base: 14, sm: 14, md: 16 }}>
            9.1 We will retain personal data for as long as necessary to fulfil the purposes for
            which it was collected unless a longer retention period is required or permitted by law.
            We will securely dispose of personal data when it is no longer needed, in which beyond
            the time necessary, Livestock Agritech Solutions LTD will keep anonymised copies of all
            information for research and historical purposes.
          </Text>
        </Stack>
        <Stack px={20} gap={10}>
          <Title order={5}>
            10. Livestock Agritech Solutions LTD complies with the Google API Service: User Data
            Policy regarding the access, use, storage, and sharing of Google user data. This
            includes:
          </Title>
          <Box>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              10.1 Information Collection and Use: When you use our application through Google
              OAuth, we collect the following information from your Google account, with your
              explicit consent:
            </Text>
            <Stack px={10} gap={10}>
              <Text fz={{ base: 14, sm: 14, md: 16 }}>
                1. Basic Profile Information: Name, email address, and profile picture.
              </Text>
              <Text fz={{ base: 14, sm: 14, md: 16 }}>
                2. Additional Information: Any other data points authorized by you during the OAuth
                consent process.
              </Text>
            </Stack>
          </Box>
          <Box>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              10.2 Purpose of Data Collection: We use the collected information to:
            </Text>
            <Stack px={10} gap={10}>
              <Text fz={{ base: 14, sm: 14, md: 16 }}>1. Authenticate and identify users.</Text>
              <Text fz={{ base: 14, sm: 14, md: 16 }}>
                2. Provide personalized services and features.
              </Text>
              <Text fz={{ base: 14, sm: 14, md: 16 }}>
                3. Improve our application's performance and user experience.
              </Text>
            </Stack>
          </Box>
          <Box>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>
              10.3 Data Sharing and Disclosure We do not share your Google account information with
              third parties, except:
            </Text>
            <Stack px={10} gap={10}>
              <Text fz={{ base: 14, sm: 14, md: 16 }}>
                1. As necessary to comply with legal obligations.
              </Text>
              <Text fz={{ base: 14, sm: 14, md: 16 }}>
                2. To protect the security and integrity of our services.
              </Text>
            </Stack>
          </Box>
          <Text fz={{ base: 14, sm: 14, md: 16 }}>
            10.4 Data Security We implement industry-standard security measures to protect your data
            against unauthorized access, alteration, disclosure, or destruction. This includes
            encryption, access controls, and regular security audits.
          </Text>
          <Box>
            <Text fz={{ base: 14, sm: 14, md: 16 }}>10.5 User Rights You have the right to:</Text>
            <Stack px={10} gap={10}>
              <Text fz={{ base: 14, sm: 14, md: 16 }}>
                1. Access, update, or delete your information.
              </Text>
            </Stack>
          </Box>
        </Stack>
        <Stack px={20} gap={10}>
          <Title order={5}>11. Changes to this Privacy Policy</Title>
          <Text fz={{ base: 14, sm: 14, md: 16 }}>
            11.1 We may update this Privacy Policy occasionally to reflect changes in our practices
            or legal obligations. We will provide notice of any material changes by posting the
            updated Policy on our Website and App or by other appropriate means.
          </Text>
        </Stack>
        <Stack px={20} gap={10}>
          <Title order={5}>12. Contact Us</Title>
          <Text fz={{ base: 14, sm: 14, md: 16 }}>
            12.1 If you have any questions, concerns, or requests regarding this Privacy Policy or
            our data practices, please contact us at info@livestocx.com.
          </Text>
        </Stack>
        <Stack px={20} gap={10}>
          <Title order={5}>13. Governing Law</Title>
          <Text fz={{ base: 14, sm: 14, md: 16 }}>
            13.1 This Privacy Policy shall be governed by and construed in accordance with the laws
            of Nigeria. Any disputes arising out of or relating to this Policy shall be resolved in
            the courts of Nigeria.
          </Text>
        </Stack>
        <Stack px={20} mt={20}>
          <Text fz={{ base: 14, sm: 14, md: 16 }}>
            Please review this Privacy Policy periodically for any updates or changes. By continuing
            to use our Website and/or App, you acknowledge that you have read and understood this
            Policy and consent to the processing of your personal data as described herein.
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PrivacyPolicy;
