'use client';

import { useState } from 'react';
import { Button, Paper, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import CreateVeterinaryRecordModal from '@/core/components/modals/create_veterinary_record_modal';
import PageShell from '@/core/components/shell/page-shell';
import { DUMMY_VETERINARY_RECORDS, VeterinaryRecord } from '@/core/utilities/animal-records';

export default function VeterinaryRecordsPage() {
  const [records, setRecords] = useState<VeterinaryRecord[]>(DUMMY_VETERINARY_RECORDS);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <PageShell
      title="Vet visits"
      caption="Keep a note of when a vet saw your animal and what was done."
      showGoBack
      right={
        <Button className="bg-teal-600" c="white" onClick={open}>
          Add vet visit
        </Button>
      }
    >
      <CreateVeterinaryRecordModal
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
              <Table.Th>Vet or clinic</Table.Th>
              <Table.Th>Reason</Table.Th>
              <Table.Th>What was done</Table.Th>
              <Table.Th>Notes</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {records.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={7}>
                  <Text c="dimmed" size="sm">
                    No visits yet. Tap Add to write the first one.
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
                  <Table.Td>{record.vetOrClinic}</Table.Td>
                  <Table.Td>{record.reason}</Table.Td>
                  <Table.Td>{record.whatWasDone}</Table.Td>
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
