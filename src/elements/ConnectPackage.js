import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Connect.css';

import { ThemeProvider } from '@material-ui/core/styles';
import { PageMode, AnimationType, DialogMode } from './Constants/constants';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import ConnectDataSource from './ConnectDataSource';
import { observer } from 'mobx-react';
import AnimationEngine from './Animation/AnimationEngine';
import { ConnectUI } from './ConnectUI';
import _defaultProps from './defaultProps';
import ConnectVM from './ConnectVM';
import TapLoader from './Login_Loader/Loader';

class ConnectPackage extends Component {
  constructor(props) {
    super(props);
    //// ensure only one instance in the DOM
    if (document.body.hasAttribute('tap-connect-unique')) {
      this.isDuplicateInstance = true;
    } else {
      document.body.setAttribute('tap-connect-unique', true);

      this.isDuplicateInstance = false;
      ConnectPackage.vm = new ConnectVM(props);

      if (this.props.openPopup) ConnectPackage.open(props);
    }
  }
  static init(props) {
    console.log('init');
    console.log('init');
    console.log('init');
  }
  static close() {
    console.log('close');
    console.log('close');
    console.log('close');
    ConnectPackage.vm.onAnimationExited = null;
    ConnectPackage.vm.openController = false;
    ConnectPackage.vm.openLoaderModal = false;
  }
  static open(props) {
    console.log('open');
    console.log('open');
    console.log(props);
    console.log('open');

    ConnectPackage.vm.reConstruct(props);
    ConnectPackage.vm.openController = true;

    setTimeout(() => {
      ReactDOM.render(<ConnectUI />, document.getElementById('tap-connect-unique-module'));
    }, 500);
  }
  static updateMode(mode) {
    console.log('update');
    console.log('update');
    console.log('update');
    ConnectPackage.vm.updatePageMode(mode);
  }
  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (ConnectPackage.vm.props.pageMode !== prevProps.pageMode) {
  //     ConnectPackage.updateMode(ConnectPackage.vm.props.pageMode);
  //   }
  //   if (ConnectPackage.vm.props.openPopup !== prevProps.openPopup) {
  //     ConnectPackage.vm.openPopup = ConnectPackage.vm.props.openPopup;
  //   }
  // }

  render() {
    //// ensure only one instance in the DOM
    if (this.isDuplicateInstance) return null;
    // if (ConnectPackage.vm && ConnectPackage.vm.dataSource && ConnectPackage.vm.dataSource.isDataReady)
    //   return <TapLoader />;

    return <div className="tap-connect-unique-module" id="tap-connect-unique-module"></div>;
  }
}
ConnectPackage.defaultProps = _defaultProps;

export default observer(ConnectPackage);
