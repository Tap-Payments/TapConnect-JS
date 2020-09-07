import React, { Fragment, useRef } from 'react';

/// this will initiate the i18n if it is not initialized before
import { toJS } from 'mobx';

import { useVm } from '../../hooks';
import { observer } from 'mobx-react-lite';

import ForgotPasswordVM from './ForgotPasswordVM';
import ForgotPasswordTemplate from '../Template/ForgotPasswordTemplate';
import TapLoader from '../Login_Loader/Loader';

import AnimationEngine from '../Animation/AnimationEngine';
import { DialogMode } from '../Constants/constants';
import NavigationButtons from '../Atoms/Navigator/NaviButton';

import { RESET_PASSWORD_INFO } from '../Utils/FieldArraysForgotPassword';

function ForgotPassword(props) {
  const vm = useVm(ForgotPasswordVM, props);

  // if (!props.hideInitialLoader) if (vm.showInitialLoader) return null;

  return props.dialogMode === DialogMode.POPUP ? (
    <Fragment>
      <AnimationEngine
        open={props.openPopup}
        animationDuration={props.animationDuration}
        closeOnOutsideClick={props.closeOnOutsideClick}
        onClose={props.onClose}
        onCancel={props.onCancel}
        animationType={props.animationType}
      >
        {
          <NavigationButtons
            type={vm.direction == 'rtl' ? 'next' : 'back'}
            btnStyle={{ background: '#15151575' }}
            onClick={vm.page == 0 ? vm.moveToLogin : vm.goBack}
          />
        }
        {/* <NavigationButtons type="next" onClick={() => console.log('next pressed')} /> */}
        <ForgotPasswordTemplate
          id={'forgot-password-tap-card-130820'}
          {...props}
          page={vm.page}
          errorInfo={vm.errorInfo}
          activeStepInfo={vm.page === 0 && vm.showInitialLoader ? null : toJS(vm.activeStepInfo)}
          loadingStatus={vm.loadingStatus}
          onSubmit={vm.onSubmit}
          showLoader={vm.showInitialLoader}
          onGoBack={vm.goBack}
          {...RESET_PASSWORD_INFO}
          moveToLogin={vm.moveToLogin}
          direction={vm.direction}
          storeResetPassword={vm.storeResetPassword}
        />
      </AnimationEngine>
    </Fragment>
  ) : (
    <Fragment>
      {
        <NavigationButtons
          type={vm.direction == 'rtl' ? 'next' : 'back'}
          btnStyle={{ background: '#15151575' }}
          onClick={vm.page == 0 ? vm.moveToLogin : vm.goBack}
        />
      }
      <ForgotPasswordTemplate
        id={'forgot-password-tap-card-130820'}
        {...props}
        page={vm.page}
        errorInfo={vm.errorInfo}
        activeStepInfo={vm.page === 0 && vm.showInitialLoader ? null : toJS(vm.activeStepInfo)}
        loadingStatus={vm.loadingStatus}
        onSubmit={vm.onSubmit}
        showLoader={vm.showInitialLoader}
        onGoBack={vm.goBack}
        {...RESET_PASSWORD_INFO}
        moveToLogin={vm.moveToLogin}
        direction={vm.direction}
        storeResetPassword={vm.storeResetPassword}
      />
    </Fragment>
  );
}
ForgotPassword.defaultProps = {
  onSuccess: (data) => {
    console.log(data);
  },
};
export default observer(ForgotPassword);
