import React, { createContext, useContext } from 'react';
import { MantineTheme, useMantineTheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { TestimonialInfo } from '../sdk/communication';
import { ProductUploadSubscriptionPlanInfo } from '../sdk/vendor';

interface AppContextProps {
  authToken: string;
  setAuthToken: (authToken: string) => void;
  theme: MantineTheme | null;
  testimonials: TestimonialInfo[];
  productUploadSubscriptionPlan: ProductUploadSubscriptionPlanInfo | null;
  setTestimonials: (data: TestimonialInfo[]) => void;
  setProductUploadSubscriptionPlan: (data: ProductUploadSubscriptionPlanInfo) => void;
}

export const AppContext = createContext<AppContextProps>({
  theme: null,
  authToken: '',
  testimonials: [],
  productUploadSubscriptionPlan: null,
  setAuthToken: () => {},
  setTestimonials: () => {},
  setProductUploadSubscriptionPlan: () => {},
});

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useMantineTheme();

  const [authToken, setAuthToken] = useLocalStorage<string>({
    key: 'authToken',
  });

  const [testimonials, setTestimonials] = useLocalStorage<TestimonialInfo[]>({
    key: 'testimonials',
    defaultValue: [],
    deserialize(value) {
      return JSON.parse(value ?? '');
    },
  });

  const [productUploadSubscriptionPlan, setProductUploadSubscriptionPlan] =
    useLocalStorage<ProductUploadSubscriptionPlanInfo>({
      defaultValue: undefined,
      key: 'productUploadSubscriptionPlan',
      deserialize(value) {
        return JSON.parse(value ?? '');
      },
    });

  return (
    <AppContext.Provider
      value={{
        theme,
        authToken,
        testimonials,
        setAuthToken,
        setTestimonials,
        productUploadSubscriptionPlan,
        setProductUploadSubscriptionPlan,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
