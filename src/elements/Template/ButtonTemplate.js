import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { WHITELOGO as tapLogo } from '../Constants/constants';

const useStyles = makeStyles((theme) => ({
  signUpButton: {
    width: '100%',
    height: '50px',
    borderRadius: '30px',
    ...theme.typography.body1_bold,
    fontSize: '20px',
  },
  logo: {
    height: '30px',
    width: '30px',
  },
}));

export default function LandingTemplate(props) {
  let classes = useStyles();

  return (
    <Button
      style={{ justifyContent: props.showLogo ? 'space-between' : 'center', direction: props.direction }}
      startIcon={props.showLogo ? <img className={classes.logo} src={props.logo ? props.logo : tapLogo} /> : null}
      endIcon={<img src={''} />}
      className={classes.signUpButton}
      variant={props.variant}
      onClick={props.onClick}
    >
      {props.buttonText}
    </Button>
  );
}
