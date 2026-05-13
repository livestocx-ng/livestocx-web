# SubscriptionsApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**subscriptionControllerFetchSubscriptions**](#subscriptioncontrollerfetchsubscriptions) | **GET** /v1/vendor/subscription/me | |

# **subscriptionControllerFetchSubscriptions**
> Array<SubscriptionInfo> subscriptionControllerFetchSubscriptions()


### Example

```typescript
import {
    SubscriptionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SubscriptionsApi(configuration);

const { status, data } = await apiInstance.subscriptionControllerFetchSubscriptions();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<SubscriptionInfo>**

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

