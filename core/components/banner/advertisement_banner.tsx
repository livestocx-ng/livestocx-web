'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconRocket } from '@tabler/icons-react';
import { Box, Flex, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useAppContext } from '@/core/context';
import { priceFormatter } from '@/core/middlewares';
import { PromotionPlanDescription } from '@/core/sdk/vendor';

const AdvertisementBanner = () => {
  const router = useRouter();

  const isMobile = useMediaQuery('(maxWidth: 768px)');

  const { authToken, promotionPlans } = useAppContext();

  const [plan, setPlan] = useState<PromotionPlanDescription | null>(null);
  const [countdown, setCountdown] = useState<number>(86400); // 24 hours
  const [endTime, setEndTime] = useState<Date | null>(null);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  const filterPromotionPlans = () => {
    const firstPlan = promotionPlans?.find((p) => p.position === 1);
    if (firstPlan) {
      setPlan(firstPlan);
    }
  };

  const restartCountdown = () => {
    const durations = [28800, 32400, 36000, 43200, 86400];
    const random = durations[Math.floor(Math.random() * durations.length)];
    const newEnd = new Date(Date.now() + random * 1000);
    setEndTime(newEnd);
    setCountdown(random);
    localStorage.setItem('LVSX_PROMOTION_BANNER_END_TIME', newEnd.getTime().toString());
  };

  useEffect(() => {
    filterPromotionPlans();
  }, [promotionPlans.length]);

  useEffect(() => {
    const saved = localStorage.getItem('LVSX_PROMOTION_BANNER_END_TIME');
    if (saved) {
      const date = new Date(Number(saved));
      setEndTime(date);
      const remaining = Math.floor((date.getTime() - Date.now()) / 1000);
      if (remaining > 0) {
        setCountdown(remaining);
      } else {
        restartCountdown();
      }
    } else {
      restartCountdown();
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (endTime) {
        const remaining = Math.floor((endTime.getTime() - Date.now()) / 1000);
        if (remaining <= 0) {
          restartCountdown();
        } else {
          setCountdown(remaining);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const handleClick = () => {
    if (!authToken) {
      return router.replace('/signin?redirect_to=account');
    }

    router.replace('/account');
  };

  return (
    <Box
    w="100%"
    py={5}
    px={16}
    onClick={handleClick}
    style={{
        background: 'linear-gradient(to top right, #fed7aa, #f97316)',
        cursor: 'pointer',
        zIndex: 50,
      }}
    >
      <Flex justify="center" align="center" gap="sm">
        <Flex justify="center" align="center" wrap="wrap" gap={2}>
          <Text
            size="sm"
            ta="center"
            fw={500}
            style={{ fontSize: '12px', '@media (minWidth: 768px)': { fontSize: '14px' } }}
          >
            Boost your posted product for{' '}
            {promotionPlans?.length > 0
              ? `${plan ? priceFormatter(plan.discount_price).split('.00')[0] : priceFormatter(promotionPlans[0]?.price).split('.00')[0]} per week.`
              : `${priceFormatter(1600).split('.00')[0]} per week`}{' '}
          </Text>
          {isMobile && <br />}
          <Text
            size="xs"
            ta="center"
            fw={600}
            style={{ textDecoration: 'underline', fontWeight: 600 }}
          >
            Offer ends in {formatTime(countdown)}
          </Text>
        </Flex>
        <IconRocket size={20} color="white" />
      </Flex>
    </Box>
  );
};

export default AdvertisementBanner;
