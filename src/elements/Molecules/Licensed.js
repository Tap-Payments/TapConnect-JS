import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Typography, Button } from '@material-ui/core';
import { Loader as TapLoader } from '@tap-ui/react-design-kit.loader';

const useStyles = makeStyles((theme) => ({
  switch: {
    width: '100%',
    paddingTop: '25px',
    paddingBottom: '20px',
  },
  loader: {
    height: '20px',
    width: '20px',
  },

  buttonEnd: {
    width: '44%',
    float: 'right',
    marginTop: '20px',
    marginBottom: '10px',
  },
  buttonStart: {
    width: '44%',
    float: 'left',
    marginTop: '20px',
    marginBottom: '10px',
  },
}));

export default function Licensed(props) {
  if (!props.infos) return null;

  let classes = useStyles();
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div className={classes.switch}>
        <Typography variant={'h3'}>{t(props.infos.title)}</Typography>
      </div>

      <Button
        variant={props.infos.noButtonVariant}
        className={props.direction === 'rtl' ? classes.buttonEnd : classes.buttonStart}
        onClick={props.infos.onClickNo}
      >
        {props.infos.noLoadingStatus ? (
          <TapLoader
            size={20}
            style={{ width: '100px', height: '100px', display: 'block', position: 'absolute', margin: 'auto' }}
            innerColor={'white'}
            outerColor={'white'}
            className={classes.loader}
          />
        ) : (
          t(props.infos.noButtonText)
        )}
      </Button>
      <Button
        variant={props.infos.yesButtonVariant}
        className={props.direction === 'rtl' ? classes.buttonStart : classes.buttonEnd}
        onClick={props.infos.onClickYes}
      >
        {props.infos.yesLoadingStatus ? (
          <TapLoader
            size={20}
            style={{ width: '100px', height: '100px', display: 'block', position: 'absolute', margin: 'auto' }}
            innerColor={'white'}
            outerColor={'white'}
            className={classes.loader}
          />
        ) : (
          t(props.infos.yesButtonText)
        )}
      </Button>
    </React.Fragment>
  );
}
