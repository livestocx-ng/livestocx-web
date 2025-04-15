'use client';

import React from 'react';
import Link from 'next/link';
import { IconSearch } from '@tabler/icons-react';
import { Box, Button, Flex, Image, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

const HomeHeader = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      query: '',
    },
  });

  return (
    <Box
      w="100%"
      style={{
        background: 'linear-gradient(to bottom, #317549, #31754910',
      }}
    >
      <Stack px={20} py={{ base: 20, sm: 20, md: 40 }} gap={10} w="100%" align="center">
        <Title order={3} c="white">
          Best Deals. Everything Animals
        </Title>

        <Flex gap="sm">
          <Link
            target="_blank"
            href="https://apps.apple.com/ng/app/livestocx/id6738842775?platform=iphone"
          >
            <Image
              src="/icons/icon_appstore.svg"
              alt="App Store"
              w={{ base: 100, sm: 110, md: 120 }}
              h="auto"
              fit="contain"
            />
          </Link>
          <Link
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.livestocx.livestocx_mobile"
          >
            <Image
              h="auto"
              fit="contain"
              alt="Google Play"
              src="/icons/icon_playstore.svg"
              w={{ base: 100, sm: 110, md: 120 }}
            />
          </Link>
        </Flex>

        <Flex align="center" gap={2}>
          <Text c="black">Find anything Livestock in </Text>
          <Title order={5} style={{ textDecoration: 'underline' }}>
            {' '}
            Nigeria
          </Title>
        </Flex>

        <form style={{ width: '100%' }}>
          <Flex w="100%" align="center" gap={10} justify="center">
            <TextInput
              size="lg"
              w={{ base: '100%', sm: '100%', md: '60%' }}
              //   radius="lg"
              styles={{
                label: { fontSize: '16px' },
                root: { fontSize: '14px' },
                input: {
                  color: 'black',
                  fontSize: '14px',
                  borderRadius: '50px',
                  border: '1px solid #ccc',
                  backgroundColor: '#ffffff',
                },
              }}
              placeholder="What are you looking for?"
              {...form.getInputProps('query')}
            />

            <Button h={50} variant="filled" type="submit" style={{ borderRadius: '100px' }}>
              <IconSearch size={14} color="white" />
            </Button>
          </Flex>
        </form>
      </Stack>
    </Box>
  );
};

export default HomeHeader;
