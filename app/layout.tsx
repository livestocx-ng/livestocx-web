import React from 'react';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/notifications/styles.css';
import { theme } from '@/core/themes';

import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { ClientLayout } from '@/core/components/layout/clientLayout';

export const metadata = {
  title: 'Livestocx',
  description: 'Best deals, anything Livestock.',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <ClientLayout>{children}</ClientLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
