import { TextFieldType } from '../Constants/constants';
import { PASSWORD_INFO, OTP_INFO } from './FieldArrays';
import { InputTypeEnum } from '../TapInput/TapInput';

const BUSINESS_NAME_SECTOR_INFO = [
  {
    id: 'standard-basic-business-name',
    placeholder: 'signup_business_name',
    label: null,
    margin: 'normal',
    initialValue: null,
    name: 'business-name',
    type: 'text',
    variant: 'standard',
    maxLength: '30',
    required: false,
    autoFocus: false,
    isVisible: true,
    inputProps: {
      readOnly: false,
    },
    onEnterPressed: (event) => {
      console.log(event);
    },
    onChange: (event, value) => {
      // console.log(value);
    },
  },
  {
    dropdownInfos: [],
    placeholder: 'signup_business_sector',
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
  },
];

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
  margin: 'normal',
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
};

const BUSINESS_TYPE_LICENSED = [
  {
    dropdownInfos: [],
    placeholder: 'signup_business_type',
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
  },
  {
    dropdownInfos: [],
    placeholder: 'signup_business_country',
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
  },
];

const BUSINESS_LICENSED = {
  title: 'signup_business_licensed',
  noButtonText: 'No',
  noButtonVariant: 'contained',
  noLoadingStatus: false,
  yesButtonText: 'Yes',
  onClickNo: () => {},
  yesButtonVariant: 'contained',
  yesLoadingStatus: false,
  onClickYes: () => {},
};

const SIGNUP_INFO = {
  signupTitle: 'signup',
  backButtonText: 'Back',
  nextButtonText: 'next',
  nextButtonVariant: 'contained',
  loginButtonText: 'login',
  submitButtonText: 'signup_submit',

  /// Footer
  footerTitle: 'signup_already_have_account',
  footerLogin: 'signup_login_here',
  footerSubTitle: 'signup_agreement_title',
  footerTermsTitle: 'signup_terms',
  footerTermsLink: 'https://www.tap.company/kw/en/terms-conditions',
  footerPolicyTitle: 'signup_data_policy',
  footerPolicyLink: 'https://www.tap.company/kw/en/privacy-policy',
};
const USER_NAME_INFO = [
  {
    id: 'standard-basic-first-name',
    placeholder: 'signup_first_name',
    label: null,
    margin: 'normal',
    initialValue: null,
    name: 'first-name',
    type: 'text',
    variant: 'standard',
    maxLength: '30',
    required: false,
    autoFocus: false,
    isVisible: true,
    inputProps: {
      readOnly: false,
    },
    onEnterPressed: (event) => {
      console.log(event);
    },
    onChange: (event, value) => {
      // console.log(value);
    },
  },
  {
    id: 'standard-basic-last-name',
    placeholder: 'signup_last_name',
    label: null,
    margin: 'normal',
    initialValue: null,
    name: 'last-name',
    type: 'text',
    variant: 'standard',
    maxLength: '30',
    required: false,
    autoFocus: false,
    isVisible: true,
    inputProps: {
      readOnly: false,
    },
    onEnterPressed: (event) => {
      console.log(event);
    },
    onChange: (event, value) => {
      // console.log(value);
    },
  },
];

const PASSWORD_OTP_INFO = {
  verifyValue: {
    value: '',
    variant: 'outlined',
  },
  editButtonInfo: {
    text: 'login_not_you',
    onPress: () => {},
  },
  passwordTextField: PASSWORD_INFO,
  otpTextField: OTP_INFO,
  activeTextFieldName: TextFieldType.OTP,
};
const NEW_PASSWORD_INFO = [
  {
    id: 'standard-basic-new-password',
    placeholder: 'signup_new_password',
    label: null,
    margin: 'normal',
    initialValue: null,
    name: 'newPassword',
    type: 'password',
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
  },
  {
    id: 'standard-basic-confirm-password',
    placeholder: 'signup_confirm_password',
    label: null,
    margin: 'normal',
    initialValue: null,
    name: 'confirmPassword',
    type: 'password',
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
  },
];

module.exports = {
  BUSINESS_NAME_SECTOR_INFO,
  EMAIL_INFO,
  USER_NAME_INFO,
  PASSWORD_INFO,
  BUSINESS_TYPE_LICENSED,
  PASSWORD_OTP_INFO,
  OTP_INFO,
  NEW_PASSWORD_INFO,
  SIGNUP_INFO,
  BUSINESS_LICENSED,
};
