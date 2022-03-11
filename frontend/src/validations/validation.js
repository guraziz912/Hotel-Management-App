import * as Yup from 'yup';

import constants from '../utils/constants';
import schemaContants from '../utils/schemaContants';

// user login validation
export const loginValidate = Yup.object({
  email: Yup.string()
    .email(constants.invalidEmail)
    .required(constants.required),
  password: Yup.string()
    .min(schemaContants.minPasswordLength, constants.passwordLength)
    .required(constants.required),
});

// guest info validation
export const guestInfoValidate = Yup.object({
  email: Yup.string()
    .email(constants.invalidEmail)
    .required(constants.required),
  guestName: Yup.string()
    .min(schemaContants.minGuestNameLength, constants.nameLength)
    .required(constants.required),
  mobile: Yup.string()
    .min(schemaContants.minMobileLength, constants.invalidEmail)
    .required(constants.required),
});

// user signup validation
export const signupValidate = Yup.object({
  email: Yup.string()
    .email(constants.invalidEmail)
    .required(constants.required),
  password: Yup.string()
    .min(schemaContants.minPasswordLength, constants.passwordLength)
    .required(constants.required),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref(constants.inputTypePassword), null],
    constants.passwordMatch
  ),
  name: Yup.string().required(constants.required),
  about: Yup.string().required(constants.required),
  image: Yup.string(),
});
