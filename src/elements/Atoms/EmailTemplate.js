import React from 'react';
import { makeStyles } from '@material-ui/core';
import TapInput from '../TapInput/TapInput';

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: '30px',
    marginBottom: '20px',
  },
}));

export default function EmailTemplate(props) {
  const classes = useStyles();
  if (!props.infos) return null;

  return (
    <div className={classes.input}>
      <TapInput
        {...props.infos}
        dropDownID={props.dropDownID}
        tapCardId={props.tapCardId}
        reference={props.reference}
        direction={props.direction}
      />
    </div>
  );
}
