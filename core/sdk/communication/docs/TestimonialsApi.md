# TestimonialsApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**testimonialControllerFetchTestimonialsFeed**](#testimonialcontrollerfetchtestimonialsfeed) | **GET** /v1/communication/testimonials/feed | |

# **testimonialControllerFetchTestimonialsFeed**
> Array<TestimonialInfo> testimonialControllerFetchTestimonialsFeed()


### Example

```typescript
import {
    TestimonialsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TestimonialsApi(configuration);

const { status, data } = await apiInstance.testimonialControllerFetchTestimonialsFeed();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<TestimonialInfo>**

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

