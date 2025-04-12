import React, { useEffect, useState } from 'react';
import { Button, Drawer, NumberInput, ScrollArea, Select, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useAppContext } from '@/core/context';
import useFetchAvailableStatesQuery from '@/core/hooks/public/useFetchAvailableStatesQuery';
import useFetchVendorInfoQuery from '@/core/hooks/vendor/useFetchVendorInfoQuery';
import useUpdateUserRoleMutation from '@/core/hooks/vendor/useUpdateUserRoleMutation';
import { UpdateVendorProfileDto } from '@/core/sdk/vendor';
import { validateUpdateBusinessProfileForm } from '@/core/validations/vendor.validations';

const UpdateUserRoleDrawer = ({
  isOpen,
  closeDrawer,
}: {
  isOpen: boolean;
  closeDrawer: () => void;
}) => {
  useFetchVendorInfoQuery();
  useFetchAvailableStatesQuery();

  const { availableStates, vendorInfo } = useAppContext();

  const { mutate, isPending } = useUpdateUserRoleMutation();

  const [availableLgas, setAvailableLgas] = useState<string[]>([]);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
      address: '',
      state: '',
      city: '',
      phoneNumber: '',
      avatar: '',
    },
  });

  useEffect(() => {
    if (vendorInfo) {
      form.setFieldValue('name', vendorInfo.name);
      form.setFieldValue('email', vendorInfo.email);
      form.setFieldValue('address', vendorInfo.address);
      form.setFieldValue('state', vendorInfo.state);
      form.setFieldValue('city', vendorInfo.city);
      form.setFieldValue('avatar', vendorInfo.avatar);
      form.setFieldValue('phoneNumber', vendorInfo.phoneNumber.split('+234')[1]);
    }
  }, [vendorInfo]);

  const submitHandler = async (values: UpdateVendorProfileDto) => {
    const message = validateUpdateBusinessProfileForm(values);

    if (message !== '') {
      showNotification({
        message,
        color: 'red',
        title: 'Message',
        autoClose: 3000,
      });

      return;
    }

    mutate(values, {
      onSuccess: () => {
        closeDrawer();
      },
    });
  };

  return (
    <Drawer
      opened={isOpen}
      onClose={closeDrawer}
      title="Update User Role"
      scrollAreaComponent={ScrollArea.Autosize}
      overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
    >
      <form
        onSubmit={form.onSubmit((values) => {
          submitHandler(values);
        })}
      >
        <Stack gap={10}>
          <TextInput
            size="lg"
            radius="lg"
            withAsterisk
            label="Business Name"
            styles={{
              label: { fontSize: '16px' },
              root: { fontSize: '14px' },
              input: { fontSize: '14px' },
            }}
            // key={form.key('email')}
            placeholder="Bola's Ranch"
            {...form.getInputProps('name')}
          />
          <TextInput
            size="lg"
            radius="lg"
            withAsterisk
            label="Email"
            styles={{
              label: { fontSize: '16px' },
              root: { fontSize: '14px' },
              input: { fontSize: '14px' },
            }}
            // key={form.key('email')}
            placeholder="tunde@gmail.com"
            {...form.getInputProps('email')}
          />
          <NumberInput
            size="lg"
            radius="lg"
            withAsterisk
            label="Phone"
            maxLength={10}
            inputMode="tel"
            allowNegative={false}
            placeholder="9029389499"
            styles={{
              label: { fontSize: '16px' },
              root: { fontSize: '14px' },
              input: { fontSize: '14px' },
            }}
            {...form.getInputProps('phoneNumber')}
            onChange={(value: string | number) => {
              form.setFieldValue('phone', '+234'.concat(value!.toString()));
            }}
          />
          <TextInput
            size="lg"
            radius="lg"
            withAsterisk
            label="Address"
            styles={{
              label: { fontSize: '16px' },
              root: { fontSize: '14px' },
              input: { fontSize: '14px' },
            }}
            placeholder="Business address"
            {...form.getInputProps('address')}
          />
          <Select
            size="lg"
            radius="lg"
            withAsterisk
            label="State"
            placeholder="Abia"
            styles={{
              label: { fontSize: '16px' },
              root: { fontSize: '14px' },
              input: { fontSize: '14px' },
            }}
            {...form.getInputProps('state')}
            onChange={(value) => {
              const values = availableStates.find((item) => item.state === value)?.lgas;

              setAvailableLgas(values!);

              if (form.values.city !== '') {
                form.setFieldValue('city', '');
              }
            }}
            data={availableStates.map((item) => item.state)}
          />
          <Select
            size="lg"
            radius="lg"
            withAsterisk
            label="City"
            placeholder="Ikeja"
            {...form.getInputProps('city')}
            data={availableLgas}
            styles={{
              label: { fontSize: '16px' },
              root: { fontSize: '14px' },
              input: { fontSize: '14px' },
            }}
          />

          <Button radius="lg" h={50} variant="filled" mt={40} type="submit" loading={isPending}>
            Submit
          </Button>
        </Stack>
      </form>
    </Drawer>
  );
};

export default UpdateUserRoleDrawer;
