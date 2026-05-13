# GroupedProductsResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**recommendedProducts** | [**Array&lt;ProductInfo&gt;**](ProductInfo.md) |  | [default to undefined]
**popularProducts** | [**Array&lt;ProductInfo&gt;**](ProductInfo.md) |  | [default to undefined]
**productsNearUser** | [**Array&lt;ProductInfo&gt;**](ProductInfo.md) |  | [default to undefined]
**otherProducts** | [**Array&lt;ProductInfo&gt;**](ProductInfo.md) |  | [default to undefined]
**otherProductsTotalPages** | **number** |  | [default to undefined]
**otherProductsHasNextPage** | **boolean** |  | [default to undefined]

## Example

```typescript
import { GroupedProductsResponse } from './api';

const instance: GroupedProductsResponse = {
    recommendedProducts,
    popularProducts,
    productsNearUser,
    otherProducts,
    otherProductsTotalPages,
    otherProductsHasNextPage,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
