import React, { Component } from 'react';
import DropDownItem from './DropDownItem';
import { MenuItem } from '@material-ui/core';
import './assests/css/DropDown.css';

const ITEM_HEIGHT = 45;
class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueCountryInput: '',
      selectedCountryIndex: this.props.selectedIndex,
      dropdownInfos: [],
    };
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
  }

  handleMenuItemClick(index, item) {
    this.props.onClose(index, item);
  }

  render() {
    return (
      <RenderDropDown
        id={this.props.id}
        direction={this.props.direction}
        selectedCountryIndex={this.state.selectedCountryIndex}
        valueCountryInput={this.state.valueCountryInput}
        onChangeCountryInput={this.onChangeCountryInput}
        handleMenuItemClick={this.handleMenuItemClick}
        dropdownInfos={this.props.dropdownInfos}
        itemStartPattern={this.props.itemStartPattern}
        itemEndPattern={this.props.itemEndPattern}
        itemEndIsImage={this.props.itemEndIsImage}
        itemStartIsImage={this.props.itemStartIsImage}
        style={this.props.style}
        showPlus={this.props.showPlus}
      />
    );
  }
}

function RenderDropDown(props) {
  return (
    <div className="tap-input-dropdown" id={props.id} style={props.style}>
      {props.dropdownInfos == null || props.dropdownInfos.length == 0 ? (
        <div></div>
      ) : (
        props.dropdownInfos.map((item, index) => (
          <MenuItem
            selected={index === props.selectedCountryIndex}
            key={index}
            onClick={() => props.handleMenuItemClick(index, item)}
          >
            <DropDownItem
              selected={index === props.selectedCountryIndex}
              id={index}
              direction={props.direction}
              key={index}
              onClick={() => props.handleMenuItemClick(index, item)}
              textEndIsImage={props.itemEndIsImage}
              textStartIsImage={props.itemStartIsImage}
              textStart={props.itemStartPattern ? (props.showPlus ? '+' : '') + eval(props.itemStartPattern) : ''}
              textEnd={props.itemEndPattern ? eval(props.itemEndPattern) : ''}
            />
          </MenuItem>
        ))
      )}
    </div>
  );
}

DropDown.defaultProps = {
  showPlus: true,
  itemEndIsImage: false,
  itemStartIsImage: false,
};

export default DropDown;
