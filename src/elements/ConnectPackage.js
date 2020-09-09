import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { PageMode, AnimationType, DialogMode } from './Constants/constants';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import ConnectDataSource from './ConnectDataSource';
import { observer } from 'mobx-react';
import { useVm } from '../hooks';
import AnimationEngine from './Animation/AnimationEngine';

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
  static open(props) {
    console.log('open');
    console.log('open');
    console.log(props);
    console.log('open');

    ConnectPackage.vm.reConstruct(props);

    setTimeout(() => {
      ConnectPackage.vm.openController = true;
    }, 1000);
    // ConnectPackage.vm.openController = true;
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
    // if (ConnectPackage.vm && ConnectPackage.vm.dataSource && ConnectPackage.vm.dataSource.isDataReady)
    //   return <TapLoader />;

    console.log('ConnectPackage.vm.combinedTheme.direction');
    console.log(ConnectPackage.vm.combinedTheme.direction);

    return (
      <div className="tap-connect-unique-module" id="tap-connect-unique-module">
        <ThemeProvider theme={ConnectPackage.vm.combinedTheme}>
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
                dataSource={ConnectDataSource}
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
                dataSource={ConnectDataSource}
                showBackButton={ConnectPackage.vm.showBackButton}
                goBack={ConnectPackage.vm.goBack}
                isConnect={ConnectPackage.vm.isConnect}
              />
            ) : ConnectPackage.vm.activePageMode == PageMode.SIGNUP ? (
              <Signup
                {...this.props}
                initialLeadID={ConnectPackage.vm.leadId}
                moveToLogin={ConnectPackage.vm.moveToLogin}
                onSignupSuccess={ConnectPackage.vm.onSignupSuccess}
                hideInitialLoader={ConnectPackage.vm.hideInitialLoader}
                showSigninSection={ConnectPackage.vm.isConnect ? true : false}
                dataSource={ConnectDataSource}
                showBackButton={ConnectPackage.vm.showBackButton}
                goBack={ConnectPackage.vm.goBack}
                isConnect={ConnectPackage.vm.isConnect}
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
                dataSource={ConnectDataSource}
                showBackButton={ConnectPackage.vm.showBackButton}
                goBack={ConnectPackage.vm.goBack}
                isConnect={ConnectPackage.vm.isConnect}
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
