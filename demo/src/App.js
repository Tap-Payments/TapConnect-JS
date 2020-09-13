import React, { Fragment, useState, Component } from 'react';
import { TapAuthButton, DialogMode, AnimationType, PageMode } from '../../src/index';
import { Button, Tooltip, Fade } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { render } from 'react-dom';
import { Dialog } from '@material-ui/core';

import ButtonDemo from './ButtonDemo';
import ConnectDemo from './ConnectDemo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { message: null };
    this.handleSuccess = this.handleSuccess.bind(this);
  }
  handleSuccess(response, pageMode) {
    console.log('response');
    console.log(response);
    console.log(response.browserID);
    console.log(pageMode);
    this.setState({ message: JSON.stringify(response) });
  }

  handleClose = () => {
    this.setState({ message: null });
  };

  render() {
    return (
      <Fragment>
        {window.location.pathname.search('button') > 0 && (
          <ButtonDemo handleSuccess={this.handleSuccess} {...this.props} />
        )}
        {window.location.pathname.search('button') < 0 && (
          <ConnectDemo handleSuccess={this.handleSuccess} {...this.props} />
        )}

        {this.state.message != null && (
          <Dialog open={this.state.message != null} onClose={this.handleClose}>
            <Alert severity="success" style={{ position: 'fixed' }}>
              <AlertTitle>Success</AlertTitle>
              This is a success alert —
              <Tooltip title={this.state.message} TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                <strong>check the response out!</strong>
              </Tooltip>
            </Alert>
          </Dialog>
        )}
      </Fragment>
    );
  }
}

export default App;
