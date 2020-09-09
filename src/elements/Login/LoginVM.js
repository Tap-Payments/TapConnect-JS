import React from 'react';

import { action, observable, decorate, computed } from 'mobx';
import CreateAuthService from '../API_Services/AuthServices/CreateAuthService';
import VerifyAuthService from '../API_Services/AuthServices/VerifyAuthService';
import { EMAIL_INFO, PASSWORD_INFO, OTP_INFO, LOGIN_INFO } from '../Utils/FieldArrays';

import { isMobile } from '../Utils/FormUtils/validation';
import { validateEmailMobile, validatePassword, validateOTP } from '../Utils/FormUtils/validation';
import { TextFieldType, Languages, LOGIN_STEPS } from '../Constants/constants';

class LoginVM {
  constructor(props) {
    this.FP = props.dataSource && props.dataSource.fingerPrintModel && props.dataSource.fingerPrintModel.FP;

    this.ipObject = this.FP && this.FP.ipObject;
    console.log(this.ipObject);
    this.isConnect = props.isConnect;
    this.props = props;
    this.newUser = false;
    this.loginSteps = LOGIN_STEPS.CREATE;
    this.showInitialLoader = true;
    this.loadingStatus = false;
    this.prepareLoginData = this.prepareLoginData.bind(this);
    this.changeLoader = this.changeLoader.bind(this);
    this.changeLoginStep = this.changeLoginStep.bind(this);
    // this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
    this.updateLoginInfo = this.updateLoginInfo.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getDropdownInfos = this.getDropdownInfos.bind(this);
    this.getCountryIcon = this.getCountryIcon.bind(this);
    this.getMaxLength = this.getMaxLength.bind(this);
    this.clearUserName = this.clearUserName.bind(this);
    this.clearOtp = this.clearOtp.bind(this);
    this.handleInitialData = this.handleInitialData.bind(this);
    this.openLoginPopup = props.openPopup || true;

    this.loginFormInfos = LOGIN_INFO;
    this.emailTextField = EMAIL_INFO;
    this.activeTextFieldName = TextFieldType.EMAIL;
    this.passwordTextField = PASSWORD_INFO;
    this.otpTextField = OTP_INFO;
    this.verifyValue = LOGIN_INFO.verifyValue;
    this.editButtonInfo = LOGIN_INFO.editButtonInfo;
    this.checkBoxInfo = LOGIN_INFO.checkBoxInfo;
    this.forgotPasswordInfo = LOGIN_INFO.forgotPasswordInfo;
    this.errorInfo = LOGIN_INFO.errorInfo;
    this.signUpInfo = LOGIN_INFO.signUpInfo;
    this.title = LOGIN_INFO.title;

    this.data = { email: '', password: '', mobile: '', otp: '' };
    this.username;
    this.password;
    this.otp;
    this.rememberMe = true;
    this.dropdownInfos = props.dataSource.countryInfos || [];
    this.direction = props.direction;

    /// Email / Mobile
    this.selectedCountryIndex = null;
    this.maxLength = 9;
    this.countryCode = props.countryCode ? props.countryCode : 965;
    this.countryIcon = 'https://www.gotapnow.com/web/countryflag/Kuwait.png';
    this.getCountryTextPattern = this.direction === 'rtl' ? 'item.name.arabic' : 'item.name.english';
    this.searchPattern = this.direction === 'rtl' ? 'item.name.arabic' : 'item.name.english';

    this.moveToSignup = this.moveToSignup.bind(this);
    this.moveToForgot = this.moveToForgot.bind(this);
    this.goBack = this.goBack.bind(this);
    this.update = this.update.bind(this);

    /// on load, prepare
    this.prepareLoginData();
  }

  moveToSignup() {
    this.openLoginPopup = false;
    setTimeout(() => {
      if (this.props.moveToSignup) this.props.moveToSignup();
    }, 200);
  }

  moveToForgot() {
    this.openLoginPopup = false;
    setTimeout(() => {
      if (this.props.moveToForgot) this.props.moveToForgot();
    }, 200);
  }

  async prepareLoginData() {
    this.countryIcon = (this.ipObject && this.ipObject.location.country_flag) || this.countryIcon;
    this.countryCode = (this.ipObject && this.ipObject.location.calling_code) || this.countryCode;

    // this.changeLoader(true);
    this.showInitialLoader = true;
    CreateAuthService.getLoginFormData((data) => {
      this.editButtonInfo.onPress = () => {
        this.loginSteps = LOGIN_STEPS.GO_BACK;
        this.newUser = false;
        this.updateLoginInfo();
      };

      console.log('getLoginFormData');
      this.activeTextFieldName = TextFieldType.EMAIL;

      this.checkBoxInfo.onChange = (event) => {
        this.rememberMe = event.target.checked;
        this.checkBoxInfo = {
          checked: this.rememberMe,
          label: this.checkBoxInfo.label,
          size: this.checkBoxInfo.size,
          inputProps: this.checkBoxInfo.inputProps,
          onChange: this.checkBoxInfo.onChange,
        };
      };

      this.emailTextField = EMAIL_INFO;
      this.getDropdownInfos();

      this.emailTextField.initialValue = this.props.defaultEmailOrMobile;
      this.emailTextField.dropdownInfos = this.dropdownInfos;
      this.emailTextField.getTextPattern = this.getCountryTextPattern;
      this.emailTextField.searchPattern = this.searchPattern;
      this.emailTextField.isSelected = (item) => item.idd_prefix.toString() === this.countryCode;

      this.emailTextField.getDropdownIcon = (item) => {
        return item.logo;
      };

      this.emailTextField.getSelectedItem = (item) => {
        if (item) return this.direction === 'rtl' ? item.name.arabic : item.name.english;
      };

      this.emailTextField.filter = (value) => {
        return this.emailTextField.dropdownInfos.filter(
          (item) =>
            eval(this.searchPattern).toLowerCase().includes(value.toLowerCase()) ||
            ('+' + eval('item.idd_prefix').toString().toLowerCase()).includes(value.toLowerCase()),
        );
      };

      this.emailTextField.renderMenuItem = (item) => {
        if (item)
          return (
            <div>
              <span style={{ float: this.direction === 'ltr' ? 'left' : 'right', paddingInlineEnd: '10px' }}>
                {this.direction === 'rtl' ? item.name.arabic : item.name.english}
              </span>
              <span style={{ float: this.direction === 'ltr' ? 'right' : 'left' }}>{'+' + item.idd_prefix}</span>
            </div>
          );
      };
      this.emailTextField.onClose = this.handleClose;
      this.emailTextField.getCountryIcon = this.getCountryIcon;
      this.emailTextField.getMaxLength = this.getMaxLength;
      this.emailTextField.clear = this.clearUserName;

      this.passwordTextField = PASSWORD_INFO;
      this.otpTextField = OTP_INFO;

      this.otpTextField.clear = this.clearOtp;

      this.username = this.emailTextField.initialValue;

      this.emailTextField.onChange = (event) => {
        console.log('onChangeEmail');
        // console.log(event.target.value);
        if (this.errorInfo.error !== null) this.setError(null);
        this.storeUserName(event.target.value);
      };
      this.emailTextField.onButtonPress = () => {
        console.log('onButtonPress');
        this.onFormSubmit();
      };
      this.emailTextField.onEnterPressed = () => {
        console.log('onEnterPressed');
        this.onFormSubmit();
      };

      this.passwordTextField.onChange = (event) => {
        console.log('onChangePassword');
        if (this.errorInfo.error !== null) this.setError(null);
        this.storePassword(event.target.value);
      };
      this.passwordTextField.onButtonPress = () => {
        console.log('onButtonPress');
        this.onFormSubmit();
      };
      this.passwordTextField.onEnterPressed = () => {
        console.log('onEnterPressed');
        this.onFormSubmit();
      };

      this.otpTextField.onChange = (value) => {
        console.log('onChangeOtp');
        if (this.errorInfo.error !== null) this.setError(null);
        this.storeOtp(value);
      };
      this.otpTextField.onButtonPress = () => {
        console.log('onButtonPress');
        this.onFormSubmit();
      };
      this.otpTextField.onEnterPressed = () => {
        console.log('onEnterPressed');
        this.onFormSubmit();
      };
      if (this.props.initialAuthType) this.handleInitialData();

      this.showInitialLoader = false;
    });
  }

  handleInitialData() {
    this.username = this.props.initialAuthType.email || this.props.initialAuthType.phone || 'add_user_to_response';
    this.authPrevResponse = { auth_token: this.props.initialAuthType.auth_token };
    this.changeLoginStep(this.props.initialAuthType);
  }
  onFormSubmit() {
    console.log('%cFORM SUBMITTED', 'background:yellow;');
    let error = null;
    console.log('USER');
    console.log(this.username);
    this.username;
    this.password;
    this.otp;
    console.log('PASS');
    console.log(this.password);

    console.log('OTP');
    console.log(this.otp);
    console.log('STEP NOW');
    console.log(this.loginSteps);

    switch (this.loginSteps) {
      case LOGIN_STEPS.CREATE:
        error = validateEmailMobile(this.getUserName()) ? validateEmailMobile(this.getUserName()).email : null;
        break;
      case LOGIN_STEPS.VERIFY_OTP:
        error = validateOTP(this.getOTP()) ? validateOTP(this.getOTP()).otp : null;
        break;
      case LOGIN_STEPS.VERIFY_PASS:
        error = validatePassword(this.getPassword()) ? validatePassword(this.getPassword()).password : null;
        break;
      default:
        error = null;
    }
    if (error != null) this.setError(error);
    else this.onSubmit();
  }
  onSubmit() {
    this.setError(null);
    this.changeLoader(true);
    switch (this.loginSteps) {
      case LOGIN_STEPS.CREATE:
        let emailMobileObject = isMobile(this.getUserName())
          ? { phone: this.getUserName(), code: this.getCountryCode() }
          : { email: this.getUserName() };
        let createBody = { user_credentail: emailMobileObject, device_info: this.FP };
        CreateAuthService.createAuth(createBody, (data) => {
          if (data != null)
            if (data.errors != null) {
              this.setError(data.errors[0].description);
            } else {
              this.newUser = data.new_user;
              this.update('Username is verified', LOGIN_STEPS.CREATE);

              if (this.newUser && !this.isConnect) this.setError('login_user_does_not_exist_error');
              else this.changeLoginStep(data);
            }
          else this.setError('login_server_error');
          console.log('data');
          console.log(data);
        });
        break;
      case LOGIN_STEPS.VERIFY_OTP:
        let otpBody = { data: this.getOTP(), ...this.authPrevResponse };
        VerifyAuthService.verifyAuth(otpBody, (data) => {
          if (data != null)
            if (data != null && data.errors != null) this.setError(data.errors[0].description);
            else {
              this.update('OTP is verified', LOGIN_STEPS.VERIFY_OTP);
              this.changeLoginStep(data);
            }
          else this.setError(this.getOTP() == null ? 'login_enter_otp' : 'login_invalid_otp');
          console.log(data);
        });
        break;
      case LOGIN_STEPS.VERIFY_PASS:
        let passBody = { data: this.getPassword(), remember_me: this.rememberMe, ...this.authPrevResponse };

        console.log('passBody');
        console.log(passBody);

        VerifyAuthService.verifyAuth(passBody, (data) => {
          if (data != null)
            if (data != null && data.errors != null) this.setError(data.errors[0].description);
            else {
              this.update('Password is verified', LOGIN_STEPS.VERIFY_PASS);
              this.changeLoginStep(data);
            }
          else this.setError(this.getPassword() == null ? 'login_enter_password' : 'login_invalid_password');
          console.log(data);
        });
        break;
      default:
        break;
    }
  }

  setError(error) {
    this.errorInfo = { error: error };
    this.changeLoader(false);
    console.log(this.errorInfo.error);
  }

  changeLoginStep(data) {
    let status = data.status;
    let auth_type = data.auth_type;

    if (status == 'success') {
      this.openLoginPopup = false;

      this.props.onLoginSuccess(data, this.FP.browser.browser_id);
    }

    if (status == 'pending') {
      this.authPrevResponse = data;

      switch (auth_type) {
        case '1':
        case 1:
          this.loginSteps = LOGIN_STEPS.VERIFY_PASS;
          // this.passwordTextField.initialValue = null;
          break;
        case '2':
        case 2:
        case '3':
        case 3:
        case '5':
        case 5:
          this.loginSteps = LOGIN_STEPS.VERIFY_OTP;
          // this.otpTextField.initialValue = null;
          break;
        case '4':
        case 4:
          this.loginSteps = LOGIN_STEPS.VERIFY_BIO;
          break;
      }
    }

    if (status == 'fail') {
      this.changeLoader(false);
      alert('failed!  ' + data.type);
    }

    this.updateLoginInfo();
  }

  setUserName(username) {
    console.log('setUserName');
    let infos = this;

    this.verifyValue = {
      value: username,
      variant: infos.verifyValue.variant,
    };
    this.setError(null);

    console.log(this);
  }

  storeUserName(_txt) {
    this.username = _txt;
  }

  storePassword(_txt) {
    this.password = _txt;
  }

  storeOtp(_txt) {
    this.otp = _txt;
  }

  clearUserName() {
    this.username = '';
  }

  clearOtp() {
    this.otp = '';
  }

  getUserName() {
    return this.username;
  }
  getCountryCode() {
    return this.countryCode;
  }
  getPassword() {
    return this.password;
  }
  getOTP() {
    return this.otp;
  }

  update(status, step) {
    this.props.onUpdate(status, step);
  }

  updateLoginInfo() {
    switch (this.loginSteps) {
      case LOGIN_STEPS.CREATE:
        console.log('LOGIN_STEPS.CREATE');
        this.setUserName(this.username);
        this.activeTextFieldName = TextFieldType.EMAIL;
        break;
      case LOGIN_STEPS.VERIFY_PASS:
        console.log('LOGIN_STEPS.VERIFY_PASS');
        this.setUserName(this.username);
        this.activeTextFieldName = TextFieldType.PASSWORD;

        break;
      case LOGIN_STEPS.VERIFY_OTP:
        console.log('LOGIN_STEPS.VERIFY_OTP');
        this.setUserName(this.username);
        this.activeTextFieldName = TextFieldType.OTP;
        break;

      case LOGIN_STEPS.VERIFY_BIO:
        this.setUserName(this.username);

        // console.log('BIOMETRIC');
        break;
      case LOGIN_STEPS.GO_BACK:
        // this.setUserName('');
        this.storePassword('');
        this.clearOtp('');
        this.rememberMe = true;
        this.checkBoxInfo.checked = true;
        this.setError(null);
        this.loginSteps = LOGIN_STEPS.CREATE;
        this.otpTextField.initialValue = null;
        this.activeTextFieldName = TextFieldType.EMAIL;
        break;
    }

    this.changeLoader(false);

    // console.log(this);
  }

  handleClose(index, item) {
    console.log('handleClose');
    this.countryIcon = item.logo;
    this.countryCode = item.idd_prefix.toString();
    this.selectedCountryIndex = index;
    if (!item.digits) {
      this.maxLength = 11;
    } else {
      this.maxLength = item.digits;
    }
    this.emailTextField.countryIcon = this.countryIcon;
    this.emailTextField.maxLength = this.maxLength;
    this.activeStepInfo.isSelected = (item) => item.idd_prefix.toString() === this.countryCode;
  }

  getDropdownInfos() {
    this.dropdownInfos.map((country, index) => {
      if (country.idd_prefix.toString() === this.countryCode) {
        this.countryCode = country.idd_prefix.toString();
        this.maxLength = country.digits ? country.digits : 11;
        this.countryIcon = country.logo;
        this.emailTextField.isSelected = (item) => item.idd_prefix.toString() === this.countryCode;
        this.emailTextField.countryIcon = this.countryIcon;
        this.emailTextField.maxLength = this.maxLength;
        this.emailTextField.selectedCountryIndex = this.selectedCountryIndex;
      }
    });
  }

  goBack() {
    this.openLoginPopup = false;
    setTimeout(() => {
      if (this.props.goBack) this.props.goBack();
    }, 300);
  }

  getCountryIcon(item) {
    return item.logo;
  }

  getMaxLength(item) {
    return !item.digits ? 11 : item.digits;
  }

  changeLoader(booleanValue) {
    booleanValue == true ? (this.loadingStatus = true) : (this.loadingStatus = false);
  }
}
decorate(LoginVM, {
  loadingStatus: observable,
  showInitialLoader: observable,
  emailTextField: observable,
  activeTextFieldName: observable,
  passwordTextField: observable,
  otpTextField: observable,
  verifyValue: observable,
  editButtonInfo: observable,
  checkBoxInfo: observable,
  ForgotPasswordInfo: observable,
  errorInfo: observable,
  signUpInfo: observable,
  openLoginPopup: observable,
  dropdownInfos: observable,
  newUser: observable,
});

export default LoginVM;
