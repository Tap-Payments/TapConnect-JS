import React, { Fragment, useState, Component } from 'react';
import { TapAuthButton, DialogMode, AnimationType, PageMode } from '../../src/index';
import { Button, Tooltip, Fade } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { render } from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { message: null };
    this.handleSuccess = this.handleSuccess.bind(this);
  }
  handleSuccess(response) {
    console.log('response');
    console.log(response);
    this.setState({ message: JSON.stringify(response) });
  }

  render() {
    return (
      <Fragment>
        {this.state.message && (
          <Alert severity="success" style={{ position: 'fixed' }}>
            <AlertTitle>Success</AlertTitle>
            This is a success alert —
            <Tooltip title={this.state.message} TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
              <strong>check the response out!</strong>
            </Tooltip>
          </Alert>
        )}
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
              hideInitialLoader={this.props.hideInitialLoader}
              onSuccess={this.handleSuccess}
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
              hideInitialLoader={this.props.hideInitialLoader}
              // moveToSignup={vm.moveToSignup}
              onSuccess={this.handleSuccess}
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
              hideInitialLoader={this.props.hideInitialLoader}
              // moveToLogin={vm.moveToLogin}
              onSuccess={this.handleSuccess}
              theme={
                {
                  // direction: vm.appDirection,
                }
              }
            />
          </div>
          {/* <Button onClick={() => this.handleSuccess({ ee: 'sss' })} /> */}
        </div>
      </Fragment>
    );
  }
}

export default App;
