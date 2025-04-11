import { ContactUsDTO } from '../sdk/account';

export const validateContactForm = (values: ContactUsDTO) => {
  let message = '';

  if (values.name.length <= 0) {
    message = 'Name is required';
  } else if (!RegExp(/^\S+@\S+$/).test(values.email)) {
    message = 'Invalid email address';
  } else if (values.subject.length <= 0) {
    message = 'Subject is required';
  } else if (values.message.length <= 0) {
    message = 'Message is required';
  }

  return message;
};
