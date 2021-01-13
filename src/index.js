import '@babel/polyfill/noConflict';
import React from 'react';
import ReactDOM from 'react-dom';
import Login from './elements/Login/Login';
import Signup from './elements/Signup/Signup';
import TapAuthButton from './elements/ButtonM/ButtonM';
import ForgotPassword from './elements/ForgotPassword/ForgotPassword';
import ConnectPackage from './elements/ConnectPackage';

import { DialogMode, AnimationType, Languages, PageMode } from './elements/Constants/constants';

module.exports = {
  Login: Login,
  Signup: Signup,
  ForgotPassword: ForgotPassword,
  DialogMode: DialogMode,
  PageMode: PageMode,
  TapAuthButton: TapAuthButton,
  AnimationType: AnimationType,
  Languages: Languages,
  ConnectPackage: ConnectPackage,

  renderConnectElement: function (object) {
    ReactDOM.render(
      <ConnectPackage {...object} />,
      document.getElementById(object ? object.containerID || 'TapConnect' : 'TapConnect'),
    );
  },
  renderButtonElement: function (object) {
    ReactDOM.render(
      <TapAuthButton {...object} />,
      document.getElementById(object ? object.containerID || 'TapConnect' : 'TapConnect'),
    );
  },
};
