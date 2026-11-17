'use client';

import { useEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { Button, Group, Modal, Select, Stack, Textarea, TextInput } from '@mantine/core';
import {
  animalSelectData,
  createRecordId,
  DISEASE_SELECT_OPTIONS,
  DUMMY_ANIMALS,
  HEALTH_RECORD_TYPE_OPTIONS,
  HealthRecord,
  HealthRecordType,
} from '@/core/utilities/animal-records';

export default function CreateHealthRecordModal({
  opened,
  onClose,
  onCreated,
}: {
  opened: boolean;
  onClose: () => void;
  onCreated: (record: HealthRecord) => void;
}) {
  const form = useForm({
    initialValues: {
      productId: '',
      date: new Date().toISOString().slice(0, 10),
      type: 'Shot' as HealthRecordType,
      disease: '',
      details: '',
      notes: '',
    },
    validate: {
      productId: (value) => (value ? null : 'Pick an animal'),
      date: (value) => (value ? null : 'Pick a date'),
      type: (value) => (value ? null : 'Pick a type'),
      disease: (value) => (value ? null : 'Pick a disease or Other'),
      details: (value, values) =>
        values.disease === 'Other' && !value.trim()
          ? 'Say what happened'
          : null,
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

    const details =
      values.disease === 'Other'
        ? values.details.trim()
        : values.type === 'Shot'
          ? `${values.disease} vaccine`
          : values.type === 'Treatment'
            ? `${values.disease} care`
            : values.disease;

    const record: HealthRecord = {
      id: createRecordId('health'),
      productId: animal.productId,
      animalName: animal.name,
      date: values.date,
      type: values.type,
      details,
      notes: values.notes.trim(),
    };

    onCreated(record);
    showNotification({
      title: 'Saved',
      message: 'Shot or treatment record added.',
      color: 'green',
    });
    onClose();
  });

  return (
    <Modal opened={opened} onClose={onClose} title="Add shot or treatment" centered size="md">
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
            label="Type"
            data={HEALTH_RECORD_TYPE_OPTIONS}
            {...form.getInputProps('type')}
          />
          <Select
            label="Disease"
            placeholder="e.g. Foot and mouth disease"
            data={DISEASE_SELECT_OPTIONS}
            searchable
            {...form.getInputProps('disease')}
          />
          {form.values.disease === 'Other' && (
            <TextInput
              label="What happened"
              placeholder="Describe the shot, sickness, or treatment"
              {...form.getInputProps('details')}
            />
          )}
          <Textarea
            label="Notes"
            placeholder="Anything else to remember"
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
