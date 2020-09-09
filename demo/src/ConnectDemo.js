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
  radio: {},
}));

function ConnectDemo(props) {
  const vm = useVm(ConnectDemoVM, props);

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.root}>
        <CardHeader className={classes.title} title="Connect - JS Library Demo" />
        <Divider />
        <CardContent className={classes.cardContent}>
          <div className={classes.formGroup}>
            <span className={classes.head}>Page Mode</span>

            <FormControl component="fieldset">
              <RadioGroup
                className={classes.formGroup}
                aria-label="pagemode"
                name="pagemode1"
                value={vm.pageMode}
                onChange={vm.onChangePageMode}
              >
                <FormControlLabel value={PageMode.CONNECT} control={<Radio color={'primary'} />} label="Connect" />
                <FormControlLabel value={PageMode.LOGIN} control={<Radio color={'primary'} />} label="Sign in" />
                <FormControlLabel value={PageMode.SIGNUP} control={<Radio color={'primary'} />} label="Sign up" />
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
                <FormControlLabel value={'live'} control={<Radio color={'primary'} />} label="Live" />
                <FormControlLabel
                  value={'sandbox'}
                  control={<Radio color={'primary'} />}
                  label="Sandbox"
                  style={{ color: '#00aff0' }}
                />
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
                <FormControlLabel
                  value={'rtl'}
                  control={<Radio color={'primary'} className={classes.radio} />}
                  label="Ar"
                />
                <FormControlLabel
                  value={'ltr'}
                  control={<Radio color={'primary'} className={classes.radio} />}
                  label="En"
                />
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
                <FormControlLabel value={AnimationType.FADE} control={<Radio color={'primary'} />} label="Fade" />
                <FormControlLabel
                  value={AnimationType.SLIDEUP}
                  control={<Radio color={'primary'} />}
                  label="Slide up"
                />
                <FormControlLabel
                  value={AnimationType.SLIDEDOWN}
                  control={<Radio color={'primary'} />}
                  label="Slide down"
                />
                <FormControlLabel
                  value={AnimationType.SLIDELEFT}
                  control={<Radio color={'primary'} />}
                  label="Slide Left"
                />
                <FormControlLabel
                  value={AnimationType.SLIDERIGHT}
                  control={<Radio color={'primary'} />}
                  label="Slide right"
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
