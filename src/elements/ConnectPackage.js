import React, { Component } from 'react';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { PageMode, AnimationType, DialogMode } from './Constants/constants';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import { observer } from 'mobx-react';
import { useVm } from '../hooks';
import AnimationEngine from './Animation/AnimationEngine';

import { theme } from './theme/index';
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

      // let vm = new ConnectVM(props);
      ConnectPackage.vm = new ConnectVM(props);
      this.combineTheme = createMuiTheme({
        direction: ConnectPackage.vm.direction,
        palette: { ...theme.palette, ...props.theme.palette },
        typography: { ...theme.typography, ...props.theme.typography },
        overrides: { ...theme.overrides, ...props.theme.overrides },
      });
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
    ConnectPackage.vm.openController = false;
  }
  static open(mode) {
    console.log('open');
    console.log('open');
    console.log('open');
    if (mode) {
      ConnectPackage.vm.initializePageMode(mode);
    }
    ConnectPackage.vm.openController = true;
  }
  static updateMode(mode) {
    console.log('update');
    console.log('update');
    console.log('update');
    ConnectPackage.vm.updatePageMode(mode);
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.pageMode !== prevProps.pageMode) {
      ConnectPackage.updateMode(this.props.pageMode);
    }

    if (this.props.openPopup !== prevProps.openPopup) {
      ConnectPackage.vm.openPopup = this.props.openPopup;
    }
  }

  render() {
    //// ensure only one instance in the DOM
    if (this.isDuplicateInstance) return null;
    if (ConnectPackage.vm.isLoading) return this.props.hideInitialLoader ? null : <TapLoader />;
    return (
      <div className="tap-connect-unique-module" id="tap-connect-unique-module">
        <ThemeProvider theme={this.combineTheme}>
          <AnimationEngine
            bypass={this.props.dialogMode == DialogMode.FULLPAGE}
            onExited={ConnectPackage.vm.onAnimationExited}
            open={
              ConnectPackage.vm.openController == null ? ConnectPackage.vm.openPopup : ConnectPackage.vm.openController
            }
            animationDuration={this.props.animationDuration}
            closeOnOutsideClick={this.props.closeOnOutsideClick}
            animationType={ConnectPackage.vm.animationType}
            onClose={(e) => {
              if (this.props.onClose) this.props.onClose(e);
              if (ConnectPackage.vm.openController != null) ConnectPackage.close();
            }}
            onCancel={this.props.onCancel}
          >
            {ConnectPackage.vm.activePageMode == PageMode.FORGOT ? (
              <ForgotPassword
                {...this.props}
                initialLeadID={ConnectPackage.vm.leadId}
                moveToLogin={ConnectPackage.vm.moveToLogin}
                hideInitialLoader={ConnectPackage.vm.hideInitialLoader}
                dataSource={ConnectPackage.vm.dataSource}
                onForgotPasswordSuccess={ConnectPackage.vm.onForgotPasswordSuccess}
              />
            ) : ConnectPackage.vm.activePageMode == PageMode.LOGIN ||
              ConnectPackage.vm.activePageMode == PageMode.CONNECT ? (
              <Login
                {...this.props}
                onLoginSuccess={ConnectPackage.vm.onLoginSuccess}
                moveToSignup={ConnectPackage.vm.moveToSignup}
                showSignupSection={ConnectPackage.vm.isConnect ? true : false}
                moveToForgot={ConnectPackage.vm.moveToForgot}
                initialAuthType={ConnectPackage.vm.initialAuthType}
                hideInitialLoader={ConnectPackage.vm.hideInitialLoader}
                dataSource={ConnectPackage.vm.dataSource}
                showBackButton={ConnectPackage.vm.showBackButton}
                goBack={ConnectPackage.vm.goBack}
              />
            ) : ConnectPackage.vm.activePageMode == PageMode.SIGNUP ? (
              <Signup
                {...this.props}
                initialLeadID={ConnectPackage.vm.leadId}
                moveToLogin={ConnectPackage.vm.moveToLogin}
                onSignupSuccess={ConnectPackage.vm.onSignupSuccess}
                hideInitialLoader={ConnectPackage.vm.hideInitialLoader}
                showSigninSection={ConnectPackage.vm.isConnect ? true : false}
                dataSource={ConnectPackage.vm.dataSource}
                showBackButton={ConnectPackage.vm.showBackButton}
                goBack={ConnectPackage.vm.goBack}
              />
            ) : (
              <Login
                {...this.props}
                onLoginSuccess={ConnectPackage.vm.onLoginSuccess}
                moveToSignup={ConnectPackage.vm.moveToSignup}
                showSignupSection={ConnectPackage.vm.isConnect ? true : false}
                moveToForgot={ConnectPackage.vm.moveToForgot}
                initialAuthType={ConnectPackage.vm.initialAuthType}
                hideInitialLoader={ConnectPackage.vm.hideInitialLoader}
                dataSource={ConnectPackage.vm.dataSource}
                showBackButton={ConnectPackage.vm.showBackButton}
                goBack={ConnectPackage.vm.goBack}
              />
            )}
          </AnimationEngine>
        </ThemeProvider>
      </div>
    );
  }
}
ConnectPackage.defaultProps = _defaultProps;

export default observer(ConnectPackage);
