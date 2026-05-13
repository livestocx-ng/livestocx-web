# ProfileApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**vendorProfileControllerFetchVendorProfile**](#vendorprofilecontrollerfetchvendorprofile) | **GET** /v1/vendor/profile/me | |
|[**vendorProfileControllerUpdateUserRole**](#vendorprofilecontrollerupdateuserrole) | **PATCH** /v1/vendor/profile/me/role | |
|[**vendorProfileControllerUpdateVendorProfile**](#vendorprofilecontrollerupdatevendorprofile) | **PATCH** /v1/vendor/profile/me | |
|[**vendorProfileControllerUpdateVendorProfileLogo**](#vendorprofilecontrollerupdatevendorprofilelogo) | **PATCH** /v1/vendor/profile/me/logo | |

# **vendorProfileControllerFetchVendorProfile**
> VendorInfo vendorProfileControllerFetchVendorProfile()


### Example

```typescript
import {
    ProfileApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

const { status, data } = await apiInstance.vendorProfileControllerFetchVendorProfile();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**VendorInfo**

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

# **vendorProfileControllerUpdateUserRole**
> UpdateUserRoleResponse vendorProfileControllerUpdateUserRole(updateVendorProfileDto)


### Example

```typescript
import {
    ProfileApi,
    Configuration,
    UpdateVendorProfileDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

let updateVendorProfileDto: UpdateVendorProfileDto; //

const { status, data } = await apiInstance.vendorProfileControllerUpdateUserRole(
    updateVendorProfileDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateVendorProfileDto** | **UpdateVendorProfileDto**|  | |


### Return type

**UpdateUserRoleResponse**

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

# **vendorProfileControllerUpdateVendorProfile**
> VendorInfo vendorProfileControllerUpdateVendorProfile(updateVendorProfileDto)


### Example

```typescript
import {
    ProfileApi,
    Configuration,
    UpdateVendorProfileDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

let updateVendorProfileDto: UpdateVendorProfileDto; //

const { status, data } = await apiInstance.vendorProfileControllerUpdateVendorProfile(
    updateVendorProfileDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateVendorProfileDto** | **UpdateVendorProfileDto**|  | |


### Return type

**VendorInfo**

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

# **vendorProfileControllerUpdateVendorProfileLogo**
> VendorInfo vendorProfileControllerUpdateVendorProfileLogo(updateVendorProfileLogoDto)


### Example

```typescript
import {
    ProfileApi,
    Configuration,
    UpdateVendorProfileLogoDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

let updateVendorProfileLogoDto: UpdateVendorProfileLogoDto; //

const { status, data } = await apiInstance.vendorProfileControllerUpdateVendorProfileLogo(
    updateVendorProfileLogoDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateVendorProfileLogoDto** | **UpdateVendorProfileLogoDto**|  | |


### Return type

**VendorInfo**

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

