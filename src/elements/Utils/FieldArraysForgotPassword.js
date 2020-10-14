import { NEW_PASSWORD_INFO } from './FieldArraysSignup';
import { OTP_INFO } from './FieldArrays';
import { InputTypeEnum } from '../TapInput/TapInput';

const PASSWORD_OTP_INFO = {
  verifyValue: {
    value: '',
    variant: 'outlined',
  },
  editButtonInfo: {
    text: 'forgot_change',
    onPress: () => {},
  },
  newPasswordInfos: NEW_PASSWORD_INFO,
};

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
  placeholder: 'signup_enter_email',
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
};

const RESET_PASSWORD_INFO = {
  resetPasswordTitle: 'connect_forgot_password',
  backButtonText: 'back',
  nextButtonText: 'next',
  nextButtonVariant: 'contained',
  resetButtonText: 'reset',
  loginButtonText: 'login',
};

module.exports = {
  EMAIL_INFO,
  PASSWORD_OTP_INFO,
  OTP_INFO,
  NEW_PASSWORD_INFO,
  RESET_PASSWORD_INFO,
};
