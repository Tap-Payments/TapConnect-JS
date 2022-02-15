import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import './assests/css/styles.css';
import { Input, Popover, makeStyles, InputAdornment, IconButton, useTheme } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { useTranslation } from 'react-i18next';
import MenuWrapper from '../Molecules/MenuWrapper';
import { findLong } from '../Utils/FormUtils/validation';

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    borderBottom: '0px solid ' + theme.palette.text.button,
  },
  marginStart: {
    marginInlineStart: '-10px',
  },
  marginEnd: {
    marginInlineStart: '10px',
  },
  marginNone: {
    marginInlineStart: '0px',
  },
  menuItem: {
    fontSize: 'unset',
    overflow: 'hidden',
    fontWeight: '400',
    lineHeight: '1.5em',
    whiteSpace: 'nowrap',
    paddingLeft: '16px',
    display: 'block',
    textOverflow: 'ellipsis',
    paddingRight: '16px',
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    paddingTop: '12px',
    paddingBottom: '12px',
  },
  searchBar: {
    display: 'flex',
    position: 'fixed',
    backgroundColor: 'white',
    padding: '10px',
    paddingBottom: '0px',
    paddingLeft: '16px',
    paddingRight: '16px',
    zIndex: '9999',
    borderRadius: '12px 12px 0px 0px',
  },
}));

export const InputTypeEnum = {
  EMAIL: 'email',
  MOBILE: 'mobile',
  ANY: 'any',
};

class TapInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.initialValue || '',
      focused: this.props.inputProps.autoFocus ? this.props.inputProps.autoFocus : false,
      inputLength: 30,
      inputCssClass: '',
      inputCssClassCode: '',
      dropDownOpen: false,
      dropdownInfos: [],
      countryIcon: this.props.countryIcon,
      direction: this.props.direction,
      selectedCountryIndex: this.props.selectedIndex,
      height: '302px',
      width: '330px',
    };

    this.tempMaxLength = this.props.maxLength;
    this.inputClass = '';
    this.inputClassCode = '';
    this.handleIconClick = this.handleIconClick.bind(this);
    this.onChange = this.onChange.bind(this);

    this.handleMobile = this.handleMobile.bind(this);

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.shrinkToFill = this.shrinkToFill.bind(this);
    this.expandBasedOnWidth = this.expandBasedOnWidth.bind(this);
    this.showORHidePicker = this.showORHidePicker.bind(this);
  }
  componentDidMount() {
    this.inputClass = 'inputIcon';
    this.inputClassCode = 'inputIconCode';

    this.showORHidePicker();
  }

  showORHidePicker() {
    this.setState({
      inputCssClass: this.inputClass + ' hide',
      inputCssClassCode: 'codeHide',
    });

    if (
      this.props.inputType === InputTypeEnum.MOBILE ||
      (this.props.value && RegExp('^[0-9]*$').test(this.props.value.charAt(0)))
    ) {
      this.setState({
        inputCssClass: this.inputClass + ' show',
        inputCssClassCode: 'codeShow',
      });
    }
  }

  componentWillReceiveProps(props) {
    let inputDiv = document.getElementById('tap-input-field-2520');
    let testerDiv = document.getElementById('tester-div-width');
    testerDiv.innerText = this.state.value;

    this.setState({
      dropDownOpen: false,
      inputType: props.inputType,
    });

    this.tempMaxLength = this.tempMaxLength || props.maxLength;

    if (
      props.inputType === InputTypeEnum.MOBILE ||
      (this.props.value && RegExp('^[0-9]*$').test(this.props.value.charAt(0)))
    ) {
      this.setState({
        inputCssClass: this.inputClass + ' show',
        inputCssClassCode: 'codeShow',
        countryIcon: props.countryIcon,
        inputLength: this.tempMaxLength || props.maxLength,
      });
    }

    if (window.innerWidth <= '768') {
      this.shrinkToFill(inputDiv, 20, testerDiv.clientWidth);
    } else {
      inputDiv.setAttribute('style', 'width: 100%;');
    }
  }

  componentDidUpdate(prevProps, prevState) {
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

  convert(input) {
    let unicode = ['٠', '٩', '٨', '٧', '٦', '٥', '٤', '٣', '٢', '١'];
    let english = ['0', '9', '8', '7', '6', '5', '4', '3', '2', '1'];

    for (let i = 0; i < unicode.length; i++) {
      if (input.includes(unicode[i])) {
        input = input.replace(unicode[i], english[i]);
      }
    }
    return input;
  }

  containsArabicNumber(text) {
    var reg = /[٠١٢٣٤٥٦٧٨٩]/;
    return reg.test(text);
  }

  containsEmailCharacter(text) {
    var reg = /^[A-Za-z0-9!#$%&'*+-/=?^_`{|}~@ ."\\]+$/;
    return reg.test(text);
  }

  handleMobile(text, event) {
    let value1 = text.charAt(0) === '+' ? text.charAt(0).replace('+', '') : text;

    let value = value1;
    if (this.props.inputType === InputTypeEnum.MOBILE) {
      value = this.strictToDigit(value1, event);
      // value = text.charAt(0) !== '+' ? this.strictToDigit(value1, event) : '';
    }
    this.setState({ value: value });

    this.setState({
      inputLength: this.tempMaxLength,
      inputCssClass: this.inputClass + ' show',
      inputCssClassCode: 'codeShow',
    });
  }

  handleEmail(text) {
    if (this.containsEmailCharacter(text)) {
      // TODO: use constant value instead of using the fixed one
      if (text.length === 5) {
        document.getElementById('tap-input-field-2520').maxlength = '70';
        this.setState({ inputLength: 70 });
      }
      this.setState({
        inputCssClass: this.inputClass + ' hide',
        inputCssClassCode: 'codeHide',
        value: text,
      });
    } else {
      if (this.props.strictToEnglish) this.props.strictToEnglish();
      var reg = /[\u0600-\u06FF\u0750-\u077F]/;
      this.setState({ value: text.replace(reg, '') });
    }
  }

  textHandler(text1, event) {
    if (text1.length > 0) {
      let text = this.containsArabicNumber(text1) ? this.convert(text1) : text1;
      switch (this.props.inputType) {
        case InputTypeEnum.ANY:
          if (RegExp('^[0-9]*$').test(text) && RegExp('^[0-9]*$').test(text.charAt(0) || text.charAt(0) === '+')) {
            this.handleMobile(text, event);
          } else {
            this.handleEmail(text);
          }
          break;
        case InputTypeEnum.EMAIL:
          this.handleEmail(text);
          break;
        case InputTypeEnum.MOBILE:
          this.handleMobile(text, event);
          break;
      }
    } else {
      this.setState({
        inputLength: 30,
      });
    }
  }
  strictToDigit(text, event) {
    const lastCharIndex = text.length - 1;
    const textPrev = text.slice(0, lastCharIndex);
    var filteredText;
    if (RegExp('^[0-9]*$').test(text.charAt(lastCharIndex))) {
      filteredText = text;
      event.target.value = text;
    } else {
      filteredText = textPrev;
      event.target.value = textPrev;
    }
    return filteredText;
  }

  onChange(event) {
    this.textHandler(event.target.value, event);
    this.setState({ value: event.target.value });

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  onFocus() {
    this.setState({ focused: true });
    if (this.props.inputProps.onFocus) {
      this.props.inputProps.onFocus;
    }
  }

  onBlur() {
    this.setState({ focused: false });
    if (this.props.inputProps.onBlur) {
      this.props.inputProps.onBlur;
    }
  }

  handleIconClick(event) {
    console.log('handleIconClick');
    if (event.target.id === 'tap-input-field-2520' + this.inputClass + ' show') {
      this.setState({ dropdownInfos: this.props.dropdownInfos, dropDownOpen: true });
    }
  }

  onClose(index, item) {
    if (item && item !== 'backdropClick' && item !== 'escapeKeyDown' && item !== 'tabKeyDown') {
      this.tempMaxLength = this.props.getMaxLength(item);
      this.setState({
        selectedCountryIndex: index,
        countryIcon: this.props.getCountryIcon(item),
        inputLength: this.props.getMaxLength(item),
        dropdownInfos: null,
        dropDownOpen: false,
      });
      this.handleClear();
      if (this.props.onClose != null) this.props.onClose(index, item);
    } else this.setState({ dropDownOpen: false });
  }

  handleClear() {
    this.setState({ value: '', inputLength: '30' });
    if (this.props.clear !== null) this.props.clear();
  }

  handleMouseDown(event) {
    event.preventDefault();
  }

  shrinkToFill(event, fontSize, textWidth) {
    let maxWidth = event.clientWidth;
    let _textWidth = textWidth;

    if (_textWidth > maxWidth) {
      // if it's too big, calculate a new font size
      // the extra .9 here makes up for some over-measures
      fontSize = ((fontSize * maxWidth) / _textWidth) * 0.9;
      // and set the style on the input
      event.setAttribute('style', 'font-size:' + fontSize + 'px;');
    } else {
      // in case the font size has been set small and
      // the text was then deleted
      event.setAttribute('style', 'font-size:' + fontSize + 'px;');
    }
  }

  expandBasedOnWidth(event, textWidth) {
    let maxWidth = event.clientWidth;
    let _textWidth = textWidth;

    if (_textWidth > maxWidth) {
      event.setAttribute('style', 'width:' + _textWidth + 'px;');
    } else {
      if (_textWidth === 0 || _textWidth <= 240) event.setAttribute('style', 'width: 100%');
      else if (maxWidth < _textWidth) event.setAttribute('style', 'width:' + _textWidth + 'px;');
    }
  }

  handleKeyUp(event) {
    let testerDiv = document.getElementById('tester-div-width');
    testerDiv.innerText = event.target.value;

    if (window.innerWidth <= '768') {
      this.shrinkToFill(event.target, 20, testerDiv.clientWidth);
    } else {
      this.expandBasedOnWidth(event.target, testerDiv.clientWidth);
    }
  }

  render() {
    let props = this.props;

    return (
      <RenderTapInput
        {...props}
        inputClassCode={this.inputClassCode}
        inputCssClass={this.state.inputCssClass}
        inputCssClassCode={this.state.inputCssClassCode}
        handleIconClick={this.handleIconClick}
        countryIcon={this.state.countryIcon}
        id={'tap-input-field-2520'}
        type={props.inputType === InputTypeEnum.MOBILE ? 'tel' : props.type || 'text'}
        value={this.state.value}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onClose={this.onClose}
        clear={this.handleClear}
        handleMouseDown={this.handleMouseDown}
        maxLength={this.state.inputLength}
        dropDownOpen={this.state.dropDownOpen}
        countryIndex={this.state.selectedCountryIndex}
        dropdownInfos={this.state.dropdownInfos}
        height={this.state.height}
        handleKeyUp={this.handleKeyUp}
        findLong={findLong}
      />
    );
  }
}

function RenderTapInput(props) {
  const { t } = useTranslation();

  const classes = useStyles();
  const theme = useTheme();
  const selectedMenuRef = useRef();

  const dropDownRef = useRef(props.dropDownID);
  let maxTextLength = props.findLong(props.dropdownInfos, props.itemEndPattern);

  return (
    <div>
      <div
        className={'inputFilled'}
        style={{ borderBottom: '1px solid ' + theme.palette.primary.secondary }}
        onClick={props.handleIconClick}
      >
        <div
          style={{ color: theme.palette.text.button }}
          className={props.inputClassCode}
          id={props.inputCssClassCode + props.direction}
        >
          <img className="countryIcon" src={props.countryIcon} alt="icon" />
        </div>
        <div id={props.id + props.inputCssClass} className={props.inputCssClass}>
          <Input
            classes={{ root: classes.inputRoot }}
            endAdornment={
              props.value != null && props.value !== '' ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={props.clear}
                    onMouseDown={props.onMouseDown}
                  >
                    {<ClearIcon fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ) : null
            }
            className={props.className}
            id={props.id}
            onChange={props.onChange}
            autoFocus={props.autoFocus}
            placeholder={t(props.placeholder)}
            label={t(props.label)}
            margin={props.margin}
            name={props.name}
            variant={props.variant}
            required={props.required}
            style={props.style}
            inputProps={{ maxLength: props.maxLength, ...props.inputProps }}
            type={'emailmobile'}
            value={props.value}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            onKeyUp={props.handleKeyUp}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                if (props.onEnterPressed != null) props.onEnterPressed(ev);
                ev.preventDefault();
              }
            }}
          />
          <div id="tester-div-width" className="tester-div"></div>
        </div>
      </div>

      <MenuWrapper
        {...props}
        reference={props.reference}
        t={t}
        dropDownOpen={props.dropDownOpen}
        maxTextLength={maxTextLength}
        dropDownRef={dropDownRef}
        handleClose={props.onClose}
        selectedMenuItemRef={selectedMenuRef}
        classes={{
          menuItem: classes.menuItem,
          searchBar: classes.searchBar,
          marginNone: classes.marginNone,
          marginStart: classes.marginStart,
          marginEnd: classes.marginEnd,
        }}
      />
    </div>
  );
}

TapInput.defaultProps = {
  id: '',
  value: '',
  showPlus: true,
  inputType: InputTypeEnum.ANY,
  tapCardId: 'login-tap-card-240620',
  inputProps: { autoFocus: false },
  direction: 'ltr',
};

export default TapInput;
