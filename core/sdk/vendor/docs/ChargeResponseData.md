# ChargeResponseData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **string** | Current status of the charge attempt | [default to undefined]
**display_text** | **string** | Human readable message about the charge | [default to undefined]
**reference** | **string** | Unique reference for this transaction | [default to undefined]
**amount** | **number** | Amount to be charged in smallest currency unit | [default to undefined]
**account_name** | **string** | Name of the account to transfer to | [default to undefined]
**account_number** | **string** | Account number to transfer to | [default to undefined]
**bank** | [**Bank**](Bank.md) | Bank details for the transfer | [default to undefined]
**account_expires_at** | **string** | ISO timestamp when the account details expire | [default to undefined]

## Example

```typescript
import { ChargeResponseData } from './api';

const instance: ChargeResponseData = {
    status,
    display_text,
    reference,
    amount,
    account_name,
    account_number,
    bank,
    account_expires_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
