import { action, observable, decorate } from 'mobx';

import { PageMode, AnimationType, DialogMode } from './Constants/constants';
import ConnectDataSource from './ConnectDataSource';
import ConnectPackage from './ConnectPackage';
import axios from 'axios';

import { SANDBOX_MW_URL, LIVE_MW_URL } from './API_Services';

class ConnectVM {
  constructor(props) {
    console.log('ConnectVM');
    console.log(props);
    this.props = props;
    this.liveMode = props.liveMode;
    this.language = props.language;
    this.direction = props.direction ? props.direction : props.theme.direction;

    axios.defaults.connectMW = this.liveMode ? LIVE_MW_URL : SANDBOX_MW_URL;
    ConnectDataSource.updateDSDirection(this.direction);
    ConnectDataSource.updateDSLanguage(this.language);
    ConnectDataSource.onFailure = this.onFailure;
    this.leadId = null;
    this.hideInitialLoader = false;
    this.isLoading = true;
    this.showBackButton = false;
    this.openController = null;
    this.openPopup = props.openPopup;

    //// check if there is an initial step to jump to
    this.initialAuthType = props.initialAuthType;
    this.onFinishedFetchingData = this.onFinishedFetchingData.bind(this);

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onSignupSuccess = this.onSignupSuccess.bind(this);
    this.onForgotPasswordSuccess = this.onForgotPasswordSuccess.bind(this);

    this.onFailure = this.onFailure.bind(this);

    this.moveToSignup = this.moveToSignup.bind(this);
    this.storeLeadID = this.storeLeadID.bind(this);
    this.moveToLogin = this.moveToLogin.bind(this);
    this.moveToForgot = this.moveToForgot.bind(this);
    this.moveToConnect = this.moveToConnect.bind(this);
    this.hideLoader = this.hideLoader.bind(this);

    this.goBack = this.goBack.bind(this);
    this.initializePageMode = this.initializePageMode.bind(this);
    this.updatePageMode = this.updatePageMode.bind(this);
    this.updateAnimationType = this.updateAnimationType.bind(this);
    this.reConstruct = this.reConstruct.bind(this);

    this.initializePageMode(props.pageMode);
  }
  reConstruct(props) {
    this.props = props;
    this.liveMode = props.liveMode;
    this.language = props.language;
    this.direction = props.direction ? props.direction : props.theme.direction;
    axios.defaults.connectMW = this.liveMode ? LIVE_MW_URL : SANDBOX_MW_URL;
    ConnectDataSource.updateDSDirection(this.direction);
    ConnectDataSource.updateDSLanguage(this.language);
    ConnectDataSource.onFailure = this.onFailure;
    this.leadId = null;
    this.hideInitialLoader = false;
    this.isLoading = true;
    this.showBackButton = false;
    this.openController = null;
    this.openPopup = props.openPopup;
    this.initializePageMode(props.pageMode);
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

    this.onAnimationExited = () => {
      setTimeout(() => {
        this.activePageMode = mode;
        this.isConnect = isConnect || mode == PageMode.CONNECT ? true : false;
        this.openPopup = true;
        if (this.openController != null) this.openController = true;

        this.onAnimationExited = null;
      }, 200);
    };
  }
  updateAnimationType(mode) {
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

  onFinishedFetchingData() {
    this.isLoading = false;
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

  goBack() {
    this.hideLoader(false);
    this.updatePageMode(PageMode.CONNECT, this.isConnect);

    window.history.pushState(
      '',
      '',
      window.location.pathname.replace(
        window.location.pathname.search(this.props.signinDirectory) > 0
          ? this.props.signinDirectory
          : this.props.signupDirectory,
        this.props.landingDirectory,
      ),
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
  moveToConnect() {
    this.hideLoader(false);

    this.isConnect = true;

    if (window.location.pathname.search(this.props.landingDirectory) > 0) {
      this.showBackButton = true;
    } else {
      this.showBackButton = false;
    }

    this.updatePageMode(PageMode.CONNECT, true);

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

    ConnectPackage.close();

    /// remove auth type if there is one
    if (this.props.removeAuthType) this.props.removeAuthType();

    setTimeout(
      function () {
        if (response && response.lead_id) {
          this.storeLeadID(response.lead_id);
          if (this.props.pageMode == PageMode.CONNECT) this.moveToSignup();
        }

        if (this.props.onSuccess) this.props.onSuccess(response, browserID);
      }.bind(this),
      1,
    );
  }

  onForgotPasswordSuccess(response, browserID) {
    this.moveToLogin();
    if (this.props.onSuccess) this.props.onSuccess(response, browserID);
  }

  onSignupSuccess(response, browserID) {
    if (this.isConnect) {
      this.moveToLogin();
    } else {
      ConnectPackage.close();
    }

    if (this.props.onSuccess) this.props.onSuccess(response, browserID);
  }

  onFailure(response) {
    if (this.props && this.props.onFailure) this.props.onFailure(response);
  }
}

decorate(ConnectVM, {
  initialUsername: observable,
  signUp: observable,
  hideInitialLoader: observable,
  isLoading: observable,
  activePageMode: observable,
  isConnect: observable,
  openController: observable,
  openPopup: observable,
  animationType: observable,
  onAnimationExited: observable,
  direction: observable,
  language: observable,
});

export default ConnectVM;
