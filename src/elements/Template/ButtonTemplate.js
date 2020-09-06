import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import tapLogo from '../../assets/whiteLogo.svg';

const useStyles = makeStyles((theme) => ({
  signUpButton: {
    width: '100%',
    justifyContent: 'space-between',
    height: '50px',
    ...theme.typography.body1_bold,
    fontSize: '20px',
  },
  logo: {
    height: '30px',
    width: '30px',
  },
}));

export default function LandingTemplate(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Button
      startIcon={<img className={classes.logo} src={tapLogo} />}
      endIcon={<img src={''} />}
      className={classes.signUpButton}
      variant="contained"
      onClick={props.onClick}
    >
      {t(props.buttonText)}
    </Button>
  );
}
