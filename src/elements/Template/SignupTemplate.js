import React, { useRef } from 'react';
import { Button, Link, Collapse, Typography, makeStyles } from '@material-ui/core';
import TapLoader from '../Login_Loader/Loader';
import { useTranslation, composeInitialProps } from 'react-i18next';
import TapAlert from '../Atoms/TapAlert';
import TapCard from '../Atoms/TapCard';
import BusinessNameSector from '../Molecules/BusinessNameSector';
import UserTemplate from '../Molecules/UserTemplate';
import BusinessTypeLicensed from '../Molecules/BusinessTypeLicensed';
import Licensed from '../Molecules/Licensed';
import CreatePasswordTemplate from '../Molecules/CreatePasswordTemplate/CreatePasswordTemplate';
import EmailTemplate from '../Atoms/EmailTemplate';
import PasswordOTPWrapper from '../Molecules/PasswordOTPWrapper';
import CollapseFadeTemplate from './CollapseFadeTemplate';
import { LOGO as TapLogo } from '../Constants/constants';

import ReactCodeInput from '../ReactCodeInput/ReactCodeInput.js';

import '../../elements/ReactCodeInput/style.css';

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

export default function SignupTemplate(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const reference = useRef(null);

  const targetElement = React.createRef();

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

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
                <span>{t(props.signupTitle)}</span>
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
              dropDownID={'tap_lead_signup_country'}
              tapCardId={props.id}
              infos={props.activeStepInfo}
              direction={props.direction}
              reference={reference}
            />
          </CollapseFadeTemplate>
          <CollapseFadeTemplate in={props.page === 1}>
            <PasswordOTPWrapper infos={props.activeStepInfo} in={props.page === 1} />
          </CollapseFadeTemplate>
          <CollapseFadeTemplate in={props.page === 2}>
            <BusinessNameSector
              onMouseDown={handleMouseDown}
              infos={props.activeStepInfo}
              reference={reference}
              tapCardId={props.id}
              direction={props.direction}
            />
          </CollapseFadeTemplate>
          <CollapseFadeTemplate in={props.page === 3}>
            <BusinessTypeLicensed
              onMouseDown={handleMouseDown}
              infos={props.activeStepInfo}
              reference={reference}
              tapCardId={props.id}
              direction={props.direction}
            />
          </CollapseFadeTemplate>
          <CollapseFadeTemplate in={props.page === 4}>
            <Licensed infos={props.activeStepInfo} direction={props.direction} />
          </CollapseFadeTemplate>
          <CollapseFadeTemplate in={props.page === 5}>
            <UserTemplate textField={props.activeStepInfo} />
          </CollapseFadeTemplate>
          <CollapseFadeTemplate in={props.page === 6}>
            <EmailTemplate
              dropDownID={'tap_signup_country'}
              tapCardId={props.id}
              infos={props.activeStepInfo}
              direction={props.direction}
              reference={reference}
            />
          </CollapseFadeTemplate>
          <CollapseFadeTemplate in={props.page === 7}>
            <div style={{ textAlign: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
              <CreatePasswordTemplate infos={props.activeStepInfo} onPasswordUpdated={props.storeConfirmedPassword} />
            </div>
          </CollapseFadeTemplate>
          <CollapseFadeTemplate in={props.page === 8}>
            <div style={{ textAlign: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
              <Typography variant="h2">{t('signup_successful_message')}</Typography>
            </div>
          </CollapseFadeTemplate>
          {props.page === 9 ? (
            <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
              <ReactCodeInput
                onKeyUp={() => {}}
                updated={false}
                type="otpCode"
                ref={targetElement}
                autoFocus={false}
                placeholder={'0'}
                {...styles}
                // onChange={this.handleChange.bind(this)}
                fields={6}
                // {...props}
              />
            </div>
          ) : null}

          <CollapseFadeTemplate in={props.page !== 4}>
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
                  props.page === 8
                    ? props.isConnect
                      ? props.loginButtonText
                      : props.doneButtonText
                    : props.page === 7
                    ? props.submitButtonText
                    : props.nextButtonText,
                )
              )}
            </Button>
          </CollapseFadeTemplate>
          {/* <Collapse in={props.page !== 1}>
            <Button variant={props.backButtonVariant} onClick={props.onGoBack} variant={'text'}>
              {t(props.backButtonText)}
            </Button>
          </Collapse> */}
          <div className={classes.link} style={props.page !== 0 ? { paddingBottom: '0px' } : {}}>
            <Collapse in={props.page === 0 && props.showSigninSection} timeout={{ enter: 1000, exit: 800 }}>
              <span>{t(props.footerTitle) + ' '}</span>
              <Link onClick={props.moveToLogin} color={'primary'} className={classes.subLink}>
                {t(props.footerLogin)}
              </Link>
              {/* <div className={classes.subLink}>
              {props.footerSubTitle}
              <Link href={'https://www.tap.company/kw/en/terms-conditions'} color={'primary'}>
                {props.footerTermsTitle}
              </Link>
              ,{' '}
              <Link href={'https://www.tap.company/kw/en/privacy-policy'} color={'primary'}>
                {props.footerPolicyTitle}
              </Link>
              .
            </div> */}
            </Collapse>
            <div className={classes.footer}>
              {t(props.footer)} {t(props.companyName)}.
            </div>
          </div>
        </div>
      </div>
    </TapCard>
  );
}
