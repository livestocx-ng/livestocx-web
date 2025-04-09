import { SigninDTO } from '@/core/sdk/auth';

export const validateSignInForm = (values: SigninDTO) => {
  let message = '';

  if (!RegExp(/^\S+@\S+$/).test(values.email)) {
    message = 'Invalid email address';
  } else if (values.password.length < 8) {
    message = 'Password must be at least 8 characters';
  }

  return message;
};
