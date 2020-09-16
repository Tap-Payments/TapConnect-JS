## Table of Contents

- [Brief Description](#brief-description)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Example Login](#example-login)
- [Example Signup](#example-signup)
- [Example Connect](#example-connect)
- [Example TapAuthButton](#example-tapauthbutton)
- [JS Demo Page](#js-demo-page)
- [Connect Demo Page](#connect-demo-page)
- [TapAuthButton Properties](#tapauthbutton-properties)
- [ConnectPackage Properties](#connectPackage-properties)
- [Theme](#theme)
- [Pallete](#pallete)
- [Typography](#typography)
- [Default Theme](#default-theme)
- [Author](#author)

## Brief Description

Connect is a React component it contains connect, login and sign up component with the functionalities and the flows.User can use the login or sign up directly and also they can use connect.Connect will manage the switch between login and signup itself.

It has two theme dark/light,user can also change the theme by passing theme from outside.

- [Source Code](https://github.com/Tap-Payments/goWebDashboard-React.git).

<a name="demo"></a>

## Demo

Your site is published at https://tap-payments.github.io/TapConnect-JS/

## Installation

```
npm i @tap-payments/react_auth
```

For js library

```
<link rel="stylesheet" href="https://tap-connecet.b-cdn.net/build/css/Connect.css" />
<script type="text/javascript" src="https://tap-connecet.b-cdn.net/build/js/Connect.js.map"></script>
<script type="text/javascript" src="https://tap-connecet.b-cdn.net/build/js/Connect.js"></script>
```

## Usage

After installing the package by cmd/terminal, add the following line to your project to import the required files. The package includes ConnectPackage, TapAuthButton, DialogMode, AnimationType, PageMode. (you can import one or all components based on your target).

DialogMode used to change the dialog mode (POPUP, FULLPAGE).
AnimationType used to change the dialog animation (FADE, SLIDEUP, SLIDEDOWN, SLIDELEFT, SLIDERIGHT).
PageMode used to changes the page
Languages used to the change the direction of the dialog (EN, AR).

If you want to use connect or login or signup need to import below one.

```
import { ConnectPackage, DialogMode, AnimationType } from '@tap-payments/react_auth';
```

If you want to use TapAuthButton need to import below one.

```
import { TapAuthButton, DialogMode, AnimationType, PageMode } from '../../src/index';
```

## Configuration

## Example Login

```
iimport React, { Fragment } from 'react';
import { useVm, useAppCtx } from '../../hooks';
import LoginVM from './LoginVM';
import { observer } from 'mobx-react-lite';
import { ConnectPackage, DialogMode, AnimationType } from '@tap-payments/react_auth';


function Login(props) {
  if (props.isAuthorized) return <Fragment />;
  const vm = useVm(LoginVM, [useAppCtx(), props]);
  return (
    <ConnectPackage
      onSuccess={vm.onSuccess}
      initialAuthType={vm.initialAuthType}
      dialogMode={DialogMode.POPUP}
      countryCode={'965'}
      pageMode={PageMode.LOGIN}
      animationType={AnimationType.SLIDEDOWN}
      animationDuration={500}
      closeOnOutsideClick={false}
      defaultEmailOrMobile={null}
      hideInitialLoader={props.hideInitialLoader}
      theme={{
        direction: vm.appDirection,
      }}
      moveToSignup={vm.moveToSignup}
    />
  );
}

export default Login;

```

## Example Signup

```
import React, { Fragment } from 'react';
import { useVm, useAppCtx } from '../../hooks';
import SignupVM from './SignupVM';
import { observer } from 'mobx-react-lite';
import { ConnectPackage,
  DialogMode,
  AnimationType,
  PageMode } from '@tap-payments/react_auth';

function Signup(props) {
  const vm = useVm(SignupVM, [useAppCtx(), props]);
  return (
     <ConnectPackage
      onSuccess={vm.onSuccess}
      pageMode={PageMode.SIGNUP}
      initialAuthType={vm.initialAuthType}
      dialogMode={DialogMode.POPUP}
      countryCode={'965'}
      removeAuthType={removeAuthType}
      animationType={AnimationType.SLIDEDOWN}
      animationDuration={500}
      closeOnOutsideClick={false}
      defaultEmailOrMobile={null}
      hideInitialLoader={props.hideInitialLoader}
      theme={{
        direction: vm.appDirection,
      }}
    />
  );
}

export default Signup;

```

## Example Connect

```
import React, { Fragment } from 'react';
import { useVm, useAppCtx } from '../../hooks';
import ConnectVM from './ConnectVM';
import { observer } from 'mobx-react-lite';
import { removeAuthType } from '../../utils/LocalStorage/authType';
import { ConnectPackage, DialogMode, AnimationType } from '@tap-payments/react_auth';

function Connect(props) {
  if (props.isAuthorized) return <Fragment />;
  const vm = useVm(ConnectVM, [useAppCtx(), props]);
  return (
    <ConnectPackage
      onSuccess={vm.onSuccess}
      pageMode={PageMode.CONNECT}
      initialAuthType={vm.initialAuthType}
      dialogMode={DialogMode.POPUP}
      countryCode={'965'}
      removeAuthType={removeAuthType}
      animationType={AnimationType.SLIDEDOWN}
      animationDuration={500}
      closeOnOutsideClick={false}
      defaultEmailOrMobile={null}
      hideInitialLoader={props.hideInitialLoader}
      theme={{
        direction: vm.appDirection,
      }}
    />
  );
}

export default Connect;

```

## Example TapAuthButton

import { TapAuthButton, DialogMode, AnimationType } from '@tap-payments/react_auth';

```
<TapAuthButton
  dialogMode={DialogMode.POPUP}
  pageMode={PageMode.CONNECT}
  buttonText={'Connect'}
  countryCode={'965'}
  animationType={AnimationType.SLIDEUP}
  animationDuration={500}
  closeOnOutsideClick={true}
  hideInitialLoader={props.hideInitialLoader}
  onSuccess={props.handleSuccess}
  theme={{
    direction: 'ltr',
  }}
/>

```

## JS Demo Page

```
<html>
  <head>
    <title>Tap Connect Demo JS Element</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="TapConnect"></div>
    <link rel="stylesheet" href="https://tap-connecet.b-cdn.net/build/css/Connect.css" />
    <script type="text/javascript" src="https://tap-connecet.b-cdn.net/build/js/Connect.js.map"></script>
    <script type="text/javascript" src="https://tap-connecet.b-cdn.net/build/js/Connect.js"></script>
    <script>
      console.log(Connect);
      Connect.renderConnectElement({
        publicKey: 'public key',
        scopes: ['API_ACCESS_KEY'],
        liveMode: false,
        containerID: 'TapConnect',
        dialogMode: Connect.DialogMode.POPUP,
        animationType: Connect.AnimationType.SLIDEDOWN,
        animationDuration: 500,
        closeOnOutsideClick: false,
        theme: {
          direction: 'ltr',
        },
        onAuthSucceed: (data) => {
          alert(JSON.stringify(data));
        },
      });
    </script>
  </body>
</html>

```

## Connect Demo Page

```
import React, { Fragment, useState, Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { TapAuthButton, DialogMode, AnimationType, PageMode } from '../../src/index';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ConnectDemoVM from './ConnectDemoVM';
import { useVm } from './hooks';
import { observer } from 'mobx-react-lite';
import { theme } from './theme';

const useStyles = makeStyles((theme1) => ({
  root: {
    margin: '40px auto',
    minWidth: 275,
    maxWidth: 900,
    padding: '20px',
    display: 'flow-root',
    fontFamily: '"Nunito", sans-serif, "Tajawal"',
    backgroundColor: '#fafafa',
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: '2em',
    fontWeight: '400',
    paddingBottom: '30px',
  },
  headerAction: {
    paddingTop: '20px',
  },
  button: {
    paddingTop: '10px',
  },
  head: {
    fontSize: '1.25em',
    width: '50%',
    color: '#000',
    fontWeight: '300',
    paddingTop: '10px',
  },
  cardContent: {
    paddingTop: '30px',
    paddingBottom: '30px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  formControl: {
    width: '50%',
  },
  formRoot: {
    width: 'auto',
    marginInlineEnd: '16px',
    marginInlineStart: '0px',
  },
  formLabel: {
    fontSize: '1rem',
    fontWeight: '400',
    letterSpacing: '0.00938em',
  },

  radio: {},
}));

function ConnectDemo(props) {
  const vm = useVm(ConnectDemoVM, props);

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.root}>
        <div className={classes.title}>Connect - JS Library Demo</div>
        <Divider />
        <CardContent className={classes.cardContent}>
          <div className={classes.formGroup}>
            <span className={classes.head}>Page Mode</span>

            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                className={classes.formGroup}
                aria-label="pagemode"
                name="pagemode1"
                value={vm.pageMode}
                onChange={vm.onChangePageMode}
              >
                <FormControlLabel
                  classes={{ root: classes.formRoot, label: classes.formLabel }}
                  value={PageMode.CONNECT}
                  control={<Radio color={'primary'} />}
                  label="Connect"
                  style={vm.pageMode == PageMode.CONNECT ? { color: '#00aff0' } : {}}
                />
                <FormControlLabel
                  classes={{ root: classes.formRoot, label: classes.formLabel }}
                  value={PageMode.LOGIN}
                  control={<Radio color={'primary'} />}
                  label="Sign in"
                  style={vm.pageMode == PageMode.LOGIN ? { color: '#00aff0' } : {}}
                />
                <FormControlLabel
                  classes={{ root: classes.formRoot, label: classes.formLabel }}
                  value={PageMode.SIGNUP}
                  control={<Radio color={'primary'} />}
                  label="Sign up"
                  style={vm.pageMode == PageMode.SIGNUP ? { color: '#00aff0' } : {}}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={classes.formGroup} style={{ paddingTop: '20px' }}>
            <span className={classes.head}>Live/Sandbox</span>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                className={classes.formGroup}
                aria-label="live"
                name="live1"
                value={vm.isLiveMode}
                onChange={vm.onChangeLiveMode}
              >
                <FormControlLabel
                  classes={{ root: classes.formRoot, label: classes.formLabel }}
                  value={'live'}
                  control={<Radio color={'primary'} />}
                  label="Live"
                  style={vm.isLiveMode == 'live' ? { color: '#00aff0' } : {}}
                />
                <FormControlLabel
                  classes={{ root: classes.formRoot, label: classes.formLabel }}
                  value={'sandbox'}
                  control={<Radio color={'primary'} />}
                  label="Sandbox"
                  style={vm.isLiveMode == 'sandbox' ? { color: '#00aff0' } : {}}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={classes.formGroup} style={{ paddingTop: '20px' }}>
            <span className={classes.head}>Language</span>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                className={classes.formGroup}
                aria-label="language"
                name="language1"
                value={vm.direction}
                onChange={vm.onChangeLanguage}
              >
                <FormControlLabel
                  value={'rtl'}
                  classes={{ root: classes.formRoot, label: classes.formLabel }}
                  control={<Radio color={'primary'} className={classes.radio} />}
                  label="Ar"
                  style={vm.direction == 'rtl' ? { color: '#00aff0' } : {}}
                />
                <FormControlLabel
                  value={'ltr'}
                  classes={{ root: classes.formRoot, label: classes.formLabel }}
                  control={<Radio color={'primary'} className={classes.radio} />}
                  label="En"
                  style={vm.direction == 'ltr' ? { color: '#00aff0' } : {}}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={classes.formGroup} style={{ paddingTop: '20px' }}>
            <span className={classes.head}>AnimationType</span>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                className={classes.formGroup}
                style={{ flexDirection: 'column' }}
                aria-label="animationtype"
                name="animationtype1"
                value={vm.animationType}
                onChange={vm.onChangeAnimationType}
              >
                <FormControlLabel
                  classes={{ root: classes.formRoot, label: classes.formLabel }}
                  value={AnimationType.FADE}
                  control={<Radio color={'primary'} />}
                  style={vm.animationType == AnimationType.FADE ? { color: '#00aff0' } : {}}
                  label="Fade"
                />
                <FormControlLabel
                  classes={{ root: classes.formRoot, label: classes.formLabel }}
                  value={AnimationType.SLIDEUP}
                  control={<Radio color={'primary'} />}
                  style={vm.animationType == AnimationType.SLIDEUP ? { color: '#00aff0' } : {}}
                  label="Slide up"
                />
                <FormControlLabel
                  classes={{ root: classes.formRoot, label: classes.formLabel }}
                  value={AnimationType.SLIDEDOWN}
                  control={<Radio color={'primary'} />}
                  style={vm.animationType == AnimationType.SLIDEDOWN ? { color: '#00aff0' } : {}}
                  label="Slide down"
                />
                <FormControlLabel
                  classes={{ root: classes.formRoot, label: classes.formLabel }}
                  value={AnimationType.SLIDELEFT}
                  control={<Radio color={'primary'} />}
                  style={vm.animationType == AnimationType.SLIDELEFT ? { color: '#00aff0' } : {}}
                  label="Slide Left"
                />
                <FormControlLabel
                  classes={{ root: classes.formRoot, label: classes.formLabel }}
                  value={AnimationType.SLIDERIGHT}
                  control={<Radio color={'primary'} />}
                  style={vm.animationType == AnimationType.SLIDERIGHT ? { color: '#00aff0' } : {}}
                  label="Slide right"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div style={{ width: '230px', margin: '0px auto', marginTop: '60px' }}>
            <TapAuthButton
              pageMode={vm.pageMode}
              buttonText={vm.buttonText}
              dialogMode={DialogMode.POPUP}
              animationType={vm.animationType}
              animationDuration={500}
              closeOnOutsideClick={true}
              liveMode={vm.isLiveMode == 'sandbox' ? false : true}
              hideInitialLoader={props.hideInitialLoader}
              onSuccess={props.handleSuccess}
              language={vm.language}
              direction={vm.direction}
              theme={{
                direction: vm.direction,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default observer(ConnectDemo);

```

## TapAuthButton Properties

| property name                       | Type          | Status | Default value               | Description                                                                            |
| ----------------------------------- | ------------- | ------ | --------------------------- | -------------------------------------------------------------------------------------- |
| buttonText                          | string        |        | login                       | button text.                                                                           |
| pageMode                            | PageMode      |        | PageMode.LOGIN              | button text.                                                                           |
| language                            | string        |        | en                          | language ar or en.                                                                     |
| variant                             | string        |        | contained                   | button variant.                                                                        |
| showLogo                            | bool          |        | true                        | to show the button logo.                                                               |
| liveMode                            | bool          |        | false                       | it will decide live/sandbox mode.                                                      |
| signinDirectory                     | string        |        | login                       | to set directory for login incase of show connect through url.                         |
| signupDirectory                     | string        |        | signup                      | to set directory for signup incase of show connect through url.                        |
| forgotDirectory                     | string        |        | forgot                      | to set directory for forgot incase of show connect through url.                        |
| footer                              | string        |        | signup_powered_by           | footer text by default its key it will take the text through key from firebase.        |
| companyName                         | string        |        | signup_tap_payments         | company name.                                                                          |
| showHeaderLogo                      | string        |        | true                        | to show/hide header logo.                                                              |
| direction                           | string        |        | ltr                         | direction of the dialog.                                                               |
| pageMode                            | PageMode      |        | PageMode.LOGIN              | dialog page mode.                                                                      |
| hideInitialLoader                   | bool          |        | false                       | to open dailog drirectly instead of show loader.                                       |
| dialogMode                          | DialogMode    |        | DialogMode.FULLPAGE         | how to show the dialog popup or fullpage.                                              |
| animationType                       | AnimationType |        | AnimationType.SLIDEUP       | to change the animation behaviour .                                                    |
| animationDuration                   | int           |        | 500                         | animation duaration.                                                                   |
| closeOnOutsideClick                 | bool          |        | false                       | this is enabled only for dialogmode is popup to restrict close popup on outside click. |
| theme                               | object        |        | `theme: {direction: 'ltr'}` | theme of the package.                                                                  |
| openPopup                           | bool          |        | true                        | show or hide the popup .                                                               |
| onSuccess                           | Function      |        |                             | on successfull case will trigger that function.                                        |
| onFailure                           | Function      |        |                             | on any failure case will trigger that function.                                        |
| onCancel                            | Function      |        |                             | if we cancel the process will trigger this function.                                   |
| onUpdate                            | Function      |        |                             | every on update will trigger this function.                                            |
| moveToLogin                         | Function      |        |                             | to move to login will trigger it.                                                      |
| moveToSignup                        | Function      |        |                             | to move to signup will trigger it.                                                     |
| initialAuthType                     | any           |        |                             | to know the initial auth type.                                                         |
| removeAuthType                      | Function      |        |                             | to remove authtype.                                                                    |
| countryCode                         | string        |        | '965'                       | initial country code.                                                                  |
| defaultEmailOrMobile                | string        |        |                             | to know the initial username.                                                          |
| to show or hide the signup section. |

## ConnectPackage Properties

| property name                       | Type          | Status | Default value               | Description                                                                            |
| ----------------------------------- | ------------- | ------ | --------------------------- | -------------------------------------------------------------------------------------- |
| liveMode                            | bool          |        | false                       | it will decide live/sandbox mode.                                                      |
| signinDirectory                     | string        |        | login                       | to set directory for login incase of show connect through url.                         |
| signupDirectory                     | string        |        | signup                      | to set directory for signup incase of show connect through url.                        |
| forgotDirectory                     | string        |        | forgot                      | to set directory for forgot incase of show connect through url.                        |
| footer                              | string        |        | signup_powered_by           | footer text by default its key it will take the text through key from firebase.        |
| companyName                         | string        |        | signup_tap_payments         | company name.                                                                          |
| showHeaderLogo                      | string        |        | true                        | to show/hide header logo.                                                              |
| direction                           | string        |        | ltr                         | direction of the dialog.                                                               |
| pageMode                            | PageMode      |        | PageMode.LOGIN              | dialog page mode.                                                                      |
| hideInitialLoader                   | bool          |        | false                       | to open dailog drirectly instead of show loader.                                       |
| dialogMode                          | DialogMode    |        | DialogMode.FULLPAGE         | how to show the dialog popup or fullpage.                                              |
| animationType                       | AnimationType |        | AnimationType.SLIDEUP       | to change the animation behaviour .                                                    |
| animationDuration                   | int           |        | 500                         | animation duaration.                                                                   |
| closeOnOutsideClick                 | bool          |        | false                       | this is enabled only for dialogmode is popup to restrict close popup on outside click. |
| theme                               | object        |        | `theme: {direction: 'ltr'}` | theme of the package.                                                                  |
| openPopup                           | bool          |        | true                        | show or hide the popup .                                                               |
| onSuccess                           | Function      |        |                             | on successfull case will trigger that function.                                        |
| onFailure                           | Function      |        |                             | on any failure case will trigger that function.                                        |
| onCancel                            | Function      |        |                             | if we cancel the process will trigger this function.                                   |
| onUpdate                            | Function      |        |                             | every on update will trigger this function.                                            |
| moveToLogin                         | Function      |        |                             | to move to login will trigger it.                                                      |
| moveToSignup                        | Function      |        |                             | to move to signup will trigger it.                                                     |
| initialAuthType                     | any           |        |                             | to know the initial auth type.                                                         |
| removeAuthType                      | Function      |        |                             | to remove authtype.                                                                    |
| countryCode                         | string        |        | '965'                       | initial country code.                                                                  |
| defaultEmailOrMobile                | string        |        |                             | to know the initial username.                                                          |
| to show or hide the signup section. |

## Theme

### Pallete

```
export const palette = {
  background: {
    main: 'rgba(60,95,204,0.04)',
    secondary: '#16a0f4',
  },
  primary: {
    main: '#2cbcff',
    secondary: '#ebebed',
  },
  error: {
    main: '#ff6f71',
  },
  text: {
    primary: '#464e56',
    button: '#757575',
    secondary: '#ff6f71',
  },
  common: {
    white: '#fff',
    voilet: '#6a6acc',
    voiletHover: '#5757c5',
  },
};

```

### Typography

```
export default {
  fontFamily: '"Nunito", sans-serif, "Tajawal"',
  h2: {
    fontSize: '21px',
    letterSpacing: '-0.24px',
    fontWeight: '300',
  },
  h3: {
    fontSize: '20px',
    letterSpacing: '-0.24px',
    fontWeight: '300',
  },
  h3_bold: {
    fontSize: '18px',
    letterSpacing: '-0.24px',
    fontWeight: '500',
    letterSpacing: '-0.24px',
  },
  h4: {
    fontWeight: 300,
    fontSize: '16px',
    lineHeight: '1.5em',
    letterSpacing: '-0.24px',
  },
  h5: {
    fontWeight: 300,
    fontSize: '13px',
    letterSpacing: '-0.24px',
  },
  body1: {
    fontSize: '14px',
    fontWeight: 300,
    lineHeight: 1.2,
    letterSpacing: '-0.24px',
  },
  body1_bold: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: '-0.24px',
  },
};

```

### Default Theme

```
export const theme = createMuiTheme({
  typography: typography,
  palette: palette,
  overrides: {
    root: {
      fontFamily: 'Nunito, sans-serif, Tajawal',
    },
    MuiTypography: {
      root: {
        fontWeight: 300,
        fontSize: '14px',
        lineHeight: '1.5em',
      },
    },
    MuiOutlinedInput: {
      root: {
        borderColor: 'rgba(255, 255, 255, 0.23)',
      },
    },
    MuiFormControl: {
      root: {
        width: '100%',
      },
    },
    MuiInputBase: {
      root: {
        width: '100%',
        fontFamily: 'Nunito, sans-serif, Tajawal',
      },
      input: {
        color: '#757575',
        fontSize: '20px',
        fontWeight: '300',
        lineHeight: '1.2',
        letterSpacing: '-0.24px',
        '&::placeholder': {
          opacity: 1,
          color: '#ABA0A3',
          fontWeight: '300',
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        borderColor: 'rgba(255, 255, 255, 0.23)',
      },
    },
    MuiInput: {
      root: {
        width: '100%',
        borderBottom: '1px solid #ebebed',
        fontFamily: 'Nunito, sans-serif, Tajawal',
      },
      underline: {
        '&::before': {
          borderBottom: '0px solid #ebebed',
        },
        '&::after': {
          borderBottom: '0px solid #ebebed',
        },
        '&:hover': {
          '&::before': {
            borderBottom: '0px solid #ebebed !important',
          },
        },
      },
    },
    MuiInputLabel: {
      outlined: {
        fontWeight: '500',
        fontSize: '14px',
        color: '#3c4257',
      },
    },
    MuiCard: {
      root: {
        borderRadius: '12px',
        backgroundColor: 'white',
        display: 'flex',
        overflow: 'hidden',
        boxShadow: '0px 1px 6px #00000030',
        fontFamily: 'Nunito, sans-serif, Tajawal',
        maxWidth: '100%',
      },
    },
    MuiMenu: {
      root: {},
      paper: {
        maxHeight: 'calc(100% - 30px)',
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: 'white',
        fontFamily: 'Nunito, sans-serif, Tajawal',
      },
      rounded: {
        borderRadius: '12px',
      },
    },
    MuiIconButton: {
      root: {
        padding: '0px',
        color: '#757575',
      },
    },
    MuiSvgIcon: {
      fontSizeSmall: {
        fontSize: '15px',
      },
    },
    MuiInputAdornment: {
      positionEnd: {
        marginInlineStart: '3px',
      },
    },
    MuiButton: {
      root: {
        width: '100%',
        fontWeight: '300',
        height: '40px',
        textTransform: 'none',
        fontSize: '16px',
      },
      contained: {
        backgroundColor: '#2cbcff',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#16a0f4',
          ['@media']: {
            backgroundColor: '#16a0f4',
          },
        },
      },
      outlined: {
        backgroundColor: 'white',
        color: '#464e56',
        borderWidth: '2px',
        borderRadius: '20px',
        fontSize: '20px',
        fontWeight: '300',
        lineHeight: '1.2',
        letterSpacing: '-0.24px',
        borderColor: '#2cbcff',
        ':hover': {
          borderColor: '#16a0f4',
        },
      },
    },
    MuiLink: {
      underlineHover: {
        textAlign: 'center',
        width: '100%',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    MuiAlert: {
      root: {
        display: 'block',
        padding: '10px',
        fontSize: '13px',
        textAlign: 'center',
        backgroundClip: 'padding-box',
        borderRadius: '3px',
        marginTop: '15px',
        paddingTop: '10px',
        paddingBottom: '10px',
      },
      filledError: {
        color: '#fff',
        backgroundColor: '#ff6f71',
        fontWeight: '300',
      },
      message: {
        padding: '0',
      },
    },
    MuiCheckbox: {
      root: {
        height: '14px',
        width: '14px',
        color: '#d7dadb',
        paddingInlineStart: '0px',
      },
    },
    MuiFormControlLabel: {
      root: {
        textAlign: 'start',
        color: '#464e56',
        fontWeight: '300',
        marginInlineStart: '0px',
        width: '100%',
        marginInlineEnd: '0px',
        position: 'relative',
      },
    },
    MuiDivder: {
      background: '#ebebed',
    },
    MuiDialog: {
      root: {
        backdropFilter: 'blur(4px)',
      },
      paper: {
        ['@media (max-width: 768px)']: {},
        overflowY: 'none',
      },
      paperWidthSm: {
        width: 'min-content',
        minWidth: '361px',
        ['@media (max-width: 768px)']: {
          minWidth: '361px',
        },
        ['@media (max-width: 400px)']: {
          minWidth: '300px',
        },
      },
    },
    MuiPopover: {
      root: {},
      paper: {
        '& *': {
          touchAction: 'auto !important', // used to override material adding touch-action to none on the popover
        },
        maxWidth: 'fit-content',
        position: 'relative',
        borderRadius: '12px',
        ['@media (max-width: 768px)']: {
          maxWidth: 'calc(100% - 5%)',
          maxHeight: 'calc(100% - 3.5%)',
          left: '2.5% !important',
          right: '2.5% !important',
          top: '1.7% !important',
          minWidth: '280px',
        },
      },
    },
  },
});

```

## Author

- [Kalpana D.](https://www.npmjs.com/~kalpanatap)
