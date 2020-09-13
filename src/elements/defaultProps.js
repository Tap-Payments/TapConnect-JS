import { DialogMode, TextFieldType, AnimationType, PageMode } from './Constants/constants';

export default {
  liveMode: false,
  signinDirectory: 'login',
  signupDirectory: 'signup',
  forgotDirectory: 'forgot',
  footer: 'signup_powered_by',
  companyName: 'signup_tap_payments',
  showHeaderLogo: true,
  direction: 'ltr',
  pageMode: PageMode.LOGIN,
  hideInitialLoader: false,
  dialogMode: DialogMode.FULLPAGE,
  animationType: null,
  animationDuration: 500,
  closeOnOutsideClick: false,
  theme: {
    direction: 'ltr',
    overrides: {
      root: {},
    },
    palette: {},
    typography: {},
  },
  countryCode: '965',
  openPopup: true,
  onSuccess: () => {},
  onFailure: () => {},
  onCancel: () => {},
  onUpdate: () => {},
  moveToLogin: () => {},
  moveToSignup: () => {},
};
