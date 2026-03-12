import React, { createContext, useContext } from 'react';
import { MantineTheme, useMantineTheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { AccountInfo, ListItemInfo } from '../sdk/account';
import { AvailableStateInfo } from '../sdk/auth';
import { TestimonialInfo } from '../sdk/communication';
import { ProductDetails, ProductInfo, StoreInfo } from '../sdk/marketplace';
import {
  ChargeResponse,
  PaymentMethod,
  PremiumSubscriptionPlanDescription,
  ProductUploadSubscriptionPlanInfo,
  PromotionPlanDescription,
  VendorInfo,
  VendorProductInfo,
} from '../sdk/vendor';

interface AppContextProps {
  authToken: string;
  listItems: ListItemInfo[];
  productInfo: ProductInfo | null;
  storeInfo: StoreInfo | null;
  vendorProducts: VendorProductInfo[];
  productDetails: ProductDetails | null;
  storeProducts: ProductInfo[];
  marketplaceProducts: ProductInfo[];
  theme: MantineTheme | null;
  vendorInfo: VendorInfo | null;
  paymentMethods: PaymentMethod[];
  accountInfo: AccountInfo | null;
  testimonials: TestimonialInfo[];
  currentSubscriptionPlanId: number;
  chargeResponse: ChargeResponse | null;
  availableStates: AvailableStateInfo[];
  storeProductsTotalPages: number;
  storeProductsHasNextPage: boolean;
  storeProductsCurrentPage: number;
  marketPlaceProductsTotalPages: number;
  marketPlaceProductsHasNextPage: boolean;
  marketPlaceProductsCurrentPage: number;
  promotionPlans: PromotionPlanDescription[];
  productUploadSubscriptionPlans: ProductUploadSubscriptionPlanInfo[];
  paymentChargeSession: ChargeResponse | null;
  setPaymentChargeSession: (chargeSession: ChargeResponse | null) => void;
  setProductUploadSubscriptionPlans: (plans: ProductUploadSubscriptionPlanInfo[]) => void;
  setAuthToken: (authToken: string) => void;
  setVendorProducts: (products: VendorProductInfo[]) => void;
  setStoreProductsTotalPages: (authToken: number) => void;
  setStoreProductsHasNextPage: (authToken: boolean) => void;
  setStoreProductsCurrentPage: (authToken: number) => void;
  setMarketPlaceProductsTotalPages: (authToken: number) => void;
  setListItems: (values: ListItemInfo[]) => void;
  setPaymentMethods: (methods: PaymentMethod[]) => void;
  setCurrentSubscriptionPlanId: (planId: number) => void;
  setStoreInfo: (storeInfo: StoreInfo | null) => void;
  setProductInfo: (productInfo: ProductInfo) => void;
  setProductDetails: (productDetails: ProductDetails) => void;
  setStoreProducts: (products: ProductInfo[]) => void;
  setMarketPlaceProducts: (products: ProductInfo[]) => void;
  setMarketPlaceProductsCurrentPage: (value: number) => void;
  setMarketPlaceProductsHasNextPage: (value: boolean) => void;
  setAvailableStates: (availableStates: AvailableStateInfo[]) => void;
  setPromotionPlans: (plans: PromotionPlanDescription[]) => void;
  setVendorInfo: (vendorInfo: VendorInfo) => void;
  setChargeResponse: (chargeResponse: ChargeResponse | null) => void;
  setAccountInfo: (accountInfo: AccountInfo | null) => void;
  premiumSubscriptionPlans: PremiumSubscriptionPlanDescription[];
  productUploadSubscriptionPlan: ProductUploadSubscriptionPlanInfo | null;
  setTestimonials: (data: TestimonialInfo[]) => void;
  setPremiumSubscriptionPlans: (data: PremiumSubscriptionPlanDescription[]) => void;
  setProductUploadSubscriptionPlan: (data: ProductUploadSubscriptionPlanInfo) => void;
}

export const AppContext = createContext<AppContextProps>({
  theme: null,
  authToken: '',
  listItems: [],
  vendorProducts: [],
  storeInfo: null,
  productInfo: null,
  productDetails: null,
  vendorInfo: null,
  testimonials: [],
  storeProducts: [],
  promotionPlans: [],
  availableStates: [],
  accountInfo: null,
  chargeResponse: null,
  paymentMethods: [],
  marketplaceProducts: [],
  currentSubscriptionPlanId: 0,
  premiumSubscriptionPlans: [],
  storeProductsTotalPages: 1,
  storeProductsCurrentPage: 1,
  storeProductsHasNextPage: false,
  marketPlaceProductsCurrentPage: 1,
  marketPlaceProductsHasNextPage: false,
  productUploadSubscriptionPlan: null,
  marketPlaceProductsTotalPages: 0,
  productUploadSubscriptionPlans: [],
  paymentChargeSession: null,
  setPaymentChargeSession: () => {},
  setProductUploadSubscriptionPlans: () => {},
  setVendorProducts: () => {},
  setListItems: () => {},
  setStoreInfo: () => {},
  setProductInfo: () => {},
  setProductDetails: () => {},
  setVendorInfo: () => {},
  setAuthToken: () => {},
  setAccountInfo: () => {},
  setTestimonials: () => {},
  setPaymentMethods: () => {},
  setPromotionPlans: () => {},
  setChargeResponse: () => {},
  setAvailableStates: () => {},
  setStoreProducts: () => {},
  setMarketPlaceProducts: () => {},
  setPremiumSubscriptionPlans: () => {},
  setCurrentSubscriptionPlanId: () => {},
  setProductUploadSubscriptionPlan: () => {},
  setStoreProductsTotalPages: () => {},
  setStoreProductsCurrentPage: () => {},
  setStoreProductsHasNextPage: () => {},
  setMarketPlaceProductsTotalPages: () => {},
  setMarketPlaceProductsCurrentPage: () => {},
  setMarketPlaceProductsHasNextPage: () => {},
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

  const [accountInfo, setAccountInfo] = useLocalStorage<AccountInfo | null>({
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

  const [marketplaceProducts, setMarketPlaceProducts] = useLocalStorage<ProductInfo[]>({
    defaultValue: [],
    key: 'marketplaceProducts',
    deserialize(value) {
      return JSON.parse(value ?? '');
    },
  });

  const [marketPlaceProductsTotalPages, setMarketPlaceProductsTotalPages] = useLocalStorage<number>(
    {
      defaultValue: 0,
      key: 'marketPlaceProductsTotalPages',
      deserialize(value) {
        return JSON.parse(value ?? '');
      },
    }
  );

  const [promotionPlans, setPromotionPlans] = useLocalStorage<PromotionPlanDescription[]>({
    defaultValue: [],
    key: 'promotionPlans',
    deserialize(value) {
      return JSON.parse(value ?? '');
    },
  });

  const [marketPlaceProductsCurrentPage, setMarketPlaceProductsCurrentPage] =
    useLocalStorage<number>({
      defaultValue: 1,
      key: 'marketPlaceProductsCurrentPage',
      deserialize(value) {
        return JSON.parse(value ?? '');
      },
    });

  const [listItems, setListItems] = useLocalStorage<ListItemInfo[]>({
    defaultValue: [],
    key: 'listItems',
    deserialize(value) {
      return JSON.parse(value ?? '');
    },
  });

  const [marketPlaceProductsHasNextPage, setMarketPlaceProductsHasNextPage] =
    useLocalStorage<boolean>({
      defaultValue: false,
      key: 'marketPlaceProductsHasNextPage',
      deserialize(value) {
        return JSON.parse(value ?? '');
      },
    });

  const [productInfo, setProductInfo] = useLocalStorage<ProductInfo | null>({
    defaultValue: null,
    key: 'productInfo',
    deserialize(value) {
      return JSON.parse(value ?? '');
    },
  });

  const [productDetails, setProductDetails] = useLocalStorage<ProductDetails | null>({
    defaultValue: null,
    key: 'productDetails',
    deserialize(value) {
      return JSON.parse(value ?? '');
    },
  });

  const [storeInfo, setStoreInfo] = useLocalStorage<StoreInfo | null>({
    defaultValue: null,
    key: 'storeInfo',
    deserialize(value) {
      return JSON.parse(value ?? '');
    },
  });

  const [storeProducts, setStoreProducts] = useLocalStorage<ProductInfo[]>({
    defaultValue: [],
    key: 'storeProducts',
    deserialize(value) {
      return JSON.parse(value ?? '');
    },
  });

  const [storeProductsTotalPages, setStoreProductsTotalPages] = useLocalStorage<number>({
    defaultValue: 1,
    key: 'storeProductsTotalPages',
    deserialize(value) {
      return JSON.parse(value ?? '');
    },
  });

  const [storeProductsCurrentPage, setStoreProductsCurrentPage] = useLocalStorage<number>({
    defaultValue: 1,
    key: 'storeProductsCurrentPage',
    deserialize(value) {
      return JSON.parse(value ?? '');
    },
  });

  const [storeProductsHasNextPage, setStoreProductsHasNextPage] = useLocalStorage<boolean>({
    defaultValue: false,
    key: 'storeProductsHasNextPage',
    deserialize(value) {
      return JSON.parse(value ?? '');
    },
  });

  const [vendorProducts, setVendorProducts] = useLocalStorage<VendorProductInfo[]>({
    defaultValue: [],
    key: 'vendorProducts',
    deserialize(value) {
      return JSON.parse(value ?? '');
    },
  });

  const [productUploadSubscriptionPlans, setProductUploadSubscriptionPlans] = useLocalStorage<
    ProductUploadSubscriptionPlanInfo[]
  >({
    defaultValue: [],
    key: 'productUploadSubscriptionPlans',
    deserialize(value) {
      return JSON.parse(value ?? '');
    },
  });

  const [paymentChargeSession, setPaymentChargeSession] = useLocalStorage<ChargeResponse | null>({
    defaultValue: null,
    key: 'paymentChargeSession',
    deserialize(value) {
      return JSON.parse(value ?? '');
    },
  });

  return (
    <AppContext.Provider
      value={{
        theme,
        storeInfo,
        storeProducts,
        vendorProducts,
        productInfo,
        productDetails,
        setProductInfo,
        setVendorProducts,
        setProductDetails,
        storeProductsCurrentPage,
        storeProductsHasNextPage,
        storeProductsTotalPages,
        setStoreProductsTotalPages,
        setStoreProductsCurrentPage,
        setStoreProductsHasNextPage,
        paymentChargeSession,
        setPaymentChargeSession,
        listItems,
        authToken,
        vendorInfo,
        accountInfo,
        setListItems,
        testimonials,
        setAuthToken,
        setVendorInfo,
        setStoreInfo,
        setStoreProducts,
        setAccountInfo,
        chargeResponse,
        paymentMethods,
        promotionPlans,
        setTestimonials,
        availableStates,
        setPaymentMethods,
        setChargeResponse,
        setPromotionPlans,
        setAvailableStates,
        marketplaceProducts,
        setMarketPlaceProducts,
        premiumSubscriptionPlans,
        currentSubscriptionPlanId,
        setPremiumSubscriptionPlans,
        setCurrentSubscriptionPlanId,
        productUploadSubscriptionPlan,
        marketPlaceProductsTotalPages,
        marketPlaceProductsCurrentPage,
        marketPlaceProductsHasNextPage,
        productUploadSubscriptionPlans,
        setProductUploadSubscriptionPlans,
        setMarketPlaceProductsTotalPages,
        setProductUploadSubscriptionPlan,
        setMarketPlaceProductsCurrentPage,
        setMarketPlaceProductsHasNextPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
