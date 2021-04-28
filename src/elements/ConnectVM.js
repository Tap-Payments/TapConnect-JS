import { action, observable, decorate, autorun } from 'mobx';

import { PageMode, AnimationType, DialogMode } from './Constants/constants';
import ConnectDataSource from './ConnectDataSource';
import ConnectPackage from './ConnectPackage';
import axios from 'axios';
import { createMuiTheme } from '@material-ui/core/styles';
import { theme } from './theme/index';
import _defaultProps from './defaultProps';
import _ from 'lodash';
import VerifyAuthService from './API_Services/AuthServices/VerifyAuthService';

class ConnectVM {
  constructor(props) {
    this.onFinishedFetchingData = this.onFinishedFetchingData.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onSignupSuccess = this.onSignupSuccess.bind(this);
    this.onForgotPasswordSuccess = this.onForgotPasswordSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
    this.moveToSignup = this.moveToSignup.bind(this);
    this.storeLeadID = this.storeLeadID.bind(this);
    this.moveToLogin = this.moveToLogin.bind(this);
    this.moveToForgot = this.moveToForgot.bind(this);
    this.hideLoader = this.hideLoader.bind(this);
    this.initializePageMode = this.initializePageMode.bind(this);
    this.updatePageMode = this.updatePageMode.bind(this);
    this.updateAnimationType = this.updateAnimationType.bind(this);
    this.reConstruct = this.reConstruct.bind(this);
    this.checkForAuthToken = this.checkForAuthToken.bind(this);

    console.log('ConnectVM');
    console.log(props);
    this.reConstruct(props);
    this.autorunDisposer = autorun(() => {
      if (ConnectDataSource.isDataReady) this.onFinishedFetchingData();
    });
  }
  reConstruct(props) {
    this.props = { ..._defaultProps, ...props };
    axios.defaults.headers['connect_live_mode'] = this.props.liveMode;
    this.checkForAuthToken();
    if (!ConnectDataSource.publicKey) ConnectDataSource.publicKey = this.props.publicKey;
    if (ConnectDataSource.publicKey && ConnectDataSource.publicKey != this.props.publicKey)
      ConnectDataSource.updatePublicKey(props.publicKey);

    if (ConnectDataSource.liveMode != this.props.liveMode) ConnectDataSource.updateLiveMode(props.liveMode);
    this.language = this.props.language;
    this.direction = this.props.direction ? this.props.direction : this.props.theme.direction;
    ConnectDataSource.updateDSDirection(this.direction);
    ConnectDataSource.updateDSLanguage(this.language);
    ConnectDataSource.onFailure = this.onFailure;
    this.combinedTheme = createMuiTheme({
      direction: this.direction,
      palette: { ...theme.palette, ...this.props.theme.palette },
      typography: { ...theme.typography, ...this.props.theme.typography },
      overrides: { ...theme.overrides, ...this.props.theme.overrides },
    });
    this.leadId = null;
    this.hideInitialLoader = false;
    this.isLoading = true;
    this.showBackButton = false;
    this.openController = null;
    this.openPopup = this.props.openPopup;
    this.openLoaderModal = true;

    this.initializePageMode(this.props.pageMode);
  }

  initializePageMode(mode) {
    if (mode == PageMode.CONNECT) {
      this.isConnect = true;
      if (window.location.pathname.search(this.props.signinDirectory) > 0) {
        this.activePageMode = PageMode.LOGIN;
      } else if (window.location.pathname.search(this.props.signupDirectory) > 0) {
        this.activePageMode = PageMode.SIGNUP;
      } else if (window.location.pathname.search(this.props.forgotDirectory) > 0) {
        this.activePageMode = PageMode.FORGOT;
      } else {
        this.activePageMode = PageMode.LOGIN;
      }
    } else {
      this.isConnect = false;
      this.activePageMode = mode;
    }
    this.updateAnimationType(this.activePageMode);
  }
  updatePageMode(mode, isConnect) {
    this.openPopup = false;
    if (this.openController != null) this.openController = false;
    this.updateAnimationType(mode);
    if (this.props.dialogMode == DialogMode.POPUP) {
      this.onAnimationExited = () => {
        setTimeout(() => {
          this.activePageMode = mode;
          this.isConnect = isConnect || mode == PageMode.CONNECT ? true : false;
          this.openPopup = true;
          if (this.openController != null) this.openController = true;
        }, 200);
      };
    } else {
      this.activePageMode = mode;
      this.isConnect = isConnect || mode == PageMode.CONNECT ? true : false;
      this.openPopup = true;
    }
  }
  updateAnimationType(mode) {
    if (this.props.animationType) {
      this.animationType = this.props.animationType;
    } else
      switch (mode) {
        case PageMode.FORGOT:
          this.animationType = AnimationType.SLIDEUP;
          break;
        case PageMode.LOGIN:
          this.animationType = this.showBackButton ? AnimationType.SLIDEUP : AnimationType.SLIDEDOWN;

          break;
        case PageMode.SIGNUP:
          this.animationType = AnimationType.SLIDEUP;
          break;
        case PageMode.CONNECT:
          this.animationType = AnimationType.SLIDEDOWN;
          break;
        default:
          this.animationType = AnimationType.SLIDEUP;
          break;
      }

    console.log('new animation type');
    console.log(this.animationType);
  }
  checkForAuthToken() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has('auth')) {
      VerifyAuthService.verifyAuth(
        {
          auth_token: encodeURIComponent(urlParams.get('auth')),
          auth_type: urlParams.get('type'),
          step_name: 'VERIFY_AUTH_FROM_QUERY',
        },
        (data) => {
          if (data && data.signup_token) {
            ConnectDataSource.signUpToken = data.signup_token;
            /// bypass country, business country api etc...
            ConnectDataSource.isDataReady = true;
          } else {
            this.onFailure({ error: 'Auth token is invalid [MagicLink]' });
          }
        },
      );
    }
  }
  onFinishedFetchingData() {
    if (!ConnectDataSource.isDataReady) return;
    /// check country and segment only for Signup
    if (![PageMode.CONNECT, PageMode.SIGNUP].includes(this.props.pageMode)) return;
    /// don;t check country and segment if there is SignupID [user already signed up]
    if (ConnectDataSource.signUpToken) return;
    if (
      !(
        this.props.country &&
        _.findIndex(ConnectDataSource.businessCountries, (item) => item.code === this.props.country) >= 0
      )
    ) {
      this.onFailure({ error: 'A valid supported business country is required.' });
      ConnectDataSource.isDataReady = false;
      return;
    }

    if (
      !(
        this.props.businessSegment &&
        _.findIndex(ConnectDataSource.businessSegments, (item) => item.code === this.props.businessSegment) >= 0
      )
    ) {
      this.onFailure({ error: 'A valid business segment is required.' });
      ConnectDataSource.isDataReady = false;
      return;
    }

    this.isLoading = false;
    console.log('%cSETUP IS FINE! GOOD TO GO! ', 'background:green; color:white;');

    return;
  }

  moveToForgot() {
    this.hideLoader(false);
    this.updatePageMode(PageMode.FORGOT, this.isConnect);
    window.history.pushState(
      '',
      '',
      window.location.pathname.replace(this.props.signinDirectory, this.props.forgotDirectory),
    );
    this.hideLoader(true);
  }

  moveToSignup() {
    this.hideLoader(false);

    if (window.location.pathname.search(this.props.landingDirectory) > 0) this.showBackButton = true;
    else this.showBackButton = false;

    if (this.isConnect) {
      this.updatePageMode(PageMode.SIGNUP, true);

      window.history.pushState(
        '',
        '',
        window.location.pathname.replace(
          window.location.pathname.search(this.props.landingDirectory) > 0
            ? this.props.landingDirectory
            : this.props.signinDirectory,
          this.props.signupDirectory,
        ),
      );
    } else if (this.props.moveToSignup) this.props.moveToSignup();

    this.hideLoader(true);
  }

  moveToLogin() {
    this.hideLoader(false);

    if (window.location.pathname.search(this.props.landingDirectory) > 0) this.showBackButton = true;
    else this.showBackButton = false;

    if (this.isConnect || this.activePageMode == PageMode.FORGOT) {
      this.updatePageMode(PageMode.LOGIN, this.isConnect);

      window.history.pushState(
        '',
        '',
        window.location.pathname.replace(
          window.location.pathname.search(this.props.signupDirectory) > 0
            ? this.props.signupDirectory
            : !(window.location.pathname.search(this.props.forgotDirectory) > 0)
            ? this.props.landingDirectory
            : this.props.forgotDirectory,
          this.props.signinDirectory,
        ),
      );
    } else if (this.props.moveToLogin) this.props.moveToLogin();

    this.hideLoader(true);
  }
  storeLeadID(leadId) {
    this.leadId = leadId;
  }

  hideLoader(status) {
    this.hideInitialLoader = status;
  }
  onLoginSuccess(response, browserID) {
    console.log(response, browserID);

    /// remove auth type if there is one
    if (this.props.removeAuthType) this.props.removeAuthType();

    if (response && response.lead_id) {
      this.storeLeadID(response.lead_id);
      if (this.isConnect) this.moveToSignup();
    } else {
      ConnectPackage.close();
      if (this.props.onSuccess) {
        if (this.props.dialogMode == DialogMode.POPUP)
          this.onAnimationExited = () =>
            this.props.onSuccess({ ...response, browserID: browserID }, this.activePageMode);
      } else {
        this.props.onSuccess({ ...response, browserID: browserID }, this.activePageMode);
      }
    }
  }

  onForgotPasswordSuccess(response, browserID) {
    this.moveToLogin();
    if (this.props.onSuccess) {
      if (this.props.dialogMode == DialogMode.POPUP)
        this.onAnimationExited = () => this.props.onSuccess({ ...response, browserID: browserID }, this.activePageMode);
    } else {
      this.props.onSuccess({ ...response, browserID: browserID }, this.activePageMode);
    }
  }

  onSignupSuccess(response, browserID) {
    if (this.isConnect) {
      this.moveToLogin();
    } else {
      ConnectPackage.close();
      if (this.props.onSuccess) {
        if (this.props.dialogMode == DialogMode.POPUP)
          this.onAnimationExited = () =>
            this.props.onSuccess({ ...response, browserID: browserID }, this.activePageMode);
      } else {
        this.props.onSuccess({ ...response, browserID: browserID }, this.activePageMode);
      }
    }
  }

  onFailure(response) {
    if (this.props && this.props.onFailure) this.props.onFailure(response);
  }
}

decorate(ConnectVM, {
  // initialUsername: observable,
  // signUp: observable,
  // hideInitialLoader: observable,
  // isLoading: observable,
  activePageMode: observable,
  // isConnect: observable,
  openController: observable,
  openPopup: observable,
  openLoaderModal: observable,
  // animationType: observable,
  onAnimationExited: observable,
  animationType: observable,
  // direction: observable,
  // language: observable,
  // combinedTheme: observable,
  // props: observable,
});

export default ConnectVM;
