import React, { Fragment, useState } from 'react';
import { TapAuthButton, DialogMode, AnimationType, PageMode } from '../../src/index';
function App(props) {
  const [message, setMessage] = useState('response');

  const handleSuccess = (response) => {
    console.log(response);
    if (response) {
      setTimeout(() => {
        alert(JSON.stringify(response));
      }, 2000);
    }
  };
  return (
    <Fragment>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
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
            onSuccess={handleSuccess}
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
            onSuccess={handleSuccess}
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
            onSuccess={handleSuccess}
            theme={
              {
                // direction: vm.appDirection,
              }
            }
          />
        </div>

        {/* <code style={{ background: 'lightgrey', margin: '10px', padding: '10px' }}>{message}</code> */}
      </div>
    </Fragment>
  );
}

export default App;
