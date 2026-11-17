'use client';

import { useState } from 'react';
import { Button, Paper, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import CreateHealthRecordModal from '@/core/components/modals/create_health_record_modal';
import PageShell from '@/core/components/shell/page-shell';
import { DUMMY_HEALTH_RECORDS, HealthRecord } from '@/core/utilities/animal-records';

export default function HealthRecordsPage() {
  const [records, setRecords] = useState<HealthRecord[]>(DUMMY_HEALTH_RECORDS);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <PageShell
      title="Shots & treatments"
      caption="Write down vaccines, sickness, and medicines — including foot and mouth disease and avian influenza."
      showGoBack
      right={
        <Button className="bg-teal-600" c="white" onClick={open}>
          Add shot or treatment
        </Button>
      }
    >
      <CreateHealthRecordModal
        opened={opened}
        onClose={close}
        onCreated={(record) => setRecords((prev) => [record, ...prev])}
      />
      <Paper p={{ base: 0, sm: 'md' }} style={{ overflowX: 'auto' }}>
        <Table verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Animal</Table.Th>
              <Table.Th>Product ID</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>What happened</Table.Th>
              <Table.Th>Notes</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {records.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={6}>
                  <Text c="dimmed" size="sm">
                    No records yet. Tap Add to write the first one.
                  </Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              records.map((record) => (
                <Table.Tr key={record.id}>
                  <Table.Td>{record.animalName}</Table.Td>
                  <Table.Td>
                    <Text size="sm" ff="monospace">
                      {record.productId}
                    </Text>
                  </Table.Td>
                  <Table.Td>{record.date}</Table.Td>
                  <Table.Td>{record.type}</Table.Td>
                  <Table.Td>{record.details}</Table.Td>
                  <Table.Td>
                    <Text size="sm" c={record.notes ? undefined : 'dimmed'}>
                      {record.notes || '—'}
                    </Text>
                  </Table.Td>
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>
      </Paper>
    </PageShell>
  );
}
