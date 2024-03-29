import React, { Component, Fragment } from 'react';
import { Dialog } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { Loader as TapLoader } from '@tap-ui/react-design-kit.loader';
import { PageMode, DialogMode } from './Constants/constants';
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
        {vm.props.dialogMode != DialogMode.FULLPAGE && (
          <Dialog
            open={vm.openLoaderModal || (vm.openController == null ? vm.openPopup : vm.openController)}
            onClose={(e) => {
              vm.openLoaderModal = false;
              if (vm.props.onClose) vm.props.onClose(e);
              if (vm.openController != null) ConnectPackage.close();
            }}
          >
            {ConnectDataSource.isDataReady ? (
              <Fragment />
            ) : (
              <div style={{ position: 'fixed', top: '50%', left: '50%' }}>
                <TapLoader />
              </div>
            )}
          </Dialog>
        )}
        <AnimationEngine
          bypass={vm.props.dialogMode == DialogMode.FULLPAGE}
          onExited={(e) => {
            vm.onAnimationExited();
          }}
          showConfirmationDialog={vm.activePageMode == PageMode.SIGNUP ? true : false}
          open={ConnectDataSource.isDataReady && (vm.openController == null ? vm.openPopup : vm.openController)}
          direction={vm.props.direction}
          animationDuration={vm.props.animationDuration}
          enableBackdropClick={vm.props.enableBackdropClick}
          animationType={vm.animationType}
          onClose={(e) => {
            vm.openLoaderModal = false;
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
              hideInitialLoader={vm.hideInitialLoader}
              dataSource={ConnectDataSource}
              showBackButton={vm.showBackButton}
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
              isConnect={vm.isConnect}
            />
          ) : (
            <TapLoader />
          )}
        </AnimationEngine>
      </ThemeProvider>
    );
  }
}

export default observer(ConnectUI);
