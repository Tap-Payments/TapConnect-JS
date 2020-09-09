import React, { Fragment, useState, Component } from 'react';
import { TapAuthButton, DialogMode, AnimationType, PageMode } from '../../src/index';
import { Button, Tooltip, Fade } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { render } from 'react-dom';

import ButtonDemo from './ButtonDemo';
import ConnectDemo from './ConnectDemo';

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
        <ButtonDemo handleSuccess={this.handleSuccess} {...this.props} />
        {/* <ConnectDemo handleSuccess={this.handleSuccess} {...this.props} /> */}
      </Fragment>
    );
  }
}

export default App;
