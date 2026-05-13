# PremiumSubscriptionApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**premiumSubscriptionControllerCreatePremiumSubscription**](#premiumsubscriptioncontrollercreatepremiumsubscription) | **POST** /v1/vendor/premium-subscription/create | |
|[**premiumSubscriptionControllerFetchPremiumSubscriptionPlans**](#premiumsubscriptioncontrollerfetchpremiumsubscriptionplans) | **GET** /v1/vendor/premium-subscription/plans | |
|[**premiumSubscriptionControllerFetchUserPremiumSubscription**](#premiumsubscriptioncontrollerfetchuserpremiumsubscription) | **GET** /v1/vendor/premium-subscription/me | |
|[**premiumSubscriptionControllerRegisterSubscriptionInquiry**](#premiumsubscriptioncontrollerregistersubscriptioninquiry) | **POST** /v1/vendor/premium-subscription/register-inquiry | |
|[**premiumSubscriptionControllerUpdateVendorProfile**](#premiumsubscriptioncontrollerupdatevendorprofile) | **PATCH** /v1/vendor/premium-subscription/update-vendor-profile | |

# **premiumSubscriptionControllerCreatePremiumSubscription**
> PremiumSubscriptionResponse premiumSubscriptionControllerCreatePremiumSubscription(createPremiumSubscriptionDto)


### Example

```typescript
import {
    PremiumSubscriptionApi,
    Configuration,
    CreatePremiumSubscriptionDto
} from './api';

const configuration = new Configuration();
const apiInstance = new PremiumSubscriptionApi(configuration);

let plan: number; //Plan ID (default to undefined)
let createPremiumSubscriptionDto: CreatePremiumSubscriptionDto; //

const { status, data } = await apiInstance.premiumSubscriptionControllerCreatePremiumSubscription(
    plan,
    createPremiumSubscriptionDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createPremiumSubscriptionDto** | **CreatePremiumSubscriptionDto**|  | |
| **plan** | [**number**] | Plan ID | defaults to undefined|


### Return type

**PremiumSubscriptionResponse**

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

# **premiumSubscriptionControllerFetchPremiumSubscriptionPlans**
> Array<PremiumSubscriptionPlanDescription> premiumSubscriptionControllerFetchPremiumSubscriptionPlans()


### Example

```typescript
import {
    PremiumSubscriptionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PremiumSubscriptionApi(configuration);

const { status, data } = await apiInstance.premiumSubscriptionControllerFetchPremiumSubscriptionPlans();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<PremiumSubscriptionPlanDescription>**

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

# **premiumSubscriptionControllerFetchUserPremiumSubscription**
> PremiumSubscriptionInfo premiumSubscriptionControllerFetchUserPremiumSubscription()


### Example

```typescript
import {
    PremiumSubscriptionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PremiumSubscriptionApi(configuration);

const { status, data } = await apiInstance.premiumSubscriptionControllerFetchUserPremiumSubscription();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**PremiumSubscriptionInfo**

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

# **premiumSubscriptionControllerRegisterSubscriptionInquiry**
> premiumSubscriptionControllerRegisterSubscriptionInquiry()


### Example

```typescript
import {
    PremiumSubscriptionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PremiumSubscriptionApi(configuration);

const { status, data } = await apiInstance.premiumSubscriptionControllerRegisterSubscriptionInquiry();
```

### Parameters
This endpoint does not have any parameters.


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

# **premiumSubscriptionControllerUpdateVendorProfile**
> VendorInfo premiumSubscriptionControllerUpdateVendorProfile(premiumSubscriptionUpdateVendorProfileDto)


### Example

```typescript
import {
    PremiumSubscriptionApi,
    Configuration,
    PremiumSubscriptionUpdateVendorProfileDto
} from './api';

const configuration = new Configuration();
const apiInstance = new PremiumSubscriptionApi(configuration);

let plan: number; //Plan ID (default to undefined)
let premiumSubscriptionUpdateVendorProfileDto: PremiumSubscriptionUpdateVendorProfileDto; //

const { status, data } = await apiInstance.premiumSubscriptionControllerUpdateVendorProfile(
    plan,
    premiumSubscriptionUpdateVendorProfileDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **premiumSubscriptionUpdateVendorProfileDto** | **PremiumSubscriptionUpdateVendorProfileDto**|  | |
| **plan** | [**number**] | Plan ID | defaults to undefined|


### Return type

**VendorInfo**

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

