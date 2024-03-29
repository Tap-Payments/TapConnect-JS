import { DialogMode, TextFieldType, AnimationType, PageMode } from './Constants/constants';

export default {
  publicKey: '',
  scopes: ['API_ACCESS_KEY'],
  liveMode: false,
  urlPortion: {
    signin: 'login',
    signup: 'signup',
    forgot: 'forgot',
  },
  footer: 'signup_powered_by',
  companyName: 'signup_tap_payments',
  showHeaderLogo: true,
  direction: 'ltr',
  pageMode: PageMode.LOGIN,
  hideInitialLoader: false,
  // initialAuthType: { email: 'k.naqawa@tap.company' },
  dialogMode: DialogMode.FULLPAGE,
  animationType: null,
  animationDuration: 500,
  enableBackdropClick: false,
  theme: {
    direction: 'ltr',
    overrides: {
      root: {},
    },
    palette: {},
    typography: {},
  },
  // mobileCountryCode: '965',
  country: null,
  businessSegment: null,
  openPopup: true,
  onSuccess: () => {},
  onFailure: (data) => {
    console.log('%c FAILED TO LAUNCH', 'background:red; color:white;');
    console.log(data);
  },
  onCancel: () => {},
  onUpdate: () => {},
  moveToLogin: () => {},
  moveToSignup: () => {},
  strictUsername: false,
};
