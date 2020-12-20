import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Connect.css';

import { observer } from 'mobx-react';
import { ConnectUI } from './ConnectUI';
import _defaultProps from './defaultProps';
import ConnectVM from './ConnectVM';
import axios from 'axios';
import { SANDBOX_MW_URL, LIVE_MW_URL } from './API_Services';

class ConnectPackage extends Component {
  constructor(props) {
    super(props);
    axios.defaults.connectMW = props.liveMode ? LIVE_MW_URL : SANDBOX_MW_URL;

    //// ensure only one instance in the DOM
    if (document.body.hasAttribute('tap-connect-unique')) {
      ///TODO: fix duplication
      this.isDuplicateInstance = false;
    } else {
      document.body.setAttribute('tap-connect-unique', true);

      this.isDuplicateInstance = false;
      ConnectPackage.vm = new ConnectVM(props);

      if (this.props.openPopup) ConnectPackage.open(props);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.liveMode != prevProps.liveMode) {
      console.log('update mode');
      axios.defaults.connectMW = this.props.liveMode ? LIVE_MW_URL : SANDBOX_MW_URL;
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
