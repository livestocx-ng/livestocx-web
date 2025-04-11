import { AccountInfo } from '../sdk/account';
import { useLocalStorage } from '@mantine/hooks';
import { TestimonialInfo } from '../sdk/communication';
import React, { createContext, useContext } from 'react';
import { MantineTheme, useMantineTheme } from '@mantine/core';
import { ProductUploadSubscriptionPlanInfo } from '../sdk/vendor';

interface AppContextProps {
  authToken: string;
  accountInfo: AccountInfo | null;
  setAuthToken: (authToken: string) => void;
  theme: MantineTheme | null;
  testimonials: TestimonialInfo[];
  setAccountInfo: (accountInfo: AccountInfo) => void;
  productUploadSubscriptionPlan: ProductUploadSubscriptionPlanInfo | null;
  setTestimonials: (data: TestimonialInfo[]) => void;
  setProductUploadSubscriptionPlan: (data: ProductUploadSubscriptionPlanInfo) => void;
}

export const AppContext = createContext<AppContextProps>({
  theme: null,
  authToken: '',
  testimonials: [],
  accountInfo: null,
  productUploadSubscriptionPlan: null,
  setAuthToken: () => {},
  setAccountInfo: () => {},
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

  const [accountInfo, setAccountInfo] =
    useLocalStorage<AccountInfo>({
      defaultValue: undefined,
      key: 'accountInfo',
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
        accountInfo,
        testimonials,
        setAuthToken,
        setAccountInfo,
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
