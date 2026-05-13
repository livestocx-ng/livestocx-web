# ProductUploadSubscriptionApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**productUploadSubscriptionControllerCreateProductUploadSubscriptionPlan**](#productuploadsubscriptioncontrollercreateproductuploadsubscriptionplan) | **POST** /v1/vendor/product-upload/create | |
|[**productUploadSubscriptionControllerFetchProductUploadSubscriptionPlan**](#productuploadsubscriptioncontrollerfetchproductuploadsubscriptionplan) | **GET** /v1/vendor/product-upload/plan | |
|[**productUploadSubscriptionControllerFetchProductUploadSubscriptionPlans**](#productuploadsubscriptioncontrollerfetchproductuploadsubscriptionplans) | **GET** /v1/vendor/product-upload/plans | |
|[**productUploadSubscriptionControllerFetchUserProductUploadSubscription**](#productuploadsubscriptioncontrollerfetchuserproductuploadsubscription) | **GET** /v1/vendor/product-upload/me | |

# **productUploadSubscriptionControllerCreateProductUploadSubscriptionPlan**
> AccountInfo productUploadSubscriptionControllerCreateProductUploadSubscriptionPlan(createProductUploadSubscriptionDto)


### Example

```typescript
import {
    ProductUploadSubscriptionApi,
    Configuration,
    CreateProductUploadSubscriptionDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductUploadSubscriptionApi(configuration);

let plan: number; //Plan ID (default to undefined)
let createProductUploadSubscriptionDto: CreateProductUploadSubscriptionDto; //

const { status, data } = await apiInstance.productUploadSubscriptionControllerCreateProductUploadSubscriptionPlan(
    plan,
    createProductUploadSubscriptionDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createProductUploadSubscriptionDto** | **CreateProductUploadSubscriptionDto**|  | |
| **plan** | [**number**] | Plan ID | defaults to undefined|


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

# **productUploadSubscriptionControllerFetchProductUploadSubscriptionPlan**
> ProductUploadSubscriptionPlanInfo productUploadSubscriptionControllerFetchProductUploadSubscriptionPlan()


### Example

```typescript
import {
    ProductUploadSubscriptionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductUploadSubscriptionApi(configuration);

const { status, data } = await apiInstance.productUploadSubscriptionControllerFetchProductUploadSubscriptionPlan();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ProductUploadSubscriptionPlanInfo**

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

# **productUploadSubscriptionControllerFetchProductUploadSubscriptionPlans**
> Array<ProductUploadSubscriptionPlanInfo> productUploadSubscriptionControllerFetchProductUploadSubscriptionPlans()


### Example

```typescript
import {
    ProductUploadSubscriptionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductUploadSubscriptionApi(configuration);

const { status, data } = await apiInstance.productUploadSubscriptionControllerFetchProductUploadSubscriptionPlans();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<ProductUploadSubscriptionPlanInfo>**

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

# **productUploadSubscriptionControllerFetchUserProductUploadSubscription**
> ProductUploadSubscriptionInfo productUploadSubscriptionControllerFetchUserProductUploadSubscription()


### Example

```typescript
import {
    ProductUploadSubscriptionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductUploadSubscriptionApi(configuration);

const { status, data } = await apiInstance.productUploadSubscriptionControllerFetchUserProductUploadSubscription();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ProductUploadSubscriptionInfo**

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

