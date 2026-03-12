import {
  Configuration as AccountConfiguration,
  ManageContactInfoApi,
  MeApi,
  SupportApi,
  UploadApi,
  UserListApi,
} from '../sdk/account';
import {
  AddressHelperApi,
  AuthApi,
  Configuration as AuthConfiguration,
  HelpersApi,
  PasswordApi,
} from '../sdk/auth';
import {
  MarketplaceApi,
  Configuration as MarketplaceConfiguration,
  ProductApi,
  StoreApi,
} from '../sdk/marketplace';
import {
  PayableApi,
  PaymentApi,
  PremiumSubscriptionApi,
  ProductUploadSubscriptionApi,
  ProfileApi,
  Configuration as VendorConfiguration,
  ProductApi as VendorProductApi,
} from '../sdk/vendor';
import { appAxiosInstance } from './axios-instance';
import { Configuration as CommunicationConfiguration, TestimonialsApi } from '../sdk/communication';

export const ServerPath = process.env.NEXT_PUBLIC_CORE_SERVICE_HOST;

// eslint-disable-next-line no-console
console.log('[SERVER-PATH] :: ', ServerPath);

// Create configuration objects with basePath
const accountConfig = new AccountConfiguration({ basePath: ServerPath });
const authConfig = new AuthConfiguration({ basePath: ServerPath });
const communicationConfig = new CommunicationConfiguration({ basePath: ServerPath });
const marketplaceConfig = new MarketplaceConfiguration({ basePath: ServerPath });
const vendorConfig = new VendorConfiguration({ basePath: ServerPath });

// Debug: Log the actual basePath from configuration
// eslint-disable-next-line no-console
console.log('[CONFIG-BASE-PATH] :: ', authConfig.basePath);

export const authApi = new AuthApi(authConfig, undefined, appAxiosInstance);

export const helperApi = new HelpersApi(authConfig, undefined, appAxiosInstance);

export const addressHelperApi = new AddressHelperApi(authConfig, undefined, appAxiosInstance);

export const passwordApi = new PasswordApi(authConfig, undefined, appAxiosInstance);

export const meApi = new MeApi(accountConfig, undefined, appAxiosInstance);

export const userListApi = new UserListApi(accountConfig, undefined, appAxiosInstance);

export const manageContactInfoApi = new ManageContactInfoApi(accountConfig, undefined, appAxiosInstance);

export const supportApi = new SupportApi(accountConfig, undefined, appAxiosInstance);

export const vendorProfileApi = new ProfileApi(vendorConfig, undefined, appAxiosInstance);

export const vendorProductApi = new VendorProductApi(vendorConfig, undefined, appAxiosInstance);

export const uploadApi = new UploadApi(accountConfig, undefined, appAxiosInstance);

export const paymentApi = new PaymentApi(vendorConfig, undefined, appAxiosInstance);

export const storeApi = new StoreApi(marketplaceConfig, undefined, appAxiosInstance);

export const marketplaceApi = new MarketplaceApi(marketplaceConfig, undefined, appAxiosInstance);

export const productApi = new ProductApi(marketplaceConfig, undefined, appAxiosInstance);

export const payableApi = new PayableApi(vendorConfig, undefined, appAxiosInstance);

export const testimonialsApi = new TestimonialsApi(
  communicationConfig,
  undefined,
  appAxiosInstance
);

export const premiumSubscriptionApi = new PremiumSubscriptionApi(
  vendorConfig,
  undefined,
  appAxiosInstance
);

export const productUploadSubscriptionApi = new ProductUploadSubscriptionApi(
  vendorConfig,
  undefined,
  appAxiosInstance
);
