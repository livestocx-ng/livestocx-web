# NotificationsApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**accountNotificationControllerGetNotifications**](#accountnotificationcontrollergetnotifications) | **GET** /v1/account/notifications | |
|[**accountNotificationControllerReadNotification**](#accountnotificationcontrollerreadnotification) | **PATCH** /v1/account/notifications/read | |

# **accountNotificationControllerGetNotifications**
> NotificationsResponse accountNotificationControllerGetNotifications()


### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

let page: number; // (optional) (default to undefined)
let pageSize: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.accountNotificationControllerGetNotifications(
    page,
    pageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **pageSize** | [**number**] |  | (optional) defaults to undefined|


### Return type

**NotificationsResponse**

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

# **accountNotificationControllerReadNotification**
> NotificationInfo accountNotificationControllerReadNotification()


### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

let notificationId: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.accountNotificationControllerReadNotification(
    notificationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **notificationId** | [**number**] |  | (optional) defaults to undefined|


### Return type

**NotificationInfo**

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

