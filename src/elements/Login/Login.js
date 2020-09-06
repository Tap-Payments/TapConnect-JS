import { useVm } from '../../hooks';
import React, { Fragment, useRef } from 'react';
import AnimationEngine from '../Animation/AnimationEngine';
import { DialogMode } from '../Constants/constants';

import { observer } from 'mobx-react-lite';
import NavigationButtons from '../Atoms/Navigator/NaviButton';

import LoginVM from './LoginVM';
import LoginTemplate from '../Template/LoginTemplate';
import TapLoader from '../Login_Loader/Loader';

function Login(props) {
  const vm = useVm(LoginVM, props);

  // if (!props.hideInitialLoader) if (vm.showInitialLoader) return null;

  return props.dialogMode === DialogMode.POPUP ? (
    <AnimationEngine
      open={props.openPopup}
      animationDuration={props.animationDuration}
      closeOnOutsideClick={props.closeOnOutsideClick}
      onClose={props.onClose}
      onCancel={props.onCancel}
      animationType={props.animationType}
    >
      {props.showBackButton && (
        <NavigationButtons
          type={vm.direction == 'rtl' ? 'next' : 'back'}
          btnStyle={{ background: '#15151575' }}
          onClick={vm.goBack}
        />
      )}
      <LoginTemplate
        {...vm.props}
        id={'login-tap-card-240620'}
        showSignupSection={props.showSignupSection}
        direction={vm.direction}
        title={vm.title}
        newUser={vm.newUser}
        showHeaderLogo={props.showHeaderLogo}
        emailTextField={vm.emailTextField}
        activeTextFieldName={vm.activeTextFieldName}
        passwordTextField={vm.passwordTextField}
        otpTextField={vm.otpTextField}
        showLoader={vm.showInitialLoader}
        verifyValue={vm.verifyValue}
        editButtonInfo={vm.editButtonInfo}
        checkBoxInfo={vm.checkBoxInfo}
        dropdownInfos={vm.dropdownInfos}
        forgotPasswordInfo={vm.forgotPasswordInfo}
        errorInfo={vm.errorInfo}
        loadingStatus={vm.loadingStatus}
        signUpInfo={vm.signUpInfo}
        onSubmit={vm.onFormSubmit}
        moveToSignup={vm.moveToSignup}
        moveToForgot={vm.moveToForgot}
      />
    </AnimationEngine>
  ) : (
    <LoginTemplate
      {...vm.props}
      id={'login-tap-card-240620'}
      showSignupSection={props.showSignupSection}
      direction={vm.direction}
      title={vm.title}
      newUser={vm.newUser}
      showHeaderLogo={props.showHeaderLogo}
      emailTextField={vm.emailTextField}
      activeTextFieldName={vm.activeTextFieldName}
      passwordTextField={vm.passwordTextField}
      otpTextField={vm.otpTextField}
      showLoader={vm.showInitialLoader}
      verifyValue={vm.verifyValue}
      editButtonInfo={vm.editButtonInfo}
      checkBoxInfo={vm.checkBoxInfo}
      dropdownInfos={vm.dropdownInfos}
      forgotPasswordInfo={vm.forgotPasswordInfo}
      errorInfo={vm.errorInfo}
      loadingStatus={vm.loadingStatus}
      signUpInfo={vm.signUpInfo}
      onSubmit={vm.onFormSubmit}
      moveToSignup={vm.moveToSignup}
      moveToForgot={vm.moveToForgot}
    />
  );
}
Login.defaultProps = {
  onSuccess: (data) => {
    console.log(data);
  },
};
export default observer(Login);
