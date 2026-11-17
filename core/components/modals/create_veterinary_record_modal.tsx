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
  VeterinaryRecord,
} from '@/core/utilities/animal-records';

export default function CreateVeterinaryRecordModal({
  opened,
  onClose,
  onCreated,
}: {
  opened: boolean;
  onClose: () => void;
  onCreated: (record: VeterinaryRecord) => void;
}) {
  const form = useForm({
    initialValues: {
      productId: '',
      date: new Date().toISOString().slice(0, 10),
      vetOrClinic: '',
      disease: '',
      reason: '',
      whatWasDone: '',
      notes: '',
    },
    validate: {
      productId: (value) => (value ? null : 'Pick an animal'),
      date: (value) => (value ? null : 'Pick a date'),
      vetOrClinic: (value) => (value.trim() ? null : 'Enter vet or clinic name'),
      disease: (value) => (value ? null : 'Pick a disease or Other'),
      reason: (value, values) =>
        values.disease === 'Other' && !value.trim()
          ? 'Say why the animal was seen'
          : null,
      whatWasDone: (value) => (value.trim() ? null : 'Say what was done'),
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

    const record: VeterinaryRecord = {
      id: createRecordId('vet'),
      productId: animal.productId,
      animalName: animal.name,
      date: values.date,
      vetOrClinic: values.vetOrClinic.trim(),
      reason: values.disease === 'Other' ? values.reason.trim() : values.disease,
      whatWasDone: values.whatWasDone.trim(),
      notes: values.notes.trim(),
    };

    onCreated(record);
    showNotification({
      title: 'Saved',
      message: 'Vet visit record added.',
      color: 'green',
    });
    onClose();
  });

  return (
    <Modal opened={opened} onClose={onClose} title="Add vet visit" centered size="md">
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
          <TextInput
            label="Vet or clinic"
            placeholder="e.g. Dr. Adeyemi Clinic"
            {...form.getInputProps('vetOrClinic')}
          />
          <Select
            label="Disease / reason"
            placeholder="e.g. Foot and mouth disease"
            data={DISEASE_SELECT_OPTIONS}
            searchable
            {...form.getInputProps('disease')}
          />
          {form.values.disease === 'Other' && (
            <TextInput
              label="Why was the animal seen?"
              placeholder="e.g. Cough, limp, routine check"
              {...form.getInputProps('reason')}
            />
          )}
          <Textarea
            label="What was done"
            placeholder="e.g. Gave medicine, cleaned wound"
            minRows={2}
            {...form.getInputProps('whatWasDone')}
          />
          <Textarea
            label="Notes"
            placeholder="Anything else to remember"
            minRows={2}
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
