import React, { useRef } from 'react';

import { action, observable, decorate, computed, toJS } from 'mobx';

class ButtonVM {
  constructor(props) {
    this.props = props;
    this.openPopup = false;

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onOpen() {
    this.openPopup = true;
    if (this.props.onOpen) this.props.onOpen();
  }

  onClose() {
    this.openPopup = false;
    if (this.props.onClose) this.props.onClose();
  }
}
decorate(ButtonVM, {
  openPopup: observable,
});

export default ButtonVM;
