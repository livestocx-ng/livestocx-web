'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import { AppContextProvider } from '@/core/context';
import { queryClient } from '@/core/middlewares/query-client';
import { Footer } from '../navigation/footer';
import { Navbar } from '../navigation/navbar';
import { Box } from '@mantine/core';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box className='relative'>
      <NavigationProgress color="green" />
      <Notifications position="top-right" />
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <ModalsProvider>
            <Navbar />
            {children}
            <Footer />
          </ModalsProvider>
        </AppContextProvider>
      </QueryClientProvider>
    </Box>
  );
}
