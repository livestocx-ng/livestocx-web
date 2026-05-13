# PromotionSubscriptionApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**promotionSubscriptionControllerCreatePromotionSubscription**](#promotionsubscriptioncontrollercreatepromotionsubscription) | **POST** /v1/vendor/promotions/create | |
|[**promotionSubscriptionControllerFetchProductsInfo**](#promotionsubscriptioncontrollerfetchproductsinfo) | **GET** /v1/vendor/promotions/products-info | |
|[**promotionSubscriptionControllerFetchPromotionPlans**](#promotionsubscriptioncontrollerfetchpromotionplans) | **GET** /v1/vendor/promotions/plans | |
|[**promotionSubscriptionControllerFetchUserProducts**](#promotionsubscriptioncontrollerfetchuserproducts) | **GET** /v1/vendor/promotions/products/me | |
|[**promotionSubscriptionControllerFetchUserPromotionPlan**](#promotionsubscriptioncontrollerfetchuserpromotionplan) | **GET** /v1/vendor/promotions/plan/me | |
|[**promotionSubscriptionControllerFetchUserPromotions**](#promotionsubscriptioncontrollerfetchuserpromotions) | **GET** /v1/vendor/promotions/me | |
|[**promotionSubscriptionControllerUpdateUserPromotionPlan**](#promotionsubscriptioncontrollerupdateuserpromotionplan) | **PATCH** /v1/vendor/promotions/plan/me | |

# **promotionSubscriptionControllerCreatePromotionSubscription**
> PromotionInfo promotionSubscriptionControllerCreatePromotionSubscription(createPromotionDto)


### Example

```typescript
import {
    PromotionSubscriptionApi,
    Configuration,
    CreatePromotionDto
} from './api';

const configuration = new Configuration();
const apiInstance = new PromotionSubscriptionApi(configuration);

let createPromotionDto: CreatePromotionDto; //

const { status, data } = await apiInstance.promotionSubscriptionControllerCreatePromotionSubscription(
    createPromotionDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createPromotionDto** | **CreatePromotionDto**|  | |


### Return type

**PromotionInfo**

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

# **promotionSubscriptionControllerFetchProductsInfo**
> Array<VendorProductInfo> promotionSubscriptionControllerFetchProductsInfo()


### Example

```typescript
import {
    PromotionSubscriptionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PromotionSubscriptionApi(configuration);

let productIds: string; //Product IDs (default to undefined)

const { status, data } = await apiInstance.promotionSubscriptionControllerFetchProductsInfo(
    productIds
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productIds** | [**string**] | Product IDs | defaults to undefined|


### Return type

**Array<VendorProductInfo>**

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

# **promotionSubscriptionControllerFetchPromotionPlans**
> Array<PromotionPlanDescription> promotionSubscriptionControllerFetchPromotionPlans()


### Example

```typescript
import {
    PromotionSubscriptionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PromotionSubscriptionApi(configuration);

const { status, data } = await apiInstance.promotionSubscriptionControllerFetchPromotionPlans();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<PromotionPlanDescription>**

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

# **promotionSubscriptionControllerFetchUserProducts**
> VendorProductsResponse promotionSubscriptionControllerFetchUserProducts()


### Example

```typescript
import {
    PromotionSubscriptionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PromotionSubscriptionApi(configuration);

let page: number; //Page number (default to undefined)
let pageSize: number; //Page size (default to undefined)

const { status, data } = await apiInstance.promotionSubscriptionControllerFetchUserProducts(
    page,
    pageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | Page number | defaults to undefined|
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

# **promotionSubscriptionControllerFetchUserPromotionPlan**
> UserPromotionPlanInfo promotionSubscriptionControllerFetchUserPromotionPlan()


### Example

```typescript
import {
    PromotionSubscriptionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PromotionSubscriptionApi(configuration);

const { status, data } = await apiInstance.promotionSubscriptionControllerFetchUserPromotionPlan();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserPromotionPlanInfo**

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

# **promotionSubscriptionControllerFetchUserPromotions**
> PromotionsInfo promotionSubscriptionControllerFetchUserPromotions()


### Example

```typescript
import {
    PromotionSubscriptionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PromotionSubscriptionApi(configuration);

const { status, data } = await apiInstance.promotionSubscriptionControllerFetchUserPromotions();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**PromotionsInfo**

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

# **promotionSubscriptionControllerUpdateUserPromotionPlan**
> UserPromotionPlanInfo promotionSubscriptionControllerUpdateUserPromotionPlan()


### Example

```typescript
import {
    PromotionSubscriptionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PromotionSubscriptionApi(configuration);

let planId: number; //Plan ID (default to undefined)

const { status, data } = await apiInstance.promotionSubscriptionControllerUpdateUserPromotionPlan(
    planId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **planId** | [**number**] | Plan ID | defaults to undefined|


### Return type

**UserPromotionPlanInfo**

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

