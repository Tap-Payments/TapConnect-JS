## Table of Contents

- [Purpose](#purpose)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Usage as js library](#usage-as-js-library)
- [Usage as npm package](#usage-as-npm-package)
- [Example Login](#example-login)
- [Example Signup](#example-signup)
- [Example Connect](#example-connect)
- [Example TapAuthButton](#example-tapauthbutton)
- [Technical Overview](#technical-overview)
- [TapAuthButton Properties](#tapauthbutton-properties)
- [ConnectPackage Properties](#connectPackage-properties)
- [Connect Demo Page](#connect-demo-page)
- [Theme](#theme)
- [Author](#author)

## Purpose

- [Connect](https://github.com/Tap-Payments/TapConnect-JS) is Tap's Auth Package which gives user the ability to Sign up, Sign in and Forgot Password.
- It is exported as [npm package](https://www.npmjs.com/package/@tap-payments/js-connect) and also as js library.
- It is shipped with two built-in themes dark/light which can be overridden by user.
- It can be used for single purpose (_Sign up, Sign in, Forgot Password_) or with full functionality (_Connect_).
  <a name="demo"></a>

## [Demo](https://tap-payments.github.io/TapConnect-JS)

Demonstrating different modes with multiple animation types and languages.

## Installation

### NPM

```shell
npm i @tap-payments/js-connect
```

### JS

```html
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

### Usage as js library

```html
<html>
  <head>
    <title>Tap Connect Demo JS Element</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  </head>
  <body>
    <div id="TapConnect"></div>
    <link rel="stylesheet" href="https://tap-connecet.b-cdn.net/build/css/Connect.css" />
    <script type="text/javascript" src="https://tap-connecet.b-cdn.net/build/js/Connect.js"></script>
    <script>
      Connect.renderConnectElement({
        publicKey: 'pk_test_OxCj0DhX9EyTLpGqsu2wHMon',
        scopes: ['API_ACCESS_KEY'],
        liveMode: false,
        buttonText: 'Login',
        pageMode: Connect.PageMode.LOGIN,
        language: 'en',
        containerID: 'TapConnect',
        dialogMode: Connect.DialogMode.POPUP,
        animationType: Connect.AnimationType.SLIDEDOWN,
        animationDuration: 500,
        closeOnOutsideClick: false,
        theme: {
          direction: 'ltr',
        },
        onSuccess: (data) => {
          alert(JSON.stringify(data));
        },
      });
    </script>
  </body>
</html>
```

### Usage as npm package

If you want to use connect or login or signup need to import below one.

```js
import { ConnectPackage, DialogMode, AnimationType } from '@tap-payments/js-connect';
```

## Example Login

```js
import React, { Fragment } from 'react';
import { useVm, useAppCtx } from '../../hooks';
import LoginVM from './LoginVM';
import { observer } from 'mobx-react-lite';
import { ConnectPackage, DialogMode, AnimationType } from '@tap-payments/js-connect';


function Login(props) {
  if (props.isAuthorized) return <Fragment />;
  const vm = useVm(LoginVM, [useAppCtx(), props]);
  return (
    <ConnectPackage
      publicKey: 'pk_test_OxCj0DhX9EyTLpGqsu2wHMon',
      scopes: ['API_ACCESS_KEY'],
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

```js
import React, { Fragment } from 'react';
import { useVm, useAppCtx } from '../../hooks';
import SignupVM from './SignupVM';
import { observer } from 'mobx-react-lite';
import { ConnectPackage,
  DialogMode,
  AnimationType,
  PageMode } from '@tap-payments/js-connect';

function Signup(props) {
  const vm = useVm(SignupVM, [useAppCtx(), props]);
  return (
     <ConnectPackage
      publicKey: 'pk_test_OxCj0DhX9EyTLpGqsu2wHMon',
      scopes: ['API_ACCESS_KEY'],
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

```js
import React, { Fragment } from 'react';
import { useVm, useAppCtx } from '../../hooks';
import ConnectVM from './ConnectVM';
import { observer } from 'mobx-react-lite';
import { removeAuthType } from '../../utils/LocalStorage/authType';
import { ConnectPackage, DialogMode, AnimationType } from '@tap-payments/js-connect';

function Connect(props) {
  if (props.isAuthorized) return <Fragment />;
  const vm = useVm(ConnectVM, [useAppCtx(), props]);
  return (
    <ConnectPackage
      publicKey: 'pk_test_OxCj0DhX9EyTLpGqsu2wHMon',
      scopes: ['API_ACCESS_KEY'],
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

If you want to use TapAuthButton need to import below one.

```
import { TapAuthButton, DialogMode, AnimationType, PageMode } from '../../src/index';
```

## Example TapAuthButton

TapAuthButton will automatically control open and close functionality inside.

We have another option user can control open/close popup outside also,

import { ConnectPackage } from '@tap-payments/js-connect';

To open popup => ConnectPackage.open(params);

To close popup => ConnectPackage.close();

import { TapAuthButton, DialogMode, AnimationType } from '@tap-payments/js-connect';

```js
<TapAuthButton
  publicKey: 'pk_test_OxCj0DhX9EyTLpGqsu2wHMon',
  scopes: ['API_ACCESS_KEY'],
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

## Technical Overview

## TapAuthButton Properties

| property name                       | Type             | Status | Default value               | Description                                                                            |
| ----------------------------------- | ---------------- | ------ | --------------------------- | -------------------------------------------------------------------------------------- |
| publicKey                           | string           |        |                             | public key.                                                                            |
| scopes                              | Array of strings |        |                             | api access key.                                                                        |
| buttonText                          | string           |        | login                       | button text.                                                                           |
| pageMode                            | PageMode         |        | PageMode.LOGIN              | button text.                                                                           |
| language                            | string           |        | en                          | language ar or en.                                                                     |
| variant                             | string           |        | contained                   | button variant.                                                                        |
| showLogo                            | bool             |        | true                        | to show the button logo.                                                               |
| liveMode                            | bool             |        | false                       | it will decide live/sandbox mode.                                                      |
| signinDirectory                     | string           |        | login                       | to set directory for login incase of show connect through url.                         |
| signupDirectory                     | string           |        | signup                      | to set directory for signup incase of show connect through url.                        |
| forgotDirectory                     | string           |        | forgot                      | to set directory for forgot incase of show connect through url.                        |
| footer                              | string           |        | signup_powered_by           | footer text by default its key it will take the text through key from firebase.        |
| companyName                         | string           |        | signup_tap_payments         | company name.                                                                          |
| showHeaderLogo                      | string           |        | true                        | to show/hide header logo.                                                              |
| direction                           | string           |        | ltr                         | direction of the dialog.                                                               |
| pageMode                            | PageMode         |        | PageMode.LOGIN              | dialog page mode.                                                                      |
| hideInitialLoader                   | bool             |        | false                       | to open dailog drirectly instead of show loader.                                       |
| dialogMode                          | DialogMode       |        | DialogMode.FULLPAGE         | how to show the dialog popup or fullpage.                                              |
| animationType                       | AnimationType    |        | AnimationType.SLIDEUP       | to change the animation behaviour .                                                    |
| animationDuration                   | int              |        | 500                         | animation duaration.                                                                   |
| closeOnOutsideClick                 | bool             |        | false                       | this is enabled only for dialogmode is popup to restrict close popup on outside click. |
| theme                               | object           |        | `theme: {direction: 'ltr'}` | theme of the package.                                                                  |
| openPopup                           | bool             |        | true                        | show or hide the popup .                                                               |
| onSuccess                           | Function         |        |                             | on successfull case will trigger that function.                                        |
| onFailure                           | Function         |        |                             | on any failure case will trigger that function.                                        |
| onCancel                            | Function         |        |                             | if we cancel the process will trigger this function.                                   |
| onUpdate                            | Function         |        |                             | every on update will trigger this function.                                            |
| moveToLogin                         | Function         |        |                             | to move to login will trigger it.                                                      |
| moveToSignup                        | Function         |        |                             | to move to signup will trigger it.                                                     |
| initialAuthType                     | any              |        |                             | to know the initial auth type.                                                         |
| removeAuthType                      | Function         |        |                             | to remove authtype.                                                                    |
| countryCode                         | string           |        | '965'                       | initial country code.                                                                  |
| defaultEmailOrMobile                | string           |        |                             | to know the initial username.                                                          |
| to show or hide the signup section. |

## ConnectPackage Properties

| property name                       | Type             | Status | Default value               | Description                                                                            |
| ----------------------------------- | ---------------- | ------ | --------------------------- | -------------------------------------------------------------------------------------- |
| publicKey                           | string           |        |                             | public key.                                                                            |
| scopes                              | Array of strings |        |                             | api access key.                                                                        |
| liveMode                            | bool             |        | false                       | it will decide live/sandbox mode.                                                      |
| signinDirectory                     | string           |        | login                       | to set directory for login incase of show connect through url.                         |
| signupDirectory                     | string           |        | signup                      | to set directory for signup incase of show connect through url.                        |
| forgotDirectory                     | string           |        | forgot                      | to set directory for forgot incase of show connect through url.                        |
| footer                              | string           |        | signup_powered_by           | footer text by default its key it will take the text through key from firebase.        |
| companyName                         | string           |        | signup_tap_payments         | company name.                                                                          |
| showHeaderLogo                      | string           |        | true                        | to show/hide header logo.                                                              |
| direction                           | string           |        | ltr                         | direction of the dialog.                                                               |
| pageMode                            | PageMode         |        | PageMode.LOGIN              | dialog page mode.                                                                      |
| hideInitialLoader                   | bool             |        | false                       | to open dailog drirectly instead of show loader.                                       |
| dialogMode                          | DialogMode       |        | DialogMode.FULLPAGE         | how to show the dialog popup or fullpage.                                              |
| animationType                       | AnimationType    |        | AnimationType.SLIDEUP       | to change the animation behaviour .                                                    |
| animationDuration                   | int              |        | 500                         | animation duaration.                                                                   |
| closeOnOutsideClick                 | bool             |        | false                       | this is enabled only for dialogmode is popup to restrict close popup on outside click. |
| theme                               | object           |        | `theme: {direction: 'ltr'}` | theme of the package.                                                                  |
| openPopup                           | bool             |        | true                        | show or hide the popup .                                                               |
| onSuccess                           | Function         |        |                             | on successfull case will trigger that function.                                        |
| onFailure                           | Function         |        |                             | on any failure case will trigger that function.                                        |
| onCancel                            | Function         |        |                             | if we cancel the process will trigger this function.                                   |
| onUpdate                            | Function         |        |                             | every on update will trigger this function.                                            |
| moveToLogin                         | Function         |        |                             | to move to login will trigger it.                                                      |
| moveToSignup                        | Function         |        |                             | to move to signup will trigger it.                                                     |
| initialAuthType                     | any              |        |                             | to know the initial auth type.                                                         |
| removeAuthType                      | Function         |        |                             | to remove authtype.                                                                    |
| countryCode                         | string           |        | '965'                       | initial country code.                                                                  |
| defaultEmailOrMobile                | string           |        |                             | to know the initial username.                                                          |
| to show or hide the signup section. |

## Theme

### Create Custom Theme

To override the theme, create customized theme using `createMuiTheme()` then wrap Connect with a `<ThemeProvider/>` that is using the customized theme.

#### Theme Overriding Demo

Sample implementation from the demo project:

- [Creating the Theme](https://github.com/Tap-Payments/TapConnect-JS/blob/development/demo/src/theme.js)
- [Wrapping Connect with ThemeProvider](https://github.com/Tap-Payments/TapConnect-JS/blob/development/demo/src/ConnectDemo.js)

#### Default Theme Properties

The following objects are used in the package and can be overridden:

- [Theme](https://github.com/Tap-Payments/TapConnect-JS/blob/development/src/elements/theme/index.js)
- [Palette](https://github.com/Tap-Payments/TapConnect-JS/blob/development/src/elements/theme/palette.js)
- [Typography](https://github.com/Tap-Payments/TapConnect-JS/blob/development/src/elements/theme/typography.js)

## Author

- [Kalpana D.](https://www.npmjs.com/~kalpanatap)
