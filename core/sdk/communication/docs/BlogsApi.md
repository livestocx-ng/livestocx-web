# BlogsApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**blogControllerFetchBlogFeed**](#blogcontrollerfetchblogfeed) | **GET** /v1/communication/blogs/feed | |
|[**blogControllerFetchBlogInfo**](#blogcontrollerfetchbloginfo) | **GET** /v1/communication/blogs/info | |

# **blogControllerFetchBlogFeed**
> Array<BlogInfo> blogControllerFetchBlogFeed()


### Example

```typescript
import {
    BlogsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BlogsApi(configuration);

const { status, data } = await apiInstance.blogControllerFetchBlogFeed();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<BlogInfo>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **blogControllerFetchBlogInfo**
> BlogInfo blogControllerFetchBlogInfo()


### Example

```typescript
import {
    BlogsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BlogsApi(configuration);

let blogId: number; //The ID of the blog (default to undefined)

const { status, data } = await apiInstance.blogControllerFetchBlogInfo(
    blogId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **blogId** | [**number**] | The ID of the blog | defaults to undefined|


### Return type

**BlogInfo**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

