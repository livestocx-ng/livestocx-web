# AuthApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authControllerSignIn**](#authcontrollersignin) | **POST** /v1/auth/signin | |
|[**authControllerSignUp**](#authcontrollersignup) | **POST** /v1/auth/signup | |
|[**authControllerSigninOAuth**](#authcontrollersigninoauth) | **POST** /v1/auth/signin-oauth | |
|[**authControllerSignupCompleteVerification**](#authcontrollersignupcompleteverification) | **POST** /v1/auth/signup-complete-verification | |

# **authControllerSignIn**
> SigninResponsePayload authControllerSignIn(signinDTO)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    SigninDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let signinDTO: SigninDTO; //

const { status, data } = await apiInstance.authControllerSignIn(
    signinDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **signinDTO** | **SigninDTO**|  | |


### Return type

**SigninResponsePayload**

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

# **authControllerSignUp**
> SignupResponsePayload authControllerSignUp(createAccountDTO)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    CreateAccountDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let createAccountDTO: CreateAccountDTO; //

const { status, data } = await apiInstance.authControllerSignUp(
    createAccountDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createAccountDTO** | **CreateAccountDTO**|  | |


### Return type

**SignupResponsePayload**

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

# **authControllerSigninOAuth**
> SigninResponsePayload authControllerSigninOAuth(oAuthSigninDTO)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    OAuthSigninDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let oAuthSigninDTO: OAuthSigninDTO; //

const { status, data } = await apiInstance.authControllerSigninOAuth(
    oAuthSigninDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **oAuthSigninDTO** | **OAuthSigninDTO**|  | |


### Return type

**SigninResponsePayload**

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

# **authControllerSignupCompleteVerification**
> SignupVerificationResponsePayload authControllerSignupCompleteVerification(completeSignupVerificationDTO)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    CompleteSignupVerificationDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let completeSignupVerificationDTO: CompleteSignupVerificationDTO; //

const { status, data } = await apiInstance.authControllerSignupCompleteVerification(
    completeSignupVerificationDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **completeSignupVerificationDTO** | **CompleteSignupVerificationDTO**|  | |


### Return type

**SignupVerificationResponsePayload**

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

