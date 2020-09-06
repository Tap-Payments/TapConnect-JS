import React, { useRef, useEffect } from 'react';
import DropDown from '../TapInput/DropDown';

export default class DropDownWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: '302',
      width: '330',
    };
  }

  componentDidUpdate() {
    const row = document.getElementById(this.props.tapCardId);
    const height = row.offsetHeight + 2;
    const width = row.offsetWidth;

    if (this.state.height !== height) {
      this.setState({ height });
    }
    if (this.state.width !== width) {
      this.setState({ width });
    }
  }

  render() {
    let props = this.props;
    return (
      <DropDown
        id={props.id}
        style={
          window.innerWidth <= '768'
            ? { fontSize: window.innerWidth / props.maxTextLength + 'px' }
            : { maxHeight: this.state.height, minHeight: this.state.height }
        }
        ref={props.dropDownRef}
        direction={props.direction}
        searchPattern={props.searchPattern}
        itemEndPattern={props.itemStartPattern}
        itemStartPattern={props.itemEndPattern}
        itemStartIsImage={props.itemEndIsImage}
        itemEndIsImage={props.itemStartIsImage}
        dropdownInfos={props.dropdownInfos}
        selectedIndex={props.selectedIndex}
        onClose={props.onClose}
        showPlus={props.showPlus}
      />
    );
  }
}
