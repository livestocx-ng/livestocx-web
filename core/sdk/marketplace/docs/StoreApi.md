# StoreApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**storeControllerFetchStoreProducts**](#storecontrollerfetchstoreproducts) | **GET** /v1/marketplace/store/profile/products | |
|[**storeControllerFetchStoreProfile**](#storecontrollerfetchstoreprofile) | **GET** /v1/marketplace/store/profile | |

# **storeControllerFetchStoreProducts**
> ProductsResponse storeControllerFetchStoreProducts()


### Example

```typescript
import {
    StoreApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StoreApi(configuration);

let page: number; // (default to undefined)
let storeId: number; // (default to undefined)
let pageSize: number; // (default to undefined)

const { status, data } = await apiInstance.storeControllerFetchStoreProducts(
    page,
    storeId,
    pageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | defaults to undefined|
| **storeId** | [**number**] |  | defaults to undefined|
| **pageSize** | [**number**] |  | defaults to undefined|


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

# **storeControllerFetchStoreProfile**
> StoreInfo storeControllerFetchStoreProfile()


### Example

```typescript
import {
    StoreApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StoreApi(configuration);

let slug: string; // (default to undefined)

const { status, data } = await apiInstance.storeControllerFetchStoreProfile(
    slug
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **slug** | [**string**] |  | defaults to undefined|


### Return type

**StoreInfo**

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

