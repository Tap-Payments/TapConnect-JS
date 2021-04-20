import React, { useRef } from 'react';

import { action, observable, decorate, computed, toJS } from 'mobx';

import CreateAuthService from '../API_Services/AuthServices/CreateAuthService';
import VerifyAuthService from '../API_Services/AuthServices/VerifyAuthService';
import {
  BUSINESS_NAME_SECTOR_INFO,
  USER_NAME_INFO,
  EMAIL_INFO,
  PASSWORD_INFO,
  BUSINESS_TYPE_LICENSED,
  PASSWORD_OTP_INFO,
  OTP_INFO,
  NEW_PASSWORD_INFO,
  BUSINESS_LICENSED,
} from '../Utils/FieldArraysSignup';

import {
  prepareBusinessNameRequest,
  prepareBusinessTypeRequest,
  prepareUserNameRequest,
  preparePasswordRequest,
  prepareCreateAccountRequest,
  prepareCreateAuthRequest,
  prepareBusinessLicensedRequest,
} from '../Utils/Requests';
import {
  validateBusinessName,
  validatePassword,
  validateEmailMobile,
  validateOTP,
  validateUserName,
  validateBusinessType,
  validateBusinessCountry,
  validateBusinessSector,
  validateNewPassword,
} from '../Utils/FormUtils/validation';
import { SIGNUP_STEPS_ARRAY, TextFieldType } from '../Constants/constants';

import SignupService from '../API_Services/SignupServices/SignupService';

import { InputTypeEnum } from '../TapInput/TapInput';

class SignupVM {
  constructor(props) {
    this.FP = props.dataSource && props.dataSource.fingerPrintModel && props.dataSource.fingerPrintModel.FP;
    this.isConnect = props.isConnect;
    this.ipObject = this.FP && this.FP.ipObject;
    console.log(this.ipObject);
    this.props = props;
    this.showInitialLoader = false;
    this.loadingStatus = false;
    this.errorInfo = { error: '' };
    // this.leadID = 'LEAD_ID_213456789';
    this.signupService = new SignupService(this);

    this.signupService.browserID = 'TEMP_BROWSER_ID';
    this.signupService.leadID = props.initialLeadID;
    this.page = this.signupService.leadID ? 2 : 0;

    this.businessName = null;
    this.firstName = null;
    this.lastName = null;
    this.password = null;
    this.otp = null;
    this.isLicensed = true;
    this.confirmedNewPassword = null;
    this.activeTextFieldName = TextFieldType.OTP;
    this.signUpToken = null;
    this.direction = props.direction;
    this.itemGetTextPattern = this.direction === 'rtl' ? 'item.name.ar' : 'item.name.en';
    this.searchPattern = this.direction === 'rtl' ? 'item.name.ar' : 'item.name.en';
    this.sectors = props.dataSource.sectors || [];
    this.selectedSectorIndex = '';
    this.selectedSectorId = '';

    /// BusinessType
    this.businessTypeGetTextPattern = this.direction === 'rtl' ? 'item.type_name_ar' : 'item.type_name_en';
    this.businessTypeSearchPattern = this.direction === 'rtl' ? 'item.type_name_ar' : 'item.type_name_en';
    this.businessTypes = props.dataSource.businessTypes || [];
    this.selectedBusinessTypeIndex = '';
    this.selectedBusinessType = '';

    /// BusinessCountry
    this.businessCountryGetTextPattern = this.direction === 'rtl' ? 'item.name.arabic' : 'item.name.english';
    this.businessCountrySearchPattern = this.direction === 'rtl' ? 'item.name.arabic' : 'item.name.english';
    this.businessCountryId = '';
    this.businessCountryCode = '';
    this.businessCountries = props.dataSource.businessCountries || [];
    this.selectedBusinessCountryIndex = '';
    this.businessCountryIcon = '';

    /// Email / Mobile Lead
    this.leadMaxLength = 11;
    this.leadUsername = this.props.defaultEmailOrMobile || '';
    this.leadOtp = '';

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

    this.socialMediaMetaData = {};
    this.updatedContactLeadObject = null;
    this.userProvidedEmail = null;
    this.moveToLogin = this.moveToLogin.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
    this.setError = this.setError.bind(this);
    this.changeLoader = this.changeLoader.bind(this);
    this.init = this.init.bind(this);
    this.storeBusinessName = this.storeBusinessName.bind(this);
    this.changeStep = this.changeStep.bind(this);
    this.prepareStepInfo = this.prepareStepInfo.bind(this);
    this.canSubmitStep = this.canSubmitStep.bind(this);
    this.handleCountryClose = this.handleCountryClose.bind(this);
    this.handleLeadCountryClose = this.handleLeadCountryClose.bind(this);
    this.storeConfirmedPassword = this.storeConfirmedPassword.bind(this);
    this.callCreateAccountAPI = this.callCreateAccountAPI.bind(this);
    this.getStepData = this.getStepData.bind(this);
    this.storeSocialMediaMetaData = this.storeSocialMediaMetaData.bind(this);

    this.update = this.update.bind(this);

    this.init();

    setTimeout(() => {
      /// delay to ensure there is browser ID
      this.signupService.browserID = this.FP.browser.browser_id;
    }, 2000);
  }

  async init() {
    this.showInitialLoader = true;

    this.countryCode =
      (this.ipObject && this.ipObject.location && this.ipObject.location.calling_code) || this.countryCode;
    this.countryIcon =
      (this.ipObject && this.ipObject.location && this.ipObject.location.country_flag) || this.countryIcon;
    this.businessCountryIcon = this.ipObject && this.ipObject.location && this.ipObject.location.country_flag;
    this.businessCountryCode = this.ipObject && this.ipObject.location && this.ipObject.location.calling_code;

    //////// [Temp code to navigate steps]
    this.changeStep(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(window.location.pathname.split('/').pop()))
        ? parseInt(window.location.pathname.split('/').pop())
        : this.page,
    );

    this.showInitialLoader = false;
  }

  moveToLogin() {
    setTimeout(() => {
      if (this.props.moveToLogin) this.props.moveToLogin();
    }, 300);
  }

  getStepData() {
    return {
      step_type: this.page,
      step_name: SIGNUP_STEPS_ARRAY[this.page],
    };
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

  handleLeadCountryClose(index, item) {
    this.countryIcon = item.logo;
    this.countryCode = item.idd_prefix.toString();
    this.selectedCountryIndex = index;
    if (!item.digits) {
      this.leadMaxLength = 11;
    } else {
      this.leadMaxLength = item.digits;
    }
    this.activeStepInfo.countryIcon = this.countryIcon;
    this.activeStepInfo.maxLength = this.leadMaxLength;
    this.activeStepInfo.isSelected = (item) => item.idd_prefix.toString() === this.countryCode;
  }

  getCountryIcon(item) {
    return item.logo;
  }

  getMaxLength(item) {
    return !item.digits ? 11 : item.digits;
  }

  update(status, step) {
    this.props.onUpdate(status, step);
  }

  prepareStepInfo() {
    console.log('%cprepareStepInfo', 'background:yellow;');

    switch (this.page) {
      case 0:
        this.activeStepInfo = EMAIL_INFO;
        this.activeStepInfo.inputType = InputTypeEnum.MOBILE;
        this.activeStepInfo.placeholder = 'signup_enter_mobile';

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
                <span style={{ float: this.direction === 'rtl' ? 'right' : 'left', paddingInlineEnd: '10px' }}>
                  {this.direction === 'rtl' ? item.name.arabic : item.name.english}
                </span>
                <span style={{ float: this.direction === 'rtl' ? 'left' : 'right' }}>{'+' + item.idd_prefix}</span>
              </div>
            );
        };

        this.countryInfos.map((country, index) => {
          if (country.idd_prefix.toString() === this.countryCode) {
            this.leadMaxLength = country.digits ? country.digits : 11;
            this.countryIcon = country.logo || this.countryIcon;
            this.selectedCountryIndex = index;
            this.activeStepInfo.countryIcon = this.countryIcon;
            this.activeStepInfo.maxLength = this.leadMaxLength;
            this.activeStepInfo.getMaxLength = this.getMaxLength;
            this.activeStepInfo.getCountryIcon = this.getCountryIcon;
          }
        });

        this.activeStepInfo.onClose = this.handleLeadCountryClose;

        this.activeStepInfo.onChange = (event) => {
          this.setError(null);
          this.storeLeadUserName(event.target.value);
        };
        this.activeStepInfo.clear = () => {
          this.storeLeadUserName(null);
        };
        this.activeStepInfo.onEnterPressed = () => {
          console.log('onEnterPressed');
          this.onSubmit();
        };
        break;
      case 1:
        this.activeStepInfo = PASSWORD_OTP_INFO;
        this.activeStepInfo.verifyValue.value = this.leadUsername;
        this.activeStepInfo.activeTextFieldName = TextFieldType.OTP;
        this.activeStepInfo.editButtonInfo.onPress = () => {
          this.goBack();
        };
        this.activeStepInfo.otpTextField.onChange = (value) => {
          this.setError(null);
          this.storeLeadOtp(value);
        };
        this.activeStepInfo.otpTextField.onEnterPressed = () => {
          console.log('onEnterPressed');
          this.onSubmit();
        };
        break;

      case 2:
        this.activeStepInfo = null;
        this.activeStepInfo = EMAIL_INFO;
        this.activeStepInfo.inputType = InputTypeEnum.EMAIL;
        this.userProvidedEmail = false;
        this.activeStepInfo.placeholder = 'signup_enter_email';

        this.activeStepInfo.initialValue = this.username;

        this.activeStepInfo.onChange = (event) => {
          this.setError(null);
          this.storeUserName(event.target.value);
        };
        this.activeStepInfo.onEnterPressed = () => {
          console.log('onEnterPressed');
          this.onSubmit();
        };
        this.activeStepInfo.clear = () => {
          this.storeUserName(null);
        };

        break;

      case 3:
        this.activeStepInfo = NEW_PASSWORD_INFO;

        this.activeStepInfo[0].onEnterPressed = () => {
          this.onSubmit();
        };

        this.activeStepInfo[1].onEnterPressed = () => {
          this.onSubmit();
        };

        break;
      default:
        this.activeStepInfo = EMAIL_INFO; /// this is default placeholder

        break;
    }
  }

  storeBusinessName(name) {
    // if (this.businessName == this.brandName) {
    //   this.storeBrandName(name);
    // }
    this.businessName = name;
  }
  storeFirstName(name) {
    this.firstName = name;
    // this extra step to update the TextField if the data is fetched from social media
    this.activeStepInfo[0].value = name;
    this.setError(null);
  }
  storeLastName(name) {
    this.lastName = name;
    // this extra step to update the TextField if the data is fetched from social media
    this.activeStepInfo[1].value = name;
    this.setError(null);
  }

  storeUserName(_txt) {
    this.username = _txt;
  }

  storeLeadUserName(_txt) {
    this.leadUsername = _txt;
  }

  storeOtp(_txt) {
    this.otp = _txt;
  }

  storeLeadOtp(_txt) {
    this.leadOtp = _txt;
  }

  storeConfirmedPassword(pass) {
    console.log('password');
    this.confirmedNewPassword = pass;
  }

  storeSocialMediaMetaData(data) {
    this.socialMediaMetaData = data;
    if (data && data.first_name) this.storeFirstName(data.first_name);
    if (data && data.last_name) this.storeLastName(data.last_name);
  }

  callCreateAccountAPI(leadStepData = {}) {
    //// call API to fetch signup_token
    this.signupService.createAccount(
      {
        ...leadStepData,
        ...this.getStepData(),
        ...{
          lead_id: this.signupService.leadID,
          notify: {
            email: true,
            phone: true,
          },
          skip_legacy: true,
        },
      },
      (data) => {
        if (data && data.signup_token) {
          this.signUpToken = data.signup_token;
          this.update('User info is updated', 6);

          this.changeStep(3);
        } else {
          if (data && data.status == 'ALREADY_TAKEN') {
            this.setError('signup_user_exists_error');
          } else if (data && data.errors != null) {
            this.setError(this.getErrorString(data));
          }
        }
        this.changeLoader(false);
      },
    );
  }
  getErrorString(data) {
    if (data && data.errors && data.errors[0]) return data.errors[0].description || data.errors[0].message;
    return 'signup_generic_error'; // 'User unpredicted behavior please contact our support'
  }
  onSubmit() {
    const stepData = this.canSubmitStep();
    if (stepData) {
      //// stepData is valid, call API
      this.loadingStatus = true;
      switch (this.page) {
        case 0:
          let createBody = { user_credentail: stepData, device_info: this.FP, ...this.getStepData() };
          CreateAuthService.createAuth(createBody, (data) => {
            if (data != null)
              if (data.errors != null) {
                this.setError(this.getErrorString(data));
              } else {
                //// 5 otp for email
                //// 2 otp for mobile
                // if (data.auth_type == 5 || data.auth_type == 2) {

                if (data.status == 'pending' && data.new_user == true) {
                  this.authPrevResponse = data;
                  this.update('Email is verified', 0);
                  this.changeStep(1);
                } else {
                  this.setError('signup_user_exists_error');
                }
              }
            else this.setError('login_server_error');
            console.log('data');
            console.log(data);
            this.changeLoader(false);
          });
          break;
        case 1:
          VerifyAuthService.verifyAuth({ ...stepData, ...this.getStepData() }, (data) => {
            if (data != null)
              if (data != null && data.errors != null) this.setError(this.getErrorString(data));
              else {
                this.signupService.leadID = data.lead_id;
                this.update('OTP is verified', 1);
                this.changeStep(2);
              }
            else this.setError(this.leadOtp == null ? 'login_enter_otp' : 'login_invalid_otp');
            console.log(data);

            this.changeLoader(false);
          });
          break;

        case 2:
          //// step before password screen
          this.signupService.updateLead({ ...this.getStepData(), ...stepData }, (data) => {
            if (!data) {
              this.setError('signup_invalid_api_response_error');
            } else {
              if (data.errors != null) this.setError(this.getErrorString(data));

              if (['Active', 'COMPLETED'].includes(data.status) && data.step_type) {
                ///step no. 6, it will wait for create account
                this.callCreateAccountAPI(stepData);
              }
            }
          });
          break;

        case 3:
          this.changeLoader(false);

          break;
        default:
          //// update lead
          this.signupService.updateLead({ ...this.getStepData(), ...stepData }, (data) => {
            if (!data) {
              this.setError('signup_invalid_api_response_error');
            } else {
              if (data.errors != null) this.setError(this.getErrorString(data));
              if (data.contact && data.contact != {}) this.updatedContactLeadObject = data.contact;

              if (['Active', 'COMPLETED'].includes(data.status) && data.step_type) {
                this.update('Data is updated', data.step_type - 1);
                this.changeStep(data.step_type);
              }
            }

            this.changeLoader(false);
          });
          break;
      }
    }
  }

  canSubmitStep() {
    var error = null;

    switch (this.page) {
      case 0: //// email/mobile OTP step
        error = null;
        error = validateEmailMobile(this.leadUsername).email;
        console.log('error');
        console.log(error);
        this.setError(error);

        return error ? false : prepareCreateAuthRequest(this.leadUsername, this.countryCode, this.leadUsername);

      case 1: //// password OTP step
        error = null;
        error = validateOTP(this.leadOtp).otp;
        console.log('error');
        console.log(error);
        this.setError(error);
        return error ? false : { data: this.leadOtp, ...this.authPrevResponse };

      case 2: //// email/mobile OTP step
        error = null;
        error = validateEmailMobile(this.username).email;
        console.log('error');
        console.log(error);
        this.setError(error);
        return error
          ? false
          : prepareCreateAccountRequest(
              this.username,
              this.countryCode,
              this.username,
              this.props.country,
              this.props.businessSegment,
            );

      case 3: //// final step, don't proceed
        this.props.onSignupSuccess('success', this.FP.browser.browser_id);
      default:
        return {};
    }
  }
  setError(error) {
    this.changeLoader(false);
    this.errorInfo = { error: error };
  }

  goBack() {
    if (this.props.showBackButton && this.page == 0) {
      setTimeout(() => {
        if (this.props.goBack) this.props.goBack();
      }, 300);
    } else {
      this.setError(null);
      if (this.page == 2) this.changeStep(0);
      else this.changeStep(--this.page);
    }
  }

  changeLoader(booleanValue) {
    booleanValue == true ? (this.loadingStatus = true) : (this.loadingStatus = false);
  }
}
decorate(SignupVM, {
  loadingStatus: observable,
  showInitialLoader: observable,
  openSignupPopup: observable,
  errorInfo: observable,
  page: observable,
  activeStepInfo: observable,
  isLicensed: observable,
});

export default SignupVM;
