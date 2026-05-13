# UserListApi

All URIs are relative to *https://infra.livestocx.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**listItemControllerAddItemToList**](#listitemcontrolleradditemtolist) | **POST** /v1/account/list-items | Add an item to a user\&#39;s list|
|[**listItemControllerGetUserList**](#listitemcontrollergetuserlist) | **GET** /v1/account/list-items | Get all list items for the current user|
|[**listItemControllerRemoveItemFromList**](#listitemcontrollerremoveitemfromlist) | **DELETE** /v1/account/list-items/{itemId} | Remove an item from a user\&#39;s list|

# **listItemControllerAddItemToList**
> ListItemInfo listItemControllerAddItemToList(addListItemDTO)


### Example

```typescript
import {
    UserListApi,
    Configuration,
    AddListItemDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new UserListApi(configuration);

let addListItemDTO: AddListItemDTO; //

const { status, data } = await apiInstance.listItemControllerAddItemToList(
    addListItemDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **addListItemDTO** | **AddListItemDTO**|  | |


### Return type

**ListItemInfo**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listItemControllerGetUserList**
> Array<ListItemInfo> listItemControllerGetUserList()


### Example

```typescript
import {
    UserListApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserListApi(configuration);

const { status, data } = await apiInstance.listItemControllerGetUserList();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<ListItemInfo>**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listItemControllerRemoveItemFromList**
> listItemControllerRemoveItemFromList()


### Example

```typescript
import {
    UserListApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserListApi(configuration);

let itemId: number; //ID of the list item to remove (default to undefined)

const { status, data } = await apiInstance.listItemControllerRemoveItemFromList(
    itemId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **itemId** | [**number**] | ID of the list item to remove | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

