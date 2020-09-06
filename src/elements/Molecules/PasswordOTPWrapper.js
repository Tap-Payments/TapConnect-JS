import React from 'react';
import PasswordOTPTemplate from '../Molecules/PasswordOTPTemplate';

export default function PasswordOTPWrapper(props) {
  if (!props.infos || !props.infos.activeTextFieldName) return null;

  return (
    <React.Fragment>
      <PasswordOTPTemplate
        verifyValue={props.infos.verifyValue}
        placeholder={props.infos.placeholder}
        editButtonInfo={props.infos.editButtonInfo}
        activeTextFieldName={props.infos.activeTextFieldName}
        passwordTextField={props.infos.passwordTextField}
        otpTextField={props.infos.otpTextField}
        checkBoxInfo={props.infos.checkBoxInfo}
      />
    </React.Fragment>
  );
}
