# ChargeResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **boolean** | Indicates if the request was successful | [default to undefined]
**message** | **string** | Message describing the result of the operation | [default to undefined]
**data** | [**ChargeResponseData**](ChargeResponseData.md) | The charge attempt details | [default to undefined]

## Example

```typescript
import { ChargeResponse } from './api';

const instance: ChargeResponse = {
    status,
    message,
    data,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
