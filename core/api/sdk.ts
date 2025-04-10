import { AuthApi, PasswordApi } from "../sdk/auth";
import { TestimonialsApi } from "../sdk/communication";
import { ProductUploadSubscriptionApi } from "../sdk/vendor";
import { appAxiosInstance } from "./axios-instance";

export const ServerPath = process.env.NEXT_APP_CORE_SERVICE_HOST;

export const authApi = new AuthApi(undefined, ServerPath, appAxiosInstance);
export const passwordApi = new PasswordApi(undefined, ServerPath, appAxiosInstance);

export const testimonialsApi = new TestimonialsApi(undefined, ServerPath, appAxiosInstance);

export const productUploadSubscriptionApi = new ProductUploadSubscriptionApi(undefined, ServerPath, appAxiosInstance);