import React, { Fragment, useState, Component } from 'react';
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
import { theme } from '../../src/elements/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '40px auto',
    minWidth: 275,
    maxWidth: 900,
    padding: '20px',
    backgroundColor: theme.palette.background.default,
  },
  title: {
    ...theme.typography.h1,
    color: theme.palette.primary.main,
    fontSize: '2em',
    paddingBottom: '30px',
  },
  isSelected: {
    color: theme.palette.primary.main,
  },
  headerAction: {
    paddingTop: '20px',
  },
  button: {
    paddingTop: '10px',
  },
  head: {
    fontSize: '0.6em',
    width: '50%',
    color: theme.palette.common.black,
    ...theme.typography.h6,
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
}));

function ConnectDemo(props) {
  const vm = useVm(ConnectDemoVM, props);

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        // action={
        //   <span className={classes.headerAction}>
        //     <Button style={vm.ar ? { color: 'green' } : {}} className={classes.button} onClick={vm.onClickAR}>
        //       AR
        //     </Button>
        //     <span>|</span>
        //     <Button style={vm.ar ? {} : { color: 'green' }} className={classes.button} onClick={vm.onClickEN}>
        //       EN
        //     </Button>
        //   </span>
        // }
        disableTypography={true}
        className={classes.title}
        title="Connect - JS Library Demo"
      />
      <Divider />
      <CardContent className={classes.cardContent}>
        <div className={classes.formGroup}>
          <span className={classes.head}>Choose a PageMode</span>
          <FormControl component="fieldset">
            <RadioGroup
              className={classes.formGroup}
              aria-label="pagemode"
              name="pagemode1"
              value={vm.pageMode}
              onChange={vm.onChangePageMode}
            >
              <FormControlLabel value={PageMode.CONNECT} control={<Radio color={'primary'} />} label="CONNECT" />
              <FormControlLabel value={PageMode.LOGIN} control={<Radio color={'primary'} />} label="LOGIN" />
              <FormControlLabel value={PageMode.SIGNUP} control={<Radio color={'primary'} />} label="SIGNUP" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={classes.formGroup} style={{ paddingTop: '20px' }}>
          <span className={classes.head}>Live/Sandbox</span>
          <FormControl component="fieldset">
            <RadioGroup
              className={classes.formGroup}
              aria-label="live"
              name="live1"
              value={vm.isLiveMode}
              onChange={vm.onChangeLiveMode}
            >
              <FormControlLabel value={'live'} control={<Radio color={'primary'} />} label="LIVE" />
              <FormControlLabel value={'sandbox'} control={<Radio color={'primary'} />} label="SANDBOX" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={classes.formGroup} style={{ paddingTop: '20px' }}>
          <span className={classes.head}>Language</span>
          <FormControl component="fieldset">
            <RadioGroup
              className={classes.formGroup}
              aria-label="language"
              name="language1"
              value={vm.direction}
              onChange={vm.onChangeLanguage}
            >
              <FormControlLabel value={'rtl'} control={<Radio color={'primary'} />} label="AR" />
              <FormControlLabel value={'ltr'} control={<Radio color={'primary'} />} label="EN" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={classes.formGroup} style={{ paddingTop: '20px' }}>
          <span className={classes.head}>AnimationType</span>
          <FormControl component="fieldset">
            <RadioGroup
              className={classes.formGroup}
              style={{ flexDirection: 'column' }}
              aria-label="animationtype"
              name="animationtype1"
              value={vm.animationType}
              onChange={vm.onChangeAnimationType}
            >
              <FormControlLabel value={AnimationType.FADE} control={<Radio color={'primary'} />} label="FADE" />
              <FormControlLabel value={AnimationType.SLIDEUP} control={<Radio color={'primary'} />} label="SLIDEUP" />
              <FormControlLabel
                value={AnimationType.SLIDEDOWN}
                control={<Radio color={'primary'} />}
                label="SLIDEDOWN"
              />
              <FormControlLabel
                value={AnimationType.SLIDELEFT}
                control={<Radio color={'primary'} />}
                label="SLIDELEFT"
              />
              <FormControlLabel
                value={AnimationType.SLIDERIGHT}
                control={<Radio color={'primary'} />}
                label="SLIDERIGHT"
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div style={{ width: '230px', margin: '0px auto', marginTop: '60px' }}>
          <TapAuthButton
            pageMode={vm.pageMode}
            dialogMode={vm.dialogMode}
            buttonText={vm.buttonText}
            animationType={vm.animationType}
            animationDuration={500}
            closeOnOutsideClick={true}
            liveMode={vm.isLiveMode == 'sandbox' ? false : true}
            hideInitialLoader={props.hideInitialLoader}
            onSuccess={props.handleSuccess}
            theme={{
              direction: vm.direction,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default observer(ConnectDemo);
