import React, { useRef } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import TapCard from '../Atoms/TapCard';
import tapLogo from '../../assets/logo.png';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '30px',
  },
  logo: {
    height: '90px',
    width: '90px',
    position: 'relative',
    paddingBottom: '25px',
  },
  signUpButton: {
    display: 'block',
    margin: '15px auto',
    width: '200px',
    ...theme.typography.body1_bold,
  },
  footer: {
    paddingTop: '5px',
    fontSize: '13px',
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontWeight: '300',
  },
}));

export default function LandingTemplate(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const reference = useRef(null);

  return (
    <TapCard reference={reference}>
      <div id={props.id} style={{ width: '100%', direction: props.direction, textAlign: 'center' }}>
        <div className={classes.container}>
          <img className={classes.logo} src={tapLogo} />
          <Button className={classes.signUpButton} variant="contained" onClick={props.moveToLogin}>
            {t('login')}
          </Button>
          <Button className={classes.signUpButton} variant="contained" onClick={props.moveToSignup}>
            {t('signup')}
          </Button>
          <Button className={classes.signUpButton} variant="contained" onClick={props.moveToConnect}>
            {t('connect')}
          </Button>
          <div className={classes.footer}>
            {t(props.footer)} {t(props.companyName)}.
          </div>
        </div>
      </div>
    </TapCard>
  );
}
