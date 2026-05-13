# ProductApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**marketplaceControllerAddProductImpression**](#marketplacecontrolleraddproductimpression) | **POST** /v1/marketplace/product/add-impression | |
|[**marketplaceControllerAddReview**](#marketplacecontrolleraddreview) | **POST** /v1/marketplace/product/add-review | |
|[**marketplaceControllerFetchProductDescription**](#marketplacecontrollerfetchproductdescription) | **GET** /v1/marketplace/product | |
|[**marketplaceControllerFetchProductInfo**](#marketplacecontrollerfetchproductinfo) | **GET** /v1/marketplace/product/info | |
|[**marketplaceControllerRegisterCallSeller**](#marketplacecontrollerregistercallseller) | **POST** /v1/marketplace/product/register-call-seller | |
|[**marketplaceControllerRegisterContactSeller**](#marketplacecontrollerregistercontactseller) | **POST** /v1/marketplace/product/register-contact-seller | |
|[**marketplaceControllerRegisterViewProduct**](#marketplacecontrollerregisterviewproduct) | **POST** /v1/marketplace/product/register-view | |

# **marketplaceControllerAddProductImpression**
> marketplaceControllerAddProductImpression()


### Example

```typescript
import {
    ProductApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductApi(configuration);

let productId: number; //Product Id (default to undefined)

const { status, data } = await apiInstance.marketplaceControllerAddProductImpression(
    productId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**number**] | Product Id | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **marketplaceControllerAddReview**
> marketplaceControllerAddReview(addProductReviewDto)


### Example

```typescript
import {
    ProductApi,
    Configuration,
    AddProductReviewDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductApi(configuration);

let productId: number; //Product Id (default to undefined)
let addProductReviewDto: AddProductReviewDto; //

const { status, data } = await apiInstance.marketplaceControllerAddReview(
    productId,
    addProductReviewDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **addProductReviewDto** | **AddProductReviewDto**|  | |
| **productId** | [**number**] | Product Id | defaults to undefined|


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

# **marketplaceControllerFetchProductDescription**
> ProductInfo marketplaceControllerFetchProductDescription()


### Example

```typescript
import {
    ProductApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductApi(configuration);

let productId: string; //Formatted Product Id (default to undefined)

const { status, data } = await apiInstance.marketplaceControllerFetchProductDescription(
    productId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] | Formatted Product Id | defaults to undefined|


### Return type

**ProductInfo**

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

# **marketplaceControllerFetchProductInfo**
> ProductDetails marketplaceControllerFetchProductInfo()


### Example

```typescript
import {
    ProductApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductApi(configuration);

let productId: string; //Formatted Product Id (default to undefined)

const { status, data } = await apiInstance.marketplaceControllerFetchProductInfo(
    productId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**string**] | Formatted Product Id | defaults to undefined|


### Return type

**ProductDetails**

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

# **marketplaceControllerRegisterCallSeller**
> marketplaceControllerRegisterCallSeller()


### Example

```typescript
import {
    ProductApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductApi(configuration);

let productId: number; //Product Id (default to undefined)

const { status, data } = await apiInstance.marketplaceControllerRegisterCallSeller(
    productId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**number**] | Product Id | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **marketplaceControllerRegisterContactSeller**
> marketplaceControllerRegisterContactSeller()


### Example

```typescript
import {
    ProductApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductApi(configuration);

let productId: number; //Product Id (default to undefined)

const { status, data } = await apiInstance.marketplaceControllerRegisterContactSeller(
    productId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**number**] | Product Id | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **marketplaceControllerRegisterViewProduct**
> marketplaceControllerRegisterViewProduct()


### Example

```typescript
import {
    ProductApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductApi(configuration);

let productId: number; //Product Id (default to undefined)

const { status, data } = await apiInstance.marketplaceControllerRegisterViewProduct(
    productId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**number**] | Product Id | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

