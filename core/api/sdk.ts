import { MeApi, SupportApi } from "../sdk/account";
import { AddressHelperApi, AuthApi, HelpersApi, PasswordApi } from "../sdk/auth";
import { TestimonialsApi } from "../sdk/communication";
import { PayableApi, PaymentApi, PremiumSubscriptionApi, ProductUploadSubscriptionApi, ProfileApi } from "../sdk/vendor";
import { appAxiosInstance } from "./axios-instance";

export const ServerPath = process.env.NEXT_APP_CORE_SERVICE_HOST;

export const authApi = new AuthApi(undefined, ServerPath, appAxiosInstance);

export const helperApi = new HelpersApi(undefined, ServerPath, appAxiosInstance);

export const addressHelperApi = new AddressHelperApi(undefined, ServerPath, appAxiosInstance);

export const passwordApi = new PasswordApi(undefined, ServerPath, appAxiosInstance);

export const meApi = new MeApi(undefined, ServerPath, appAxiosInstance);

export const supportApi = new SupportApi(undefined, ServerPath, appAxiosInstance);

export const vendorProfileApi = new ProfileApi(undefined, ServerPath, appAxiosInstance);

export const paymentApi = new PaymentApi(undefined, ServerPath, appAxiosInstance);

export const payableApi = new PayableApi(undefined, ServerPath, appAxiosInstance);

export const testimonialsApi = new TestimonialsApi(undefined, ServerPath, appAxiosInstance);

export const premiumSubscriptionApi = new PremiumSubscriptionApi(undefined, ServerPath, appAxiosInstance);

export const productUploadSubscriptionApi = new ProductUploadSubscriptionApi(undefined, ServerPath, appAxiosInstance);

