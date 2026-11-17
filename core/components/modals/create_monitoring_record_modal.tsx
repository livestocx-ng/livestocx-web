'use client';

import { useEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { Button, Group, Modal, Select, Stack, Textarea, TextInput } from '@mantine/core';
import {
  animalSelectData,
  createRecordId,
  DUMMY_ANIMALS,
  MONITORING_CONDITION_OPTIONS,
  MonitoringCondition,
  MonitoringRecord,
} from '@/core/utilities/animal-records';

export default function CreateMonitoringRecordModal({
  opened,
  onClose,
  onCreated,
}: {
  opened: boolean;
  onClose: () => void;
  onCreated: (record: MonitoringRecord) => void;
}) {
  const form = useForm({
    initialValues: {
      productId: '',
      date: new Date().toISOString().slice(0, 10),
      condition: 'Good' as MonitoringCondition,
      weightKg: '',
      notes: '',
    },
    validate: {
      productId: (value) => (value ? null : 'Pick an animal'),
      date: (value) => (value ? null : 'Pick a date'),
      condition: (value) => (value ? null : 'Pick a condition'),
    },
  });

  useEffect(() => {
    if (!opened) {
      form.reset();
    }
  }, [opened]);

  const handleSubmit = form.onSubmit((values) => {
    const animal = DUMMY_ANIMALS.find((item) => item.productId === values.productId);
    if (!animal) return;

    const record: MonitoringRecord = {
      id: createRecordId('monitor'),
      productId: animal.productId,
      animalName: animal.name,
      date: values.date,
      condition: values.condition,
      weightKg: values.weightKg.trim() || undefined,
      notes: values.notes.trim(),
    };

    onCreated(record);
    showNotification({
      title: 'Saved',
      message: 'Health check record added.',
      color: 'green',
    });
    onClose();
  });

  return (
    <Modal opened={opened} onClose={onClose} title="Add health check" centered size="md">
      <form onSubmit={handleSubmit}>
        <Stack>
          <Select
            label="Animal"
            description="Linked by product ID"
            placeholder="Which animal?"
            data={animalSelectData()}
            searchable
            {...form.getInputProps('productId')}
          />
          <TextInput label="Date" type="date" {...form.getInputProps('date')} />
          <Select
            label="Condition"
            data={MONITORING_CONDITION_OPTIONS}
            {...form.getInputProps('condition')}
          />
          <TextInput
            label="Weight (kg)"
            placeholder="Optional"
            type="number"
            min={0}
            {...form.getInputProps('weightKg')}
          />
          <Textarea
            label="Notes"
            placeholder="How does the animal look and behave?"
            minRows={3}
            {...form.getInputProps('notes')}
          />
          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" color="#007A3D">
              Save
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
