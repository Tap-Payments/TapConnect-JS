import React, { Fragment, useRef } from 'react';

import { toJS } from 'mobx';

import { useVm } from '../../hooks';
import { observer } from 'mobx-react-lite';

import LandingVM from './LandingVM';
import LandingTemplate from '../Template/LandingTemplate';

import AnimationEngine from '../Animation/AnimationEngine';
import { DialogMode } from '../Constants/constants';

function Landing(props) {
  const vm = useVm(LandingVM, props);

  // if (!props.hideInitialLoader) if (vm.showInitialLoader) return null;

  return (
    <LandingTemplate
      {...props}
      id={'landing-tap-card-010920'}
      moveToSignup={vm.moveToSignup}
      moveToConnect={vm.moveToConnect}
      moveToLogin={vm.moveToLogin}
      direction={vm.direction}
    />
  );
}

Landing.defaultProps = {
  footer: 'signup_powered_by',
  companyName: 'signup_tap_payments',
};
export default observer(Landing);
