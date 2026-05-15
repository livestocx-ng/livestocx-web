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

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconExternalLink, IconSearch } from '@tabler/icons-react';
import { Box, Button, Flex, Image, Stack, TextInput, Title } from '@mantine/core';

const HomeHeader = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNavigating(true);
    
    if (searchInput.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchInput.trim())}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <Box
      w="100%"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #317549 0%, #1e4d30 80%, #255a38 100%)',
      }}
    >
      {/* Noise Texture Overlay */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle Mesh Glow */}
      <Box
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '60%',
          height: '140%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle Grid Background */}
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(#ffffff08 1px, transparent 1px),
            linear-gradient(90deg, #ffffff08 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center',
          pointerEvents: 'none',
        }}
      />

      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          
          @keyframes glowPulse {
            0% { box-shadow: 0 0 5px rgba(238, 113, 41, 0.4); }
            50% { box-shadow: 0 0 20px rgba(238, 113, 41, 0.6); }
            100% { box-shadow: 0 0 5px rgba(238, 113, 41, 0.4); }
          }

          .app-badge:hover {
            transform: translateY(-2px);
            filter: brightness(1.1);
            transition: all 0.2s ease;
          }

          .search-input-focus:focus-within {
            box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
            transition: all 0.3s ease;
          }

          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .animated-border-wrapper {
            position: relative;
            padding: 2px;
            border-radius: 100px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .animated-border-wrapper::before {
            content: '';
            position: absolute;
            width: 200%;
            height: 400%;
            background: conic-gradient(
              from 0deg,
              transparent 0%,
              transparent 40%,
              #4ade80 50%,
              transparent 60%,
              transparent 100%
            );
            animation: rotate 4s linear infinite;
          }

          .animated-border-wrapper::after {
            content: '';
            position: absolute;
            inset: 2px;
            background: #ffffff;
            border-radius: 98px;
            z-index: 0;
          }
        `}
      </style>

      <Stack px={20} py={{ base: 20, sm: 20, md: 40 }} gap={15} w="100%" align="center" style={{ position: 'relative', zIndex: 1 }}>
        <Title 
          order={3} 
          c="white" 
          style={{ 
            fontFamily: 'Gotham, sans-serif',
            letterSpacing: '-0.02em',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Best Deals. Everything Animals
        </Title>

        <Flex w="100%" justify="center" align="center" px={{ base: 16, md: 32 }}>
          <Button
            type="button"
            onClick={() => {
              window.open('https://climateresilience.livestocx.com', '_blank');
            }}
            c="white"
            radius="xl"
            px="xl"
            py="md"
            variant="filled"
            styles={{
              root: {
                background: 'linear-gradient(90deg, #ee7129 0%, #f9c416 50%, #ee7129 100%)',
                backgroundSize: '200% auto',
                animation: 'shimmer 3s infinite linear, glowPulse 3s infinite ease-in-out',
                height: 'auto',
                border: 'none',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                }
              },
              inner: {
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              },
            }}
          >
            <Box style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 15 }}>Climate Resilience AI</span>
                <IconExternalLink size={18} />
              </Box>
            </Box>
          </Button>
        </Flex>

        <Flex gap="md">
          <Link 
            target="_blank" 
            href="https://apps.apple.com/ng/app/livestocx/id6738842775"
            className="app-badge"
          >
            <Image src="/icons/icon_appstore.svg" alt="App Store" w={120} fit="contain" />
          </Link>
          <Link 
            target="_blank" 
            href="https://play.google.com/store/apps/details?id=com.livestocx.livestocx_mobile"
            className="app-badge"
          >
            <Image src="/icons/icon_playstore.svg" alt="Google Play" w={120} fit="contain" />
          </Link>
        </Flex>

        {/* Streamlined Search Form */}
        <form style={{ width: '100%' }} onSubmit={handleSearchSubmit}>
          <Flex w="100%" justify="center">
            <Box
              className="animated-border-wrapper"
              w={{ base: '100%', sm: '100%', md: '60%' }}
            >
              <TextInput
                size="lg"
                placeholder="What are you looking for?"
                value={searchInput}
                onChange={(e) => setSearchInput(e.currentTarget.value)}
                w="100%"
                rightSection={
                  <Button
                    h={38}
                    px={18}
                    mr={6}
                    variant="filled"
                    type="submit"
                    loading={isNavigating}
                    style={{
                      borderRadius: '100px',
                      backgroundColor: '#317549',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      zIndex: 2
                    }}
                  >
                    <IconSearch size={16} color="white" />
                  </Button>
                }
                rightSectionWidth={80}
                styles={{
                  root: {
                    position: 'relative',
                    zIndex: 2,
                    width: '100%'
                  },
                  input: {
                    color: 'black',
                    borderRadius: '100px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(8px)',
                    border: 'none',
                    paddingRight: 90,
                    height: 54,
                    fontSize: 15,
                    boxShadow: 'none',
                    '&:focus': {
                      backgroundColor: '#ffffff',
                    }
                  }
                }}
              />
            </Box>
          </Flex>
        </form>
      </Stack>
    </Box>
  );
};

export default HomeHeader;
