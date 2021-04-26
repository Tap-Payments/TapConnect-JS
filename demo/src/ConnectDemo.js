import React, { Fragment, useState, Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { TapAuthButton, DialogMode, AnimationType, PageMode, SegmentType, ConnectPackage } from '../../src/index';
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
  Input,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

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
            <span className={classes.head}>Public Key</span>

            <FormControl component="fieldset" className={classes.formControl}>
              <Input
                style={{ fontSize: '14px' }}
                value={vm.publicKeyFieldValue}
                onChange={vm.onPublicKeyFieldChange}
                endAdornment={
                  <InputAdornment position="end">
                    {vm.publicKeyFieldValue != vm.publicKey && (
                      <IconButton onClick={vm.onPublicKeyClick}>
                        <CheckIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                }
              ></Input>
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
            <ConnectPackage
              openPopup={true}
              publicKey={vm.publicKey}
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
              country="KW"
              businessSegment={SegmentType.Ecommerce}
            />
          </div>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default observer(ConnectDemo);
