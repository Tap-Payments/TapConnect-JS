import React from 'react';
import { useTranslation } from 'react-i18next';
import UserNameButton from '../Atoms/UserNameButton';
import { Link, FormControlLabel, Checkbox } from '@material-ui/core';
import TextFieldTemplate from '../Atoms/TextFieldTemplate';
import PasswordTemplate from '../Atoms/PasswordTemplate';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { makeStyles } from '@material-ui/core/styles';
import { TextFieldType } from '../Constants/constants';
import OTPField from '../Atoms/OTPField';

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

export default function PasswordOTPTemplate(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <UserNameButton classes={classes} verifyValue={props.verifyValue} t={t}></UserNameButton>
      <span>
        <Link color={'primary'} variant={'body1'} onClick={props.editButtonInfo.onPress}>
          {t(props.editButtonInfo.text)}
        </Link>
      </span>
      {props.activeTextFieldName === TextFieldType.PASSWORD ? (
        <PasswordTemplate textField={props.passwordTextField} onMouseDown={handleMouseDown} />
      ) : props.activeTextFieldName === TextFieldType.OTP ? (
        <OTPField textField={props.otpTextField} />
      ) : (
        <React.Fragment />
      )}
      {location.href.search('tap.company') > 0 &&
      props.checkBoxInfo &&
      props.activeTextFieldName === TextFieldType.PASSWORD ? (
        <div className={classes.checkboxLabel}>
          <FormControlLabel
            control={
              <Checkbox
                size={props.checkBoxInfo.size}
                color={'primary'}
                icon={<CheckBoxOutlineBlankIcon style={{ height: '21px', width: '21px' }} />}
                checkedIcon={<CheckBoxIcon style={{ height: '21px', width: '21px' }} />}
                checked={props.checkBoxInfo.checked}
                onChange={props.checkBoxInfo.onChange}
                inputProps={props.checkBoxInfo.inputProps}
              />
            }
            label={t(props.checkBoxInfo.label)}
          />
        </div>
      ) : (
        <React.Fragment />
      )}
    </div>
  );
}
