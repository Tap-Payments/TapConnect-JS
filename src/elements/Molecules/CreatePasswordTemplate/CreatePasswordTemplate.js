import React from 'react';
import { useTranslation } from 'react-i18next';
import UserNameButton from '../../Atoms/UserNameButton';
import { Link, FormControlLabel, Checkbox, Collapse } from '@material-ui/core';
import TextFieldTemplate from '../../Atoms/TextFieldTemplate';
import PasswordTemplate from '../../Atoms/PasswordTemplate';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { makeStyles } from '@material-ui/core/styles';
import { TextFieldType } from '../../Constants/constants';
import { useVm } from '../../../hooks';
import CreatePasswordTemplateVM from './CreatePasswordTemplateVM';
import { observer } from 'mobx-react-lite';
import { InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import PasswordWatcher from '../PasswordWatcher/PasswordWatcher';
const useStyles = makeStyles((theme) => ({
  checkboxLabel: {
    width: '100%',
    marginBottom: '5px',
    marginTop: '-10px',
  },
  containedButton: {
    marginTop: '20px',
    marginBottom: '10px',
  },
  testerButton: {
    width: 'auto',
    visibility: 'hidden',
    position: 'fixed',
    overflow: 'auto',
    fontSize: '20px',
    fontWeight: '300',
    lineHeight: '1.2',
    letterSpacing: '-0.24px',
  },
}));

function CreatePasswordTemplate(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const vm = useVm(CreatePasswordTemplateVM, props);

  const handlePasswordInput = (pass) => {};
  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  if (!props.infos || props.infos[0] === undefined || props.infos[1] === undefined) return null;

  return (
    <div style={{ textAlign: 'center' }}>
      <PasswordTemplate
        textField={{
          ...props.infos[0],
          ...{
            onChange: vm.handleFirstPasswordChange,
            type: vm.showPassword ? 'text' : 'password',
            placeholder: props.infos[0].placeholder,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={vm.handleClickShowPassword}
                  onMouseDown={handleMouseDown}
                >
                  {vm.showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Collapse in={vm.passwordApproved} style={{ textAlign: 'center' }}>
        {
          <PasswordTemplate
            style={{ marginTop: '0px' }}
            textField={{
              ...props.infos[1],
              ...{
                onChange: vm.handleConfirmationPasswordChange,
                placeholder: props.infos[1].placeholder,
                type: vm.showPassword ? 'text' : 'password',
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={vm.handleClickShowPassword}
                      onMouseDown={handleMouseDown}
                    >
                      {vm.showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        }
      </Collapse>
      <Collapse in={!vm.passwordApproved} style={{ textAlign: 'center' }}>
        {<PasswordWatcher hasSix={vm.hasSix} hasDigit={vm.hasDigit} hasChar={vm.hasChar} hasSymbol={vm.hasSymbol} />}
      </Collapse>
    </div>
  );
}
export default observer(CreatePasswordTemplate);
