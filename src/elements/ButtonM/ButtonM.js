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

    if (document.body.hasAttribute('tap-connect-button-unique')) {
      ///TODO: fix duplication
      this.isDuplicateInstance = false;
    } else {
      document.body.setAttribute('tap-connect-button-unique', true);
      this.isDuplicateInstance = false;
    }
    this.vm = vm;
    this.combineTheme = createMuiTheme({
      direction: props.direction || props.theme.direction,
      palette: { ...theme.palette, ...props.theme.palette },
      typography: { ...theme.typography, ...props.theme.typography },
      overrides: { ...theme.overrides, ...props.theme.overrides },
    });
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    TapAuthButton.open({
      ...this.props,
    });
  }
  static init(params) {
    ConnectPackage.init(params);
  }
  static open(params) {
    ConnectPackage.open(params);
  }
  static close(params) {
    ConnectPackage.close(params);
  }

  render() {
    return (
      <ThemeProvider theme={this.combineTheme}>
        <ButtonTemplate
          buttonText={this.props.buttonText}
          variant={this.props.variant}
          showLogo={this.props.showLogo}
          logo={this.props.logo}
          onClick={this.clickHandler}
          direction={this.props.direction || this.props.theme.direction}
        />
        {!this.isDuplicateInstance && (
          <ConnectPackage
            {...this.props}
            dialogMode={DialogMode.POPUP}
            hideInitialLoader={true}
            enableBackdropClick={true}
            openPopup={this.vm.openPopup}
            onClose={this.vm.onClose}
          />
        )}
      </ThemeProvider>
    );
  }
}
TapAuthButton.defaultProps = {
  buttonText: 'login',
  pageMode: PageMode.LOGIN,
  direction: 'ltr',
  language: 'en',
  variant: 'contained',
  showLogo: true,
};
export default observer(TapAuthButton);
