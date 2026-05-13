# AIApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authControllerTestGeminiAI**](#authcontrollertestgeminiai) | **POST** /v1/auth/test-gemini | |

# **authControllerTestGeminiAI**
> object authControllerTestGeminiAI()


### Example

```typescript
import {
    AIApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AIApi(configuration);

let query: string; //What do you want to ask the AI (default to undefined)

const { status, data } = await apiInstance.authControllerTestGeminiAI(
    query
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **query** | [**string**] | What do you want to ask the AI | defaults to undefined|


### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**409** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

