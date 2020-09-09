import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import { PageMode, AnimationType, DialogMode } from './Constants/constants';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import ConnectDataSource from './ConnectDataSource';
import { observer } from 'mobx-react';
import AnimationEngine from './Animation/AnimationEngine';
import ConnectPackage from './ConnectPackage';

import _defaultProps from './defaultProps';

export class ConnectUI extends Component {
  render() {
    let vm = ConnectPackage.vm;
    if (!vm) return null;
    return (
      <ThemeProvider theme={vm.combinedTheme}>
        <AnimationEngine
          bypass={vm.props.dialogMode == DialogMode.FULLPAGE}
          onExited={vm.onAnimationExited}
          open={vm.openController == null ? vm.openPopup : vm.openController}
          animationDuration={vm.props.animationDuration}
          closeOnOutsideClick={vm.props.closeOnOutsideClick}
          animationType={vm.animationType}
          onClose={(e) => {
            if (vm.props.onClose) vm.props.onClose(e);
            if (vm.openController != null) ConnectPackage.close();
          }}
        >
          {vm.activePageMode == PageMode.FORGOT ? (
            <ForgotPassword
              {...vm.props}
              initialLeadID={vm.leadId}
              moveToLogin={vm.moveToLogin}
              hideInitialLoader={vm.hideInitialLoader}
              dataSource={ConnectDataSource}
              onForgotPasswordSuccess={vm.onForgotPasswordSuccess}
            />
          ) : vm.activePageMode == PageMode.LOGIN || vm.activePageMode == PageMode.CONNECT ? (
            <Login
              {...vm.props}
              onLoginSuccess={vm.onLoginSuccess}
              moveToSignup={vm.moveToSignup}
              showSignupSection={vm.isConnect ? true : false}
              moveToForgot={vm.moveToForgot}
              initialAuthType={vm.initialAuthType}
              hideInitialLoader={vm.hideInitialLoader}
              dataSource={ConnectDataSource}
              showBackButton={vm.showBackButton}
              goBack={vm.goBack}
              isConnect={vm.isConnect}
            />
          ) : vm.activePageMode == PageMode.SIGNUP ? (
            <Signup
              {...vm.props}
              initialLeadID={vm.leadId}
              moveToLogin={vm.moveToLogin}
              onSignupSuccess={vm.onSignupSuccess}
              hideInitialLoader={vm.hideInitialLoader}
              showSigninSection={vm.isConnect ? true : false}
              dataSource={ConnectDataSource}
              showBackButton={vm.showBackButton}
              goBack={vm.goBack}
              isConnect={vm.isConnect}
            />
          ) : (
            <Login
              {...vm.props}
              onLoginSuccess={vm.onLoginSuccess}
              moveToSignup={vm.moveToSignup}
              showSignupSection={vm.isConnect ? true : false}
              moveToForgot={vm.moveToForgot}
              initialAuthType={vm.initialAuthType}
              hideInitialLoader={vm.hideInitialLoader}
              dataSource={ConnectDataSource}
              showBackButton={vm.showBackButton}
              goBack={vm.goBack}
              isConnect={vm.isConnect}
            />
          )}
        </AnimationEngine>
      </ThemeProvider>
    );
  }
}
export default observer(ConnectUI);
