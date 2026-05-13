# UpdateProductDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | The name of the product | [default to undefined]
**price** | **string** | The price of the product | [default to undefined]
**discountPrice** | **string** | The discount price of the product | [default to undefined]
**isNegotiable** | **boolean** | Whether the product is negotiable | [default to undefined]
**inStock** | **boolean** | Whether the product is in stock | [default to undefined]
**media** | [**Array&lt;ProductMediaDto&gt;**](ProductMediaDto.md) | Array of product media | [default to undefined]
**category** | **string** | The category of the product | [default to undefined]
**description** | **string** | The description of the product | [default to undefined]
**removedMediaIds** | **Array&lt;number&gt;** |  | [default to undefined]

## Example

```typescript
import { UpdateProductDto } from './api';

const instance: UpdateProductDto = {
    name,
    price,
    discountPrice,
    isNegotiable,
    inStock,
    media,
    category,
    description,
    removedMediaIds,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
