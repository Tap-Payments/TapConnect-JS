import React, { Fragment, useRef } from 'react';

import { toJS } from 'mobx';

import { useVm } from '../../hooks';
import { observer } from 'mobx-react-lite';

import SignupVM from './SignupVM';
import SignupTemplate from '../Template/SignupTemplate';
import TapLoader from '../Login_Loader/Loader';

import AnimationEngine from '../Animation/AnimationEngine';
import { DialogMode } from '../Constants/constants';
import NavigationButtons from '../Atoms/Navigator/NaviButton';

import { SIGNUP_INFO } from '../Utils/FieldArraysSignup';

function Signup(props) {
  const vm = useVm(SignupVM, props);

  // if (!props.hideInitialLoader) if (vm.showInitialLoader) return null;

  return (
    <Fragment>
      {props.dialogMode === DialogMode.POPUP && props.showBackButton && vm.page == 0 ? (
        <NavigationButtons
          type={vm.direction == 'rtl' ? 'next' : 'back'}
          btnStyle={{ background: '#15151575' }}
          onClick={vm.goBack}
        />
      ) : (
        props.dialogMode === DialogMode.POPUP &&
        vm.page != 0 &&
        ((vm.page == 2 && props.initialLeadID == null) || vm.page != 2) && (
          <NavigationButtons
            type={vm.direction == 'rtl' ? 'next' : 'back'}
            btnStyle={{ background: '#15151575' }}
            onClick={vm.goBack}
          />
        )
      )}
      {/* <NavigationButtons type="next" onClick={() => console.log('next pressed')} /> */}
      <SignupTemplate
        id={'signup-tap-card-150720'}
        page={vm.page}
        errorInfo={vm.errorInfo}
        activeStepInfo={vm.page === 0 && vm.showInitialLoader ? null : toJS(vm.activeStepInfo)}
        loadingStatus={vm.loadingStatus}
        onSubmit={vm.onSubmit}
        showLoader={vm.showInitialLoader}
        onGoBack={vm.goBack}
        {...props}
        {...SIGNUP_INFO}
        moveToLogin={vm.moveToLogin}
        direction={vm.direction}
        storeConfirmedPassword={vm.storeConfirmedPassword}
      />
    </Fragment>
  );
}
Signup.defaultProps = {
  onSuccess: (data) => {
    console.log(data);
  },
};
export default observer(Signup);
