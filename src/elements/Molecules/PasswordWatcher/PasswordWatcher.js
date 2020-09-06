import './assets/css/styles.css';

import { div, Tooltip, Fade } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import React from 'react';

import CharIcon from './assets/images/char.svg';
import DigitIcon from './assets/images/digit.svg';
import SixIcon from './assets/images/six.svg';
import SymbolIcon from './assets/images/symbol.svg';

import CharIconFilled from './assets/images/char0.svg';
import DigitIconFilled from './assets/images/digit0.svg';
import SixIconFilled from './assets/images/six0.svg';
import SymbolIconFilled from './assets/images/symbol0.svg';

export default function PasswordWatcher(props) {
  const buttonWidth = props.buttonWidth || '23px';
  const iconWidth = props.iconWidth || '23px';
  const { t } = useTranslation();
  return (
    /// TODO: Add tooltip onHover
    <div id="help-labels-container" dir={'ltr'} style={{ position: 'relative', width: '100%' }}>
      <Tooltip title={t('signup_has_six_tooltip')} TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
        <div style={{ width: buttonWidth, height: buttonWidth, margin: '0px 2px' }}>
          <img src={props.hasSix ? SixIconFilled : SixIcon} style={{ width: iconWidth, height: iconWidth }} />
        </div>
      </Tooltip>

      <Tooltip title={t('signup_has_char_tooltip')} TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
        <div style={{ width: buttonWidth, height: buttonWidth, margin: '0px 2px' }}>
          <img src={props.hasChar ? CharIconFilled : CharIcon} style={{ width: iconWidth, height: iconWidth }} />
        </div>
      </Tooltip>

      <Tooltip title={t('signup_has_digit_tooltip')} TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
        <div style={{ width: buttonWidth, height: buttonWidth, margin: '0px 2px' }}>
          <img src={props.hasDigit ? DigitIconFilled : DigitIcon} style={{ width: iconWidth, height: iconWidth }} />
        </div>
      </Tooltip>

      <Tooltip title={t('signup_has_symbol_tooltip')} TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
        <div style={{ width: buttonWidth, height: buttonWidth, margin: '0px 2px' }}>
          <img src={props.hasSymbol ? SymbolIconFilled : SymbolIcon} style={{ width: iconWidth, height: iconWidth }} />
        </div>
      </Tooltip>
    </div>
  );
}
