import React, { useRef } from 'react';
import { Button, Link, Collapse, Typography, makeStyles, Divider } from '@material-ui/core';
import TapLoader from '../Login_Loader/Loader';
import { useTranslation } from 'react-i18next';
import { TextFieldType } from '../Constants/constants';
import TapAlert from '../Atoms/TapAlert';
import TapCard from '../Atoms/TapCard';
import PasswordOTPTemplate from '../Molecules/PasswordOTPTemplate';
import EmailTemplate from '../Atoms/EmailTemplate';
import CollapseFadeTemplate from './CollapseFadeTemplate';
import { LOGO as TapLogo } from '../Constants/constants';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: '10px',
    marginTop: '0px',
    padding: '0',
    display: 'flow-root',
  },
  link: {
    margin: '25px 0',
    marginTop: '17px',
    marginBottom: '14px',
    display: 'inline-block',
    verticalAlign: 'middle',
    zoom: '1',
  },
  footer: {
    paddingTop: '5px',
    fontSize: '13px',
    textAlign: 'center',
    // marginBottom: '5px',
    color: theme.palette.text.primary,
    fontWeight: '300',
  },
  signIn: {
    padding: '35px',
    paddingBottom: '7px',
  },
  loader: {
    height: '20px',
    width: '20px',
  },
  containedButton: {
    marginTop: '20px',
    marginBottom: '10px',
  },
  signUp: {
    background: theme.palette.background.main,
    padding: '30px 35px',
    textAlign: 'center',
    backgroundClip: 'padding-box',
  },
  signUpTitle: {
    color: theme.palette.text.primary,
    margin: '0px',
    ...theme.typography.h3_bold,
  },
  signUpSubTitle: {
    color: theme.palette.text.primary,
    padding: '10px',
    marginTop: '0px',
  },
  signUpButton: {
    background: theme.palette.common.voilet,
    color: theme.palette.common.white,
    margin: '10px 0',
    width: 'unset',
    '&:hover': {
      background: theme.palette.common.voiletHover,
    },
    ...theme.typography.body1_bold,
  },
}));

export default function LoginTemplate(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const reference = useRef(null);

  return (
    <TapCard reference={reference}>
      <div id={props.id} style={{ width: '100%', direction: props.direction }}>
        <div className={classes.signIn}>
          <div className={classes.title}>
            {props.showHeaderLogo ? (
              <div
                style={{
                  float: props.direction === 'rtl' ? 'right' : 'left',
                  paddingInlineEnd: '10px',
                }}
              >
                <img
                  style={{
                    height: '30px',
                    width: '30px',
                  }}
                  src={TapLogo}
                />
              </div>
            ) : null}
            <div
              style={
                props.showHeaderLogo
                  ? {
                      paddingTop: props.direction === 'rtl' ? '3px' : '4px',
                      float: props.direction === 'rtl' ? 'left' : 'right',
                    }
                  : {}
              }
            >
              <Typography variant={'h2'}>
                <span>{t(props.title)}</span>
              </Typography>
            </div>
          </div>
          <CollapseFadeTemplate
            in={props.errorInfo != null && props.errorInfo.error != null && props.errorInfo.error != '' ? true : false}
          >
            <TapAlert>{t(props.errorInfo != null && props.errorInfo.error)}</TapAlert>
          </CollapseFadeTemplate>

          <CollapseFadeTemplate
            in={props.activeTextFieldName === TextFieldType.PASSWORD || props.activeTextFieldName === TextFieldType.OTP}
          >
            <PasswordOTPTemplate
              strictUsername={props.strictUsername}
              passwordTextField={props.passwordTextField}
              otpTextField={props.otpTextField}
              verifyValue={props.verifyValue}
              editButtonInfo={props.editButtonInfo}
              loadingStatus={props.loadingStatus}
              checkBoxInfo={props.checkBoxInfo}
              activeTextFieldName={props.activeTextFieldName}
            />
          </CollapseFadeTemplate>
          <CollapseFadeTemplate
            in={
              !props.showLoader &&
              props.activeTextFieldName !== TextFieldType.PASSWORD &&
              props.activeTextFieldName !== TextFieldType.OTP
            }
          >
            <EmailTemplate
              tapCardId={props.id}
              dropDownID={'tap_input_dropdown'}
              infos={props.showLoader ? null : props.emailTextField}
              loadingStatus={props.loadingStatus}
              direction={props.direction}
              reference={reference}
            />
          </CollapseFadeTemplate>

          <Button
            variant={
              props.activeTextFieldName === TextFieldType.EMAIL
                ? props.emailTextField.buttonVariant
                : props.activeTextFieldName === TextFieldType.PASSWORD
                ? props.passwordTextField.buttonVariant
                : props.otpTextField.buttonVariant
            }
            className={classes.containedButton}
            onClick={props.onSubmit}
            style={props.newUser && props.activeTextFieldName != TextFieldType.EMAIL ? { marginBottom: '25px' } : {}}
          >
            {props.loadingStatus ? (
              <TapLoader
                size={20}
                style={{ width: '100px', height: '100px', display: 'block', position: 'absolute', margin: 'auto' }}
                innerColor={'white'}
                outerColor={'white'}
                className={classes.loader}
              />
            ) : (
              t(
                props.newUser && props.activeTextFieldName != TextFieldType.EMAIL
                  ? props.signUpInfo.registerButtonText
                  : props.activeTextFieldName === TextFieldType.EMAIL
                  ? props.emailTextField.buttonText
                  : props.activeTextFieldName === TextFieldType.PASSWORD
                  ? props.passwordTextField.buttonText
                  : props.otpTextField.buttonText,
              )
            )}
          </Button>
          {!props.strictUsername && (
            <CollapseFadeTemplate in={props.newUser && props.activeTextFieldName != TextFieldType.EMAIL ? false : true}>
              <Link onClick={props.moveToForgot} variant={'body1'} color={'primary'} className={classes.link}>
                {props.newUser && props.activeTextFieldName != TextFieldType.EMAIL
                  ? ''
                  : t(props.forgotPasswordInfo.text)}
              </Link>
            </CollapseFadeTemplate>
          )}
        </div>
        <CollapseFadeTemplate in={props.activeTextFieldName === TextFieldType.EMAIL && props.showSignupSection}>
          <Divider />
          <div className={classes.signUp}>
            <span className={classes.signUpTitle}>{t(props.signUpInfo.title)}</span>
            <Typography variant={'h5'} className={classes.signUpSubTitle}>
              <span>{t(props.signUpInfo.subTitle)}</span>
            </Typography>
            <Button className={classes.signUpButton} variant="contained" onClick={props.moveToSignup}>
              {t(props.signUpInfo.buttonText)}
            </Button>
            <div className={classes.footer}>
              {t(props.footer)} {t(props.companyName)}.
            </div>
          </div>
        </CollapseFadeTemplate>
      </div>
    </TapCard>
  );
}
