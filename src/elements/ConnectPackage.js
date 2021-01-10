import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Connect.css';

import { observer } from 'mobx-react';
import _defaultProps from './defaultProps';
import axios from 'axios';
import { SANDBOX_MW_URL, LIVE_MW_URL } from './API_Services';
axios.defaults.connectMW = LIVE_MW_URL;
class ConnectPackage extends Component {
  constructor(props) {
    super();
    //// ensure only one instance in the DOM
    if (document.body.hasAttribute('tap-connect-unique')) {
      ///TODO: fix duplication
      this.isDuplicateInstance = false;
    } else {
      document.body.setAttribute('tap-connect-unique', true);

      this.isDuplicateInstance = false;
      const ConnectVM = require('./ConnectVM');
      if (!ConnectPackage.vm) ConnectPackage.vm = new ConnectVM.default(props);
      if (this.props.openPopup) ConnectPackage.open(props);
    }
  }
  componentWillUnmount() {
    if (document.body.hasAttribute('tap-connect-unique')) {
      document.body.removeAttribute('tap-connect-unique');
    }
  }
  static init(props) {
    console.log('init');
    console.log('init');
    console.log('init');
  }
  static close() {
    console.log('close');
    console.log('close');
    console.log('close');
    ConnectPackage.vm.onAnimationExited = null;
    ConnectPackage.vm.openController = false;
    ConnectPackage.vm.openLoaderModal = false;
  }
  static open(props) {
    console.log('open');
    console.log('open');
    console.log(props);
    console.log('open');

    ConnectPackage.vm.reConstruct(props);
    ConnectPackage.vm.openController = true;

    setTimeout(() => {
      const ConnectUI = require('./ConnectUI').default;
      ReactDOM.render(<ConnectUI />, document.getElementById('tap-connect-unique-module'));
    }, 500);
  }

  render() {
    //// ensure only one instance in the DOM
    if (this.isDuplicateInstance) return null;
    // if (ConnectPackage.vm && ConnectPackage.vm.dataSource && ConnectPackage.vm.dataSource.isDataReady)
    //   return <TapLoader />;

    return <div className="tap-connect-unique-module" id="tap-connect-unique-module" />;
  }
}
ConnectPackage.defaultProps = _defaultProps;

export default observer(ConnectPackage);
