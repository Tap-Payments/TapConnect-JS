import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Connect.css';

import { observer } from 'mobx-react';
import _defaultProps from './defaultProps';
import axios from 'axios';
import { SANDBOX_MW_URL, LIVE_MW_URL } from './API_Services';
axios.defaults.connectMW = LIVE_MW_URL;
//// this attribute is assigned to the body to ensure one instances
const CONNECT_UNIQUE_ATTRIBUTE = 'tap-connect-unique';
const CONNECT_ELEMENT_ID = 'tap-connect-module-id';
class ConnectPackage extends Component {
  constructor(props) {
    super(props);
    if (props.development) axios.defaults.connectMW = SANDBOX_MW_URL;
    //// ensure only one instance in the DOM
    if (document.body.hasAttribute(CONNECT_UNIQUE_ATTRIBUTE)) {
      this.isDuplicateInstance = true;
    } else {
      document.body.setAttribute(CONNECT_UNIQUE_ATTRIBUTE, true);
      this.isDuplicateInstance = false;
      const ConnectVM = require('./ConnectVM');
      if (!ConnectPackage.vm) ConnectPackage.vm = new ConnectVM.default(props);
      if (this.props.openPopup) ConnectPackage.open(props);
    }
  }
  componentWillUnmount() {
    if (document.body.hasAttribute(CONNECT_UNIQUE_ATTRIBUTE)) {
      document.body.removeAttribute(CONNECT_UNIQUE_ATTRIBUTE);
      ReactDOM.unmountComponentAtNode(document.getElementById(CONNECT_ELEMENT_ID));
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
      ReactDOM.render(<ConnectUI />, document.getElementById(CONNECT_ELEMENT_ID));
    }, 500);
  }

  render() {
    //// ensure only one instance in the DOM
    if (this.isDuplicateInstance) return null;
    // if (ConnectPackage.vm && ConnectPackage.vm.dataSource && ConnectPackage.vm.dataSource.isDataReady)
    //   return <TapLoader />;

    return <div className={CONNECT_ELEMENT_ID} id={CONNECT_ELEMENT_ID} />;
  }
}
ConnectPackage.defaultProps = _defaultProps;

export default observer(ConnectPackage);
