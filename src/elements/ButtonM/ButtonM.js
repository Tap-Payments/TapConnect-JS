import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';

import ButtonVM from './ButtonVM';
import ButtonTemplate from '../Template/ButtonTemplate';
import ConnectPackage from '../ConnectPackage';
import { PageMode, DialogMode } from '../Constants/constants';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { theme } from '../theme/index';

class TapAuthButton extends Component {
  constructor(props) {
    super(props);
    let vm = new ButtonVM(props);
    this.vm = vm;
    this.combineTheme = createMuiTheme({
      direction: this.vm.direction,
      palette: { ...theme.palette, ...props.theme.palette },
      typography: { ...theme.typography, ...props.theme.typography },
      overrides: { ...theme.overrides, ...props.theme.overrides },
    });
  }

  static open(params) {
    ConnectPackage.open(params);
  }
  static close(params) {
    ConnectPackage.close(params);
  }
  static updateMode(params) {
    ConnectPackage.updateMode(params);
  }
  render() {
    return (
      <ThemeProvider theme={this.combineTheme}>
        <ButtonTemplate
          buttonText={this.props.buttonText}
          onClick={() => {
            TapAuthButton.open(this.props.pageMode);
          }}
          direction={this.vm.direction}
        />
        <ConnectPackage
          {...this.props}
          dialogMode={DialogMode.POPUP}
          hideInitialLoader={true}
          closeOnOutsideClick={true}
          openPopup={this.vm.openPopup}
          onClose={this.vm.onClose}
        />
      </ThemeProvider>
    );
  }
}
TapAuthButton.defaultProps = {
  buttonText: 'login',
  pageMode: PageMode.LOGIN,
};
export default observer(TapAuthButton);