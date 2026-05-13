# PayableApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**payableControllerInitializePremiumSubscriptionTransferSession**](#payablecontrollerinitializepremiumsubscriptiontransfersession) | **POST** /v1/vendor/payable/initialize-premium-transfer-session | |
|[**payableControllerInitializeProductUploadSubscriptionTransferSession**](#payablecontrollerinitializeproductuploadsubscriptiontransfersession) | **POST** /v1/vendor/payable/initialize-product-upload-transfer-session | |
|[**payableControllerInitializePromotionSubscriptionTransferSession**](#payablecontrollerinitializepromotionsubscriptiontransfersession) | **POST** /v1/vendor/payable/initialize-promotion-transfer-session | |
|[**payableControllerVerifyPaymentSession**](#payablecontrollerverifypaymentsession) | **GET** /v1/vendor/payable/verify-payment-session | |

# **payableControllerInitializePremiumSubscriptionTransferSession**
> ChargeResponse payableControllerInitializePremiumSubscriptionTransferSession()


### Example

```typescript
import {
    PayableApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PayableApi(configuration);

let planId: number; // (default to undefined)

const { status, data } = await apiInstance.payableControllerInitializePremiumSubscriptionTransferSession(
    planId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **planId** | [**number**] |  | defaults to undefined|


### Return type

**ChargeResponse**

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

# **payableControllerInitializeProductUploadSubscriptionTransferSession**
> ChargeResponse payableControllerInitializeProductUploadSubscriptionTransferSession()


### Example

```typescript
import {
    PayableApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PayableApi(configuration);

let planId: number; // (default to undefined)

const { status, data } = await apiInstance.payableControllerInitializeProductUploadSubscriptionTransferSession(
    planId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **planId** | [**number**] |  | defaults to undefined|


### Return type

**ChargeResponse**

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

# **payableControllerInitializePromotionSubscriptionTransferSession**
> ChargeResponse payableControllerInitializePromotionSubscriptionTransferSession()


### Example

```typescript
import {
    PayableApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PayableApi(configuration);

let planId: number; // (default to undefined)
let productIds: Array<string>; // (default to undefined)

const { status, data } = await apiInstance.payableControllerInitializePromotionSubscriptionTransferSession(
    planId,
    productIds
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **planId** | [**number**] |  | defaults to undefined|
| **productIds** | **Array&lt;string&gt;** |  | defaults to undefined|


### Return type

**ChargeResponse**

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

# **payableControllerVerifyPaymentSession**
> VerifyPaymentSessionResponse payableControllerVerifyPaymentSession()


### Example

```typescript
import {
    PayableApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PayableApi(configuration);

let paymentReference: string; // (default to undefined)

const { status, data } = await apiInstance.payableControllerVerifyPaymentSession(
    paymentReference
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **paymentReference** | [**string**] |  | defaults to undefined|


### Return type

**VerifyPaymentSessionResponse**

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

