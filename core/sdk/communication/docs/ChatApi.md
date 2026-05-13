# ChatApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**chatControllerCreateChatConversation**](#chatcontrollercreatechatconversation) | **POST** /v1/communication/chat/conversations/create | |
|[**chatControllerFetchAdminChatConversation**](#chatcontrollerfetchadminchatconversation) | **GET** /v1/communication/chat/conversation/admin | |
|[**chatControllerFetchChatConversation**](#chatcontrollerfetchchatconversation) | **GET** /v1/communication/chat/conversation | |
|[**chatControllerFetchChatConversationMessages**](#chatcontrollerfetchchatconversationmessages) | **GET** /v1/communication/chat/conversation/messages | |
|[**chatControllerFetchChatConversations**](#chatcontrollerfetchchatconversations) | **GET** /v1/communication/chat/conversations | |
|[**chatControllerReadChatConversationMessages**](#chatcontrollerreadchatconversationmessages) | **GET** /v1/communication/chat/conversation/messages/read | |

# **chatControllerCreateChatConversation**
> ChatConversationInfo chatControllerCreateChatConversation()


### Example

```typescript
import {
    ChatApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ChatApi(configuration);

let receiverId: number; // (default to undefined)

const { status, data } = await apiInstance.chatControllerCreateChatConversation(
    receiverId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **receiverId** | [**number**] |  | defaults to undefined|


### Return type

**ChatConversationInfo**

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

# **chatControllerFetchAdminChatConversation**
> ChatConversationInfo chatControllerFetchAdminChatConversation()


### Example

```typescript
import {
    ChatApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ChatApi(configuration);

const { status, data } = await apiInstance.chatControllerFetchAdminChatConversation();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ChatConversationInfo**

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

# **chatControllerFetchChatConversation**
> ChatConversationInfo chatControllerFetchChatConversation()


### Example

```typescript
import {
    ChatApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ChatApi(configuration);

let receiverId: number; // (default to undefined)

const { status, data } = await apiInstance.chatControllerFetchChatConversation(
    receiverId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **receiverId** | [**number**] |  | defaults to undefined|


### Return type

**ChatConversationInfo**

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

# **chatControllerFetchChatConversationMessages**
> Array<ChatMessageInfo> chatControllerFetchChatConversationMessages()


### Example

```typescript
import {
    ChatApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ChatApi(configuration);

let conversationId: number; // (default to undefined)

const { status, data } = await apiInstance.chatControllerFetchChatConversationMessages(
    conversationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **conversationId** | [**number**] |  | defaults to undefined|


### Return type

**Array<ChatMessageInfo>**

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

# **chatControllerFetchChatConversations**
> ChatConversationsResponse chatControllerFetchChatConversations()


### Example

```typescript
import {
    ChatApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ChatApi(configuration);

let page: number; // (default to undefined)
let pageSize: number; // (default to undefined)

const { status, data } = await apiInstance.chatControllerFetchChatConversations(
    page,
    pageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | defaults to undefined|
| **pageSize** | [**number**] |  | defaults to undefined|


### Return type

**ChatConversationsResponse**

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

# **chatControllerReadChatConversationMessages**
> chatControllerReadChatConversationMessages()


### Example

```typescript
import {
    ChatApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ChatApi(configuration);

let conversationId: number; // (default to undefined)

const { status, data } = await apiInstance.chatControllerReadChatConversationMessages(
    conversationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **conversationId** | [**number**] |  | defaults to undefined|


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

