# HelpersApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authHelperControllerCheckEmailAvailability**](#authhelpercontrollercheckemailavailability) | **GET** /v1/auth/helper/availability/email | |
|[**authHelperControllerGenerateVendorId**](#authhelpercontrollergeneratevendorid) | **GET** /v1/auth/helper/accounts/generate-vendor-id | |
|[**authHelperControllerUpdateAccountLocation**](#authhelpercontrollerupdateaccountlocation) | **GET** /v1/auth/helper/accounts/update-location | |
|[**authHelperControllerUpdateAccountStatus**](#authhelpercontrollerupdateaccountstatus) | **GET** /v1/auth/helper/accounts/update-status | |
|[**authHelperControllerUpdateVendorsInfo**](#authhelpercontrollerupdatevendorsinfo) | **GET** /v1/auth/helper/accounts/update-vendors-info | |

# **authHelperControllerCheckEmailAvailability**
> AvailabilityCheckInfo authHelperControllerCheckEmailAvailability()


### Example

```typescript
import {
    HelpersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new HelpersApi(configuration);

let email: string; // (default to undefined)

const { status, data } = await apiInstance.authHelperControllerCheckEmailAvailability(
    email
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **email** | [**string**] |  | defaults to undefined|


### Return type

**AvailabilityCheckInfo**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**409** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authHelperControllerGenerateVendorId**
> string authHelperControllerGenerateVendorId()


### Example

```typescript
import {
    HelpersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new HelpersApi(configuration);

const { status, data } = await apiInstance.authHelperControllerGenerateVendorId();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**409** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authHelperControllerUpdateAccountLocation**
> authHelperControllerUpdateAccountLocation()


### Example

```typescript
import {
    HelpersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new HelpersApi(configuration);

const { status, data } = await apiInstance.authHelperControllerUpdateAccountLocation();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**409** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authHelperControllerUpdateAccountStatus**
> authHelperControllerUpdateAccountStatus()


### Example

```typescript
import {
    HelpersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new HelpersApi(configuration);

const { status, data } = await apiInstance.authHelperControllerUpdateAccountStatus();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**409** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authHelperControllerUpdateVendorsInfo**
> authHelperControllerUpdateVendorsInfo()


### Example

```typescript
import {
    HelpersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new HelpersApi(configuration);

const { status, data } = await apiInstance.authHelperControllerUpdateVendorsInfo();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**409** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

