## Table of Contents

- [Brief Description](#brief-description)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Example Login](#example-login)
- [Example Signup](#example-signup)
- [Example Connect](#example-connect)
- [Landing Component](#landing-component)
- [ConnectPackage Component](#connectPackage-component)
- [Landing Properties](#landing-properties)
- [ConnectPackage Properties](#connectPackage-properties)
- [Theme](#theme)
- [Pallete](#pallete)
- [Typography](#typography)
- [Default Theme](#default-theme)

## Brief Description

Connect is a React component it contains login and sign up component with the functionalities and the flows.User can use the login or sign up directly and also they can use connect.Connect will manage the switch between login and signup itself.

It has two theme dark/light,user can also change the theme by passing theme from outside.

- [Source Code](https://github.com/Tap-Payments/goWebDashboard-React.git).

<a name="demo"></a>
## Demo
 Your site is published at https://tap-payments.github.io/TapConnect-JS/

## Installation

```
npm i @tap-payments/react_auth
```

## Usage

After installing the package by cmd/terminal, add the following line to your project to import the required files. The package includes ConnectPackage, LoginPackage, SignupPackage, DialogMode,AnimationType, Languages. (you can import one or all components based on your target).

DialogMode used to change the dialog mode (POPUP, FULLPAGE).
AnimationType used to change the dialog animation (FADE, SLIDEUP, SLIDEDOWN, SLIDELEFT, SLIDERIGHT).
Languages used to the change the direction of the dialog (EN, AR).

If you want to use connect need to import below one.

```
import { ConnectPackage, DialogMode, AnimationType, Languages } from '@tap-payments/react_auth';
```

If you want to use login need to import below one.

```
import { LoginPackage, DialogMode, AnimationType, Languages } from '@tap-payments/react_auth';
```

If you want to use signup need to import below one.

```
import { SignupPackage, DialogMode, AnimationType, Languages } from '@tap-payments/react_auth';
```

## Example Login

```
iimport React, { Fragment } from 'react';
import { useVm, useAppCtx } from '../../hooks';
import LoginVM from './LoginVM';
import { observer } from 'mobx-react-lite';
import {  LandingPage as LoginPackage,
  DialogMode,
  AnimationType,
  Languages } from '@tap-payments/react_auth';

function Login(props) {
  if (props.isAuthorized) return <Fragment />;
  const vm = useVm(LoginVM, [useAppCtx(), props]);
  return (
    <LoginPackage
      onSuccess={vm.onSuccess}
      initialAuthType={vm.initialAuthType}
      dialogMode={DialogMode.POPUP}
      countryCode={'965'}
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
import { LandingPage as SignupPackage,
  DialogMode,
  AnimationType,
  PageMode,
  Languages, } from '@tap-payments/react_auth';

function Signup(props) {
  const vm = useVm(SignupVM, [useAppCtx(), props]);
  return (
    <SignupPackage
      initialLeadID={vm.initialLeadID}
      pageMode={PageMode.SIGNUP}
      dialogMode={DialogMode.POPUP}
      countryCode={'965'}
      animationType={AnimationType.SLIDEDOWN}
      animationDuration={500}
      closeOnOutsideClick={false}
      defaultEmailOrMobile={vm.initialUsername}
      hideInitialLoader={props.hideInitialLoader}
      moveToLogin={vm.moveToLogin}
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
import { ConnectPackage, DialogMode, AnimationType, Languages } from '@tap-payments/react_auth';

function Connect(props) {
  if (props.isAuthorized) return <Fragment />;
  const vm = useVm(ConnectVM, [useAppCtx(), props]);
  return (
    <ConnectPackage
      onSuccess={vm.onSuccess}
      initialAuthType={vm.initialAuthType}
      dialogMode={DialogMode.POPUP}
      countryCode={'965'}
      removeAuthType={removeAuthType}
      // language={Languages.AR}
      animationType={AnimationType.SLIDEDOWN}
      animationDuration={500}
      closeOnOutsideClick={false}
      // defaultEmailOrMobile={vm.initialUsername}
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

## Landing Component

This is the common staring point for login and signup. This will do the confiqure theme object. Than detect page based on PageMode.

```
function LandingPage(props) {
  const combineTheme = createMuiTheme({
    direction: props.direction ? props.direction : props.theme.direction,
    palette: { ...theme.palette, ...props.theme.palette },
    typography: { ...theme.typography, ...props.theme.typography },
    overrides: { ...theme.overrides, ...props.theme.overrides },
  });

  return (
    <div>
      <ThemeProvider theme={combineTheme}>
        {props.pageMode === PageMode.LOGIN ? <Login {...props} /> : <Signup {...props} />}
      </ThemeProvider>
    </div>
  );
}

LandingPage.defaultProps = _defaultProps;

export default LandingPage;

```

## ConnectPackage Component

```
function ConnectPackage(props) {
  const vm = useVm(ConnectVM, props);

  const combineTheme = createMuiTheme({
    direction: vm.direction,
    palette: { ...theme.palette, ...props.theme.palette },
    typography: { ...theme.typography, ...props.theme.typography },
    overrides: { ...theme.overrides, ...props.theme.overrides },
  });

  return (
    <div>
      <ThemeProvider theme={combineTheme}>
        {!vm.signUp ? (
          <Login
            {...props}
            onSuccess={vm.onSuccess}
            moveToSignup={vm.moveToSignup}
            initialAuthType={vm.initialAuthType}
            hideInitialLoader={vm.hideInitialLoader}
          />
        ) : (
          <Signup
            {...props}
            initialLeadID={vm.leadId}
            moveToLogin={vm.moveToLogin}
            hideInitialLoader={vm.hideInitialLoader}
          />
        )}
      </ThemeProvider>
    </div>
  );
}

ConnectPackage.defaultProps = _defaultProps;

export default observer(ConnectPackage);


```

## Landing Properties

| property name        | Type          | Status | Default value               | Description                                                                            |
| -------------------- | ------------- | ------ | --------------------------- | -------------------------------------------------------------------------------------- |
| direction            | string        |        | ltr                         | direction of the dialog.                                                               |
| pageMode             | PageMode      |        | PageMode.LOGIN              | dialog page mode.                                                                      |
| hideInitialLoader    | bool          |        | false                       | to open dailog drirectly instead of show loader.                                       |
| dialogMode           | DialogMode    |        | DialogMode.FULLPAGE         | how to show the dialog popup or fullpage.                                              |
| animationType        | AnimationType |        | AnimationType.SLIDEUP       | to change the animation behaviour .                                                    |
| animationDuration    | int           |        | 500                         | animation duaration.                                                                   |
| closeOnOutsideClick  | bool          |        | false                       | this is enabled only for dialogmode is popup to restrict close popup on outside click. |
| theme                | object        |        | `theme: {direction: 'ltr'}` | theme of the package.                                                                  |
| openPopup            | bool          | true   |                             | show or hide the popup .                                                               |
| onSuccess            | Function      |        |                             | on successfull login will call that function (only for login).                         |
| initialAuthType      | any           |        |                             | to know the initial auth type for login.                                               |
| countryCode          | string        |        | '965'                       | initial country code.                                                                  |
| defaultEmailOrMobile | string        |        |                             | to know the initial username.                                                          |
| moveToSignup         | Function      |        |                             | to move to signup from login.                                                          |
| initialLeadID        | string        |        |                             | to know the initial lead id.                                                           |
| moveToLogin          | Function      |        |                             | to move to login from signup.                                                          |
| showSignupSection    | bool          |        | true                        |                                                                                        | to show or hide the signup section. |

## ConnectPackage Properties

| property name        | Type          | Status | Default value               | Description                                                                            |
| -------------------- | ------------- | ------ | --------------------------- | -------------------------------------------------------------------------------------- |
| direction            | string        |        | ltr                         | direction of the dialog.                                                               |
| pageMode             | PageMode      |        | PageMode.LOGIN              | dialog page mode.                                                                      |
| hideInitialLoader    | bool          |        | false                       | to open dailog drirectly instead of show loader.                                       |
| dialogMode           | DialogMode    |        | DialogMode.FULLPAGE         | how to show the dialog popup or fullpage.                                              |
| animationType        | AnimationType |        | AnimationType.SLIDEUP       | to change the animation behaviour .                                                    |
| animationDuration    | int           |        | 500                         | animation duaration.                                                                   |
| closeOnOutsideClick  | bool          |        | false                       | this is enabled only for dialogmode is popup to restrict close popup on outside click. |
| theme                | object        |        | `theme: {direction: 'ltr'}` | theme of the package.                                                                  |
| openPopup            | bool          | true   |                             | show or hide the popup .                                                               |
| onSuccess            | Function      |        |                             | on successfull login will call that function.                                          |
| initialAuthType      | any           |        |                             | to know the initial auth type.                                                         |
| removeAuthType       | Function      |        |                             | to remove authtype.                                                                    |
| countryCode          | string        |        | '965'                       | initial country code.                                                                  |
| defaultEmailOrMobile | string        |        |                             | to know the initial username.                                                          |
| showSignupSection    | bool          |        | true                        |                                                                                        | to show or hide the signup section. |

## Theme

### Pallete

```
export const palette = {
  background: {
    main: 'rgba(60,95,204,0.04)',
  },
  primary: {
    main: '#2cbcff',
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
          touchAction: 'auto !important',
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
