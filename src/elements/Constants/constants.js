const AnimationType = {
  FADE: 'fade',
  SLIDEUP: 'up',
  SLIDEDOWN: 'down',
  SLIDELEFT: 'left',
  SLIDERIGHT: 'right',
};

const TextFieldType = {
  EMAIL: 'email',
  PASSWORD: 'password',
  OTP: 'otp',
};

const DialogMode = {
  POPUP: 'popup',
  FULLPAGE: 'fullpage',
};

const Languages = {
  EN: 'ltr',
  AR: 'rtl',
};

const LOGIN_STEPS = {
  CREATE: 'CREATE',
  VERIFY_PASS: 'VERIFY_PASS',
  VERIFY_OTP: 'VERIFY_OTP',
  VERIFY_BIO: 'VERIFY_BIO',
  GO_BACK: 'GO_BACK',
};

const PageMode = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  FORGOT: 'reset',
  CONNECT: 'connect',
  LANDING: 'landing',
};

const SIGNUP_STEPS_ARRAY = [
  'CREATE_AUTH_SIGNUP',
  'VERIFY_AUTH_SIGNUP',
  'BUSINESS_BASIC_INFO',
  'BUSINESS_TYPE',
  'USER_NAME',
  'USER_CONTACT',
  'USER_PASSWORD',
];
module.exports = {
  AnimationType,
  TextFieldType,
  DialogMode,
  Languages,
  LOGIN_STEPS,
  PageMode,
  SIGNUP_STEPS_ARRAY,
};
