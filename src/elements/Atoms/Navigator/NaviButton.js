import React, { Component } from 'react';
import './naviStyles.css';

import { ARROW, ARROW_REVERSE } from '../../Constants/constants';
class NavigationButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      areaMouseEnter: false,
    };
    this.areaMouseEnterHandler = this.areaMouseEnterHandler.bind(this);
    this.areaMouseLeaveHandler = this.areaMouseLeaveHandler.bind(this);
  }

  areaMouseEnterHandler() {
    this.setState({ areaMouseEnter: true });
    // console.log('mouse down');
  }
  areaMouseLeaveHandler() {
    this.setState({ areaMouseEnter: false });
    // console.log('mouse left');
  }

  render() {
    //true = next
    //false = back (default)
    let typeSwitch = this.props.type.toLowerCase() == 'next';

    return (
      <div className="TAP-modal-navi-placeholder" style={typeSwitch ? { right: '0px' } : { left: '0px' }}>
        <div
          id={typeSwitch ? 'TAP-modal-next-area' : 'TAP-modal-back-area'}
          onMouseEnter={this.areaMouseEnterHandler}
          onMouseLeave={this.areaMouseLeaveHandler}
          className={this.state.areaMouseEnter ? 'expandABC' : ''}
        ></div>
        <div
          className={this.state.areaMouseEnter ? 'fadeOutABC' : ''}
          id={typeSwitch ? 'TAP-modal-next-button-background' : 'TAP-modal-back-button-background'}
          style={this.props.btnStyle}
        >
          <img
            className={typeSwitch ? 'TAP-modal-navi-img-next' : 'TAP-modal-navi-img-back'}
            src={typeSwitch ? ARROW_REVERSE : ARROW}
          ></img>
        </div>
        <button
          onClick={this.props.onClick}
          onMouseEnter={this.areaMouseEnterHandler}
          onMouseLeave={this.areaMouseLeaveHandler}
          id={typeSwitch ? 'TAP-modal-next-button' : 'TAP-modal-back-button'}
          className={this.state.areaMouseEnter ? 'fadeOutABC' : ''}
        ></button>
      </div>
    );
  }
}
export default NavigationButtons;
