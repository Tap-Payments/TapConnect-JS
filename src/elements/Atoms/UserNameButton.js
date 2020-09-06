import React from 'react';
import { Button } from '@material-ui/core';

class UserNameButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontSize: 20 };
  }

  componentWillReceiveProps() {
    if (window.innerWidth <= '768') {
      let buttonDiv = document.getElementById('username-button-2820');
      let testerDiv = document.getElementById('username-tester-div-2820');
      let fontSize = 20;
      if (testerDiv.clientWidth > buttonDiv.clientWidth) {
        fontSize = ((fontSize * buttonDiv.clientWidth) / testerDiv.clientWidth) * 0.9;
      } else {
        fontSize = this.state.fontSize;
      }

      this.setState({ fontSize: fontSize });
    }
  }
  render() {
    return (
      <div>
        <Button
          id={'username-button-2820'}
          variant={this.props.verifyValue.variant}
          placeholder={this.props.placeholder}
          className={this.props.classes.containedButton}
          style={{ fontSize: this.state.fontSize + 'px' }}
        >
          {this.props.t(this.props.verifyValue.value)}
        </Button>
        <div id={'username-tester-div-2820'} className={this.props.classes.testerButton}>
          {this.props.t(this.props.verifyValue.value)}
        </div>
      </div>
    );
  }
}

export default UserNameButton;
