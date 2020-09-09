import React, { Fragment, useState, Component } from 'react';
import TapLogo from './assets/logo.svg';
import { TapAuthButton, DialogMode, AnimationType, PageMode } from '../../src/index';

export default function ButtonDemo(props) {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ flexDirection: 'column', paddingInlineEnd: '20px' }}>
        <div style={{ width: '230px', marginBottom: '15px' }}>
          <TapAuthButton
            dialogMode={DialogMode.POPUP}
            // initialLeadID={vm.initialLeadID}
            pageMode={PageMode.CONNECT}
            buttonText={'Connect'}
            countryCode={'965'}
            animationType={AnimationType.SLIDEUP}
            animationDuration={500}
            closeOnOutsideClick={true}
            // defaultEmailOrMobile={vm.initialUsername}
            hideInitialLoader={props.hideInitialLoader}
            onSuccess={props.handleSuccess}
            theme={{
              direction: 'ltr',
            }}
          />
        </div>
        <div style={{ width: '230px', marginBottom: '15px' }}>
          <TapAuthButton
            dialogMode={DialogMode.POPUP}
            // initialLeadID={vm.initialLeadID}
            pageMode={PageMode.LOGIN}
            buttonText={'Login'}
            countryCode={'965'}
            // onCancel={vm.onCancel}
            animationType={AnimationType.SLIDEUP}
            animationDuration={500}
            closeOnOutsideClick={true}
            // defaultEmailOrMobile={vm.initialUsername}
            hideInitialLoader={props.hideInitialLoader}
            // moveToSignup={vm.moveToSignup}
            onSuccess={props.handleSuccess}
            theme={{
              direction: 'ltr',
            }}
          />
        </div>
        <div style={{ width: '230px', marginBottom: '15px' }}>
          <TapAuthButton
            dialogMode={DialogMode.POPUP}
            // initialLeadID={vm.initialLeadID}
            pageMode={PageMode.SIGNUP}
            buttonText={'Signup'}
            countryCode={'965'}
            // onCancel={vm.onCancel}
            animationType={AnimationType.SLIDEUP}
            animationDuration={500}
            closeOnOutsideClick={true}
            // defaultEmailOrMobile={vm.initialUsername}
            hideInitialLoader={props.hideInitialLoader}
            // moveToLogin={vm.moveToLogin}
            onSuccess={props.handleSuccess}
            theme={{
              direction: 'ltr',
            }}
          />
        </div>
        {/* <Button onClick={() => this.handleSuccess({ ee: 'sss' })} /> */}
      </div>
      <div style={{ flexDirection: 'column', paddingInlineEnd: '20px' }}>
        <div style={{ width: '230px', marginBottom: '15px' }}>
          <TapAuthButton
            dialogMode={DialogMode.POPUP}
            // initialLeadID={vm.initialLeadID}
            pageMode={PageMode.CONNECT}
            buttonText={'ربط'}
            countryCode={'965'}
            variant={'outlined'}
            logo={TapLogo}
            animationType={AnimationType.SLIDEUP}
            animationDuration={500}
            closeOnOutsideClick={true}
            // defaultEmailOrMobile={vm.initialUsername}
            hideInitialLoader={props.hideInitialLoader}
            onSuccess={props.handleSuccess}
            showLogo={true}
            theme={{
              direction: 'rtl',
            }}
          />
        </div>
        <div style={{ width: '230px', marginBottom: '15px' }}>
          <TapAuthButton
            dialogMode={DialogMode.POPUP}
            // initialLeadID={vm.initialLeadID}
            pageMode={PageMode.LOGIN}
            buttonText={'تسجيل دخول'}
            countryCode={'965'}
            variant={'outlined'}
            logo={TapLogo}
            // onCancel={vm.onCancel}
            animationType={AnimationType.SLIDEUP}
            animationDuration={500}
            closeOnOutsideClick={true}
            // defaultEmailOrMobile={vm.initialUsername}
            hideInitialLoader={props.hideInitialLoader}
            // moveToSignup={vm.moveToSignup}
            onSuccess={props.handleSuccess}
            showLogo={true}
            theme={{
              direction: 'rtl',
            }}
          />
        </div>
        <div style={{ width: '230px', marginBottom: '15px' }}>
          <TapAuthButton
            dialogMode={DialogMode.POPUP}
            // initialLeadID={vm.initialLeadID}
            pageMode={PageMode.SIGNUP}
            buttonText={'تسجيل جديد'}
            countryCode={'965'}
            variant={'outlined'}
            logo={TapLogo}
            // onCancel={vm.onCancel}
            animationType={AnimationType.SLIDEUP}
            animationDuration={500}
            closeOnOutsideClick={true}
            // defaultEmailOrMobile={vm.initialUsername}
            hideInitialLoader={props.hideInitialLoader}
            // moveToLogin={vm.moveToLogin}
            onSuccess={props.handleSuccess}
            showLogo={true}
            theme={{
              direction: 'rtl',
            }}
          />
        </div>
      </div>
    </div>
  );
}
