import { UpdateVendorProfileDto } from '../sdk/vendor';

export const validateUpdateBusinessProfileForm = (values: UpdateVendorProfileDto) => {
  let message = '';

  if (values.name.length <= 0) {
    message = 'Business name is required';
  } else if (!RegExp(/^\S+@\S+$/).test(values.email)) {
    message = 'Invalid email address';
  } else if (values.phoneNumber.length <= 0) {
    message = 'Phone number is required';
  } else if (values.address.length <= 0) {
    message = 'Address is required';
  } else if (values.state.length <= 0) {
    message = 'State is required';
  } else if (values.city.length <= 0) {
    message = 'City is required';
  }

  return message;
};
