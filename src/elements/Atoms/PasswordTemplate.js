import React from 'react';
import TextFieldTemp from './TextField';
import { InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default function PasswordTemplate(props) {
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword });
  };

  return (
    <TextFieldTemp
      {...props.textField}
      style={props.style}
      type={props.textField.type ? props.textField.type : values.showPassword ? 'text' : 'password'}
      onPaste={(event) => {
        event.preventDefault();
      }}
      endAdornment={
        props.textField.endAdornment ? (
          props.textField.endAdornment
        ) : props.hideEndAdornment ? null : (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={props.onMouseDown}
            >
              {values.showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
            </IconButton>
          </InputAdornment>
        )
      }
    />
  );
}
