# AddressHelperApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addressHelperControllerGetAvailableStates**](#addresshelpercontrollergetavailablestates) | **GET** /v1/auth/address-helper/available-states | |
|[**addressHelperControllerGetAvailableStates_0**](#addresshelpercontrollergetavailablestates_0) | **GET** /v1/auth/address-helper/available-states | |

# **addressHelperControllerGetAvailableStates**
> Array<AvailableStateInfo> addressHelperControllerGetAvailableStates()


### Example

```typescript
import {
    AddressHelperApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AddressHelperApi(configuration);

const { status, data } = await apiInstance.addressHelperControllerGetAvailableStates();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<AvailableStateInfo>**

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

# **addressHelperControllerGetAvailableStates_0**
> Array<AvailableStateInfo> addressHelperControllerGetAvailableStates_0()


### Example

```typescript
import {
    AddressHelperApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AddressHelperApi(configuration);

const { status, data } = await apiInstance.addressHelperControllerGetAvailableStates_0();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<AvailableStateInfo>**

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

