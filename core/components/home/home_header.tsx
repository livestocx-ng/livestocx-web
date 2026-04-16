// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { IconSearch } from '@tabler/icons-react';
// import { Box, Button, Flex, Image, Stack, Text, TextInput, Title } from '@mantine/core';
// import { useForm } from '@mantine/form';

// const HomeHeader = () => {
//   const form = useForm({
//     mode: 'uncontrolled',
//     initialValues: {
//       query: '',
//     },
//   });

//   return (
//     <Box
//       w="100%"
//       style={{
//         background: 'linear-gradient(to bottom, #317549, #31754910',
//       }}
//     >
//       <Stack px={20} py={{ base: 20, sm: 20, md: 40 }} gap={10} w="100%" align="center">
//         <Title order={3} c="white">
//           Best Deals. Everything Animals
//         </Title>

//         <Flex gap="sm">
//           <Link
//             target="_blank"
//             href="https://apps.apple.com/ng/app/livestocx/id6738842775?platform=iphone"
//           >
//             <Image
//               src="/icons/icon_appstore.svg"
//               alt="App Store"
//               w={{ base: 100, sm: 110, md: 120 }}
//               h="auto"
//               fit="contain"
//             />
//           </Link>
//           <Link
//             target="_blank"
//             href="https://play.google.com/store/apps/details?id=com.livestocx.livestocx_mobile"
//           >
//             <Image
//               h="auto"
//               fit="contain"
//               alt="Google Play"
//               src="/icons/icon_playstore.svg"
//               w={{ base: 100, sm: 110, md: 120 }}
//             />
//           </Link>
//         </Flex>

//         <Flex align="center" gap={2}>
//           <Text c="black">Find anything Livestock in </Text>
//           <Title order={5} style={{ textDecoration: 'underline' }}>
//             {' '}
//             Nigeria
//           </Title>
//         </Flex>

//         <form style={{ width: '100%' }}>
//           <Flex w="100%" align="center" gap={10} justify="center">
//             <TextInput
//               size="lg"
//               w={{ base: '100%', sm: '100%', md: '60%' }}
//               //   radius="lg"
//               styles={{
//                 label: { fontSize: '16px' },
//                 root: { fontSize: '14px' },
//                 input: {
//                   color: 'black',
//                   fontSize: '14px',
//                   borderRadius: '50px',
//                   border: '1px solid #ccc',
//                   backgroundColor: '#ffffff',
//                 },
//               }}
//               placeholder="What are you looking for?"
//               {...form.getInputProps('query')}
//             />

//             <Button h={50} variant="filled" type="submit" style={{ borderRadius: '100px' }}>
//               <IconSearch size={14} color="white" />
//             </Button>
//           </Flex>
//         </form>
//       </Stack>
//     </Box>
//   );
// };

// export default HomeHeader;

'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { IconSearch, IconMapPin } from '@tabler/icons-react';
import { Box, Button, Flex, Image, Stack, Text, TextInput, Title, Select, Popover, ActionIcon } from '@mantine/core';
import useSearch from '@/core/hooks/search/use-search';
import { useAppContext } from '@/core/context';

const HomeHeader = () => {
  const [searchInput, setSearchInput] = useState('');
  const [activeQuery, setActiveQuery] = useState('');

  const { availableStates } = useAppContext();
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [popoverOpened, setPopoverOpened] = useState(false);

  const cities = useMemo(() => {
    if (!selectedState) return [];
    const state = availableStates.find((s) => s.state === selectedState);
    return state?.lgas || [];
  }, [selectedState, availableStates]);


  const { isFetching } = useSearch({
    currentPage: 1,
    pageSize: 20,
    searchQuery: activeQuery,
    state: selectedState || '',
    city: selectedCity || '',
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setActiveQuery(searchInput);
    }
  };

  return (
    <Box
      w="100%"
      style={{
        background: 'linear-gradient(to bottom, #317549, #31754910)',
      }}
    >
      <Stack px={20} py={{ base: 20, sm: 20, md: 40 }} gap={10} w="100%" align="center">
        <Title order={3} c="white">
          Best Deals. Everything Animals
        </Title>

        <Flex gap="sm">
          <Link target="_blank" href="https://apps.apple.com/ng/app/livestocx/id6738842775">
            <Image src="/icons/icon_appstore.svg" alt="App Store" w={110} fit="contain" />
          </Link>
          <Link target="_blank" href="https://play.google.com/store/apps/details?id=com.livestocx.livestocx_mobile">
            <Image src="/icons/icon_playstore.svg" alt="Google Play" w={110} fit="contain" />
          </Link>
        </Flex>

        {/* Streamlined Search Form */}
        <form style={{ width: '100%' }} onSubmit={handleSearchSubmit}>
          <Flex w="100%" justify="center">
            <TextInput
              size="lg"
              placeholder="What are you looking for?"
              value={searchInput}
              onChange={(e) => setSearchInput(e.currentTarget.value)}
              w={{ base: '100%', sm: '100%', md: '60%' }}
              leftSection={
                <Popover 
                  width={300} 
                  position="bottom" 
                  withArrow 
                  shadow="md"
                  opened={popoverOpened}
                  onChange={setPopoverOpened}
                >
                  <Popover.Target>
                    <ActionIcon 
                      variant="transparent" 
                      color={selectedState ? 'green' : 'gray'} 
                      title="Select Location"
                      onClick={() => setPopoverOpened((o) => !o)}
                    >
                      <IconMapPin size={20} />
                    </ActionIcon>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Stack gap="sm">
                      <Text fw={700} fz="sm">Search Location</Text>
                      <Select
                        label="State"
                        placeholder="Pick a state"
                        data={['Nigeria', ...availableStates.map((s) => s.state)]}
                        value={selectedState}
                        onChange={(val) => {
                          setSelectedState(val === 'Nigeria' ? null : val);
                          setSelectedCity(null);
                        }}
                        allowDeselect
                        clearable
                      />
                      <Select
                        label="City/LGA"
                        placeholder="Select City"
                        data={cities}
                        value={selectedCity}
                        onChange={(val) => {
                          setSelectedCity(val);
                          setPopoverOpened(false); // Close only after city is selected
                        }}
                        disabled={!selectedState}
                        allowDeselect
                        clearable
                      />
                    </Stack>
                  </Popover.Dropdown>
                </Popover>
              }
              rightSection={
                <Button
                  h={35}
                  px={15}
                  mr={5}
                  variant="filled"
                  type="submit"
                  loading={isFetching}
                  style={{
                    borderRadius: '100px',
                    backgroundColor: '#317549'
                  }}
                >
                  <IconSearch size={16} color="white" />
                </Button>
              }
              rightSectionWidth={70}
              styles={{
                input: {
                  color: 'black',
                  borderRadius: '100px',
                  backgroundColor: '#ffffff',
                  paddingRight: 80,
                  height: 50,
                  fontSize: 14
                },
                section: {
                  paddingLeft: 10
                }
              }}
            />
          </Flex>
        </form>
      </Stack>
    </Box>
  );
};

export default HomeHeader;
