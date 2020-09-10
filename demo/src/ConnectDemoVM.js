import React, { useRef } from 'react';

import { action, observable, decorate, computed, toJS } from 'mobx';
import { AnimationType, PageMode } from '../../src/index';
const ButtonText = {
  connect: {
    ar: 'ربط',
    en: 'Connect',
  },
  login: {
    ar: 'تسجيل دخول',
    en: 'Login',
  },
  signup: {
    ar: 'تسجيل جديد',
    en: 'Signup',
  },
};

class ConnectDemoVM {
  constructor(props) {
    this.props = props;
    this.direction = 'ltr';
    this.isLiveMode = 'sandbox';
    this.pageMode = PageMode.CONNECT;
    this.animationType = AnimationType.SLIDEUP;
    this.buttonText = 'Connect';

    this.onClickAR = this.onClickAR.bind(this);
    this.onClickEN = this.onClickEN.bind(this);

    this.onChangePageMode = this.onChangePageMode.bind(this);
    this.onChangeLiveMode = this.onChangeLiveMode.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.onChangeAnimationType = this.onChangeAnimationType.bind(this);
  }

  onClickAR() {
    this.ar = true;
  }

  onClickEN() {
    this.ar = false;
  }

  onChangeLiveMode(event) {
    this.isLiveMode = event.target.value;
  }

  onChangePageMode(event) {
    this.pageMode = event.target.value;
    this.buttonText = this.language == 'ar' ? ButtonText[this.pageMode].ar : ButtonText[this.pageMode].en;
  }

  onChangeLanguage(event) {
    this.direction = event.target.value;
    this.language = this.direction == 'rtl' ? 'ar' : 'en';
    this.buttonText = this.language == 'ar' ? ButtonText[this.pageMode].ar : ButtonText[this.pageMode].en;
  }

  onChangeAnimationType(event) {
    this.animationType = event.target.value;
  }
}
decorate(ConnectDemoVM, {
  direction: observable,
  pageMode: observable,
  isLiveMode: observable,
  buttonText: observable,
  animationType: observable,
});

export default ConnectDemoVM;
