import React, { createContext, useContext } from 'react';
import { MantineTheme, useMantineTheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { AccountInfo } from '../sdk/account';
import { AvailableStateInfo } from '../sdk/auth';
import { TestimonialInfo } from '../sdk/communication';
import {
  ChargeResponse,
  PaymentMethod,
  PremiumSubscriptionPlanDescription,
  ProductUploadSubscriptionPlanInfo,
  VendorInfo,
} from '../sdk/vendor';

interface AppContextProps {
  authToken: string;
  theme: MantineTheme | null;
  currentSubscriptionPlanId: number;
  chargeResponse: ChargeResponse | null;
  paymentMethods: PaymentMethod[];
  accountInfo: AccountInfo | null;
  vendorInfo: VendorInfo | null;
  availableStates: AvailableStateInfo[];
  testimonials: TestimonialInfo[];
  setAuthToken: (authToken: string) => void;
  setCurrentSubscriptionPlanId: (planId: number) => void;
  setPaymentMethods: (methods: PaymentMethod[]) => void;
  setAvailableStates: (availableStates: AvailableStateInfo[]) => void;
  setVendorInfo: (vendorInfo: VendorInfo) => void;
  setChargeResponse: (chargeResponse: ChargeResponse | null) => void;
  setAccountInfo: (accountInfo: AccountInfo) => void;
  premiumSubscriptionPlans: PremiumSubscriptionPlanDescription[];
  productUploadSubscriptionPlan: ProductUploadSubscriptionPlanInfo | null;
  setTestimonials: (data: TestimonialInfo[]) => void;
  setPremiumSubscriptionPlans: (data: PremiumSubscriptionPlanDescription[]) => void;
  setProductUploadSubscriptionPlan: (data: ProductUploadSubscriptionPlanInfo) => void;
}

export const AppContext = createContext<AppContextProps>({
  theme: null,
  authToken: '',
  currentSubscriptionPlanId: 0,
  vendorInfo: null,
  testimonials: [],
  availableStates: [],
  accountInfo: null,
  chargeResponse: null,
  paymentMethods: [],
  premiumSubscriptionPlans: [],
  productUploadSubscriptionPlan: null,
  setVendorInfo: () => {},
  setAuthToken: () => {},
  setAccountInfo: () => {},
  setTestimonials: () => {},
  setPaymentMethods: () => {},
  setChargeResponse: () => {},
  setAvailableStates: () => {},
  setPremiumSubscriptionPlans: () => {},
  setCurrentSubscriptionPlanId: () => {},
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

  const [accountInfo, setAccountInfo] = useLocalStorage<AccountInfo>({
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

  const [premiumSubscriptionPlans, setPremiumSubscriptionPlans] = useLocalStorage<
    PremiumSubscriptionPlanDescription[]
  >({
    defaultValue: [],
    key: 'premiumSubscriptionPlans',
    deserialize(value) {
      return JSON.parse(value ?? '');
    },
  });

  const [vendorInfo, setVendorInfo] = useLocalStorage<VendorInfo>({
    defaultValue: undefined,
    key: 'vendorInfo',
    deserialize(value) {
      return JSON.parse(value ?? '');
    },
  });

  const [availableStates, setAvailableStates] = useLocalStorage<AvailableStateInfo[]>({
    defaultValue: [],
    key: 'availableStates',
    deserialize(value) {
      return JSON.parse(value ?? '');
    },
  });

  const [chargeResponse, setChargeResponse] = useLocalStorage<ChargeResponse | null>({
    defaultValue: undefined,
    key: 'chargeResponse',
    deserialize(value) {
      return JSON.parse(value ?? '');
    },
  });

  const [paymentMethods, setPaymentMethods] = useLocalStorage<PaymentMethod[]>({
    defaultValue: [],
    key: 'paymentMethods',
    deserialize(value) {
      return JSON.parse(value ?? '');
    },
  });

  const [currentSubscriptionPlanId, setCurrentSubscriptionPlanId] = useLocalStorage<number>({
    defaultValue: 0,
    key: 'currentSubscriptionPlanId',
    deserialize(value) {
      return JSON.parse(value ?? '');
    },
  });

  return (
    <AppContext.Provider
      value={{
        theme,
        authToken,
        vendorInfo,
        accountInfo,
        testimonials,
        setAuthToken,
        setVendorInfo,
        setAccountInfo,
        chargeResponse,
        paymentMethods,
        setTestimonials,
        availableStates,
        setPaymentMethods,
        setChargeResponse,
        setAvailableStates,
        premiumSubscriptionPlans,
        currentSubscriptionPlanId,
        setPremiumSubscriptionPlans,
        setCurrentSubscriptionPlanId,
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
