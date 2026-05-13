# NotificationApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authControllerTestFCMNotification**](#authcontrollertestfcmnotification) | **POST** /v1/auth/test | |

# **authControllerTestFCMNotification**
> authControllerTestFCMNotification()


### Example

```typescript
import {
    NotificationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationApi(configuration);

let token: string; //FCM token (optional) (default to undefined)

const { status, data } = await apiInstance.authControllerTestFCMNotification(
    token
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **token** | [**string**] | FCM token | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**409** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

