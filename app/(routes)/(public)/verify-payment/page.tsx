'use client';

import Lottie from 'lottie-react';
import { Box } from '@mantine/core';
import Animation from '../../../../public/animations/animation_payment.json';

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
