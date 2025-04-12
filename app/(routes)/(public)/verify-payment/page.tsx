'use client';

import dynamic from 'next/dynamic';
import { Box } from '@mantine/core';
import Animation from '../../../../public/animations/animation_payment.json';

// Import Lottie dynamically with ssr disabled
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const VerifyPaymentScreen = () => {
  return (
    <Box
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        background:
          'linear-gradient(180deg, var(--mantine-color-gray-1) 30%, var(--mantine-color-gray-1) 5%)',
      }}
    >
      <Lottie loop className="h-full" animationData={Animation} />
    </Box>
  );
};

export default VerifyPaymentScreen;
