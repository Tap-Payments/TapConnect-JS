import React, { useRef } from 'react';

import { action, observable, decorate, computed, toJS } from 'mobx';

class LandingVM {
  constructor(props) {
    this.props = props;
    this.openLandingPopup = props.openPopup || true;
    this.showInitialLoader = false;

    this.moveToLogin = this.moveToLogin.bind(this);
    this.moveToSignup = this.moveToSignup.bind(this);
    this.moveToConnect = this.moveToConnect.bind(this);
  }

  moveToLogin() {
    this.openLandingPopup = false;
    setTimeout(() => {
      if (this.props.moveToLogin) this.props.moveToLogin();
    }, 300);
  }

  moveToSignup() {
    this.openLandingPopup = false;
    setTimeout(() => {
      if (this.props.moveToSignup) this.props.moveToSignup();
    }, 300);
  }

  moveToConnect() {
    this.openLandingPopup = false;
    setTimeout(() => {
      if (this.props.moveToConnect) this.props.moveToConnect();
    }, 300);
  }
}
decorate(LandingVM, {
  openLandingPopup: observable,
  showInitialLoader: observable,
});

export default LandingVM;
