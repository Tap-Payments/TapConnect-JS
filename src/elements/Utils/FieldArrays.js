import { TextFieldType } from '../Constants/constants';
import { InputTypeEnum } from '../TapInput/TapInput';

const EMAIL_INFO = {
  id: 'standard-basic-email',
  maxLength: '',
  countryIcon: '',
  onClose: (index, item) => {},
  getMaxLength: (item) => {
    return !item.maxLength ? 8 : item.maxLength;
  },
  clear: () => {},
  searchPattern: 'item.name',
  placeholder: 'login_mobile_placeholder',
  label: null,
  initialValue: '',
  dropdownInfos: [],
  name: 'email',
  type: 'text',
  variant: 'standard',
  inputType: InputTypeEnum.ANY,
  required: true,
  isVisible: true,
  inputProps: {
    readOnly: false,
  },
  onChange: (event, value) => {
    console.log(value);
  },
  selectedIndex: '',
  searchPlaceholder: 'search',
  dropDownIcon: null,
  showSearchBar: true,
  getTextPattern: '',
  initialValue: null,
  onClose: () => {},
  getDropdownIcon: (item) => {},
  getSelectedItem: (item) => {},
  renderMenuItem: (item) => {},
  isSelected: (item) => {},
  filter: (value) => {},
  buttonText: 'next',
  buttonVariant: 'contained',
  onButtonPress: () => {},
};
const PASSWORD_INFO = {
  id: 'standard-basic',
  placeholder: 'login_password_placeholder',
  label: null,
  initialValue: null,
  name: 'password',
  variant: 'standard',
  required: false,
  isVisible: true,
  inputProps: {
    readOnly: false,
  },
  onChange: (event, value) => {
    // console.log(value);
  },
  buttonText: 'login_signin_button',
  buttonVariant: 'contained',
  onButtonPress: () => {},
};
const OTP_INFO = {
  id: 'standard-basic',
  placeholder: 'login_otp_placeholder',
  label: null,
  initialValue: null,
  name: 'otp',
  type: 'tel',
  variant: 'standard',
  required: false,
  isVisible: false,
  autoFocus: false,
  placeholder: '0',
  fields: 6,
  onKeyUp: () => {},
  updated: false,
  clear: () => {},
  inputProps: {
    readOnly: false,
  },
  onChange: (event, value) => {
    // console.log(value);
  },
  buttonText: 'login_signin_button',
  buttonVariant: 'contained',
  onButtonPress: () => {},
};

const LOGIN_INFO = {
  title: 'login',
  activeTextFieldName: TextFieldType.EMAIL,
  emailTextField: EMAIL_INFO,
  passwordTextField: PASSWORD_INFO,
  otpTextField: OTP_INFO,
  verifyValue: {
    value: '',
    variant: 'outlined',
  },
  editButtonInfo: {
    text: 'login_not_you',
    onPress: () => {},
  },
  checkBoxInfo: {
    label: 'login_keep_me_signed',
    checked: true,
    size: 'small',
    inputProps: { 'aria-label': 'primary checkbox' },
    onChange: () => {},
  },
  forgotPasswordInfo: {
    text: 'login_forgot_password',
    link: '#',
  },
  signUpInfo: {
    title: 'login_signup_title',
    subTitle: 'login_signup_subtitle',
    registerButtonText: 'signup',
    buttonText: 'login_signup_buttontext',
    onClick: () => {},
  },
  errorInfo: {
    error: '',
  },
};

module.exports = {
  EMAIL_INFO,
  PASSWORD_INFO,
  OTP_INFO,
  LOGIN_INFO,
};
