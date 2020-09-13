import './assets/css/styles.css';

import { div, Tooltip, Fade } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import React from 'react';

import { CHAR as CharIcon } from '../../Constants/constants';
import { DIGIT as DigitIcon } from '../../Constants/constants';
import { SIX as SixIcon } from '../../Constants/constants';
import { SYMBOL as SymbolIcon } from '../../Constants/constants';

import { CHAR0 as CharIconFilled } from '../../Constants/constants';
import { DIGIT0 as DigitIconFilled } from '../../Constants/constants';
import { SIX0 as SixIconFilled } from '../../Constants/constants';
import { SYMBOL as SymbolIconFilled } from '../../Constants/constants';

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
