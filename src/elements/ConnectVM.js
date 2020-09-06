import { action, observable, decorate } from 'mobx';

import { PageMode } from './Constants/constants';
import ConnectDataSource from './ConnectDataSource';
import ConnectPackage from './ConnectPackage';
import axios from 'axios';
import { SANDBOX_MW_URL, LIVE_MW_URL } from './API_Services';
class ConnectVM {
  constructor(props) {
    this.props = props;
    this.liveMode = props.liveMode;
    this.language = props.language;
    axios.defaults.connectMW = this.liveMode ? LIVE_MW_URL : SANDBOX_MW_URL;
    this.dataSource = new ConnectDataSource(this);
    this.leadId = null;
    this.hideInitialLoader = false;
    this.isLoading = true;
    this.showBackButton = false;
    this.openController = null;
    this.openPopup = props.openPopup;
    this.direction = props.direction ? props.direction : props.theme.direction;

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
    this.updatePageMode = this.updatePageMode.bind(this);

    this.updatePageMode(props.pageMode, true);
  }

  updatePageMode(mode, isInitial, isConnect) {
    console.log('  updatePageMode(mode, isInitial) ');
    console.log(mode);
    console.log(isInitial);
    console.log(isConnect);
    if (isInitial) {
      this.activePageMode = mode;
      this.isConnect = mode == PageMode.CONNECT && !(mode == PageMode.LANDING) ? true : false;
    } else {
      this.openPopup = false;
      if (this.openController != null) this.openController = false;
      setTimeout(() => {
        this.activePageMode = mode;
        this.isConnect = isConnect || (mode == PageMode.CONNECT && !(mode == PageMode.LANDING)) ? true : false;
        this.openPopup = true;
        if (this.openController != null) this.openController = true;
      }, 1000);
    }
  }
  onFinishedFetchingData() {
    this.isLoading = false;
  }

  moveToForgot() {
    this.hideLoader(false);
    this.updatePageMode(PageMode.FORGOT, null, this.isConnect);
    window.history.pushState(
      '',
      '',
      window.location.pathname.replace(this.props.signinDirectory, this.props.forgotDirectory),
    );
    this.hideLoader(true);
  }

  goBack() {
    this.hideLoader(false);
    this.updatePageMod(PageMode.LANDING, null, this.isConnect);

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

    if (this.isConnect || this.activePageMode == PageMode.LANDING) {
      this.updatePageMode(PageMode.SIGNUP, null, true);

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

    this.updatePageMode(PageMode.CONNECT, null, true);

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

    if (this.isConnect || this.activePageMode == PageMode.LANDING || this.activePageMode == PageMode.FORGOT) {
      this.updatePageMode(PageMode.LOGIN, null, true);

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
          if (
            this.props.activePageMode == PageMode.CONNECT ||
            (this.props.activePageMode == PageMode.LANDING && this.isLandingConnect)
          )
            this.moveToSignup();
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
    if (
      this.props.activePageMode == PageMode.CONNECT ||
      (this.props.activePageMode == PageMode.LANDING && this.isLandingConnect)
    )
      this.moveToLogin();

    if (this.props.onSuccess) this.props.onSuccess(response, browserID);
  }

  onFailure(response) {
    if (this.props.onFailure) this.props.onFailure(response);
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
});

export default ConnectVM;
