'use client';

import { useState } from 'react';
import { Button, Paper, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import CreateMonitoringRecordModal from '@/core/components/modals/create_monitoring_record_modal';
import PageShell from '@/core/components/shell/page-shell';
import { DUMMY_MONITORING_RECORDS, MonitoringRecord } from '@/core/utilities/animal-records';

export default function MonitoringRecordsPage() {
  const [records, setRecords] = useState<MonitoringRecord[]>(DUMMY_MONITORING_RECORDS);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <PageShell
      title="Health checks"
      caption="Track how each animal looks and weighs over time."
      showGoBack
      right={
        <Button className="bg-teal-600" c="white" onClick={open}>
          Add health check
        </Button>
      }
    >
      <CreateMonitoringRecordModal
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
              <Table.Th>Condition</Table.Th>
              <Table.Th>Weight (kg)</Table.Th>
              <Table.Th>Notes</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {records.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={6}>
                  <Text c="dimmed" size="sm">
                    No checks yet. Tap Add to write the first one.
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
                  <Table.Td>{record.condition}</Table.Td>
                  <Table.Td>{record.weightKg || '—'}</Table.Td>
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
