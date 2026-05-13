# HelperApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**helperControllerFetchReferralSources**](#helpercontrollerfetchreferralsources) | **GET** /v1/auth/helper/referral-sources | |
|[**helperControllerFetchReferralSources_0**](#helpercontrollerfetchreferralsources_0) | **GET** /v1/auth/helper/referral-sources | |

# **helperControllerFetchReferralSources**
> Array<string> helperControllerFetchReferralSources()


### Example

```typescript
import {
    HelperApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new HelperApi(configuration);

const { status, data } = await apiInstance.helperControllerFetchReferralSources();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<string>**

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

# **helperControllerFetchReferralSources_0**
> Array<string> helperControllerFetchReferralSources_0()


### Example

```typescript
import {
    HelperApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new HelperApi(configuration);

const { status, data } = await apiInstance.helperControllerFetchReferralSources_0();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<string>**

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

