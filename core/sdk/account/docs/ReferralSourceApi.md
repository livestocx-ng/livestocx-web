# ReferralSourceApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**accountControllerUpdateAccountInfo**](#accountcontrollerupdateaccountinfo) | **PATCH** /v1/account/me/update-referral-source | |

# **accountControllerUpdateAccountInfo**
> AccountInfo accountControllerUpdateAccountInfo()


### Example

```typescript
import {
    ReferralSourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReferralSourceApi(configuration);

let referralSource: string; //Referral Source e.g Facebook, Twitter (default to undefined)

const { status, data } = await apiInstance.accountControllerUpdateAccountInfo(
    referralSource
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **referralSource** | [**string**] | Referral Source e.g Facebook, Twitter | defaults to undefined|


### Return type

**AccountInfo**

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

