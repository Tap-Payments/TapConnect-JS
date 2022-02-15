import React, { useRef } from 'react';

import { makeObservable, observable } from 'mobx';
import { TapAuthButton, AnimationType, PageMode } from '../../src/index';
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
    this.pageMode = PageMode.LOGIN; //
    this.animationType = AnimationType.SLIDEUP;
    this.buttonText = 'Connect';
    this.publicKey = 'pk_test_OxCj0DhX9EyTLpGqsu2wHMon';
    this.publicKeyFieldValue = this.publicKey;
    this.onClickAR = this.onClickAR.bind(this);
    this.onClickEN = this.onClickEN.bind(this);
    this.onChangePageMode = this.onChangePageMode.bind(this);
    this.onChangeLiveMode = this.onChangeLiveMode.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.onPublicKeyClick = this.onPublicKeyClick.bind(this);
    this.onPublicKeyFieldChange = this.onPublicKeyFieldChange.bind(this);
    this.onChangeAnimationType = this.onChangeAnimationType.bind(this);
    makeObservable(this, {
      direction: observable,
      pageMode: observable,
      isLiveMode: observable,
      buttonText: observable,
      animationType: observable,
      publicKeyFieldValue: observable,
      publicKey: observable,
    });
  }

  onPublicKeyClick() {
    this.publicKey = this.publicKeyFieldValue;
  }
  onPublicKeyFieldChange(e) {
    this.publicKeyFieldValue = e.target.value;
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

export default ConnectDemoVM;
