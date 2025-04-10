import {
  ForgotPasswordDTO,
  ResetPasswordDTO,
  ResetPasswordVerificationDTO,
  SigninDTO,
} from '@/core/sdk/auth';

export const validateSignInForm = (values: SigninDTO) => {
  let message = '';

  if (!RegExp(/^\S+@\S+$/).test(values.email)) {
    message = 'Invalid email address';
  } else if (values.password.length <= 0) {
    message = 'Password is required';
  }

  return message;
};

export const validateForgotPasswordForm = (values: ForgotPasswordDTO) => {
  let message = '';

  if (!RegExp(/^\S+@\S+$/).test(values.email)) {
    message = 'Invalid email address';
  }

  return message;
};

export const validateResetPasswordVerificationForm = (values: ResetPasswordVerificationDTO) => {
  let message = '';

  if (values.otp.length < 3) {
    message = 'Invalid OTP';
  } else if (!RegExp(/^\S+@\S+$/).test(values.email)) {
    message = 'Invalid email address, please restart the process again!';
  }

  return message;
};

export const validateResetPasswordForm = (values: ResetPasswordDTO, confirmPassword: string) => {
  let message = '';

  if (values.newPassword.length < 8) {
    message = 'Password must be at least 8 characters.';
  } else if (values.newPassword !== confirmPassword) {
    message = 'Passwords do not match';
  }

  return message;
};
