# DiscussionsApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**discussionControllerAddDiscussionComment**](#discussioncontrolleradddiscussioncomment) | **POST** /v1/communication/discussions/add-comment | |
|[**discussionControllerAddDiscussionReaction**](#discussioncontrolleradddiscussionreaction) | **POST** /v1/communication/discussions/add-reaction | |
|[**discussionControllerCreateDiscussion**](#discussioncontrollercreatediscussion) | **POST** /v1/communication/discussions/create | |
|[**discussionControllerFetchDiscussionComments**](#discussioncontrollerfetchdiscussioncomments) | **GET** /v1/communication/discussions/comments | |
|[**discussionControllerFetchDiscussionReactions**](#discussioncontrollerfetchdiscussionreactions) | **GET** /v1/communication/discussions/reactions | |
|[**discussionControllerFetchDiscussionsByCategory**](#discussioncontrollerfetchdiscussionsbycategory) | **GET** /v1/communication/discussions/feed/category | |
|[**discussionControllerFetchDiscussionsFeed**](#discussioncontrollerfetchdiscussionsfeed) | **GET** /v1/communication/discussions/feed | |
|[**discussionControllerSearchDiscussions**](#discussioncontrollersearchdiscussions) | **GET** /v1/communication/discussions/search | |

# **discussionControllerAddDiscussionComment**
> DiscussionCommentInfo discussionControllerAddDiscussionComment(addDiscussionCommentDto)


### Example

```typescript
import {
    DiscussionsApi,
    Configuration,
    AddDiscussionCommentDto
} from './api';

const configuration = new Configuration();
const apiInstance = new DiscussionsApi(configuration);

let discussionId: number; // (default to undefined)
let addDiscussionCommentDto: AddDiscussionCommentDto; //

const { status, data } = await apiInstance.discussionControllerAddDiscussionComment(
    discussionId,
    addDiscussionCommentDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **addDiscussionCommentDto** | **AddDiscussionCommentDto**|  | |
| **discussionId** | [**number**] |  | defaults to undefined|


### Return type

**DiscussionCommentInfo**

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

# **discussionControllerAddDiscussionReaction**
> DiscussionInfo discussionControllerAddDiscussionReaction()


### Example

```typescript
import {
    DiscussionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DiscussionsApi(configuration);

let discussionId: number; // (default to undefined)

const { status, data } = await apiInstance.discussionControllerAddDiscussionReaction(
    discussionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **discussionId** | [**number**] |  | defaults to undefined|


### Return type

**DiscussionInfo**

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

# **discussionControllerCreateDiscussion**
> DiscussionInfo discussionControllerCreateDiscussion(createDiscussionDto)


### Example

```typescript
import {
    DiscussionsApi,
    Configuration,
    CreateDiscussionDto
} from './api';

const configuration = new Configuration();
const apiInstance = new DiscussionsApi(configuration);

let createDiscussionDto: CreateDiscussionDto; //

const { status, data } = await apiInstance.discussionControllerCreateDiscussion(
    createDiscussionDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createDiscussionDto** | **CreateDiscussionDto**|  | |


### Return type

**DiscussionInfo**

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

# **discussionControllerFetchDiscussionComments**
> DiscussionCommentsResponse discussionControllerFetchDiscussionComments()


### Example

```typescript
import {
    DiscussionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DiscussionsApi(configuration);

let discussionId: number; // (default to undefined)

const { status, data } = await apiInstance.discussionControllerFetchDiscussionComments(
    discussionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **discussionId** | [**number**] |  | defaults to undefined|


### Return type

**DiscussionCommentsResponse**

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

# **discussionControllerFetchDiscussionReactions**
> Array<DiscussionReactionInfo> discussionControllerFetchDiscussionReactions()


### Example

```typescript
import {
    DiscussionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DiscussionsApi(configuration);

let discussionId: number; // (default to undefined)

const { status, data } = await apiInstance.discussionControllerFetchDiscussionReactions(
    discussionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **discussionId** | [**number**] |  | defaults to undefined|


### Return type

**Array<DiscussionReactionInfo>**

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

# **discussionControllerFetchDiscussionsByCategory**
> DiscussionsResponse discussionControllerFetchDiscussionsByCategory()


### Example

```typescript
import {
    DiscussionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DiscussionsApi(configuration);

let page: number; // (default to undefined)
let pageSize: number; // (default to undefined)
let category: string; // (default to undefined)

const { status, data } = await apiInstance.discussionControllerFetchDiscussionsByCategory(
    page,
    pageSize,
    category
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | defaults to undefined|
| **pageSize** | [**number**] |  | defaults to undefined|
| **category** | [**string**] |  | defaults to undefined|


### Return type

**DiscussionsResponse**

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

# **discussionControllerFetchDiscussionsFeed**
> DiscussionsResponse discussionControllerFetchDiscussionsFeed()


### Example

```typescript
import {
    DiscussionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DiscussionsApi(configuration);

let page: number; // (default to undefined)
let pageSize: number; // (default to undefined)

const { status, data } = await apiInstance.discussionControllerFetchDiscussionsFeed(
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

**DiscussionsResponse**

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

# **discussionControllerSearchDiscussions**
> DiscussionsResponse discussionControllerSearchDiscussions()


### Example

```typescript
import {
    DiscussionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DiscussionsApi(configuration);

let page: number; // (default to undefined)
let pageSize: number; // (default to undefined)
let query: string; // (default to undefined)
let category: string; // (default to undefined)

const { status, data } = await apiInstance.discussionControllerSearchDiscussions(
    page,
    pageSize,
    query,
    category
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | defaults to undefined|
| **pageSize** | [**number**] |  | defaults to undefined|
| **query** | [**string**] |  | defaults to undefined|
| **category** | [**string**] |  | defaults to undefined|


### Return type

**DiscussionsResponse**

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

