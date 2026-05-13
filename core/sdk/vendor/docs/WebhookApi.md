# WebhookApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**payableControllerPayableWebhookSession**](#payablecontrollerpayablewebhooksession) | **POST** /v1/vendor/payable/payable-callback-session | |

# **payableControllerPayableWebhookSession**
> payableControllerPayableWebhookSession()


### Example

```typescript
import {
    WebhookApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new WebhookApi(configuration);

const { status, data } = await apiInstance.payableControllerPayableWebhookSession();
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

