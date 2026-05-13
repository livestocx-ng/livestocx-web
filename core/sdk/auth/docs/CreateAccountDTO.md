# CreateAccountDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**email** | **string** | Email address of the user. | [default to undefined]
**password** | **string** | Password for the user account. | [default to undefined]
**firstName** | **string** | First name of the user. | [default to undefined]
**lastName** | **string** | Last name of the user. | [default to undefined]
**phone** | **string** | Phone number of the user. | [optional] [default to undefined]
**referralCode** | **string** | Referral code of the user (Optional). | [default to undefined]
**referral_source** | **string** | How did you hear about Livestocx? | [default to undefined]
**role** | **string** | Role of the user. | [default to 'CUSTOMER']
**state** | **string** | State of the user. | [optional] [default to undefined]
**city** | **string** | City of the user. | [optional] [default to undefined]
**businessName** | **string** | Name of the business. | [optional] [default to undefined]
**businessAddress** | **string** | Address of the business. | [optional] [default to undefined]

## Example

```typescript
import { CreateAccountDTO } from './api';

const instance: CreateAccountDTO = {
    email,
    password,
    firstName,
    lastName,
    phone,
    referralCode,
    referral_source,
    role,
    state,
    city,
    businessName,
    businessAddress,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
