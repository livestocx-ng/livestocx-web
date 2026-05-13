# PasswordApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authControllerForgotPassword**](#authcontrollerforgotpassword) | **POST** /v1/auth/forgot-password | |
|[**authControllerResetPassword**](#authcontrollerresetpassword) | **POST** /v1/auth/reset-password | |
|[**authControllerResetPasswordOtpVerification**](#authcontrollerresetpasswordotpverification) | **POST** /v1/auth/reset-password-otp-verification | |

# **authControllerForgotPassword**
> authControllerForgotPassword(forgotPasswordDTO)


### Example

```typescript
import {
    PasswordApi,
    Configuration,
    ForgotPasswordDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new PasswordApi(configuration);

let forgotPasswordDTO: ForgotPasswordDTO; //

const { status, data } = await apiInstance.authControllerForgotPassword(
    forgotPasswordDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **forgotPasswordDTO** | **ForgotPasswordDTO**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**409** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerResetPassword**
> authControllerResetPassword(resetPasswordDTO)


### Example

```typescript
import {
    PasswordApi,
    Configuration,
    ResetPasswordDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new PasswordApi(configuration);

let resetPasswordDTO: ResetPasswordDTO; //

const { status, data } = await apiInstance.authControllerResetPassword(
    resetPasswordDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **resetPasswordDTO** | **ResetPasswordDTO**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**409** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerResetPasswordOtpVerification**
> ResetPasswordOTPVerificationResponsePayload authControllerResetPasswordOtpVerification(resetPasswordVerificationDTO)


### Example

```typescript
import {
    PasswordApi,
    Configuration,
    ResetPasswordVerificationDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new PasswordApi(configuration);

let resetPasswordVerificationDTO: ResetPasswordVerificationDTO; //

const { status, data } = await apiInstance.authControllerResetPasswordOtpVerification(
    resetPasswordVerificationDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **resetPasswordVerificationDTO** | **ResetPasswordVerificationDTO**|  | |


### Return type

**ResetPasswordOTPVerificationResponsePayload**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**409** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

