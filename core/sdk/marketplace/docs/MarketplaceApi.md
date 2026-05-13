# MarketplaceApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**marketplaceControllerFetchFeedGrouped**](#marketplacecontrollerfetchfeedgrouped) | **GET** /v1/marketplace/feed-grouped | |
|[**marketplaceControllerFetchPopularProducts**](#marketplacecontrollerfetchpopularproducts) | **GET** /v1/marketplace/popular-products | |
|[**marketplaceControllerFetchProductsNearUser**](#marketplacecontrollerfetchproductsnearuser) | **GET** /v1/marketplace/products-near-user | |
|[**marketplaceControllerFetchRecommendedProducts**](#marketplacecontrollerfetchrecommendedproducts) | **GET** /v1/marketplace/recommended-products | |
|[**marketplaceControllerFetchSearchFeed**](#marketplacecontrollerfetchsearchfeed) | **GET** /v1/marketplace/search | |
|[**marketplaceControllerFetchSearchHints**](#marketplacecontrollerfetchsearchhints) | **GET** /v1/marketplace/search-hints | |

# **marketplaceControllerFetchFeedGrouped**
> GroupedProductsResponse marketplaceControllerFetchFeedGrouped()


### Example

```typescript
import {
    MarketplaceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MarketplaceApi(configuration);

let page: number; //Page (optional) (default to undefined)
let pageSize: number; //Page Size (optional) (default to undefined)

const { status, data } = await apiInstance.marketplaceControllerFetchFeedGrouped(
    page,
    pageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | Page | (optional) defaults to undefined|
| **pageSize** | [**number**] | Page Size | (optional) defaults to undefined|


### Return type

**GroupedProductsResponse**

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

# **marketplaceControllerFetchPopularProducts**
> ProductsResponse marketplaceControllerFetchPopularProducts()


### Example

```typescript
import {
    MarketplaceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MarketplaceApi(configuration);

let page: number; //Page (default to undefined)
let pageSize: number; //Page size (default to undefined)

const { status, data } = await apiInstance.marketplaceControllerFetchPopularProducts(
    page,
    pageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | Page | defaults to undefined|
| **pageSize** | [**number**] | Page size | defaults to undefined|


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

# **marketplaceControllerFetchProductsNearUser**
> ProductsResponse marketplaceControllerFetchProductsNearUser()


### Example

```typescript
import {
    MarketplaceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MarketplaceApi(configuration);

let page: number; //Page (default to undefined)
let pageSize: number; //Page size (default to undefined)

const { status, data } = await apiInstance.marketplaceControllerFetchProductsNearUser(
    page,
    pageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | Page | defaults to undefined|
| **pageSize** | [**number**] | Page size | defaults to undefined|


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

# **marketplaceControllerFetchRecommendedProducts**
> ProductsResponse marketplaceControllerFetchRecommendedProducts()


### Example

```typescript
import {
    MarketplaceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MarketplaceApi(configuration);

let page: number; //Page (default to undefined)
let pageSize: number; //Page size (default to undefined)

const { status, data } = await apiInstance.marketplaceControllerFetchRecommendedProducts(
    page,
    pageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | Page | defaults to undefined|
| **pageSize** | [**number**] | Page size | defaults to undefined|


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

# **marketplaceControllerFetchSearchFeed**
> ProductsResponse marketplaceControllerFetchSearchFeed()


### Example

```typescript
import {
    MarketplaceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MarketplaceApi(configuration);

let page: number; //Page (default to undefined)
let pageSize: number; //Page size (default to undefined)
let query: string; //Search query (optional) (default to undefined)
let state: string; //State (optional) (default to undefined)
let city: string; //City (optional) (default to undefined)
let category: string; //Category (optional) (default to undefined)
let inStock: boolean; //In Stock (optional) (default to undefined)
let isNegotiable: boolean; //Is Negotiable (optional) (default to undefined)
let latitude: number; //Latitude (optional) (default to undefined)
let longitude: number; //Longitude (optional) (default to undefined)

const { status, data } = await apiInstance.marketplaceControllerFetchSearchFeed(
    page,
    pageSize,
    query,
    state,
    city,
    category,
    inStock,
    isNegotiable,
    latitude,
    longitude
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | Page | defaults to undefined|
| **pageSize** | [**number**] | Page size | defaults to undefined|
| **query** | [**string**] | Search query | (optional) defaults to undefined|
| **state** | [**string**] | State | (optional) defaults to undefined|
| **city** | [**string**] | City | (optional) defaults to undefined|
| **category** | [**string**] | Category | (optional) defaults to undefined|
| **inStock** | [**boolean**] | In Stock | (optional) defaults to undefined|
| **isNegotiable** | [**boolean**] | Is Negotiable | (optional) defaults to undefined|
| **latitude** | [**number**] | Latitude | (optional) defaults to undefined|
| **longitude** | [**number**] | Longitude | (optional) defaults to undefined|


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

# **marketplaceControllerFetchSearchHints**
> Array<SearchHintInfo> marketplaceControllerFetchSearchHints()


### Example

```typescript
import {
    MarketplaceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MarketplaceApi(configuration);

let query: string; //Query (default to undefined)

const { status, data } = await apiInstance.marketplaceControllerFetchSearchHints(
    query
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **query** | [**string**] | Query | defaults to undefined|


### Return type

**Array<SearchHintInfo>**

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

