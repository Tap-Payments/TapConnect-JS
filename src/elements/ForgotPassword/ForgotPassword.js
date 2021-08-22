import React, { Fragment, useRef } from 'react';

/// this will initiate the i18n if it is not initialized before
import { toJS } from 'mobx';

import { useVm } from '../../hooks';
import { observer } from 'mobx-react-lite';

import ForgotPasswordVM from './ForgotPasswordVM';
import ForgotPasswordTemplate from '../Template/ForgotPasswordTemplate';
import { DialogMode } from '../Constants/constants';
import NavigationButtons from '../Atoms/Navigator/NaviButton';

import { RESET_PASSWORD_INFO } from '../Utils/FieldArraysForgotPassword';

function ForgotPassword(props) {
  const vm = useVm(ForgotPasswordVM, props);
  return (
    <Fragment>
      {props.dialogMode === DialogMode.POPUP && (
        <NavigationButtons
          type={vm.direction == 'rtl' ? 'next' : 'back'}
          btnStyle={{ background: '#15151575' }}
          onClick={vm.page == 0 ? vm.moveToLogin : vm.goBack}
        />
      )}
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
