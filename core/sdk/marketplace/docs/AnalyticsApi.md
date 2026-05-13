# AnalyticsApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**analyticsControllerRegisterSearchEventContactMethod**](#analyticscontrollerregistersearcheventcontactmethod) | **PATCH** /v1/marketplace/register-search-event-contact-method | |
|[**analyticsControllerRegisterSearchEventProduct**](#analyticscontrollerregistersearcheventproduct) | **PATCH** /v1/marketplace/register-search-event-product | |

# **analyticsControllerRegisterSearchEventContactMethod**
> analyticsControllerRegisterSearchEventContactMethod(registerSearchEventContactMethodDTO)


### Example

```typescript
import {
    AnalyticsApi,
    Configuration,
    RegisterSearchEventContactMethodDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new AnalyticsApi(configuration);

let registerSearchEventContactMethodDTO: RegisterSearchEventContactMethodDTO; //

const { status, data } = await apiInstance.analyticsControllerRegisterSearchEventContactMethod(
    registerSearchEventContactMethodDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **registerSearchEventContactMethodDTO** | **RegisterSearchEventContactMethodDTO**|  | |


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

# **analyticsControllerRegisterSearchEventProduct**
> analyticsControllerRegisterSearchEventProduct(registerSearchEventProductDTO)


### Example

```typescript
import {
    AnalyticsApi,
    Configuration,
    RegisterSearchEventProductDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new AnalyticsApi(configuration);

let registerSearchEventProductDTO: RegisterSearchEventProductDTO; //

const { status, data } = await apiInstance.analyticsControllerRegisterSearchEventProduct(
    registerSearchEventProductDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **registerSearchEventProductDTO** | **RegisterSearchEventProductDTO**|  | |


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

