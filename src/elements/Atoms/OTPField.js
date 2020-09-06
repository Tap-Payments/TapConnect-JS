import React from 'react';
import { makeStyles } from '@material-ui/core';
import ReactCodeInput from '../ReactCodeInput/ReactCodeInput';

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: '30px',
    marginBottom: '20px',
  },
}));

export default function OTPField(props) {
  if (!props.textField) return null;

  const classes = useStyles();
  const targetElement = React.createRef();

  console.log(props.textField.fields);

  const styles = {
    className: 'reactCodeInput',
    inputStyle: {
      MozAppearance: 'textfield',
      width: window.innerWidth <= '768' ? '40px' : '40px',
      // borderRadius: '8px',
      // fontSize: '24px',
      height: '46px',
      // color: '#535353',
      outline: 'none',
      border: 'none',
      borderLeft: '0px solid #CECECE',
      borderRight: '0px solid #CECECE',
      borderTop: '0px solid #CECECE',
      borderBottom: '1px solid #CECECE',
      textAlign: 'center',
      // outlineColor: '#009AFF',
      margin: window.innerWidth <= '768' ? '1%' : '1.2%',
      // padding: window.innerWidth <= '768' ? '0' : '0 12px',
    },
    inputStyleInvalid: {
      margin: '40%',
      MozAppearance: 'textfield',
      width: window.innerWidth <= '768' ? '40px' : '40px',
      // borderRadius: '8px',
      // fontSize: '24px',
      height: '46px',
      // color: '#535353',
      outline: 'none',
      border: 'none',
      borderLeft: '0px solid #CECECE',
      borderRight: '0px solid #CECECE',
      borderTop: '0px solid #CECECE',
      borderBottom: '1px solid #CECECE',
      textAlign: 'center',
      // outlineColor: '#009AFF',
      margin: window.innerWidth <= '768' ? '1%' : '1.2%',
      // padding: window.innerWidth <= '768' ? '0' : '0 12px',
    },
  };

  return (
    <ReactCodeInput
      onKeyUp={props.textField.onKeyUp}
      updated={props.textField.updated}
      type="otpCode"
      ref={targetElement}
      autoFocus={props.textField.autoFocus}
      placeholder={props.textField.placeholder}
      {...styles}
      onChange={props.textField.onChange}
      fields={props.textField.fields}
      {...props}
    />
  );
}
