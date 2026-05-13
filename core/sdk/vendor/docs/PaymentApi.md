# PaymentApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**paymentControllerFetchPaymentMethods**](#paymentcontrollerfetchpaymentmethods) | **GET** /v1/vendor/payment/payment-methods | |
|[**paymentControllerInitializePostAdSubscription**](#paymentcontrollerinitializepostadsubscription) | **POST** /v1/vendor/payment/initialize-product-upload-payment-session | |
|[**paymentControllerInitializePremiumSubscription**](#paymentcontrollerinitializepremiumsubscription) | **POST** /v1/vendor/payment/initialize-premium-payment-session | |
|[**paymentControllerInitializePremiumSubscriptionTransferSession**](#paymentcontrollerinitializepremiumsubscriptiontransfersession) | **POST** /v1/vendor/payment/initialize-premium-transfer-session | |
|[**paymentControllerInitializeProductUploadTransferSession**](#paymentcontrollerinitializeproductuploadtransfersession) | **POST** /v1/vendor/payment/initialize-product-upload-transfer-session | |
|[**paymentControllerInitializePromotionSubscription**](#paymentcontrollerinitializepromotionsubscription) | **POST** /v1/vendor/payment/initialize-promotion-payment-session | |
|[**paymentControllerInitializePromotionTransferSession**](#paymentcontrollerinitializepromotiontransfersession) | **POST** /v1/vendor/payment/initialize-promotion-transfer-session | |
|[**paymentControllerUnsuccessfulPaymentFeedback**](#paymentcontrollerunsuccessfulpaymentfeedback) | **POST** /v1/vendor/payment/unsuccessful-payment-feedback | |
|[**paymentControllerVerifyBankPaymentTransfer**](#paymentcontrollerverifybankpaymenttransfer) | **GET** /v1/vendor/payment/verify-payment-transfer | |
|[**paymentControllerVerifyPaymentSession**](#paymentcontrollerverifypaymentsession) | **GET** /v1/vendor/payment/verify-payment-session | |

# **paymentControllerFetchPaymentMethods**
> Array<PaymentMethod> paymentControllerFetchPaymentMethods()


### Example

```typescript
import {
    PaymentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentApi(configuration);

const { status, data } = await apiInstance.paymentControllerFetchPaymentMethods();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<PaymentMethod>**

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

# **paymentControllerInitializePostAdSubscription**
> InitializePaymentSessionResponse paymentControllerInitializePostAdSubscription()


### Example

```typescript
import {
    PaymentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentApi(configuration);

let planId: number; // (default to undefined)

const { status, data } = await apiInstance.paymentControllerInitializePostAdSubscription(
    planId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **planId** | [**number**] |  | defaults to undefined|


### Return type

**InitializePaymentSessionResponse**

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

# **paymentControllerInitializePremiumSubscription**
> InitializePaymentSessionResponse paymentControllerInitializePremiumSubscription()


### Example

```typescript
import {
    PaymentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentApi(configuration);

let planId: number; // (default to undefined)

const { status, data } = await apiInstance.paymentControllerInitializePremiumSubscription(
    planId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **planId** | [**number**] |  | defaults to undefined|


### Return type

**InitializePaymentSessionResponse**

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

# **paymentControllerInitializePremiumSubscriptionTransferSession**
> ChargeResponse paymentControllerInitializePremiumSubscriptionTransferSession()


### Example

```typescript
import {
    PaymentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentApi(configuration);

let planId: number; // (default to undefined)

const { status, data } = await apiInstance.paymentControllerInitializePremiumSubscriptionTransferSession(
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

# **paymentControllerInitializeProductUploadTransferSession**
> ChargeResponse paymentControllerInitializeProductUploadTransferSession()


### Example

```typescript
import {
    PaymentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentApi(configuration);

let planId: number; // (default to undefined)

const { status, data } = await apiInstance.paymentControllerInitializeProductUploadTransferSession(
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

# **paymentControllerInitializePromotionSubscription**
> InitializePaymentSessionResponse paymentControllerInitializePromotionSubscription()


### Example

```typescript
import {
    PaymentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentApi(configuration);

let planId: number; // (default to undefined)
let productIds: Array<string>; // (default to undefined)

const { status, data } = await apiInstance.paymentControllerInitializePromotionSubscription(
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

**InitializePaymentSessionResponse**

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

# **paymentControllerInitializePromotionTransferSession**
> ChargeResponse paymentControllerInitializePromotionTransferSession()


### Example

```typescript
import {
    PaymentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentApi(configuration);

let planId: number; // (default to undefined)
let productIds: Array<string>; // (default to undefined)

const { status, data } = await apiInstance.paymentControllerInitializePromotionTransferSession(
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

# **paymentControllerUnsuccessfulPaymentFeedback**
> paymentControllerUnsuccessfulPaymentFeedback(paymentFeedbackDTO)


### Example

```typescript
import {
    PaymentApi,
    Configuration,
    PaymentFeedbackDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentApi(configuration);

let paymentFeedbackDTO: PaymentFeedbackDTO; //

const { status, data } = await apiInstance.paymentControllerUnsuccessfulPaymentFeedback(
    paymentFeedbackDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **paymentFeedbackDTO** | **PaymentFeedbackDTO**|  | |


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentControllerVerifyBankPaymentTransfer**
> VerifyPaymentSessionResponse paymentControllerVerifyBankPaymentTransfer()


### Example

```typescript
import {
    PaymentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentApi(configuration);

let paymentReference: string; // (default to undefined)

const { status, data } = await apiInstance.paymentControllerVerifyBankPaymentTransfer(
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

# **paymentControllerVerifyPaymentSession**
> VerifyPaymentSessionResponse paymentControllerVerifyPaymentSession()


### Example

```typescript
import {
    PaymentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentApi(configuration);

let paymentReference: string; // (default to undefined)

const { status, data } = await apiInstance.paymentControllerVerifyPaymentSession(
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

