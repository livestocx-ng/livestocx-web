# UploadApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**imageUploadControllerUploadFile**](#imageuploadcontrolleruploadfile) | **POST** /v1/account/upload/file | Upload an file|
|[**imageUploadControllerUploadImage**](#imageuploadcontrolleruploadimage) | **POST** /v1/account/upload/image | Upload an image with optional resizing|

# **imageUploadControllerUploadFile**
> FileUploadResult imageUploadControllerUploadFile()


### Example

```typescript
import {
    UploadApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UploadApi(configuration);

let fileName: string; //The name of the file (optional) (default to undefined)
let file: File; // (optional) (default to undefined)

const { status, data } = await apiInstance.imageUploadControllerUploadFile(
    fileName,
    file
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **fileName** | [**string**] | The name of the file | (optional) defaults to undefined|
| **file** | [**File**] |  | (optional) defaults to undefined|


### Return type

**FileUploadResult**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**0** | File uploaded successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **imageUploadControllerUploadImage**
> FileUploadResult imageUploadControllerUploadImage()


### Example

```typescript
import {
    UploadApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UploadApi(configuration);

let type: 'thumbnail' | 'logo' | 'product-image' | 'cover-image' | 'medium' | 'large'; // (optional) (default to undefined)
let fileName: string; //The name of the file (optional) (default to undefined)
let file: File; // (optional) (default to undefined)

const { status, data } = await apiInstance.imageUploadControllerUploadImage(
    type,
    fileName,
    file
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **type** | [**&#39;thumbnail&#39; | &#39;logo&#39; | &#39;product-image&#39; | &#39;cover-image&#39; | &#39;medium&#39; | &#39;large&#39;**]**Array<&#39;thumbnail&#39; &#124; &#39;logo&#39; &#124; &#39;product-image&#39; &#124; &#39;cover-image&#39; &#124; &#39;medium&#39; &#124; &#39;large&#39;>** |  | (optional) defaults to undefined|
| **fileName** | [**string**] | The name of the file | (optional) defaults to undefined|
| **file** | [**File**] |  | (optional) defaults to undefined|


### Return type

**FileUploadResult**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**0** | Image uploaded successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

