# ProductApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**vendorProductControllerCreateProduct**](#vendorproductcontrollercreateproduct) | **POST** /v1/vendor/products/create | |
|[**vendorProductControllerDeleteProduct**](#vendorproductcontrollerdeleteproduct) | **DELETE** /v1/vendor/products/delete | |
|[**vendorProductControllerFetchProducts**](#vendorproductcontrollerfetchproducts) | **GET** /v1/vendor/products/me | |
|[**vendorProductControllerGenerateProductId**](#vendorproductcontrollergenerateproductid) | **GET** /v1/vendor/products/generate-product-id | |
|[**vendorProductControllerUpdateProduct**](#vendorproductcontrollerupdateproduct) | **PATCH** /v1/vendor/products/update | |

# **vendorProductControllerCreateProduct**
> VendorProductInfo vendorProductControllerCreateProduct(createProductDto)


### Example

```typescript
import {
    ProductApi,
    Configuration,
    CreateProductDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductApi(configuration);

let createProductDto: CreateProductDto; //

const { status, data } = await apiInstance.vendorProductControllerCreateProduct(
    createProductDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createProductDto** | **CreateProductDto**|  | |


### Return type

**VendorProductInfo**

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

# **vendorProductControllerDeleteProduct**
> boolean vendorProductControllerDeleteProduct()


### Example

```typescript
import {
    ProductApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductApi(configuration);

let productId: number; //Product Id (default to undefined)

const { status, data } = await apiInstance.vendorProductControllerDeleteProduct(
    productId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productId** | [**number**] | Product Id | defaults to undefined|


### Return type

**boolean**

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

# **vendorProductControllerFetchProducts**
> VendorProductsResponse vendorProductControllerFetchProducts()


### Example

```typescript
import {
    ProductApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductApi(configuration);

let page: number; //Page (default to undefined)
let pageSize: number; //Page size (default to undefined)

const { status, data } = await apiInstance.vendorProductControllerFetchProducts(
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

**VendorProductsResponse**

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

# **vendorProductControllerGenerateProductId**
> string vendorProductControllerGenerateProductId()


### Example

```typescript
import {
    ProductApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductApi(configuration);

const { status, data } = await apiInstance.vendorProductControllerGenerateProductId();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**string**

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

# **vendorProductControllerUpdateProduct**
> VendorProductInfo vendorProductControllerUpdateProduct(updateProductDto)


### Example

```typescript
import {
    ProductApi,
    Configuration,
    UpdateProductDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductApi(configuration);

let productId: number; //Product Id (default to undefined)
let updateProductDto: UpdateProductDto; //

const { status, data } = await apiInstance.vendorProductControllerUpdateProduct(
    productId,
    updateProductDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateProductDto** | **UpdateProductDto**|  | |
| **productId** | [**number**] | Product Id | defaults to undefined|


### Return type

**VendorProductInfo**

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

