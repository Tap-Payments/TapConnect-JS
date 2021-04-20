const AnimationType = {
  FADE: 'fade',
  SLIDEUP: 'up',
  SLIDEDOWN: 'down',
  SLIDELEFT: 'left',
  SLIDERIGHT: 'right',
};

const LOGO_URL = 'https://tap-connecet.b-cdn.net/imgs/';

const ARROW = LOGO_URL + 'arrow.svg';
const ARROW_REVERSE = LOGO_URL + 'arrowReverse.svg';
const CHAR = LOGO_URL + 'char.svg';
const CHAR0 = LOGO_URL + 'char0.svg';
const DIGIT = LOGO_URL + 'digit.svg';
const DIGIT0 = LOGO_URL + 'digit0.svg';
const LOGO = LOGO_URL + 'logo.svg';
const SIX = LOGO_URL + 'six.svg';
const SIX0 = LOGO_URL + 'six0.svg';
const SYMBOL = LOGO_URL + 'symbol.svg';
const SYMBOL0 = LOGO_URL + 'symbol0.svg';
const WHITELOGO = LOGO_URL + 'whiteLogo.svg';

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
};
const SegmentType = {
  Facilitator: 'fct',
  PaymentGateway: 'pgw',
  Scheme: 'sch',
  Processor: 'prc',
  Bank: 'bnk',
  Platform: 'plt',
  AlternativePaymentMethod: 'apm',
  Issuer: 'isu',
  Accounting: 'acn',
  Legal: 'lgl',
  Developer: 'dev',
  Aggregator: 'agg',
  Regulator: 'reg',
  Marketing: 'mrk',
  Switch: 'swc',
  Acquirer: 'acq',
  CrowdFunding: 'cwf',
  FulfilmentProvider: 'fulfilment_provider',
  MarketPlace: 'mkt',
  PaymentServiceProvider: 'psp',
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
  SegmentType,
  Languages,
  LOGIN_STEPS,
  PageMode,
  SIGNUP_STEPS_ARRAY,

  ARROW,
  ARROW_REVERSE,
  CHAR,
  CHAR0,
  DIGIT,
  DIGIT0,
  LOGO,
  SIX,
  SIX0,
  SYMBOL,
  SYMBOL0,
  WHITELOGO,
};
