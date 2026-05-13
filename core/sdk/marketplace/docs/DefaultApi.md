# DefaultApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**marketplaceControllerFetchHomeFeed**](#marketplacecontrollerfetchhomefeed) | **GET** /v1/marketplace/home-feed | |

# **marketplaceControllerFetchHomeFeed**
> ProductsResponse marketplaceControllerFetchHomeFeed()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let page: number; //Page (default to undefined)
let pageSize: number; //Page Size (default to undefined)

const { status, data } = await apiInstance.marketplaceControllerFetchHomeFeed(
    page,
    pageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | Page | defaults to undefined|
| **pageSize** | [**number**] | Page Size | defaults to undefined|


### Return type

**ProductsResponse**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

