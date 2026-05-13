# BusinessPromotionApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**businessPromotionSubscriptionControllerFetchBusinessPromotionAds**](#businesspromotionsubscriptioncontrollerfetchbusinesspromotionads) | **GET** /v1/vendor/business-promotion/fetch-business-promotion-ads | |

# **businessPromotionSubscriptionControllerFetchBusinessPromotionAds**
> Array<BusinessPromotionAdInfo> businessPromotionSubscriptionControllerFetchBusinessPromotionAds()


### Example

```typescript
import {
    BusinessPromotionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BusinessPromotionApi(configuration);

const { status, data } = await apiInstance.businessPromotionSubscriptionControllerFetchBusinessPromotionAds();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<BusinessPromotionAdInfo>**

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

