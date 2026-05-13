# CommunityApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**communityControllerFetchCommunityRecords**](#communitycontrollerfetchcommunityrecords) | **GET** /v1/account/community/records | |
|[**communityControllerFetchExistingUsers**](#communitycontrollerfetchexistingusers) | **GET** /v1/account/community/existing-users | |
|[**communityControllerFollowCommunityUser**](#communitycontrollerfollowcommunityuser) | **POST** /v1/account/community/follow-user | |
|[**communityControllerFollowCommunityUserContacts**](#communitycontrollerfollowcommunityusercontacts) | **POST** /v1/account/community/follow-user-contacts | |
|[**communityControllerFollowCommunityUserContactsWithNames**](#communitycontrollerfollowcommunityusercontactswithnames) | **POST** /v1/account/community/follow-user-contacts/with-names | |

# **communityControllerFetchCommunityRecords**
> CommunityInfo communityControllerFetchCommunityRecords()


### Example

```typescript
import {
    CommunityApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CommunityApi(configuration);

const { status, data } = await apiInstance.communityControllerFetchCommunityRecords();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**CommunityInfo**

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

# **communityControllerFetchExistingUsers**
> Array<PhoneContactInfo> communityControllerFetchExistingUsers()


### Example

```typescript
import {
    CommunityApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CommunityApi(configuration);

const { status, data } = await apiInstance.communityControllerFetchExistingUsers();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<PhoneContactInfo>**

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

# **communityControllerFollowCommunityUser**
> CommunityUserInfo communityControllerFollowCommunityUser()


### Example

```typescript
import {
    CommunityApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CommunityApi(configuration);

let userId: number; //Followed user id. (default to undefined)

const { status, data } = await apiInstance.communityControllerFollowCommunityUser(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] | Followed user id. | defaults to undefined|


### Return type

**CommunityUserInfo**

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

# **communityControllerFollowCommunityUserContacts**
> communityControllerFollowCommunityUserContacts(followCommunityUserContactsDTO)


### Example

```typescript
import {
    CommunityApi,
    Configuration,
    FollowCommunityUserContactsDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new CommunityApi(configuration);

let followCommunityUserContactsDTO: FollowCommunityUserContactsDTO; //

const { status, data } = await apiInstance.communityControllerFollowCommunityUserContacts(
    followCommunityUserContactsDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **followCommunityUserContactsDTO** | **FollowCommunityUserContactsDTO**|  | |


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

# **communityControllerFollowCommunityUserContactsWithNames**
> communityControllerFollowCommunityUserContactsWithNames(followCommunityUserContactsWithNamesDTO)


### Example

```typescript
import {
    CommunityApi,
    Configuration,
    FollowCommunityUserContactsWithNamesDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new CommunityApi(configuration);

let followCommunityUserContactsWithNamesDTO: FollowCommunityUserContactsWithNamesDTO; //

const { status, data } = await apiInstance.communityControllerFollowCommunityUserContactsWithNames(
    followCommunityUserContactsWithNamesDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **followCommunityUserContactsWithNamesDTO** | **FollowCommunityUserContactsWithNamesDTO**|  | |


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

