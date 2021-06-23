import '@babel/polyfill/noConflict';
import React from 'react';
import ReactDOM from 'react-dom';
import Login from './elements/Login/Login';
import Signup from './elements/Signup/Signup';
import TapAuthButton from './elements/ButtonM/ButtonM';
import ForgotPassword from './elements/ForgotPassword/ForgotPassword';
import ConnectPackage from './elements/ConnectPackage';

import { DialogMode, AnimationType, Languages, PageMode, SegmentType } from './elements/Constants/constants';

module.exports = {
  Login,
  Signup,
  ForgotPassword,
  DialogMode,
  PageMode,
  TapAuthButton,
  AnimationType,
  Languages,
  ConnectPackage,
  SegmentType,

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
