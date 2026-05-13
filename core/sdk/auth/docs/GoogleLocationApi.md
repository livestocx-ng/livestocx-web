# GoogleLocationApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**googleLocationControllerFetchLocationInfo**](#googlelocationcontrollerfetchlocationinfo) | **GET** /v1/auth/google-location/fetch-location-info | |
|[**googleLocationControllerFetchLocationInfo_0**](#googlelocationcontrollerfetchlocationinfo_0) | **GET** /v1/auth/google-location/fetch-location-info | |

# **googleLocationControllerFetchLocationInfo**
> GooglePlaceInfo googleLocationControllerFetchLocationInfo()


### Example

```typescript
import {
    GoogleLocationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GoogleLocationApi(configuration);

let latitude: number; // (default to undefined)
let longitude: number; // (default to undefined)

const { status, data } = await apiInstance.googleLocationControllerFetchLocationInfo(
    latitude,
    longitude
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **latitude** | [**number**] |  | defaults to undefined|
| **longitude** | [**number**] |  | defaults to undefined|


### Return type

**GooglePlaceInfo**

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

# **googleLocationControllerFetchLocationInfo_0**
> GooglePlaceInfo googleLocationControllerFetchLocationInfo_0()


### Example

```typescript
import {
    GoogleLocationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GoogleLocationApi(configuration);

let latitude: number; // (default to undefined)
let longitude: number; // (default to undefined)

const { status, data } = await apiInstance.googleLocationControllerFetchLocationInfo_0(
    latitude,
    longitude
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **latitude** | [**number**] |  | defaults to undefined|
| **longitude** | [**number**] |  | defaults to undefined|


### Return type

**GooglePlaceInfo**

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

