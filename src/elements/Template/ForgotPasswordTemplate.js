import React, { useRef } from 'react';
import { Button, Typography, makeStyles } from '@material-ui/core';
import TapLoader from '../Login_Loader/Loader';
import { useTranslation, composeInitialProps } from 'react-i18next';
import { TapAlert } from '../Atoms/TapAlert';
import TapCard from '../Atoms/TapCard';

import CreatePasswordWrapper from '../Molecules/CreatePasswordWrapper';
import EmailTemplate from '../Atoms/EmailTemplate';
import OTPField from '../Atoms/OTPField';
import PasswordOTPWrapper from '../Molecules/PasswordOTPWrapper';
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
    paddingTop: '15px',
    fontSize: '13px',
    color: theme.palette.text.primary,
    fontWeight: '300',
  },
  footer: {
    paddingBottom: '20px',
    paddingTop: '5px',
    fontSize: '13px',
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontWeight: '300',
  },
  subLink: {
    fontSize: '13px',
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
}));

export default function ForgotPasswordTemplate(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const reference = useRef(null);

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

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
                <span>{t(props.resetPasswordTitle)}</span>
              </Typography>
            </div>
          </div>
          <CollapseFadeTemplate
            in={props.errorInfo != null && props.errorInfo.error != null && props.errorInfo.error != '' ? true : false}
          >
            <TapAlert>{t(props.errorInfo != null && props.errorInfo.error)}</TapAlert>
          </CollapseFadeTemplate>
          <CollapseFadeTemplate in={props.page === 0 && !props.showLoader}>
            <EmailTemplate
              dropDownID={'tap_lead_reset_password_country'}
              tapCardId={props.id}
              infos={props.activeStepInfo}
              direction={props.direction}
              reference={reference}
            />
          </CollapseFadeTemplate>
          <CollapseFadeTemplate in={props.page === 1}>
            <CreatePasswordWrapper infos={props.activeStepInfo} onPasswordUpdated={props.storeResetPassword} />
          </CollapseFadeTemplate>
          <CollapseFadeTemplate in={props.page === 2}>
            <div style={{ textAlign: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
              <OTPField textField={!props.activeStepInfo.fields ? null : props.activeStepInfo} />
            </div>
          </CollapseFadeTemplate>
          <CollapseFadeTemplate in={props.page === 3}>
            <div style={{ textAlign: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
              <Typography variant="h2">{t('forgot_successful_message')}.</Typography>
            </div>
          </CollapseFadeTemplate>
          <Button variant={props.nextButtonVariant} className={classes.containedButton} onClick={props.onSubmit}>
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
                props.page === 2
                  ? props.resetButtonText
                  : props.page === 3
                  ? props.loginButtonText
                  : props.nextButtonText,
              )
            )}
          </Button>

          <div className={classes.link} style={props.page !== 0 ? { paddingBottom: '0px' } : {}}>
            {/* <Collapse in={props.page === 0} timeout={{ enter: 1000, exit: 800 }}>
              <span>{t(props.footerTitle) + ' '}</span>
              <Link onClick={props.moveToLogin} color={'primary'} className={classes.subLink}>
                {t(props.footerLogin)}
              </Link>
            </Collapse> */}
            <div className={classes.footer}>
              {t(props.footer)} {t(props.companyName)}.
            </div>
          </div>
        </div>
      </div>
    </TapCard>
  );
}
