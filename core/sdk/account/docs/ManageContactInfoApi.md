# ManageContactInfoApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**accountControllerUpdateAccountEmail**](#accountcontrollerupdateaccountemail) | **POST** /v1/account/me/update-email | |
|[**accountControllerUpdateAccountLocation**](#accountcontrollerupdateaccountlocation) | **PATCH** /v1/account/me/update-location | |
|[**accountControllerUpdateAccountName**](#accountcontrollerupdateaccountname) | **PATCH** /v1/account/me/update-name | |
|[**accountControllerUpdateAccountPhone**](#accountcontrollerupdateaccountphone) | **PATCH** /v1/account/me/update-phone | |
|[**accountControllerVerifyNewAccountEmail**](#accountcontrollerverifynewaccountemail) | **PATCH** /v1/account/me/verify-new-email | |

# **accountControllerUpdateAccountEmail**
> accountControllerUpdateAccountEmail(updateAccountEmailDTO)


### Example

```typescript
import {
    ManageContactInfoApi,
    Configuration,
    UpdateAccountEmailDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new ManageContactInfoApi(configuration);

let updateAccountEmailDTO: UpdateAccountEmailDTO; //

const { status, data } = await apiInstance.accountControllerUpdateAccountEmail(
    updateAccountEmailDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateAccountEmailDTO** | **UpdateAccountEmailDTO**|  | |


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **accountControllerUpdateAccountLocation**
> AccountInfo accountControllerUpdateAccountLocation(updateAccountLocationDTO)


### Example

```typescript
import {
    ManageContactInfoApi,
    Configuration,
    UpdateAccountLocationDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new ManageContactInfoApi(configuration);

let updateAccountLocationDTO: UpdateAccountLocationDTO; //

const { status, data } = await apiInstance.accountControllerUpdateAccountLocation(
    updateAccountLocationDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateAccountLocationDTO** | **UpdateAccountLocationDTO**|  | |


### Return type

**AccountInfo**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **accountControllerUpdateAccountName**
> AccountInfo accountControllerUpdateAccountName(updateAccountNameDTO)


### Example

```typescript
import {
    ManageContactInfoApi,
    Configuration,
    UpdateAccountNameDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new ManageContactInfoApi(configuration);

let updateAccountNameDTO: UpdateAccountNameDTO; //

const { status, data } = await apiInstance.accountControllerUpdateAccountName(
    updateAccountNameDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateAccountNameDTO** | **UpdateAccountNameDTO**|  | |


### Return type

**AccountInfo**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **accountControllerUpdateAccountPhone**
> AccountInfo accountControllerUpdateAccountPhone(updateAccountPhoneDTO)


### Example

```typescript
import {
    ManageContactInfoApi,
    Configuration,
    UpdateAccountPhoneDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new ManageContactInfoApi(configuration);

let updateAccountPhoneDTO: UpdateAccountPhoneDTO; //

const { status, data } = await apiInstance.accountControllerUpdateAccountPhone(
    updateAccountPhoneDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateAccountPhoneDTO** | **UpdateAccountPhoneDTO**|  | |


### Return type

**AccountInfo**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **accountControllerVerifyNewAccountEmail**
> AccountInfo accountControllerVerifyNewAccountEmail(verifyNewAccountEmailDTO)


### Example

```typescript
import {
    ManageContactInfoApi,
    Configuration,
    VerifyNewAccountEmailDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new ManageContactInfoApi(configuration);

let verifyNewAccountEmailDTO: VerifyNewAccountEmailDTO; //

const { status, data } = await apiInstance.accountControllerVerifyNewAccountEmail(
    verifyNewAccountEmailDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **verifyNewAccountEmailDTO** | **VerifyNewAccountEmailDTO**|  | |


### Return type

**AccountInfo**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

