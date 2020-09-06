import React, { Component } from 'react';
import DropDownItem from './DropDownItem';
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
    this.onChangeCountryInput = this.onChangeCountryInput.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.setInitialIndexAndScrollPosition = this.setInitialIndexAndScrollPosition.bind(this);
  }
  mouseOverHandler(event, refID) {
    let countryLetterInput = document.getElementById(refID);
    if (countryLetterInput) {
      countryLetterInput.focus();
    }
  }
  componentWillMount() {
    if (this.props.dropdownInfos) {
      this.setState({ dropdownInfos: this.props.dropdownInfos });
    }
  }

  setInitialIndexAndScrollPosition(props) {
    if (props.dropdownInfos) {
      this.setState({ dropdownInfos: props.dropdownInfos });
    }

    let menuItems = props.dropdownInfos;

    this.setState({ selectedCountryIndex: props.selectedIndex ? props.selectedIndex : null });
    if (menuItems != null)
      for (var i = 0; i < menuItems.length; i++) {
        if (i === props.selectedIndex && i > 3) {
          setTimeout(
            function () {
              if (document.getElementById(props.id)) {
                document.getElementById(props.id).scrollTop = ITEM_HEIGHT * i;
              }
            }.bind(this),
            10,
          );
          return;
        }
      }
  }

  componentDidMount() {
    this.setInitialIndexAndScrollPosition(this.props);
  }

  componentWillReceiveProps(props) {
    this.setInitialIndexAndScrollPosition(props);
  }

  onChangeCountryInput(text) {
    const _value = text.target.value;
    var value = _value.charAt(_value.length - 1);
    if (value == this.state.valueCountryInput) return;
    value = value.charAt(0);

    this.setState({ valueCountryInput: value });
    this.goToCountry(value);
  }

  goToCountry(value) {
    let menuItems = this.state.dropdownInfos.map((item) => eval(this.props.searchPattern));

    for (var i = 0; i < menuItems.length; i++) {
      if (menuItems[i].charAt(0).toLowerCase() == value.toLowerCase()) {
        this.setState({ selectedCountryIndex: i });
        setTimeout(
          function () {
            document.getElementById(this.props.id).scrollTop = ITEM_HEIGHT * i;
          }.bind(this),
          10,
        );
        return;
      } else {
        this.setState({ selectedCountryIndex: this.state.selectedCountryIndex ? this.state.selectedCountryIndex : 0 });
      }
    }
  }

  handleMenuItemClick(index, item) {
    this.setState({ dropdownInfos: null });
    this.props.onClose(index, item);
  }

  render() {
    return (
      <RenderDropDown
        id={this.props.id}
        direction={this.props.direction}
        onMouseOver={(event) => this.mouseOverHandler(event, 'input ' + this.props.id)}
        selectedCountryIndex={this.state.selectedCountryIndex}
        valueCountryInput={this.state.valueCountryInput}
        onChangeCountryInput={this.onChangeCountryInput}
        handleMenuItemClick={this.handleMenuItemClick}
        dropdownInfos={this.state.dropdownInfos}
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
  const letterSearchInput = (
    <input
      id={'input ' + props.id}
      className="dropdowninput"
      onChange={props.onChangeCountryInput}
      value={props.valueCountryInput}
      maxLength={2}
      style={{
        height: '0',
        position: 'absolute',
        background: 'none',
        opacity: '0',
        borderRadius: 'unset',
        outline: 'none',
        WebkitOutline: 'none',
        top: String(props.selectedCountryIndex * ITEM_HEIGHT),
      }}
      autoFocus={true}
    ></input>
  );

  return (
    <div className="tap-input-dropdown" id={props.id} onMouseOver={props.onMouseOver} style={props.style}>
      {letterSearchInput}
      {props.dropdownInfos == null || props.dropdownInfos.length == 0 ? (
        <div></div>
      ) : (
        props.dropdownInfos.map((item, index) => (
          <DropDownItem
            selected={index === props.selectedCountryIndex ? true : false}
            id={index}
            direction={props.direction}
            key={index}
            onClick={() => props.handleMenuItemClick(index, item)}
            textEndIsImage={props.itemEndIsImage}
            textStartIsImage={props.itemStartIsImage}
            textStart={props.itemStartPattern ? (props.showPlus ? '+' : '') + eval(props.itemStartPattern) : ''}
            textEnd={props.itemEndPattern ? eval(props.itemEndPattern) : ''}
          />
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
