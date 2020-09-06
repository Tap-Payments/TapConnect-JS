import React, { Fragment } from 'react';
import { TapAuthButton, DialogMode, AnimationType, PageMode } from '../../src/index';
function App(props) {
  return (
    <Fragment>
      <div style={{ width: '230px', marginBottom: '15px' }}>
        <TapAuthButton
          // initialLeadID={vm.initialLeadID}
          pageMode={PageMode.CONNECT}
          buttonText={'connect'}
          countryCode={'965'}
          animationType={AnimationType.SLIDEUP}
          animationDuration={500}
          closeOnOutsideClick={false}
          // defaultEmailOrMobile={vm.initialUsername}
          hideInitialLoader={props.hideInitialLoader}
          // onSuccess={vm.onSuccess}
          theme={
            {
              // direction: vm.appDirection,
            }
          }
        />
      </div>
      <div style={{ width: '230px', marginBottom: '15px' }}>
        <TapAuthButton
          // initialLeadID={vm.initialLeadID}
          pageMode={PageMode.LOGIN}
          buttonText={'login'}
          countryCode={'965'}
          // onCancel={vm.onCancel}
          animationType={AnimationType.SLIDEUP}
          animationDuration={500}
          closeOnOutsideClick={false}
          // defaultEmailOrMobile={vm.initialUsername}
          hideInitialLoader={props.hideInitialLoader}
          // moveToSignup={vm.moveToSignup}
          // onSuccess={vm.onSuccess}
          theme={
            {
              // direction: vm.appDirection,
            }
          }
        />
      </div>
      <div style={{ width: '230px' }}>
        <TapAuthButton
          // initialLeadID={vm.initialLeadID}
          pageMode={PageMode.SIGNUP}
          buttonText={'signup'}
          countryCode={'965'}
          // onCancel={vm.onCancel}
          animationType={AnimationType.SLIDEUP}
          animationDuration={500}
          closeOnOutsideClick={false}
          // defaultEmailOrMobile={vm.initialUsername}
          hideInitialLoader={props.hideInitialLoader}
          // moveToLogin={vm.moveToLogin}
          // onSuccess={vm.onSuccess}
          theme={
            {
              // direction: vm.appDirection,
            }
          }
        />
      </div>
    </Fragment>
  );
}

export default App;