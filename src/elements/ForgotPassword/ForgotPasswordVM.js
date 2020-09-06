import React, { useRef } from 'react';

import { action, observable, decorate, computed, toJS } from 'mobx';

import { EMAIL_INFO, PASSWORD_OTP_INFO, NEW_PASSWORD_INFO, OTP_INFO } from '../Utils/FieldArraysForgotPassword';

import { validateEmailMobile, validateOTP, validateNewPassword } from '../Utils/FormUtils/validation';
import { SIGNUP_STEPS_ARRAY, TextFieldType } from '../Constants/constants';

import CreateAuthService from '../API_Services/AuthServices/CreateAuthService';
import VerifyAuthService from '../API_Services/AuthServices/VerifyAuthService';
import ForgotPasswordService from '../API_Services/ForgotPasswordServices/ForgotPasswordService';
import { preparePasswordRequest, prepareCreateAuthRequest, prepareVerifyAuthRequest } from '../Utils/Requests';
class ForgotPasswordVM {
  constructor(props) {
    this.FP = props.dataSource && props.dataSource.FP;

    this.ipObject = this.FP && this.FP.ipObject;
    console.log(this.ipObject);
    this.props = props;
    this.showInitialLoader = false;
    this.loadingStatus = false;
    this.errorInfo = { error: '' };
    this.authToken = null;
    this.page = 0;

    this.forgotPasswordService = new ForgotPasswordService(this);

    this.forgotPasswordService.browserID = 'TEMP_BROWSER_ID';
    this.forgotPasswordService.leadID = props.initialLeadID;

    this.openForgotPasswordPopup = props.openPopup || true;

    this.newResetPassword = null;
    this.activeTextFieldName = TextFieldType.OTP;
    this.direction = props.language ? props.language : props.theme.direction;

    /// Email / Mobile
    this.selectedCountryIndex = null;
    this.maxLength = 11;
    this.countryCode = props.countryCode ? props.countryCode : 965;
    this.countryIcon = 'https://www.gotapnow.com/web/countryflag/Kuwait.png';
    this.getCountryTextPattern = this.direction === 'rtl' ? 'item.name.arabic' : 'item.name.english';
    this.countrySearchPattern = this.direction === 'rtl' ? 'item.name.arabic' : 'item.name.english';
    this.username = '';
    this.otp = '';
    this.countryInfos = props.dataSource.countryInfos || [];

    this.onSubmit = this.onSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
    this.setError = this.setError.bind(this);
    this.changeLoader = this.changeLoader.bind(this);
    this.storeUserName = this.storeUserName.bind(this);

    this.init = this.init.bind(this);
    this.changeStep = this.changeStep.bind(this);
    this.prepareStepInfo = this.prepareStepInfo.bind(this);
    this.canSubmitStep = this.canSubmitStep.bind(this);
    this.handleCountryClose = this.handleCountryClose.bind(this);

    this.moveToLogin = this.moveToLogin.bind(this);

    this.storeResetPassword = this.storeResetPassword.bind(this);
    this.getStepData = this.getStepData.bind(this);
    this.update = this.update.bind(this);

    this.init();
  }

  async init() {
    // this.showInitialLoader = true;

    this.countryCode = this.ipObject.location.calling_code || this.countryCode;
    this.countryIcon = this.ipObject.location.country_flag || this.countryIcon;

    //////// [Temp code to navigate steps]
    this.changeStep(
      [0, 1, 2].includes(parseInt(window.location.pathname.split('/').pop()))
        ? parseInt(window.location.pathname.split('/').pop())
        : this.page,
    );

    this.showInitialLoader = false;
  }

  getStepData() {
    return {
      step_type: this.page,
      step_name: SIGNUP_STEPS_ARRAY[this.page],
    };
  }

  update(status, step) {
    this.props.onUpdate(status, step);
  }

  changeStep(stepIndex) {
    console.log(stepIndex);
    this.page = stepIndex;
    this.prepareStepInfo();
  }

  handleCountryClose(index, item) {
    this.countryIcon = item.logo;
    this.countryCode = item.idd_prefix.toString();
    this.selectedCountryIndex = index;
    if (!item.digits) {
      this.maxLength = 11;
    } else {
      this.maxLength = item.digits;
    }
    this.activeStepInfo.countryIcon = this.countryIcon;
    this.activeStepInfo.maxLength = this.maxLength;
    this.activeStepInfo.selectedIndex = this.selectedCountryIndex;
    this.activeStepInfo.isSelected = (item) => item.idd_prefix.toString() === this.countryCode;
  }

  getCountryIcon(item) {
    return item.logo;
  }

  getMaxLength(item) {
    return !item.digits ? 11 : item.digits;
  }

  prepareStepInfo() {
    console.log('%cprepareStepInfo', 'background:yellow;');

    switch (this.page) {
      case 0:
        this.activeStepInfo = EMAIL_INFO;
        this.activeStepInfo.initialValue = this.leadUsername;
        this.activeStepInfo.dropdownInfos = this.countryInfos;
        this.activeStepInfo.getTextPattern = this.getCountryTextPattern;
        this.activeStepInfo.searchPattern = this.countrySearchPattern;
        this.activeStepInfo.isSelected = (item) => item.idd_prefix.toString() === this.countryCode;

        this.activeStepInfo.getDropdownIcon = (item) => {
          return item.logo;
        };

        this.activeStepInfo.getSelectedItem = (item) => {
          if (item) return this.direction === 'rtl' ? item.name.arabic : item.name.english;
        };

        this.activeStepInfo.filter = (value) => {
          return this.activeStepInfo.dropdownInfos.filter(
            (item) =>
              eval(this.countrySearchPattern).toLowerCase().includes(value.toLowerCase()) ||
              ('+' + eval('item.idd_prefix').toString().toLowerCase()).includes(value.toLowerCase()),
          );
        };

        this.activeStepInfo.renderMenuItem = (item) => {
          if (item)
            return (
              <div>
                <span style={{ float: this.direction === 'ltr' ? 'left' : 'right' }}>
                  {this.direction === 'rtl' ? item.name.arabic : item.name.english}
                </span>
                <span style={{ float: this.direction === 'ltr' ? 'right' : 'left' }}>{'+' + item.idd_prefix}</span>
              </div>
            );
        };

        this.countryInfos.map((country, index) => {
          if (country.idd_prefix.toString() === this.countryCode) {
            this.maxLength = country.digits ? country.digits : 11;
            this.countryIcon = country.logo || this.countryIcon;
            this.selectedCountryIndex = index;
            this.activeStepInfo.countryIcon = this.countryIcon;
            this.activeStepInfo.maxLength = this.maxLength;
            this.activeStepInfo.getMaxLength = this.getMaxLength;
            this.activeStepInfo.getCountryIcon = this.getCountryIcon;
          }
        });

        this.activeStepInfo.onClose = this.handleCountryClose;

        this.activeStepInfo.onChange = (event) => {
          this.setError(null);
          this.storeUserName(event.target.value);
        };
        this.activeStepInfo.clear = () => {
          this.storeUserName(null);
        };
        this.activeStepInfo.onEnterPressed = () => {
          console.log('onEnterPressed');
          this.onSubmit();
        };
        break;
      case 1:
        this.activeStepInfo = PASSWORD_OTP_INFO;
        this.newResetPassword = null;
        this.activeStepInfo.verifyValue.value = this.username;
        this.activeStepInfo.activeTextFieldName = TextFieldType.OTP;
        this.activeStepInfo.editButtonInfo.onPress = () => {
          this.goBack();
        };

        this.activeStepInfo.newPasswordInfos[0].onEnterPressed = () => {
          this.onSubmit();
        };

        this.activeStepInfo.newPasswordInfos[1].onEnterPressed = () => {
          this.onSubmit();
        };

        break;
      case 2:
        this.activeStepInfo = OTP_INFO;

        this.activeStepInfo.onChange = (value) => {
          this.setError(null);
          this.storeOtp(value);
        };
        this.activeStepInfo.onEnterPressed = () => {
          console.log('onEnterPressed');
          this.onSubmit();
        };

        break;
      case 3:
        break;
      default:
        this.activeStepInfo = EMAIL_INFO; /// this is default placeholder
        break;
    }
  }

  storeOtp(_txt) {
    this.otp = _txt;
  }

  storeUserName(username) {
    this.username = username;
  }

  storeResetPassword(pass) {
    console.log('password');
    this.setError(null);
    this.newResetPassword = pass;
  }

  getErrorString(data) {
    if (data && data.errors && data.errors[0]) return data.errors[0].description;
    return 'signup_generic_error'; // 'User unpredicted behavior please contact our support'
  }

  onSubmit() {
    const stepData = this.canSubmitStep();

    if (stepData) {
      //// stepData is valid, no need to call API
      this.changeLoader(true);
      switch (this.page) {
        case 0:
          this.update('Username is verified', 0);
          this.changeStep(1);
          this.changeLoader(false);
          //// step initiate
          break;
        case 1:
          this.forgotPasswordService.setPassword({ ...stepData }, (data) => {
            if (data)
              if (data.errors) {
                this.setError(this.getErrorString(data));
              } else {
                ///// TODO: check success

                if (
                  (data.status && data.status.toLowerCase() == 'pending') ||
                  (data.stauts && data.stauts.toLowerCase() == 'pending')
                ) {
                  this.authToken = data.auth_token;
                  this.update('Password is updated', 1);
                  this.changeStep(2);
                }
              }
            else this.setError('login_server_error');
            console.log('data');
            console.log(data);
            this.changeLoader(false);
          });

          break;

        case 2:
          this.forgotPasswordService.confirmOTP({ ...stepData }, (data) => {
            if (data != null)
              if (data.errors != null) {
                this.setError(this.getErrorString(data));
              } else {
                ///// TODO: check success
                if (
                  (data.status && data.status.toLowerCase() == 'verified') ||
                  (data.stauts && data.stauts.toLowerCase() == 'verified')
                )
                  this.update('OTP is updated', 2);
                this.changeStep(3);
              }
            else this.setError('login_server_error');
            console.log('data');
            console.log(data);
            this.changeLoader(false);
          });
          break;

        case 3:
          this.openForgotPasswordPopup = false;
          this.props.onForgotPasswordSuccess();
      }
    }
  }

  canSubmitStep() {
    var error = null;

    switch (this.page) {
      case 0: //// email/mobile OTP step
        error = null;
        error = validateEmailMobile(this.username).email;
        console.log('error');
        console.log(error);
        this.setError(error);
        return error ? false : true;

      case 1: //// password OTP step
        error = null;
        error = validateNewPassword(this.newResetPassword).name;
        console.log('error');
        console.log(error);
        this.setError(error);
        return error
          ? false
          : {
              password: this.newResetPassword,
              ...prepareCreateAuthRequest(this.username, this.countryCode, this.username),
            };

      case 2: ////password step
        error = validateOTP(this.otp).name;
        console.log(error);
        this.setError(error);
        return error ? false : { otp: this.otp, auth_token: this.authToken };

      default:
        return {};
    }
  }
  setError(error) {
    this.changeLoader(false);
    this.errorInfo = { error: error };
  }

  goBack() {
    this.setError(null);
    this.changeStep(--this.page);
  }

  moveToLogin() {
    this.openForgotPasswordPopup = false;
    setTimeout(() => {
      if (this.props.moveToLogin) this.props.moveToLogin();
    }, 300);
  }

  changeLoader(booleanValue) {
    booleanValue == true ? (this.loadingStatus = true) : (this.loadingStatus = false);
  }
}
decorate(ForgotPasswordVM, {
  loadingStatus: observable,
  showInitialLoader: observable,
  openForgotPasswordPopup: observable,
  errorInfo: observable,
  page: observable,
  activeStepInfo: observable,
});

export default ForgotPasswordVM;
