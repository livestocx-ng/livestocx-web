# MiscellaneousApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**marketplaceControllerFetchFormattedProductCategories**](#marketplacecontrollerfetchformattedproductcategories) | **GET** /v1/marketplace/product-categories/formatted | |
|[**marketplaceControllerFetchProductCategories**](#marketplacecontrollerfetchproductcategories) | **GET** /v1/marketplace/product-categories | |
|[**marketplaceControllerFetchProductCharacteristics**](#marketplacecontrollerfetchproductcharacteristics) | **GET** /v1/marketplace/product-characteristics | |

# **marketplaceControllerFetchFormattedProductCategories**
> Array<ProductCategoryInfo> marketplaceControllerFetchFormattedProductCategories()


### Example

```typescript
import {
    MiscellaneousApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MiscellaneousApi(configuration);

const { status, data } = await apiInstance.marketplaceControllerFetchFormattedProductCategories();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<ProductCategoryInfo>**

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

# **marketplaceControllerFetchProductCategories**
> Array<string> marketplaceControllerFetchProductCategories()


### Example

```typescript
import {
    MiscellaneousApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MiscellaneousApi(configuration);

const { status, data } = await apiInstance.marketplaceControllerFetchProductCategories();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<string>**

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

# **marketplaceControllerFetchProductCharacteristics**
> Array<ProductCharacteristicInfo> marketplaceControllerFetchProductCharacteristics()


### Example

```typescript
import {
    MiscellaneousApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MiscellaneousApi(configuration);

const { status, data } = await apiInstance.marketplaceControllerFetchProductCharacteristics();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<ProductCharacteristicInfo>**

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

